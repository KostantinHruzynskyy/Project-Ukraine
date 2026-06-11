#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]


def main() -> None:
    parser = argparse.ArgumentParser(description="Legge il dataset film di Skyy History.")
    parser.add_argument("--tag", default="")
    args = parser.parse_args()

    data = json.loads((BASE_DIR / "data" / "films.json").read_text(encoding="utf-8"))

    if args.tag:
        tag = args.tag.lower()
        data["films"] = [film for film in data["films"] if tag in [item.lower() for item in film.get("tags", [])]]
        data["count"] = len(data["films"])

    print(json.dumps({"ok": True, "films": data}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
