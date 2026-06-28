#!/usr/bin/env python3
"""Small local backend for the Ukrainian cuisine section.

Run from the project root with:
    python backend/cucina_backend.py --port 8086

Then open:
    http://127.0.0.1:8086/pages/cucina.html
"""

from __future__ import annotations

import argparse
import json
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = BASE_DIR / "data" / "cucina-data.json"


def load_data() -> dict:
    with DATA_FILE.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def recipe_matches(recipe: dict, query: str, category: str, region: str) -> bool:
    recipe_category = str(recipe.get("category", "")).lower()
    recipe_region = str(recipe.get("region", "")).lower()
    haystack = json.dumps(recipe, ensure_ascii=False).lower()

    if category and recipe_category != category:
        return False

    if region and region not in recipe_region:
        return False

    if query and query not in haystack:
        return False

    return True


class CuisineHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def send_json(self, payload: dict, status: HTTPStatus = HTTPStatus.OK) -> None:
        encoded = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "public, max-age=120")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)

        if parsed.path not in {"/api/cucina", "/api/cucina/recipes", "/cucina-api.json"}:
            return super().do_GET()

        try:
            data = load_data()
        except OSError as error:
            self.send_json({"ok": False, "error": str(error)}, HTTPStatus.INTERNAL_SERVER_ERROR)
            return

        params = parse_qs(parsed.query)
        query = params.get("q", [""])[0].strip().lower()
        category = params.get("category", [""])[0].strip().lower()
        region = params.get("region", [""])[0].strip().lower()
        recipes = [
            recipe
            for recipe in data.get("recipes", [])
            if recipe_matches(recipe, query, category, region)
        ]

        self.send_json({
            "ok": True,
            "updated": data.get("updated"),
            "note": data.get("note"),
            "count": len(recipes),
            "categories": data.get("categories", []),
            "sources": data.get("sources", []),
            "recipes": recipes,
        })


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve Skyy History cuisine data locally.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8086)
    args = parser.parse_args()

    server = ThreadingHTTPServer((args.host, args.port), CuisineHandler)
    print(f"Serving cuisine backend on http://{args.host}:{args.port}/pages/cucina.html")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping cuisine backend")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
