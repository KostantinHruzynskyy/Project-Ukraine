#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "ucrainehistory"
UPDATED = "2026-06"


PAGES = [
    ("01-main", "Main.html", "Home", "Ingresso generale al progetto Skyy History sull'Ucraina."),
    ("02-holodomor", "holodomor.html", "Memoria", "Holodomor, carestia forzata e memoria nazionale."),
    ("03-babyn-yar", "babyn-yar.html", "Memoria", "Babyn Yar, Shoah in Ucraina e memoria pubblica."),
    ("04-tatari-crimea", "tatari-crimea.html", "Popoli", "Tatari di Crimea, deportazione, ritorno e popolo indigeno."),
    ("05-chernobyl", "chernobyl.html", "Ambiente", "Chornobyl, disastro nucleare, liquidatori e fiducia pubblica."),
    ("06-indipendenza", "indipendenza.html", "Stato", "Indipendenza del 1991 e costruzione dello stato moderno."),
    ("07-euromaidan", "euromaidan.html", "Societa", "Euromaidan e Rivoluzione della Dignita."),
    ("08-crimea-donbas", "crimea-donbas.html", "Guerra", "Crimea occupata, Donbas e origini della guerra moderna."),
    ("09-invasione-2022", "invasione-2022.html", "Guerra", "Invasione russa su vasta scala del 24 febbraio 2022."),
    ("10-bucha", "bucha.html", "Crimini", "Bucha, occupazione e prove dei crimini contro civili."),
    ("11-mariupol", "mariupol.html", "Assedio", "Mariupol, assedio, teatro bombardato e Azovstal."),
    ("12-battaglie", "battaglie.html", "Guerra", "Battaglie, fronti, logistica, droni e documentari."),
    ("13-atrocita", "atrocita.html", "Crimini", "Atrocita, categorie legali, prove e fonti indipendenti."),
    ("14-difesa", "difesa.html", "Difesa", "Forze ucraine, volontari, tecnologia e societa civile."),
    ("15-dossier", "dossier.html", "Studio", "Dossier ordinato su storia, cultura, guerra e fonti."),
    ("16-museo", "museo.html", "Patrimonio", "Museo interattivo e oggetti come fonti storiche."),
    ("17-lingua-cultura", "lingua-cultura.html", "Cultura", "Lingua, toponimi, letteratura, musica e patrimonio."),
    ("18-cucina", "cucina.html", "Cucina", "Ricette, ingredienti, regioni, feste e dataset culinario."),
    ("19-costumi", "costumi.html", "Costumi", "Vyshyvanka, pysanky, rushnyk, Ornek e oggetti rituali."),
    ("20-cucina-costumi", "cucina-costumi.html", "Indice", "Ponte compatibile tra cucina e costumi separati."),
    ("21-sport", "sport.html", "Sport", "Sport ucraino, medaglie, record e infrastrutture colpite."),
    ("22-rifugiati", "rifugiati.html", "Civili", "Rifugiati, sfollati, accoglienza e diaspora."),
    ("23-ricostruzione", "ricostruzione.html", "Futuro", "Ricostruzione, energia, mine, economia e futuro europeo."),
    ("24-film", "film.html", "Cinema", "Archivio aggiornato di film e documentari sull'Ucraina."),
]


FILMS = [
    {
        "id": "20-days-in-mariupol",
        "title": "20 Days in Mariupol",
        "year": 2023,
        "kind": "Documentario",
        "tags": ["guerra", "documentario", "mariupol", "premi"],
        "director": "Mstyslav Chernov",
        "note": "Testimonianza AP/FRONTLINE dall'assedio di Mariupol; ha vinto l'Oscar come miglior documentario.",
        "source": "https://www.pbs.org/wgbh/frontline/documentary/20-days-in-mariupol/"
    },
    {
        "id": "2000-meters-to-andriivka",
        "title": "2000 Meters to Andriivka",
        "year": 2025,
        "kind": "Documentario",
        "tags": ["guerra", "documentario", "fronte", "2025"],
        "director": "Mstyslav Chernov",
        "note": "Documentario dal fronte orientale: utile per leggere fanteria, avanzamento lento, perdite e testimonianza giornalistica dopo Mariupol.",
        "source": "https://www.pbs.org/wgbh/frontline/documentary/2000-meters-to-andriivka/"
    },
    {
        "id": "porcelain-war",
        "title": "Porcelain War",
        "year": 2024,
        "kind": "Documentario",
        "tags": ["guerra", "documentario", "arte", "premi"],
        "director": "Brendan Bellomo, Slava Leontyev",
        "note": "Arte, resistenza e vita quotidiana durante l'invasione; vincitore al Sundance e candidato agli Oscar come documentario.",
        "source": "https://www.porcelainwar.com/"
    },
    {
        "id": "timestamp",
        "title": "Timestamp",
        "year": 2025,
        "kind": "Documentario",
        "tags": ["documentario", "scuola", "societa", "2025"],
        "director": "Kateryna Gornostai",
        "note": "Osserva scuola, adolescenti e vita quotidiana in Ucraina durante la guerra, utile per parlare di educazione sotto minaccia.",
        "source": "https://www.berlinale.de/"
    },
    {
        "id": "intercepted",
        "title": "Intercepted",
        "year": 2024,
        "kind": "Documentario",
        "tags": ["guerra", "documentario", "prove", "2024"],
        "director": "Oksana Karpovych",
        "note": "Mette in dialogo immagini dell'Ucraina devastata e intercettazioni telefoniche di soldati russi.",
        "source": "https://www.berlinale.de/"
    },
    {
        "id": "songs-of-slow-burning-earth",
        "title": "Songs of Slow Burning Earth",
        "year": 2024,
        "kind": "Documentario",
        "tags": ["guerra", "documentario", "societa", "2024"],
        "director": "Olha Zhurba",
        "note": "Documentario corale sulla normalizzazione della guerra e sulla trasformazione della vita civile.",
        "source": "https://www.labiennale.org/en/cinema"
    },
    {
        "id": "winter-on-fire",
        "title": "Winter on Fire",
        "year": 2015,
        "kind": "Documentario",
        "tags": ["maidan", "documentario", "storia"],
        "director": "Evgeny Afineevsky",
        "note": "Documentario sulle proteste di Euromaidan e sulla Rivoluzione della Dignita a Kyiv.",
        "source": "https://www.netflix.com/title/80031666"
    },
    {
        "id": "maidan",
        "title": "Maidan",
        "year": 2014,
        "kind": "Documentario",
        "tags": ["maidan", "documentario", "storia"],
        "director": "Sergei Loznitsa",
        "note": "Osserva la piazza come corpo collettivo, tra attesa, canti, gelo e violenza politica.",
        "source": "https://www.festival-cannes.com/"
    },
    {
        "id": "mr-jones",
        "title": "Mr. Jones",
        "year": 2019,
        "kind": "Dramma storico",
        "tags": ["storia", "holodomor"],
        "director": "Agnieszka Holland",
        "note": "Film sul giornalista Gareth Jones e sulla scoperta dell'Holodomor.",
        "source": "https://www.berlinale.de/"
    },
    {
        "id": "atlantis",
        "title": "Atlantis",
        "year": 2019,
        "kind": "Dramma",
        "tags": ["guerra", "donbas"],
        "director": "Valentyn Vasyanovych",
        "note": "Futuro postbellico nel Donbas: trauma, paesaggio distrutto e ricostruzione.",
        "source": "https://www.labiennale.org/en/cinema"
    },
    {
        "id": "klondike",
        "title": "Klondike",
        "year": 2022,
        "kind": "Dramma",
        "tags": ["guerra", "donbas"],
        "director": "Maryna Er Gorbach",
        "note": "Una famiglia nel Donbas durante il 2014 e la guerra che entra nella vita civile.",
        "source": "https://www.sundance.org/"
    },
    {
        "id": "the-distant-barking-of-dogs",
        "title": "The Distant Barking of Dogs",
        "year": 2017,
        "kind": "Documentario",
        "tags": ["guerra", "documentario", "infanzia"],
        "director": "Simon Lereng Wilmont",
        "note": "La guerra vista attraverso l'infanzia nel Donbas.",
        "source": "https://www.idfa.nl/"
    },
    {
        "id": "the-living",
        "title": "The Living",
        "year": 2008,
        "kind": "Documentario",
        "tags": ["storia", "holodomor", "documentario"],
        "director": "Serhiy Bukovsky",
        "note": "Documentario sull'Holodomor e sulla memoria della carestia.",
        "source": "https://www.encyclopediaofukraine.com/"
    },
    {
        "id": "the-guide",
        "title": "The Guide",
        "year": 2014,
        "kind": "Dramma storico",
        "tags": ["storia", "cultura"],
        "director": "Oles Sanin",
        "note": "Ambientato nell'Ucraina sovietica degli anni Trenta, tra repressione e cultura dei kobzari.",
        "source": "https://dovzhenkocentre.org/en/"
    },
    {
        "id": "ukrainian-sheriffs",
        "title": "Ukrainian Sheriffs",
        "year": 2015,
        "kind": "Documentario",
        "tags": ["cultura", "documentario", "societa"],
        "director": "Roman Bondarchuk",
        "note": "Sguardo alla vita rurale e alla societa ucraina prima dell'invasione totale.",
        "source": "https://www.idfa.nl/"
    },
    {
        "id": "shadows-of-forgotten-ancestors",
        "title": "Shadows of Forgotten Ancestors",
        "year": 1965,
        "kind": "Classico",
        "tags": ["cultura", "classico", "hutsul"],
        "director": "Sergei Parajanov",
        "note": "Capolavoro ambientato nella cultura hutsul, centrale per immaginario, musica e tradizioni.",
        "source": "https://dovzhenkocentre.org/en/"
    },
    {
        "id": "the-tribe",
        "title": "The Tribe",
        "year": 2014,
        "kind": "Dramma",
        "tags": ["cultura", "societa"],
        "director": "Myroslav Slaboshpytskyi",
        "note": "Film radicale e duro, utile per discutere marginalita, linguaggio e societa.",
        "source": "https://www.festival-cannes.com/"
    }
]


def read_text(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8", newline="\n")


def extract_meta(html: str, fallback_title: str) -> dict:
    title_match = re.search(r"<title>(.*?)</title>", html, re.IGNORECASE | re.DOTALL)
    desc_match = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html, re.IGNORECASE)
    h1_match = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.IGNORECASE | re.DOTALL)
    clean = lambda value: re.sub(r"\s+", " ", re.sub(r"<.*?>", "", value or "")).strip()

    return {
        "title": clean(title_match.group(1)) if title_match else fallback_title,
        "description": desc_match.group(1).strip() if desc_match else "",
        "h1": clean(h1_match.group(1)) if h1_match else fallback_title,
    }


def page_payload(index: int, slug: str, html_file: str, section: str, fallback_summary: str) -> dict:
    html_path = SITE / html_file
    meta = extract_meta(read_text(html_path), fallback_summary)
    previous_page = PAGES[index - 1][1] if index > 0 else None
    next_page = PAGES[index + 1][1] if index + 1 < len(PAGES) else None

    return {
        "id": slug,
        "order": index + 1,
        "file": html_file,
        "section": section,
        "title": meta["title"],
        "h1": meta["h1"],
        "description": meta["description"] or fallback_summary,
        "summary": fallback_summary,
        "updated": UPDATED,
        "assets": {
            "html": html_file,
            "json": f"data/pages/{slug}.json",
            "php": f"api/pages/{slug}.php",
            "python": f"backend/pages/{slug}.py"
        },
        "navigation": {
            "previous": previous_page,
            "next": next_page,
            "home": "Main.html"
        },
        "quality": {
            "dataSource": "data/pages",
            "api": "api/pages",
            "python": "backend/pages",
            "css": ["styles/site-order.css", "styles/films.css"]
        }
    }


def php_wrapper(slug: str) -> str:
    return f"""<?php
declare(strict_types=1);

require_once __DIR__ . '/../page_common.php';

skyy_send_page('{slug}');
"""


def py_wrapper(slug: str) -> str:
    return f"""#!/usr/bin/env python3
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from page_common import emit_page


if __name__ == "__main__":
    emit_page("{slug}")
"""


def build_film_html() -> str:
    cards = "\n".join(
        f"""            <article class=\"film-library-card reveal\" data-film=\"{' '.join(film['tags'])}\">
              <span>{film['year']} - {film['kind']}</span>
              <h3>{film['title']}</h3>
              <p><strong>Regia:</strong> {film['director']}</p>
              <p>{film['note']}</p>
              <a class=\"source-link\" href=\"{film['source']}\">Fonte</a>
            </article>"""
        for film in FILMS
    )
    return f"""<!doctype html>
<html lang=\"it\">
  <head>
    <meta charset=\"utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    <meta name=\"description\" content=\"Archivio aggiornato di film e documentari per capire Ucraina, Holodomor, Maidan, Donbas, invasione russa, cultura e memoria.\">
    <title>Skyy History - Film e documentari sull'Ucraina</title>
    <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB\" crossorigin=\"anonymous\">
    <link rel=\"stylesheet\" href=\"style.css\">
    <link rel=\"stylesheet\" href=\"styles/site-order.css\">
    <link rel=\"stylesheet\" href=\"styles/films.css\">
  </head>
  <body class=\"event-page-body\">
    <div class=\"scroll-progress\" aria-hidden=\"true\"></div>
    <nav class=\"navbar navbar-expand-lg war-navbar sticky-top\" data-bs-theme=\"dark\">
      <div class=\"container\">
        <a class=\"navbar-brand d-flex align-items-center\" href=\"Main.html#inizio\"><span class=\"brand-mark\">SH</span>Skyy History</a>
        <a class=\"btn history-btn ms-auto px-3\" href=\"Main.html#film\">Home film</a>
      </div>
    </nav>

    <header class=\"event-hero\" style='--event-image: url(\"https://commons.wikimedia.org/wiki/Special:FilePath/Cinema%20of%20Ukraine.jpg\");'>
      <div class=\"container event-hero-content reveal\">
        <p class=\"hero-kicker mb-3\">Cinema e memoria</p>
        <h1>Film e documentari sull'Ucraina</h1>
        <p class=\"hero-lead mt-4\">Archivio ordinato e aggiornato a giugno 2026: Holodomor, Maidan, Donbas, invasione russa, Mariupol, arte sotto guerra, scuola e cultura viva.</p>
        <div class=\"event-meta\"><span>Documentari</span><span>Guerra</span><span>Cultura</span><span>Fonti</span></div>
      </div>
    </header>

    <main class=\"event-detail-section\">
      <div class=\"container\">
        <aside class=\"motto-strip reveal mb-4\">
          <strong>Metodo</strong>
          <span>Film e documentari non sostituiscono fonti storiche o rapporti ufficiali: aiutano a vedere esperienze, luoghi, voci e memoria.</span>
        </aside>

        <section class=\"page-band film-library-section\" data-film-library>
          <div class=\"row align-items-end mb-4 reveal\">
            <div class=\"col-lg-8\">
              <p class=\"section-kicker mb-2\">Archivio film</p>
              <h2 class=\"display-6 mb-3\">Selezione aggiornata</h2>
            </div>
            <div class=\"col-lg-4\">
              <p class=\"section-text\">Include nuove schede su 2000 Meters to Andriivka, Porcelain War, Timestamp, Intercepted e Songs of Slow Burning Earth.</p>
            </div>
          </div>

          <div class=\"film-controls reveal\" data-film-filters>
            <button class=\"front-filter active\" type=\"button\" data-film-filter=\"all\">Tutti</button>
            <button class=\"front-filter\" type=\"button\" data-film-filter=\"2025\">2025</button>
            <button class=\"front-filter\" type=\"button\" data-film-filter=\"2024\">2024</button>
            <button class=\"front-filter\" type=\"button\" data-film-filter=\"guerra\">Guerra</button>
            <button class=\"front-filter\" type=\"button\" data-film-filter=\"maidan\">Maidan</button>
            <button class=\"front-filter\" type=\"button\" data-film-filter=\"cultura\">Cultura</button>
            <button class=\"front-filter\" type=\"button\" data-film-filter=\"documentario\">Documentari</button>
            <button class=\"front-filter\" type=\"button\" data-film-filter=\"storia\">Storia</button>
          </div>

          <div class=\"film-library-grid mt-4\">
{cards}
          </div>
        </section>

        <section class=\"dossier-sources reveal mt-5\">
          <h2>Fonti cinema</h2>
          <div class=\"writers-grid\">
            <a href=\"data/films.json\">Dataset film JSON</a>
            <a href=\"api/films.php\">Endpoint PHP film</a>
            <a href=\"https://www.pbs.org/wgbh/frontline/documentary/20-days-in-mariupol/\">FRONTLINE - 20 Days in Mariupol</a>
            <a href=\"https://www.pbs.org/wgbh/frontline/documentary/2000-meters-to-andriivka/\">FRONTLINE - 2000 Meters to Andriivka</a>
            <a href=\"https://www.sundance.org/\">Sundance Institute</a>
            <a href=\"https://www.berlinale.de/\">Berlinale</a>
            <a href=\"https://www.labiennale.org/en/cinema\">La Biennale Cinema</a>
            <a href=\"https://dovzhenkocentre.org/en/\">Dovzhenko Centre</a>
          </div>
        </section>

        <a class=\"back-link\" href=\"Main.html#film\">Torna alla home film</a>
      </div>
    </main>

    <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js\" integrity=\"sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI\" crossorigin=\"anonymous\"></script>
    <script src=\"encyclopedia-data.js\"></script>
    <script src=\"encyclopedia.js\"></script>
    <script src=\"script.js\"></script>
  </body>
</html>
"""


def ensure_css_links() -> None:
    links = [
        '    <link rel="stylesheet" href="styles/site-order.css">',
        '    <link rel="stylesheet" href="styles/films.css">',
    ]
    for html_file in sorted(SITE.glob("*.html")):
        content = read_text(html_file)
        if "styles/site-order.css" in content:
            continue
        marker = '    <link rel="stylesheet" href="style.css">'
        if marker not in content:
            continue
        content = content.replace(marker, marker + "\n" + "\n".join(links), 1)
        write_text(html_file, content)


def main() -> None:
    write_text(SITE / "film.html", build_film_html())

    page_index = []
    for index, (slug, html_file, section, summary) in enumerate(PAGES):
        payload = page_payload(index, slug, html_file, section, summary)
        write_text(SITE / "data" / "pages" / f"{slug}.json", json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
        write_text(SITE / "api" / "pages" / f"{slug}.php", php_wrapper(slug))
        write_text(SITE / "backend" / "pages" / f"{slug}.py", py_wrapper(slug))
        page_index.append({
            "id": slug,
            "order": index + 1,
            "file": html_file,
            "section": section,
            "title": payload["title"],
            "json": f"data/pages/{slug}.json",
            "php": f"api/pages/{slug}.php",
            "python": f"backend/pages/{slug}.py"
        })

    write_text(SITE / "data" / "pages" / "index.json", json.dumps({
        "updated": UPDATED,
        "count": len(page_index),
        "pages": page_index
    }, ensure_ascii=False, indent=2) + "\n")

    write_text(SITE / "data" / "films.json", json.dumps({
        "updated": UPDATED,
        "note": "Archivio didattico di film e documentari sull'Ucraina aggiornato a giugno 2026.",
        "count": len(FILMS),
        "films": FILMS
    }, ensure_ascii=False, indent=2) + "\n")

    write_text(SITE / "api" / "page_common.php", """<?php
declare(strict_types=1);

function skyy_send_json(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: public, max-age=300');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function skyy_read_json(string $path): array
{
    if (!is_readable($path)) {
        skyy_send_json(['ok' => false, 'error' => 'File non trovato'], 404);
        exit;
    }

    $raw = file_get_contents($path);
    $data = json_decode($raw ?: '', true);

    if (!is_array($data)) {
        skyy_send_json(['ok' => false, 'error' => 'JSON non valido'], 500);
        exit;
    }

    return $data;
}

function skyy_send_page(string $slug): void
{
    $safeSlug = basename($slug);
    $path = __DIR__ . '/../data/pages/' . $safeSlug . '.json';
    $data = skyy_read_json($path);
    skyy_send_json(['ok' => true, 'page' => $data]);
}
""")

    write_text(SITE / "api" / "pages.php", """<?php
declare(strict_types=1);

require_once __DIR__ . '/page_common.php';

$data = skyy_read_json(__DIR__ . '/../data/pages/index.json');
skyy_send_json(['ok' => true, 'index' => $data]);
""")

    write_text(SITE / "api" / "films.php", """<?php
declare(strict_types=1);

require_once __DIR__ . '/page_common.php';

$data = skyy_read_json(__DIR__ . '/../data/films.json');
$tag = strtolower(trim((string)($_GET['tag'] ?? '')));

if ($tag !== '') {
    $data['films'] = array_values(array_filter($data['films'], static function (array $film) use ($tag): bool {
        return in_array($tag, array_map('strtolower', $film['tags'] ?? []), true);
    }));
    $data['count'] = count($data['films']);
}

skyy_send_json(['ok' => true, 'films' => $data]);
""")

    write_text(SITE / "backend" / "page_common.py", """from __future__ import annotations

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
""")

    write_text(SITE / "backend" / "films.py", """#!/usr/bin/env python3
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
""")

    write_text(SITE / "backend" / "site_backend.py", """#!/usr/bin/env python3
from __future__ import annotations

import json
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


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

    def read_json(self, relative: str) -> dict:
        return json.loads((BASE_DIR / relative).read_text(encoding="utf-8"))

    def do_GET(self) -> None:
        parsed = urlparse(self.path)

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

        if parsed.path == "/api/films":
            self.send_json({"ok": True, "films": self.read_json("data/films.json")})
            return

        return super().do_GET()


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", 8087), SkyyHandler)
    print("Serving Skyy History on http://127.0.0.1:8087/Main.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\\nStopping server")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
""")

    write_text(SITE / "styles" / "site-order.css", """/* Extra organization layer loaded after style.css. */
:root {
  --panel-border: rgba(16, 24, 32, 0.14);
  --panel-bg: #fff7e3;
}

.ordered-data-note,
.backend-note {
  border-left: 4px solid var(--signal);
  border-radius: 8px;
  padding: 1rem;
  background: rgba(255, 247, 227, 0.82);
  color: var(--ink);
  font-family: Arial, sans-serif;
}

.source-link + .source-link,
.back-link + .back-link {
  margin-left: 0.85rem;
}

.film-card,
.recipe-card,
.costume-card,
.archive-card,
.dossier-card {
  contain: content;
}

@media (max-width: 768px) {
  .source-link + .source-link,
  .back-link + .back-link {
    display: inline-flex;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
""")

    write_text(SITE / "styles" / "films.css", """.film-library-section {
  color: var(--ink);
}

.film-library-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.film-library-card {
  min-height: 260px;
  border: 1px solid rgba(16, 24, 32, 0.14);
  border-radius: 8px;
  padding: 1.15rem;
  background: var(--paper-light);
  box-shadow: 0 14px 34px rgba(16, 24, 32, 0.1);
  contain: content;
}

.film-library-card span {
  color: var(--signal);
  font-family: Arial, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08rem;
  text-transform: uppercase;
}

.film-library-card p {
  color: rgba(16, 24, 32, 0.74);
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.film-library-card.is-hidden {
  display: none;
}

@media (max-width: 768px) {
  .film-library-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1199px) {
  .film-library-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
""")

    ensure_css_links()


if __name__ == "__main__":
    main()
