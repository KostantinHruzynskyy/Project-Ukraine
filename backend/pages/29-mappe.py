#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import json

BASE_DIR = Path(__file__).resolve().parents[2]
PAGE_FILE = BASE_DIR / "data" / "pages" / "29-mappe.json"


def get_page() -> dict:
    return {"ok": True, "page": json.loads(PAGE_FILE.read_text(encoding="utf-8"))}


if __name__ == "__main__":
    print(json.dumps(get_page(), ensure_ascii=False, indent=2))
