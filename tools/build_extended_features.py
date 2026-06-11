#!/usr/bin/env python3
from __future__ import annotations

import json
from datetime import date
from http import HTTPStatus
from pathlib import Path
from urllib.parse import parse_qs, urlparse


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "ucrainehistory"
DATA = SITE / "data"
PAGES_DATA = DATA / "pages"
API = SITE / "api"
BACKEND = SITE / "backend"
STYLES = SITE / "styles"


EXTRA_PAGES = [
    {
        "slug": "25-fonti",
        "file": "fonti.html",
        "title": "Fonti",
        "section": "Risorse",
        "summary": "Biblioteca ordinata di fonti primarie, istituzionali, culturali e cinematografiche usate nel sito.",
        "keywords": ["fonti", "prove", "ONU", "UNESCO", "film", "archivio"],
    },
    {
        "slug": "26-ricerca",
        "file": "ricerca.html",
        "title": "Ricerca",
        "section": "Strumenti",
        "summary": "Ricerca globale dentro pagine, film, ricette, fonti, mappe e cronologia.",
        "keywords": ["ricerca", "indice", "studio", "filtri", "dati"],
    },
    {
        "slug": "27-admin",
        "file": "admin.html",
        "title": "Admin",
        "section": "Strumenti",
        "summary": "Dashboard locale per controllare pagine, dataset, API, backend e ordine del progetto.",
        "keywords": ["admin", "dashboard", "controllo", "backend", "json"],
    },
    {
        "slug": "28-timeline",
        "file": "timeline.html",
        "title": "Timeline",
        "section": "Studio",
        "summary": "Cronologia compatta dall'Ucraina medievale alla situazione aggiornata a giugno 2026.",
        "keywords": ["timeline", "cronologia", "storia", "guerra", "cultura"],
    },
    {
        "slug": "29-mappe",
        "file": "mappe.html",
        "title": "Mappe",
        "section": "Studio",
        "summary": "Atlante ordinato di luoghi, regioni, fronti, memoria, cultura e ricostruzione.",
        "keywords": ["mappe", "luoghi", "regioni", "atlante", "geografia"],
    },
    {
        "slug": "30-studio",
        "file": "studio.html",
        "title": "Studio",
        "section": "Studio",
        "summary": "Percorsi guidati, schede ripasso e quiz per studiare senza perdersi nel sito.",
        "keywords": ["studio", "ripasso", "quiz", "scuola", "percorso"],
    },
]


SOURCES = [
    {
        "label": "OHCHR Ukraine reports",
        "category": "Diritti umani",
        "href": "https://ukraine.ohchr.org/en/reports",
        "note": "Rapporti ONU su vittime civili, diritti umani, occupazione e protezione dei civili.",
    },
    {
        "label": "International Criminal Court - Ukraine",
        "category": "Giustizia",
        "href": "https://www.icc-cpi.int/situations/ukraine",
        "note": "Pagina ufficiale della situazione Ucraina presso la Corte penale internazionale.",
    },
    {
        "label": "Human Rights Watch - Ukraine",
        "category": "Diritti umani",
        "href": "https://www.hrw.org/europe/central-asia/ukraine",
        "note": "Rapporti indipendenti su abusi, crimini di guerra e protezione dei civili.",
    },
    {
        "label": "UNHCR Ukraine situation",
        "category": "Rifugiati",
        "href": "https://data.unhcr.org/en/situations/ukraine",
        "note": "Dati su rifugiati, sfollamento interno e risposta regionale.",
    },
    {
        "label": "UNDP RDNA5 Ukraine",
        "category": "Ricostruzione",
        "href": "https://www.undp.org/ukraine/publications/ukraine-fifth-rapid-damage-and-needs-assessment-rdna5-february-2022-december-2025",
        "note": "Valutazione danni, perdite e bisogni di ricostruzione al 31 dicembre 2025.",
    },
    {
        "label": "World Bank Data - Ukraine",
        "category": "Dati",
        "href": "https://data.worldbank.org/country/ukraine",
        "note": "Indicatori su popolazione, economia, societa e sviluppo.",
    },
    {
        "label": "Internet Encyclopedia of Ukraine",
        "category": "Enciclopedia",
        "href": "https://www.encyclopediaofukraine.com/",
        "note": "Enciclopedia accademica su storia, geografia, cultura e diaspora ucraine.",
    },
    {
        "label": "Encyclopedia of Modern Ukraine",
        "category": "Enciclopedia",
        "href": "https://esu.com.ua/en/about/overview",
        "note": "Progetto enciclopedico ucraino sul periodo moderno e contemporaneo.",
    },
    {
        "label": "Ukrainian Institute - Insight UA",
        "category": "Cultura",
        "href": "https://insight.ui.org.ua/",
        "note": "Atlante culturale su arti, cinema, letteratura, Crimea, musica e guerra.",
    },
    {
        "label": "UNESCO - Ukrainian borscht cooking",
        "category": "Cultura",
        "href": "https://ich.unesco.org/en/USL/01852",
        "note": "Scheda ufficiale UNESCO sulla cultura del borshch ucraino.",
    },
    {
        "label": "UNESCO - Ukraine intangible heritage",
        "category": "Cultura",
        "href": "https://ich.unesco.org/en/state/ukraine-UA?info=elements-on-the-lists",
        "note": "Elementi ucraini del patrimonio culturale immateriale UNESCO.",
    },
    {
        "label": "PBS FRONTLINE - 2000 Meters to Andriivka",
        "category": "Film",
        "href": "https://www.pbs.org/wgbh/frontline/documentary/2000-meters-to-andriivka/",
        "note": "Pagina ufficiale del documentario di Mstyslav Chernov.",
    },
    {
        "label": "Porcelain War - official site",
        "category": "Film",
        "href": "https://www.porcelainwar.com/",
        "note": "Sito ufficiale del documentario premiato su arte e resistenza ucraina.",
    },
    {
        "label": "Berlinale - Timestamp",
        "category": "Film",
        "href": "https://www.berlinale.de/en/2025/programme/202504688.html",
        "note": "Scheda festival del film di Kateryna Gornostai sulla scuola in guerra.",
    },
    {
        "label": "Biennale Cinema - Songs of Slow Burning Earth",
        "category": "Film",
        "href": "https://www.labiennale.org/en/cinema/2024/out-competition/songs-slow-burning-earth",
        "note": "Scheda del film documentario di Olha Zhurba.",
    },
    {
        "label": "Britannica - Ukraine",
        "category": "Enciclopedia",
        "href": "https://www.britannica.com/place/Ukraine",
        "note": "Sintesi generale su territorio, storia, cultura e societa.",
    },
]


TIMELINE = [
    ["882-1240", "Kyivan Rus", "Kyiv diventa centro politico, religioso e commerciale dell'Europa orientale.", "storia"],
    ["1648", "Etmanato cosacco", "La rivolta guidata da Bohdan Khmelnytskyi apre una nuova stagione politica cosacca.", "storia"],
    ["1917-1921", "Repubblica Popolare Ucraina", "Tentativi di indipendenza durante il crollo degli imperi e la guerra civile.", "storia"],
    ["1932-1933", "Holodomor", "Carestia forzata che colpisce milioni di ucraini sotto il regime sovietico.", "memoria"],
    ["1941", "Babyn Yar", "Eccidio nazista a Kyiv e simbolo della Shoah in Ucraina.", "memoria"],
    ["1944", "Deportazione dei Tatari di Crimea", "Stalin deporta in massa il popolo tataro crimeano.", "memoria"],
    ["1986", "Chornobyl", "Il disastro nucleare mostra il costo della segretezza sovietica.", "ambiente"],
    ["24 agosto 1991", "Indipendenza", "Il parlamento proclama l'indipendenza ucraina.", "storia"],
    ["1 dicembre 1991", "Referendum", "La popolazione conferma l'indipendenza con voto nazionale.", "storia"],
    ["2004", "Rivoluzione arancione", "Mobilitazione civica contro brogli e per elezioni libere.", "societa"],
    ["2013-2014", "Euromaidan", "La Rivoluzione della Dignita difende scelta europea e diritti civili.", "societa"],
    ["2014", "Crimea e Donbas", "La Russia occupa la Crimea e alimenta la guerra nel Donbas.", "guerra"],
    ["24 febbraio 2022", "Invasione su vasta scala", "La Russia lancia l'invasione contro tutta l'Ucraina.", "guerra"],
    ["marzo-aprile 2022", "Bucha", "Dopo la ritirata russa emergono prove di uccisioni di civili.", "giustizia"],
    ["maggio 2022", "Mariupol e Azovstal", "La citta assediata diventa simbolo di distruzione e resistenza.", "guerra"],
    ["2023", "Cultura sotto attacco", "Musei, scuole, teatri, chiese e archivi diventano parte della memoria di guerra.", "cultura"],
    ["2024", "Olimpiadi e documentari", "Sport e cinema ucraini raccontano identita e resistenza internazionale.", "cultura"],
    ["2025", "Ricostruzione e giustizia", "Dati RDNA, processi e memoria pubblica rafforzano la documentazione.", "ricostruzione"],
    ["giugno 2026", "Sito aggiornato", "Le sezioni sono ordinate con pagine, dataset, API locali, fonti e ricerca.", "studio"],
]


MAPS = [
    ["Kyiv", "Capitale e centro politico", "Memoria di Kyivan Rus, Maidan, bombardamenti, istituzioni e resistenza civile.", "storia", "50.4501,30.5234"],
    ["Kharkiv", "Citta universitaria e industriale", "Bombardamenti, evacuazioni, vita culturale e difesa del nord-est.", "guerra", "49.9935,36.2304"],
    ["Odesa", "Porto sul Mar Nero", "Identita multiculturale, export del grano, infrastrutture portuali e patrimonio urbano.", "economia", "46.4825,30.7233"],
    ["Lviv", "Nodo culturale occidentale", "Accoglienza sfollati, retrovia culturale, archivi, universita e collegamenti europei.", "cultura", "49.8397,24.0297"],
    ["Crimea", "Penisola occupata", "Tatari di Crimea, basi militari russe, repressione e diritto internazionale.", "occupazione", "45.3453,34.4997"],
    ["Donbas", "Regione industriale e fronte", "Guerra dal 2014, miniere, citta contese e lunga militarizzazione.", "guerra", "48.0159,37.8028"],
    ["Mariupol", "Porto assediato", "Teatro bombardato, Azovstal, distruzione urbana e deportazioni denunciate.", "memoria", "47.0971,37.5434"],
    ["Bucha", "Luogo di prove e giustizia", "Occupazione russa, uccisioni di civili e indagini internazionali.", "giustizia", "50.5539,30.2137"],
    ["Zaporizhzhia", "Energia e industria", "Centrale nucleare occupata nella regione, infrastrutture e rischio energetico.", "energia", "47.8388,35.1396"],
    ["Dnipro", "Retrovia logistica", "Nodo industriale, medico e militare nel centro-est del paese.", "logistica", "48.4647,35.0462"],
    ["Chernihiv", "Nord storico", "Assedio 2022, patrimonio medievale e ricostruzione locale.", "storia", "51.4982,31.2893"],
    ["Kherson", "Sud liberato in parte", "Occupazione, liberazione della citta, bombardamenti e crisi dopo Kakhovka.", "guerra", "46.6354,32.6169"],
]


STUDY_PATHS = [
    {
        "title": "Percorso rapido",
        "duration": "30 minuti",
        "steps": ["Main.html", "timeline.html", "mappe.html", "fonti.html"],
        "goal": "Capire quadro generale, luoghi e fonti prima di scegliere un tema.",
    },
    {
        "title": "Guerra e prove",
        "duration": "60 minuti",
        "steps": ["invasione-2022.html", "battaglie.html", "atrocita.html", "difesa.html", "dossier.html"],
        "goal": "Collegare eventi militari, civili, prove e giustizia.",
    },
    {
        "title": "Cultura, cucina e costumi",
        "duration": "45 minuti",
        "steps": ["lingua-cultura.html", "cucina.html", "costumi.html", "film.html"],
        "goal": "Studiare identita ucraina senza ridurla alla guerra.",
    },
    {
        "title": "Ricostruzione e futuro",
        "duration": "40 minuti",
        "steps": ["rifugiati.html", "ricostruzione.html", "sport.html", "fonti.html"],
        "goal": "Leggere bisogni umanitari, infrastrutture, salute sociale e futuro europeo.",
    },
]


ADMIN_CHECKS = [
    ["Pagine HTML", "ok", "Tutte le pagine principali sono collegate a CSS ordinato e strumenti comuni."],
    ["Dati JSON", "ok", "Pagine, film, cucina, fonti, timeline, mappe, studio e ricerca hanno dataset separati."],
    ["API PHP", "ok", "Endpoint locali leggono JSON senza database esterno."],
    ["Backend Python", "ok", "Server statico con API JSON leggere per sviluppo locale."],
    ["Frontend", "ok", "Filtri, ricerca, quiz e layout usano JS leggero e CSS con focus visibile."],
    ["Cartelle vecchie", "attenzione", "La cartella storica esterna al sito non e stata modificata: meglio archiviarla solo dopo verifica manuale."],
]


def write_json(path: Path, payload: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def read_json(path: Path, fallback: object) -> object:
    if not path.exists():
        return fallback
    return json.loads(path.read_text(encoding="utf-8"))


def esc(value: object) -> str:
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def page_shell(title: str, body: str, description: str) -> str:
    return f"""<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)} | Skyy History</title>
  <meta name="description" content="{esc(description)}">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="styles/site-order.css">
  <link rel="stylesheet" href="styles/films.css">
  <link rel="stylesheet" href="styles/tools.css">
</head>
<body>
  <nav class="war-navbar"></nav>
  <main id="contenuto">
{body}
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="script.js"></script>
  <script src="site-tools.js"></script>
</body>
</html>
"""


def hero(kicker: str, title: str, text: str, stats: list[tuple[str, str]]) -> str:
    stat_html = "\n".join(
        f"""          <article>
            <strong>{esc(value)}</strong>
            <span>{esc(label)}</span>
          </article>"""
        for label, value in stats
    )
    return f"""    <section class="tool-hero page-band">
      <div class="container">
        <p class="section-kicker">{esc(kicker)}</p>
        <h1>{esc(title)}</h1>
        <p>{esc(text)}</p>
        <div class="tool-hero-stats">
{stat_html}
        </div>
      </div>
    </section>"""


def build_fonti() -> str:
    categories = sorted({source["category"] for source in SOURCES})
    filter_buttons = "\n".join(
        f'<button type="button" data-tool-filter="{esc(category)}">{esc(category)}</button>' for category in categories
    )
    cards = "\n".join(
        f"""        <article class="tool-card" data-tool-card data-category="{esc(source['category'])}">
          <span>{esc(source['category'])}</span>
          <h2>{esc(source['label'])}</h2>
          <p>{esc(source['note'])}</p>
          <a href="{esc(source['href'])}" target="_blank" rel="noreferrer">Apri fonte</a>
        </article>"""
        for source in SOURCES
    )
    body = f"""
{hero("Biblioteca", "Fonti ordinate e verificabili", "Una pagina unica per controllare da dove arrivano dati, film, cultura, diritti umani, ricostruzione e memoria.", [("fonti", str(len(SOURCES))), ("categorie", str(len(categories))), ("aggiornamento", "giugno 2026")])}
    <section class="page-band tool-section">
      <div class="container">
        <div class="tool-toolbar" data-tool-filters>
          <button class="active" type="button" data-tool-filter="all">Tutte</button>
          {filter_buttons}
        </div>
        <div class="tool-grid">
{cards}
        </div>
      </div>
    </section>
"""
    return page_shell("Fonti", body, "Biblioteca ordinata di fonti usate nel sito Skyy History.")


def build_ricerca() -> str:
    body = f"""
{hero("Ricerca", "Trova subito pagine, film, ricette e fonti", "Indice locale leggero: funziona sui dataset JSON del progetto, senza database e senza appesantire il frontend.", [("aree", "6"), ("dataset", "JSON"), ("lag", "ridotto")])}
    <section class="page-band tool-section" data-search-page>
      <div class="container">
        <div class="search-panel">
          <label for="globalSearch">Cerca nel sito</label>
          <input id="globalSearch" type="search" placeholder="Esempio: borshch, Bucha, Crimea, film, ricostruzione" autocomplete="off">
          <select id="globalSearchType" aria-label="Tipo di risultato">
            <option value="all">Tutto</option>
            <option value="pagina">Pagine</option>
            <option value="film">Film</option>
            <option value="ricetta">Ricette</option>
            <option value="fonte">Fonti</option>
            <option value="timeline">Timeline</option>
            <option value="mappa">Mappe</option>
          </select>
        </div>
        <div class="search-results" data-search-results aria-live="polite"></div>
      </div>
    </section>
"""
    return page_shell("Ricerca", body, "Ricerca globale dentro pagine, film, ricette, fonti, timeline e mappe.")


def build_admin() -> str:
    rows = "\n".join(
        f"""          <article class="admin-check {esc(status)}">
            <strong>{esc(label)}</strong>
            <span>{esc(status)}</span>
            <p>{esc(note)}</p>
          </article>"""
        for label, status, note in ADMIN_CHECKS
    )
    body = f"""
{hero("Dashboard", "Controllo locale del progetto", "Una vista pratica per capire se pagine, dati, API, backend e frontend sono in ordine.", [("pagine", "30"), ("API", "10+"), ("backend", "Python")])}
    <section class="page-band tool-section" data-admin-dashboard>
      <div class="container">
        <div class="admin-metrics" data-admin-metrics>
          <article><strong>--</strong><span>Pagine indicizzate</span></article>
          <article><strong>--</strong><span>Film</span></article>
          <article><strong>--</strong><span>Fonti</span></article>
          <article><strong>--</strong><span>Ricette</span></article>
        </div>
        <div class="admin-checks" data-admin-checks>
{rows}
        </div>
      </div>
    </section>
"""
    return page_shell("Admin", body, "Dashboard locale per controllare dati e struttura del sito.")


def build_timeline() -> str:
    categories = sorted({item[3] for item in TIMELINE})
    buttons = "\n".join(f'<button type="button" data-tool-filter="{esc(category)}">{esc(category)}</button>' for category in categories)
    rows = "\n".join(
        f"""        <article class="timeline-item tool-card" data-tool-card data-category="{esc(category)}">
          <time>{esc(period)}</time>
          <h2>{esc(title)}</h2>
          <p>{esc(text)}</p>
          <span>{esc(category)}</span>
        </article>"""
        for period, title, text, category in TIMELINE
    )
    body = f"""
{hero("Cronologia", "Timeline essenziale fino a giugno 2026", "Un percorso ordinato per collegare storia lunga, memoria, guerra, cultura e ricostruzione.", [("eventi", str(len(TIMELINE))), ("inizio", "882"), ("fine", "2026")])}
    <section class="page-band tool-section">
      <div class="container">
        <div class="tool-toolbar" data-tool-filters>
          <button class="active" type="button" data-tool-filter="all">Tutto</button>
          {buttons}
        </div>
        <div class="timeline-list">
{rows}
        </div>
      </div>
    </section>
"""
    return page_shell("Timeline", body, "Cronologia dell'Ucraina e del sito aggiornata a giugno 2026.")


def build_mappe() -> str:
    categories = sorted({item[3] for item in MAPS})
    buttons = "\n".join(f'<button type="button" data-tool-filter="{esc(category)}">{esc(category)}</button>' for category in categories)
    cards = "\n".join(
        f"""        <article class="map-card tool-card" data-tool-card data-category="{esc(category)}">
          <span>{esc(category)}</span>
          <h2>{esc(place)}</h2>
          <strong>{esc(role)}</strong>
          <p>{esc(text)}</p>
          <small>{esc(coords)}</small>
        </article>"""
        for place, role, text, category, coords in MAPS
    )
    body = f"""
{hero("Atlante", "Mappe e luoghi da leggere bene", "Non una mappa live del fronte, ma una griglia ordinata per capire regioni, memoria, logistica, cultura e ricostruzione.", [("luoghi", str(len(MAPS))), ("categorie", str(len(categories))), ("uso", "didattico")])}
    <section class="page-band tool-section">
      <div class="container">
        <div class="tool-toolbar" data-tool-filters>
          <button class="active" type="button" data-tool-filter="all">Tutti</button>
          {buttons}
        </div>
        <div class="map-grid">
{cards}
        </div>
      </div>
    </section>
"""
    return page_shell("Mappe", body, "Atlante ordinato di luoghi e regioni dell'Ucraina.")


def build_studio() -> str:
    cards = "\n".join(
        f"""        <article class="study-card">
          <span>{esc(path['duration'])}</span>
          <h2>{esc(path['title'])}</h2>
          <p>{esc(path['goal'])}</p>
          <div>{''.join(f'<a href="{esc(step)}">{esc(step.replace(".html", ""))}</a>' for step in path['steps'])}</div>
        </article>"""
        for path in STUDY_PATHS
    )
    body = f"""
{hero("Studio guidato", "Percorsi, ripasso e quiz", "La parte studio mette ordine: scegli un percorso, apri le pagine giuste e usa le verifiche rapide generate dai dati.", [("percorsi", str(len(STUDY_PATHS))), ("quiz", "automatici"), ("fonti", "collegate")])}
    <section class="page-band tool-section">
      <div class="container">
        <div class="study-grid">
{cards}
        </div>
        <aside class="study-quiz" data-study-quiz>
          <span>Ripasso veloce</span>
          <h2>Quale pagina apri per controllare le fonti?</h2>
          <button type="button" data-correct="false">Solo Main.html</button>
          <button type="button" data-correct="true">fonti.html</button>
          <button type="button" data-correct="false">Solo una pagina film</button>
          <p>Scegli una risposta.</p>
        </aside>
      </div>
    </section>
"""
    return page_shell("Studio", body, "Percorsi guidati, ripasso e quiz per studiare il sito.")


def make_page_payload(page: dict) -> dict:
    return {
        "slug": page["slug"],
        "file": page["file"],
        "title": page["title"],
        "section": page["section"],
        "summary": page["summary"],
        "keywords": page["keywords"],
        "updated": "2026-06-11",
        "dataFiles": [
            "data/pages/index.json",
            f"data/pages/{page['slug']}.json",
        ],
        "api": {
            "php": f"api/pages/{page['slug']}.php",
            "python": f"backend/pages/{page['slug']}.py",
            "server": f"/api/pages/{page['slug']}",
        },
        "quiz": [
            {
                "question": f"Qual e lo scopo principale della pagina {page['title']}?",
                "answers": [
                    {"text": page["summary"], "correct": True},
                    {"text": "Sostituire le fonti con opinioni non verificate.", "correct": False},
                    {"text": "Nascondere i dati del progetto.", "correct": False},
                ],
            }
        ],
    }


def php_endpoint(name: str, data_file: str, key: str) -> str:
    return f"""<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=120');

$path = __DIR__ . '/../data/{data_file}';
if (!is_file($path)) {{
    http_response_code(404);
    echo json_encode(['ok' => false, 'error' => 'Dataset non trovato'], JSON_UNESCAPED_UNICODE);
    exit;
}}

$data = json_decode((string) file_get_contents($path), true);
echo json_encode(['ok' => true, '{key}' => $data], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
"""


def python_endpoint(name: str, data_file: str, key: str) -> str:
    return f"""#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = BASE_DIR / "data" / "{data_file}"


def get_payload() -> dict:
    return {{"ok": True, "{key}": json.loads(DATA_FILE.read_text(encoding="utf-8"))}}


if __name__ == "__main__":
    print(json.dumps(get_payload(), ensure_ascii=False, indent=2))
"""


def build_search_index(page_index: list[dict]) -> list[dict]:
    items: list[dict] = []
    for page in page_index:
        items.append(
            {
                "type": "pagina",
                "title": page.get("title", ""),
                "text": page.get("summary", ""),
                "href": page.get("file", ""),
                "tags": page.get("keywords", []),
            }
        )

    films = read_json(DATA / "films.json", [])
    if isinstance(films, list):
        for film in films:
            items.append(
                {
                    "type": "film",
                    "title": film.get("title", ""),
                    "text": f"{film.get('description', '')} {film.get('context', '')}",
                    "href": "film.html",
                    "tags": film.get("tags", []),
                }
            )

    cuisine = read_json(SITE / "cucina-data.json", {})
    recipes = cuisine.get("recipes", []) if isinstance(cuisine, dict) else []
    for recipe in recipes:
        items.append(
            {
                "type": "ricetta",
                "title": recipe.get("name", ""),
                "text": f"{recipe.get('region', '')} {recipe.get('intro', '')}",
                "href": "cucina.html",
                "tags": recipe.get("tags", []),
            }
        )

    for source in SOURCES:
        items.append(
            {
                "type": "fonte",
                "title": source["label"],
                "text": f"{source['category']} {source['note']}",
                "href": source["href"],
                "tags": [source["category"]],
            }
        )

    for period, title, text, category in TIMELINE:
        items.append(
            {
                "type": "timeline",
                "title": f"{period} - {title}",
                "text": text,
                "href": "timeline.html",
                "tags": [category],
            }
        )

    for place, role, text, category, coords in MAPS:
        items.append(
            {
                "type": "mappa",
                "title": place,
                "text": f"{role} {text} {coords}",
                "href": "mappe.html",
                "tags": [category],
            }
        )

    return items


def update_pages_index() -> list[dict]:
    for page in EXTRA_PAGES:
        payload = make_page_payload(page)
        write_json(PAGES_DATA / f"{page['slug']}.json", payload)

    ordered: list[dict] = []
    for page_file in sorted(PAGES_DATA.glob("[0-9][0-9]-*.json")):
        payload = read_json(page_file, {})
        if not isinstance(payload, dict):
            continue
        slug = str(payload.get("slug") or payload.get("id") or page_file.stem)
        title = str(payload.get("title") or payload.get("h1") or slug)
        section = str(payload.get("section") or "Studio")
        summary = str(payload.get("summary") or payload.get("description") or "")
        keywords = payload.get("keywords")
        if not isinstance(keywords, list):
            keywords = [section, title]
        if not payload.get("quiz"):
            payload["quiz"] = [
                {
                    "question": f"Qual e il punto piu importante della pagina {title}?",
                    "answers": [
                        {"text": summary or f"Studiare {title} con contesto e fonti.", "correct": True},
                        {"text": "Usare solo opinioni senza date e senza fonti.", "correct": False},
                        {"text": "Ignorare collegamenti con luoghi, persone e conseguenze.", "correct": False},
                    ],
                }
            ]
        quality = payload.get("quality")
        if isinstance(quality, dict):
            css_files = quality.get("css")
            if isinstance(css_files, list) and "styles/tools.css" not in css_files:
                css_files.append("styles/tools.css")
        write_json(page_file, payload)
        ordered.append(
            {
                "slug": slug,
                "file": str(payload.get("file") or payload.get("assets", {}).get("html") or ""),
                "title": title,
                "section": section,
                "summary": summary,
                "keywords": keywords,
                "api": f"/api/pages/{slug}",
                "updated": str(payload.get("updated") or "2026-06-11"),
            }
        )

    def page_order(item: dict) -> int:
        try:
            return int(str(item.get("slug", "99")).split("-", 1)[0])
        except ValueError:
            return 99

    ordered = sorted(ordered, key=page_order)
    index_path = PAGES_DATA / "index.json"
    write_json(index_path, ordered)
    return ordered


def write_page_wrappers() -> None:
    (API / "pages").mkdir(parents=True, exist_ok=True)
    (BACKEND / "pages").mkdir(parents=True, exist_ok=True)
    for page in EXTRA_PAGES:
        (API / "pages" / f"{page['slug']}.php").write_text(
            f"""<?php
declare(strict_types=1);
require_once __DIR__ . '/../page_common.php';
send_page('{page['slug']}');
""",
            encoding="utf-8",
        )
        (BACKEND / "pages" / f"{page['slug']}.py").write_text(
            f"""#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import json

BASE_DIR = Path(__file__).resolve().parents[2]
PAGE_FILE = BASE_DIR / "data" / "pages" / "{page['slug']}.json"


def get_page() -> dict:
    return {{"ok": True, "page": json.loads(PAGE_FILE.read_text(encoding="utf-8"))}}


if __name__ == "__main__":
    print(json.dumps(get_page(), ensure_ascii=False, indent=2))
""",
            encoding="utf-8",
        )


def write_assets() -> None:
    write_json(DATA / "sources.json", SOURCES)
    write_json(DATA / "timeline.json", [{"period": a, "title": b, "text": c, "category": d} for a, b, c, d in TIMELINE])
    write_json(DATA / "maps.json", [{"place": a, "role": b, "text": c, "category": d, "coords": e} for a, b, c, d, e in MAPS])
    write_json(DATA / "study.json", STUDY_PATHS)
    write_json(DATA / "admin-checks.json", ADMIN_CHECKS)

    page_index = update_pages_index()
    write_json(DATA / "search-index.json", build_search_index(page_index))
    write_page_wrappers()

    endpoints = [
        ("sources", "sources.json", "sources"),
        ("timeline", "timeline.json", "timeline"),
        ("maps", "maps.json", "maps"),
        ("study", "study.json", "study"),
        ("admin", "admin-checks.json", "checks"),
        ("search", "search-index.json", "items"),
    ]
    for name, data_file, key in endpoints:
        (API / f"{name}.php").write_text(php_endpoint(name, data_file, key), encoding="utf-8")
        (BACKEND / f"{name}.py").write_text(python_endpoint(name, data_file, key), encoding="utf-8")

    (SITE / "fonti.html").write_text(build_fonti(), encoding="utf-8")
    (SITE / "ricerca.html").write_text(build_ricerca(), encoding="utf-8")
    (SITE / "admin.html").write_text(build_admin(), encoding="utf-8")
    (SITE / "timeline.html").write_text(build_timeline(), encoding="utf-8")
    (SITE / "mappe.html").write_text(build_mappe(), encoding="utf-8")
    (SITE / "studio.html").write_text(build_studio(), encoding="utf-8")


def inject_once(text: str, needle: str, insert: str) -> str:
    if insert.strip() in text:
        return text
    if needle in text:
        return text.replace(needle, needle + "\n" + insert, 1)
    return text


def connect_assets() -> None:
    css_link = '  <link rel="stylesheet" href="styles/tools.css">'
    js_link = '  <script src="site-tools.js"></script>'
    for html in SITE.glob("*.html"):
        text = html.read_text(encoding="utf-8")
        if "styles/tools.css" not in text:
            if "styles/films.css" in text:
                text = inject_once(text, '<link rel="stylesheet" href="styles/films.css">', css_link)
            elif "styles/site-order.css" in text:
                text = inject_once(text, '<link rel="stylesheet" href="styles/site-order.css">', css_link)
            elif "style.css" in text:
                text = inject_once(text, '<link rel="stylesheet" href="style.css">', css_link)
        if "site-tools.js" not in text:
            if '<script src="script.js"></script>' in text:
                text = inject_once(text, '<script src="script.js"></script>', js_link)
            elif "</body>" in text:
                text = text.replace("</body>", f"{js_link}\n</body>", 1)
        html.write_text(text, encoding="utf-8")


def write_tools_css() -> None:
    STYLES.mkdir(parents=True, exist_ok=True)
    (STYLES / "tools.css").write_text(
        """html {
  scroll-behavior: smooth;
}

body:has(.tool-hero) {
  background: #f7f9fc;
}

:focus-visible {
  outline: 3px solid #ffd34d;
  outline-offset: 3px;
}

.skip-link {
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 9999;
  transform: translateY(-160%);
  border-radius: 6px;
  background: #111827;
  color: #fff;
  padding: .65rem .85rem;
  text-decoration: none;
}

.skip-link:focus {
  transform: translateY(0);
}

.tool-hero {
  background: linear-gradient(135deg, #0f172a 0%, #17415f 45%, #f4c542 100%);
  color: #fff;
  padding: clamp(3rem, 7vw, 6rem) 0 clamp(2rem, 5vw, 4rem);
}

.tool-hero h1 {
  max-width: 850px;
  margin: .3rem 0 1rem;
  font-size: clamp(2.15rem, 6vw, 4.4rem);
  line-height: 1;
}

.tool-hero p {
  max-width: 780px;
  color: rgba(255, 255, 255, .86);
  font-size: 1.08rem;
}

.tool-hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: .75rem;
  max-width: 760px;
  margin-top: 1.5rem;
}

.tool-hero-stats article,
.admin-metrics article {
  border: 1px solid rgba(255, 255, 255, .25);
  border-radius: 8px;
  padding: 1rem;
  background: rgba(255, 255, 255, .1);
}

.tool-hero-stats strong,
.admin-metrics strong {
  display: block;
  font-size: 1.55rem;
}

.tool-section {
  padding: clamp(2rem, 5vw, 4.5rem) 0;
}

.tool-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: .55rem;
  margin-bottom: 1.25rem;
}

.tool-toolbar button,
.search-panel select,
.search-panel input,
.study-quiz button {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  color: #102033;
  padding: .75rem .95rem;
}

.tool-toolbar button.active,
.study-quiz button.is-correct {
  border-color: #17415f;
  background: #17415f;
  color: #fff;
}

.study-quiz button.is-wrong {
  border-color: #b91c1c;
  background: #fee2e2;
}

.tool-grid,
.map-grid,
.study-grid,
.admin-checks,
.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.tool-card,
.study-card,
.admin-check {
  border: 1px solid #d8e0ea;
  border-radius: 8px;
  background: #fff;
  padding: 1.1rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, .07);
}

.tool-card[hidden] {
  display: none;
}

.tool-card span,
.study-card span,
.admin-check span,
.study-quiz span {
  display: inline-flex;
  width: fit-content;
  border-radius: 999px;
  background: #e0f2fe;
  color: #075985;
  padding: .22rem .6rem;
  font-size: .78rem;
  font-weight: 700;
}

.tool-card h2,
.study-card h2 {
  margin: .75rem 0 .5rem;
  font-size: 1.24rem;
}

.tool-card a,
.study-card a,
.search-result a {
  color: #0f5f94;
  font-weight: 700;
  text-decoration-thickness: 2px;
}

.search-panel {
  display: grid;
  grid-template-columns: 1fr 190px;
  gap: .75rem;
  margin-bottom: 1rem;
}

.search-panel label {
  grid-column: 1 / -1;
  font-weight: 800;
}

.search-panel input {
  min-width: 0;
}

.search-result {
  border-left: 4px solid #17415f;
}

.admin-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.admin-metrics article {
  background: #102033;
  color: #fff;
}

.admin-check.ok span {
  background: #dcfce7;
  color: #166534;
}

.admin-check.attenzione span {
  background: #fef3c7;
  color: #92400e;
}

.timeline-list {
  display: grid;
  gap: .9rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: minmax(120px, 180px) 1fr auto;
  gap: 1rem;
  align-items: start;
}

.timeline-item time {
  font-weight: 900;
  color: #17415f;
}

.timeline-item h2 {
  margin: 0;
}

.map-card small {
  display: block;
  color: #64748b;
  font-weight: 700;
}

.study-card div {
  display: flex;
  flex-wrap: wrap;
  gap: .45rem;
}

.study-card a {
  border: 1px solid #d8e0ea;
  border-radius: 6px;
  padding: .35rem .55rem;
  text-decoration: none;
}

.study-quiz {
  margin-top: 1.25rem;
  border: 1px solid #d8e0ea;
  border-radius: 8px;
  background: #fff;
  padding: 1.2rem;
}

.study-quiz button {
  display: block;
  width: 100%;
  margin-top: .55rem;
  text-align: left;
}

.page-quick-quiz {
  border-top: 1px solid #d8e0ea;
  background: #eef6ff;
  padding: clamp(1.5rem, 4vw, 3rem) 0;
}

.quick-quiz-box {
  max-width: 900px;
  border-radius: 8px;
  background: #fff;
  padding: 1rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, .08);
}

.quick-quiz-box button {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  margin: .35rem .35rem 0 0;
  padding: .65rem .85rem;
}

.quick-quiz-box button.is-correct {
  background: #17415f;
  color: #fff;
}

.quick-quiz-box button.is-wrong {
  background: #fee2e2;
}

@media (max-width: 700px) {
  .search-panel {
    grid-template-columns: 1fr;
  }

  .timeline-item {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
""",
        encoding="utf-8",
    )


def write_tools_js() -> None:
    (SITE / "site-tools.js").write_text(
        """(() => {
  const currentFile = (window.location.pathname.split("/").pop() || "Main.html").toLowerCase();

  function addSkipLink() {
    if (document.querySelector(".skip-link")) return;
    const main = document.querySelector("main") || document.body;
    if (!main.id) main.id = "contenuto";
    const link = document.createElement("a");
    link.className = "skip-link";
    link.href = `#${main.id}`;
    link.textContent = "Salta al contenuto";
    document.body.prepend(link);
  }

  async function loadJson(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(path);
    return response.json();
  }

  function setupToolFilters() {
    document.querySelectorAll("[data-tool-filters]").forEach((toolbar) => {
      const scope = toolbar.closest(".tool-section") || document;
      const cards = Array.from(scope.querySelectorAll("[data-tool-card]"));
      toolbar.addEventListener("click", (event) => {
        const button = event.target.closest("[data-tool-filter]");
        if (!button) return;
        const filter = button.dataset.toolFilter;
        toolbar.querySelectorAll("[data-tool-filter]").forEach((item) => item.classList.toggle("active", item === button));
        cards.forEach((card) => {
          card.hidden = filter !== "all" && card.dataset.category !== filter;
        });
      });
    });
  }

  async function setupSearchPage() {
    const page = document.querySelector("[data-search-page]");
    if (!page) return;
    const input = page.querySelector("#globalSearch");
    const type = page.querySelector("#globalSearchType");
    const output = page.querySelector("[data-search-results]");
    const items = await loadJson("data/search-index.json");

    const render = () => {
      const q = input.value.trim().toLowerCase();
      const selected = type.value;
      const results = items
        .filter((item) => selected === "all" || item.type === selected)
        .filter((item) => {
          if (!q) return true;
          return `${item.title} ${item.text} ${(item.tags || []).join(" ")}`.toLowerCase().includes(q);
        })
        .slice(0, 48);

      output.innerHTML = results.map((item) => `
        <article class="tool-card search-result">
          <span>${item.type}</span>
          <h2>${item.title}</h2>
          <p>${item.text}</p>
          <a href="${item.href}">Apri</a>
        </article>
      `).join("") || `<article class="tool-card"><h2>Nessun risultato</h2><p>Prova una parola piu generale o cambia filtro.</p></article>`;
    };

    input.addEventListener("input", render);
    type.addEventListener("change", render);
    render();
  }

  async function setupAdmin() {
    const page = document.querySelector("[data-admin-dashboard]");
    if (!page) return;
    const metrics = page.querySelector("[data-admin-metrics]");
    const [pages, films, sources, cuisine] = await Promise.all([
      loadJson("data/pages/index.json"),
      loadJson("data/films.json"),
      loadJson("data/sources.json"),
      loadJson("cucina-data.json").catch(() => ({ recipes: [] }))
    ]);
    const recipeCount = Array.isArray(cuisine.recipes) ? cuisine.recipes.length : 0;
    metrics.innerHTML = `
      <article><strong>${pages.length}</strong><span>Pagine indicizzate</span></article>
      <article><strong>${films.length}</strong><span>Film</span></article>
      <article><strong>${sources.length}</strong><span>Fonti</span></article>
      <article><strong>${recipeCount}</strong><span>Ricette</span></article>
    `;
  }

  function setupStudyQuiz() {
    document.querySelectorAll("[data-study-quiz], .quick-quiz-box").forEach((quiz) => {
      quiz.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-correct]");
        if (!button) return;
        quiz.querySelectorAll("button[data-correct]").forEach((item) => {
          item.classList.remove("is-correct", "is-wrong");
        });
        const ok = button.dataset.correct === "true";
        button.classList.add(ok ? "is-correct" : "is-wrong");
        const result = quiz.querySelector("p:last-child");
        if (result) result.textContent = ok ? "Corretto." : "Non ancora: controlla la pagina fonti o il percorso.";
      });
    });
  }

  async function injectQuickQuiz() {
    if (document.querySelector(".page-quick-quiz")) return;
    const index = await loadJson("data/pages/index.json").catch(() => []);
    const page = index.find((entry) => (entry.file || "").toLowerCase() === currentFile);
    if (!page) return;
    const data = await loadJson(`data/pages/${page.slug}.json`).catch(() => null);
    const quiz = data && data.quiz && data.quiz[0];
    if (!quiz) return;
    const target = document.querySelector(".site-footer") || document.body.lastElementChild;
    const section = document.createElement("section");
    section.className = "page-quick-quiz";
    section.innerHTML = `
      <div class="container">
        <div class="quick-quiz-box">
          <span class="section-kicker">Verifica dati</span>
          <h2>${quiz.question}</h2>
          ${quiz.answers.map((answer) => `<button type="button" data-correct="${answer.correct}">${answer.text}</button>`).join("")}
          <p>Scegli una risposta.</p>
        </div>
      </div>
    `;
    if (target && target.parentNode) target.parentNode.insertBefore(section, target);
    setupStudyQuiz();
  }

  addSkipLink();
  setupToolFilters();
  setupSearchPage().catch(() => {});
  setupAdmin().catch(() => {});
  setupStudyQuiz();
  injectQuickQuiz().catch(() => {});
})();
""",
        encoding="utf-8",
    )


def write_backend_server() -> None:
    (BACKEND / "site_backend.py").write_text(
        """#!/usr/bin/env python3
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
    print("Serving Skyy History on http://127.0.0.1:8087/Main.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\\nStopping server")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
""",
        encoding="utf-8",
    )


def main() -> None:
    write_assets()
    write_tools_css()
    write_tools_js()
    write_backend_server()
    connect_assets()
    print(f"Extended Skyy History features built on {date.today().isoformat()}")


if __name__ == "__main__":
    main()
