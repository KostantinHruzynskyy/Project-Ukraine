#!/usr/bin/env python3
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from page_common import emit_page


if __name__ == "__main__":
    emit_page("02-holodomor")
