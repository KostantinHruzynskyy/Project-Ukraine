#!/usr/bin/env python3
from __future__ import annotations

import json
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse


BASE_DIR = Path(__file__).resolve().parents[1]


class SkyyHandler(SimpleHTTPRequestHandler):
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

    def read_json(self, relative: str):
        return json.loads((BASE_DIR / relative).read_text(encoding="utf-8"))

    def filtered_search(self, query: str = "", kind: str = "all") -> list[dict]:
        items = self.read_json("data/search-index.json")
        q = query.casefold().strip()
        output = []
        for item in items:
            if kind != "all" and item.get("type") != kind:
                continue
            haystack = f"{item.get('title', '')} {item.get('text', '')} {' '.join(item.get('tags', []))}".casefold()
            if q and q not in haystack:
                continue
            output.append(item)
        return output[:80]

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        query = parse_qs(parsed.query)

        if parsed.path == "/api/pages":
            self.send_json({"ok": True, "index": self.read_json("data/pages/index.json")})
            return

        if parsed.path.startswith("/api/pages/"):
            slug = Path(parsed.path.removeprefix("/api/pages/")).name
            path = BASE_DIR / "data" / "pages" / f"{slug}.json"
            if not path.exists():
                self.send_json({"ok": False, "error": "Pagina non trovata"}, HTTPStatus.NOT_FOUND)
                return
            self.send_json({"ok": True, "page": json.loads(path.read_text(encoding="utf-8"))})
            return

        endpoints = {
            "/api/films": ("data/films.json", "films"),
            "/api/sources": ("data/sources.json", "sources"),
            "/api/timeline": ("data/timeline.json", "timeline"),
            "/api/maps": ("data/maps.json", "maps"),
            "/api/study": ("data/study.json", "study"),
            "/api/admin": ("data/admin-checks.json", "checks"),
        }
        if parsed.path in endpoints:
            data_file, key = endpoints[parsed.path]
            self.send_json({"ok": True, key: self.read_json(data_file)})
            return

        if parsed.path == "/api/search":
            self.send_json({
                "ok": True,
                "items": self.filtered_search(query.get("q", [""])[0], query.get("type", ["all"])[0]),
            })
            return

        return super().do_GET()


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", 8087), SkyyHandler)
    print("Serving Skyy History on http://127.0.0.1:8087/pages/Main.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
