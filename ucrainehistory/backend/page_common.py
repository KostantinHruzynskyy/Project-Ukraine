from __future__ import annotations

import argparse
import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]


def read_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def emit(payload: dict) -> None:
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def emit_page(slug: str) -> None:
    safe_slug = Path(slug).name
    emit({"ok": True, "page": read_json(BASE_DIR / "data" / "pages" / f"{safe_slug}.json")})


def main() -> None:
    parser = argparse.ArgumentParser(description="Legge i dati pagina di Skyy History.")
    parser.add_argument("slug", nargs="?", default="index")
    args = parser.parse_args()

    if args.slug == "index":
        emit({"ok": True, "index": read_json(BASE_DIR / "data" / "pages" / "index.json")})
        return

    emit_page(args.slug)


if __name__ == "__main__":
    main()
