#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = BASE_DIR / "data" / "study.json"


def get_payload() -> dict:
    return {"ok": True, "study": json.loads(DATA_FILE.read_text(encoding="utf-8"))}


if __name__ == "__main__":
    print(json.dumps(get_payload(), ensure_ascii=False, indent=2))
