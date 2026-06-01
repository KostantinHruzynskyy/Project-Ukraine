const root = document.documentElement;

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    return false;
  }

  return true;
}

function setupGlobalNavbar() {
  const nav = document.querySelector(".war-navbar");

  if (!nav) {
    return;
  }

  const currentFile = window.location.pathname.split("/").pop() || "Main.html";
  const isMainPage = currentFile.toLowerCase() === "main.html" || currentFile === "";
  const homeAnchor = (id) => isMainPage ? `#${id}` : `Main.html#${id}`;
  const eventPages = [
    "holodomor.html",
    "babyn-yar.html",
    "tatari-crimea.html",
    "chernobyl.html",
    "indipendenza.html",
    "euromaidan.html",
    "crimea-donbas.html",
    "invasione-2022.html",
    "bucha.html",
    "mariupol.html"
  ];
  const guerraPages = ["battaglie.html", "atrocita.html", "difesa.html"];
  const risorsePages = ["museo.html", "dossier.html"];

  nav.className = "navbar navbar-expand-lg war-navbar sticky-top";
  nav.setAttribute("data-bs-theme", "dark");
  nav.innerHTML = `
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="${homeAnchor("inizio")}">
        <span class="brand-mark">SH</span>
        Skyy History
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#skyyNavbar" aria-controls="skyyNavbar" aria-expanded="false" aria-label="Apri menu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="skyyNavbar">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
          <li class="nav-item">
            <a class="nav-link" href="${homeAnchor("inizio")}" data-nav-section="home">Inizio</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="${homeAnchor("eventi")}" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-nav-section="eventi">Eventi</a>
            <ul class="dropdown-menu dropdown-menu-dark history-dropdown">
              <li><a class="dropdown-item" href="holodomor.html">Holodomor</a></li>
              <li><a class="dropdown-item" href="babyn-yar.html">Babyn Yar</a></li>
              <li><a class="dropdown-item" href="tatari-crimea.html">Tatari di Crimea</a></li>
              <li><a class="dropdown-item" href="chernobyl.html">Chernobyl</a></li>
              <li><a class="dropdown-item" href="indipendenza.html">Indipendenza</a></li>
              <li><a class="dropdown-item" href="euromaidan.html">Euromaidan</a></li>
              <li><a class="dropdown-item" href="crimea-donbas.html">Crimea e Donbas</a></li>
              <li><a class="dropdown-item" href="invasione-2022.html">Invasione 2022</a></li>
              <li><a class="dropdown-item" href="bucha.html">Bucha</a></li>
              <li><a class="dropdown-item" href="mariupol.html">Mariupol</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="${homeAnchor("invasore")}" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-nav-section="guerra">Guerra</a>
            <ul class="dropdown-menu dropdown-menu-dark history-dropdown">
              <li><a class="dropdown-item" href="battaglie.html">Battaglie</a></li>
              <li><a class="dropdown-item" href="atrocita.html">Atrocita</a></li>
              <li><a class="dropdown-item" href="difesa.html">Difesa ucraina</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("forze-ucraine")}">Forze ed eroi</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("alleati")}">Paesi solidali</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("invasore")}">Russia invasore</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("armi")}">Armi usate</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="${homeAnchor("impara")}" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-nav-section="studio">Studio</a>
            <ul class="dropdown-menu dropdown-menu-dark history-dropdown">
              <li><a class="dropdown-item" href="${homeAnchor("impara")}">Impara</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("atlante-ucraina")}">Atlante Ucraina</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("enciclopedia-ucraina")}">Enciclopedia Ucraina</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("cronologia-civile")}">Cronologia civile</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("storia-ucraina")}">Storia dell'Ucraina</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("identita")}">Identita e cultura</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("potenza-culturale")}">Potenza culturale</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("film")}">Film e documentari</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="${homeAnchor("mappe")}" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-nav-section="risorse">Risorse</a>
            <ul class="dropdown-menu dropdown-menu-dark history-dropdown">
              <li><a class="dropdown-item" href="${homeAnchor("mappe")}">Mappe emotive</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("documenti")}">Documenti e prove</a></li>
              <li><a class="dropdown-item" href="dossier.html">Dossier totale</a></li>
              <li><a class="dropdown-item" href="museo.html">Museo interattivo</a></li>
              <li><a class="dropdown-item" href="${homeAnchor("esplora")}">Esplora</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="btn history-btn ms-lg-3 px-3" href="${homeAnchor("esplora")}">Esplora</a>
          </li>
          <li class="nav-item">
            <select class="language-select" id="languageSelect" aria-label="Lingua">
              <option value="it">Italiano</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="es">Español</option>
              <option value="uk">Українська</option>
              <option value="zh-CN">中文</option>
              <option value="hi">हिन्दी</option>
              <option value="ru">Русский</option>
              <option value="pl">Polski</option>
              <option value="ar">العربية</option>
              <option value="pt">Português</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  `;

  if (isMainPage) {
    nav.querySelector('[data-nav-section="home"]')?.classList.add("active");
    return;
  }

  if (eventPages.includes(currentFile)) {
    nav.querySelector('[data-nav-section="eventi"]')?.classList.add("active");
  } else if (guerraPages.includes(currentFile)) {
    nav.querySelector('[data-nav-section="guerra"]')?.classList.add("active");
  } else if (risorsePages.includes(currentFile)) {
    nav.querySelector('[data-nav-section="risorse"]')?.classList.add("active");
  }

  nav.querySelectorAll(".dropdown-item, .nav-link").forEach((link) => {
    const hrefFile = link.getAttribute("href")?.split("#")[0];

    if (hrefFile === currentFile) {
      link.classList.add("active");
    }
  });
}

setupGlobalNavbar();

function setupGlobalFooter() {
  if (document.querySelector(".site-footer")) {
    return;
  }

  const currentFile = window.location.pathname.split("/").pop() || "Main.html";
  const isMainPage = currentFile.toLowerCase() === "main.html" || currentFile === "";
  const homeAnchor = (id) => isMainPage ? `#${id}` : `Main.html#${id}`;
  const footer = document.createElement("footer");

  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <section class="footer-brand">
          <a class="navbar-brand d-flex align-items-center mb-3" href="${homeAnchor("inizio")}">
            <span class="brand-mark">SH</span>
            Skyy History
          </a>
          <p>Archivio storico interattivo sull'Ucraina: memoria, guerra, cultura, resistenza, prove e luoghi simbolici.</p>
          <div class="footer-motto">
            <strong>Слава Україні! Героям слава!</strong>
            <span>Gloria all'Ucraina. Gloria agli eroi.</span>
          </div>
        </section>

        <section>
          <h2>Esplora</h2>
          <a href="${homeAnchor("eventi")}">Eventi chiave</a>
          <a href="${homeAnchor("atlante-ucraina")}">Atlante Ucraina</a>
          <a href="${homeAnchor("enciclopedia-ucraina")}">Enciclopedia Ucraina</a>
          <a href="${homeAnchor("forze-ucraine")}">Forze ed eroi</a>
          <a href="${homeAnchor("alleati")}">Paesi solidali</a>
          <a href="${homeAnchor("mappe")}">Mappe emotive</a>
          <a href="${homeAnchor("armi")}">Armi usate</a>
          <a href="${homeAnchor("film")}">Film e documentari</a>
          <a href="${homeAnchor("potenza-culturale")}">Potenza culturale</a>
          <a href="${homeAnchor("documenti")}">Documenti e prove</a>
        </section>

        <section>
          <h2>Pagine</h2>
          <a href="battaglie.html">Battaglie</a>
          <a href="atrocita.html">Atrocita</a>
          <a href="difesa.html">Difesa ucraina</a>
          <a href="dossier.html">Dossier totale</a>
          <a href="museo.html">Museo interattivo</a>
        </section>

        <section>
          <h2>Eventi</h2>
          <a href="holodomor.html">Holodomor</a>
          <a href="babyn-yar.html">Babyn Yar</a>
          <a href="chernobyl.html">Chernobyl</a>
          <a href="euromaidan.html">Euromaidan</a>
          <a href="invasione-2022.html">Invasione 2022</a>
          <a href="mariupol.html">Mariupol</a>
        </section>

        <section>
          <h2>Fonti</h2>
          <a href="https://ukraine.ohchr.org/en/reports">OHCHR</a>
          <a href="https://www.hrw.org/europe/central-asia/ukraine">Human Rights Watch</a>
          <a href="https://www.pbs.org/wgbh/frontline/">FRONTLINE</a>
          <a href="https://www.encyclopediaofukraine.com/">Internet Encyclopedia of Ukraine</a>
          <a href="https://esu.com.ua/en/about/overview">Encyclopedia of Modern Ukraine</a>
          <a href="https://uinp.gov.ua/">Ukrainian Institute of National Memory</a>
          <a href="https://insight.ui.org.ua/">Insight UA</a>
          <a href="https://ui.org.ua/en/news-en/insight-ua-platform-to-explore-ukrainian-culture-2/">Ukrainian Institute - Insight UA</a>
          <a href="https://ich.unesco.org/en/USL/01852">UNESCO - borshch</a>
          <a href="https://www.britannica.com/place/Ukraine">Britannica Ukraine</a>
          <a href="https://deepstatemap.live/en">DeepStateMAP</a>
          <a href="https://commons.wikimedia.org/">Wikimedia Commons</a>
        </section>
      </div>

      <div class="footer-info">
        <div>
          <h2>Nota storica</h2>
          <p>Il sito racconta la Russia come stato invasore nella guerra contro l'Ucraina. Le critiche riguardano l'aggressione militare, non un popolo intero.</p>
        </div>
        <div>
          <h2>Uso didattico</h2>
          <p>Materiale creato per studio, memoria e orientamento. Le mappe sono interpretative e non sostituiscono fonti live o rapporti ufficiali.</p>
        </div>
        <div>
          <h2>Lingue</h2>
          <p>Usa il selettore in alto per tradurre il sito in italiano, inglese, francese, tedesco, spagnolo, ucraino, cinese, hindi, russo, polacco, arabo e portoghese.</p>
        </div>
      </div>

      <div class="footer-bottom">
        <span>Skyy History - Archivio interattivo Ucraina</span>
        <span>Ultimo aggiornamento contenuti: 2026</span>
        <a href="${homeAnchor("inizio")}">Torna su</a>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}

setupGlobalFooter();

function setupUkraineKnowledgePanel() {
  if (document.querySelector(".ukraine-global-section")) {
    return;
  }

  const currentFile = window.location.pathname.split("/").pop() || "Main.html";
  const isMainPage = currentFile.toLowerCase() === "main.html" || currentFile === "";
  const homeAnchor = (id) => isMainPage ? `#${id}` : `Main.html#${id}`;
  const section = document.createElement("section");

  section.className = "ukraine-global-section page-band";
  section.innerHTML = `
    <div class="container">
      <div class="row align-items-end mb-4 reveal">
        <div class="col-lg-8">
          <p class="section-kicker mb-2">Scheda rapida su tutta l'Ucraina</p>
          <h2 class="display-6 mb-3">Storia, lingua, cultura, guerra e futuro</h2>
        </div>
        <div class="col-lg-4">
          <p class="section-text">Questo riepilogo appare in tutte le pagine per collegare ogni evento al quadro completo del paese.</p>
        </div>
      </div>

      <div class="global-ukraine-grid">
        <article class="global-ukraine-card reveal">
          <span>Paese</span>
          <h3>Kyiv, Dnipro, Mar Nero</h3>
          <p>Ucraina è uno stato europeo con capitale Kyiv, grandi regioni agricole, città industriali, porti strategici e una storia legata a confini contesi.</p>
        </article>
        <article class="global-ukraine-card reveal">
          <span>Lingua</span>
          <h3>Українська</h3>
          <p>L'ucraino è lingua ufficiale, letteraria e civile. Dopo secoli di russificazione, usarlo significa difendere memoria e autonomia culturale.</p>
        </article>
        <article class="global-ukraine-card reveal">
          <span>Autori</span>
          <h3>Shevchenko, Ukrainka, Stus, Zhadan</h3>
          <p>Poeti e scrittori sono parte della coscienza nazionale: raccontano libertà, repressione, città orientali, guerra, ironia e dignità.</p>
        </article>
        <article class="global-ukraine-card reveal">
          <span>Musica</span>
          <h3>Bandura, DakhaBrakha, Jamala, Go_A</h3>
          <p>La musica va dai kobzari alla scena elettronica e pop: folklore, jazz, rap, Eurovision e concerti al fronte diventano diplomazia culturale.</p>
        </article>
        <article class="global-ukraine-card reveal">
          <span>Cultura</span>
          <h3>Borshch, vyshyvanka, pysanky</h3>
          <p>Cibo, ricami, uova decorate, teatro, cinema, libri e musei tengono insieme famiglia, territorio e identità anche durante la guerra.</p>
        </article>
        <article class="global-ukraine-card reveal">
          <span>Guerra</span>
          <h3>Russia invasore, società resistente</h3>
          <p>Dal 2014 e soprattutto dal 2022 la difesa riguarda territorio, civili, infrastrutture, prove dei crimini, ricostruzione e futuro europeo.</p>
        </article>
      </div>

      <div class="global-ukraine-actions reveal">
        <a class="history-btn" href="${homeAnchor("atlante-ucraina")}">Apri atlante</a>
        <a class="history-btn" href="${homeAnchor("enciclopedia-ucraina")}">Enciclopedia</a>
        <a class="history-btn" href="dossier.html">Dossier totale</a>
        <a class="history-btn" href="${homeAnchor("potenza-culturale")}">Cultura e autori</a>
      </div>
    </div>
  `;

  const footer = document.querySelector(".site-footer");

  if (footer) {
    document.body.insertBefore(section, footer);
    return;
  }

  document.body.appendChild(section);
}

setupUkraineKnowledgePanel();

const pageDeepDives = {
  "main.html": {
    eyebrow: "Percorso guidato",
    title: "Come scoprire il progetto senza perdersi",
    intro: "La home è pensata come una mappa: parte dal paese reale, poi entra nella guerra, nella cultura, nelle prove e nella memoria. Usala come porta d'ingresso prima del dossier.",
    tabs: [
      {
        label: "Metodo",
        title: "Leggere per strati",
        text: "Prima geografia e lingua, poi cronologia, poi eventi. Questo evita di ridurre l'Ucraina a una sola data o a una sola battaglia.",
        items: ["Atlante Ucraina", "Cronologia civile", "Eventi chiave", "Dossier e fonti"]
      },
      {
        label: "Cultura",
        title: "Non solo guerra",
        text: "Autori, musica, cucina, cinema e città mostrano una società viva che resiste anche quando le infrastrutture vengono colpite.",
        items: ["Lingua ucraina", "Scrittori", "Musica contemporanea", "Tradizioni"]
      },
      {
        label: "Prove",
        title: "Separare memoria e propaganda",
        text: "Le pagine sulle atrocità rimandano a rapporti e indagini: la memoria è più forte quando resta verificabile.",
        items: ["OHCHR", "Human Rights Watch", "FRONTLINE/AP", "Wikimedia Commons per immagini"]
      }
    ],
    cards: [
      ["Atlante", "Ucraina come paese", "Capitale, regioni, lingua, città, minoranze, economia e geografia fisica."],
      ["Guerra", "Dal 2014 al 2022", "Crimea, Donbas, invasione totale, fronti, civili, energia e logoramento."],
      ["Cultura", "Una nazione che crea", "Libri, musica, cinema, cucina, teatro, tecnologia e memoria familiare."],
      ["Studio", "Come verificare", "Ogni tema importante va collegato a fonti, mappe, testimonianze e date precise."]
    ],
    quiz: {
      question: "Qual è il modo migliore per iniziare a studiare il sito?",
      answers: [
        ["Partire solo dalle armi", false],
        ["Seguire atlante, cronologia, eventi e fonti", true],
        ["Leggere solo i film consigliati", false]
      ]
    },
    sources: [
      ["Britannica - Ukraine", "https://www.britannica.com/place/Ukraine"],
      ["Ukrainian Institute - Insight UA", "https://ui.org.ua/en/news-en/insight-ua-platform-to-explore-ukrainian-culture-2/"],
      ["UNESCO - Ukrainian borscht", "https://ich.unesco.org/en/USL/01852"]
    ]
  },
  "holodomor.html": {
    eyebrow: "Approfondimento storico",
    title: "Holodomor: fame, potere sovietico e memoria nazionale",
    intro: "Il termine Holodomor indica la carestia forzata che colpì l'Ucraina sovietica nel 1932-1933. Non è solo una tragedia agricola: riguarda potere, requisizioni, repressione della cultura ucraina e memoria negata.",
    tabs: [
      {
        label: "Cause",
        title: "Collettivizzazione e requisizioni",
        text: "La politica sovietica impose collettivizzazione, consegne obbligatorie di grano e controllo sui villaggi. Quando la fame esplose, la possibilità di muoversi e cercare cibo fu limitata.",
        items: ["Campagne sotto pressione", "Grano requisito", "Confini interni controllati", "Silenzio pubblico"]
      },
      {
        label: "Vittime",
        title: "Una fame che colpì famiglie e villaggi",
        text: "La fame distrusse reti familiari, scuola, lavoro agricolo e comunità. Per questo la memoria dell'Holodomor è legata anche alla difesa della dignità contadina.",
        items: ["Villaggi svuotati", "Bambini orfani", "Memoria familiare", "Trauma intergenerazionale"]
      },
      {
        label: "Memoria",
        title: "Perché ricordarlo oggi",
        text: "Ricordare l'Holodomor significa riconoscere una violenza politica e proteggere il diritto degli ucraini a raccontare la propria storia.",
        items: ["Musei", "Giornate della memoria", "Archivi", "Testimonianze"]
      }
    ],
    cards: [
      ["Parola", "Holodomor", "Deriva da parole ucraine legate alla fame e alla morte: una parola nata per nominare un trauma storico."],
      ["Contesto", "URSS e campagna", "La carestia si inserisce nelle politiche staliniane di controllo economico e politico."],
      ["Cultura", "Lingua e verità", "La memoria dell'Holodomor è collegata alla lotta contro la cancellazione della cultura ucraina."],
      ["Studio", "Cosa confrontare", "Statistiche, testimonianze, ordini politici, mappe regionali e propaganda sovietica."]
    ],
    quiz: {
      question: "Perché l'Holodomor è centrale nella memoria ucraina?",
      answers: [
        ["Perché riguarda solo il clima", false],
        ["Perché collega fame, potere politico e cancellazione della verità", true],
        ["Perché fu un evento medievale", false]
      ]
    },
    sources: [
      ["Britannica - Holodomor", "https://www.britannica.com/event/Holodomor"],
      ["National Museum of the Holodomor-Genocide", "https://holodomormuseum.org.ua/en/"]
    ]
  },
  "babyn-yar.html": {
    eyebrow: "Shoah in Ucraina",
    title: "Babyn Yar: il massacro e la memoria difficile",
    intro: "Babyn Yar è uno dei luoghi più importanti per capire la Shoah in Ucraina. Il massacro del 29-30 settembre 1941 fu parte della violenza nazista contro gli ebrei e contro altri gruppi perseguitati.",
    tabs: [
      {
        label: "1941",
        title: "Kyiv occupata",
        text: "Dopo l'ingresso delle forze tedesche a Kyiv, gli ebrei rimasti in città furono convocati e condotti al burrone di Babyn Yar.",
        items: ["Occupazione nazista", "Ordini pubblici", "Raduno forzato", "Esecuzioni di massa"]
      },
      {
        label: "Luogo",
        title: "Un burrone trasformato in sito di sterminio",
        text: "Babyn Yar continuò a essere usato come luogo di uccisione anche dopo i due giorni più noti, colpendo ebrei, rom, prigionieri e altri civili.",
        items: ["Shoah by bullets", "Roma", "Prigionieri sovietici", "Pazienti e civili"]
      },
      {
        label: "Memoria",
        title: "Dopo la guerra",
        text: "La memoria fu a lungo incompleta o politicizzata. Oggi il luogo chiede precisione: nominare le vittime e distinguere le responsabilità.",
        items: ["Commemorazioni", "Archivi", "Testimonianze", "Educazione contro l'antisemitismo"]
      }
    ],
    cards: [
      ["Data", "29-30 settembre 1941", "Due giorni di uccisioni di massa che diventarono simbolo della Shoah in Europa orientale."],
      ["Metodo", "Fucilazioni", "Nel fronte orientale la Shoah avvenne spesso tramite esecuzioni vicino alle città occupate."],
      ["Memoria", "Nominare le vittime", "La memoria storica deve distinguere ebrei, rom, prigionieri e altri gruppi colpiti."],
      ["Ucraina", "Kyiv come luogo di lutto", "Babyn Yar lega la storia della capitale alla storia europea del genocidio."]
    ],
    quiz: {
      question: "Che cosa rende Babyn Yar così importante?",
      answers: [
        ["Fu solo una battaglia militare", false],
        ["Fu un grande sito di massacro della Shoah in Ucraina", true],
        ["Riguarda solo la guerra del 2022", false]
      ]
    },
    sources: [
      ["USHMM - Babyn Yar", "https://encyclopedia.ushmm.org/content/en/article/kiev-and-babi-yar"],
      ["Britannica - Babi Yar", "https://www.britannica.com/place/Babi-Yar-massacre-site-Ukraine"]
    ]
  },
  "tatari-crimea.html": {
    eyebrow: "Crimea e deportazione",
    title: "Tatari di Crimea: patria, esilio e ritorno",
    intro: "La deportazione dei Tatari di Crimea nel maggio 1944 fu una punizione collettiva sovietica. La storia tatara collega Crimea, islam, lingua, ritorno dall'esilio e resistenza all'occupazione russa del 2014.",
    tabs: [
      {
        label: "Deportazione",
        title: "18-20 maggio 1944",
        text: "Le autorità sovietiche deportarono in massa i Tatari di Crimea verso Asia centrale e Siberia, accusandoli collettivamente di collaborazionismo.",
        items: ["Famiglie caricate sui treni", "Case perse", "Mortalità in esilio", "Cancellazione dei toponimi"]
      },
      {
        label: "Ritorno",
        title: "La lotta per tornare",
        text: "Per decenni i Tatari di Crimea chiesero il diritto al ritorno. Il rientro fu anche una ricostruzione di case, scuole, lingua e memoria.",
        items: ["Movimento nazionale", "Case ricostruite", "Moschee e scuole", "Memoria del Sürgün"]
      },
      {
        label: "Oggi",
        title: "Crimea occupata",
        text: "Dopo il 2014, molti Tatari hanno subito pressioni, arresti e nuova diaspora. La loro storia è inseparabile dalla sovranità ucraina sulla Crimea.",
        items: ["Occupazione russa", "Diritti indigeni", "Majlis", "Diaspora interna"]
      }
    ],
    cards: [
      ["Parola", "Sürgünlik", "Termine crimeano tataro legato all'esilio e alla deportazione."],
      ["Patria", "Crimea", "La penisola non è solo territorio strategico: è patria storica del popolo crimeano tataro."],
      ["Cultura", "Lingua e islam", "Moschee, lingua, cucina e tradizioni familiari sono parte della sopravvivenza culturale."],
      ["Ucraina", "Memoria condivisa", "L'Ucraina contemporanea riconosce i Tatari come popolo indigeno della Crimea."]
    ],
    quiz: {
      question: "Che cosa significa studiare i Tatari di Crimea?",
      answers: [
        ["Capire solo il turismo in Crimea", false],
        ["Capire deportazione, ritorno, diritti indigeni e occupazione", true],
        ["Ignorare la storia sovietica", false]
      ]
    },
    sources: [
      ["Britannica - Crimea History", "https://www.britannica.com/place/Crimea/History"],
      ["Mission of the President of Ukraine in Crimea", "https://ppu.gov.ua/en/press-center/on-may-18-1944-the-deportation-of-the-crimean-tatars-began/"]
    ]
  },
  "chernobyl.html": {
    eyebrow: "Tecnologia, rischio, verità",
    title: "Chernobyl: disastro nucleare e crisi della fiducia sovietica",
    intro: "Il 26 aprile 1986 il reattore 4 della centrale di Chornobyl esplose durante un test. L'incidente produsse contaminazione, evacuazioni e una crisi di fiducia verso il sistema sovietico.",
    tabs: [
      {
        label: "Incidente",
        title: "Test, perdita di controllo, esplosione",
        text: "Durante un test a bassa potenza, il reattore andò fuori controllo. Esplosione e incendio liberarono materiale radioattivo nell'atmosfera.",
        items: ["Reattore 4", "Test di sicurezza", "Incendio", "Radiazioni"]
      },
      {
        label: "Civili",
        title: "Evacuazione e zona di esclusione",
        text: "Pripyat e altre comunità furono evacuate. La vita quotidiana fu trasformata da misure sanitarie, paura e perdita della casa.",
        items: ["Pripyat", "Liquidatori", "Contaminazione", "Trauma"]
      },
      {
        label: "Lezione",
        title: "Trasparenza e responsabilità",
        text: "Chernobyl mostra perché informazione pubblica, sicurezza tecnica e fiducia nelle istituzioni sono essenziali.",
        items: ["Verità scientifica", "Protezione civile", "Monitoraggio", "Memoria ambientale"]
      }
    ],
    cards: [
      ["Luogo", "Nord dell'Ucraina", "La centrale era nell'Ucraina sovietica, vicino al confine con l'attuale Bielorussia."],
      ["Parola", "Liquidatori", "Persone impiegate per spegnere incendi, decontaminare, costruire barriere e gestire l'emergenza."],
      ["Società", "Silenzio iniziale", "La comunicazione tardiva alimentò sfiducia e memoria critica verso il sistema sovietico."],
      ["Oggi", "Infrastrutture critiche", "La guerra ha riportato attenzione sulla protezione degli impianti nucleari."]
    ],
    quiz: {
      question: "Quale lezione civile lascia Chernobyl?",
      answers: [
        ["La sicurezza dipende anche da trasparenza e responsabilità", true],
        ["Le informazioni pubbliche non servono", false],
        ["Fu un evento senza conseguenze sociali", false]
      ]
    },
    sources: [
      ["IAEA - Chornobyl", "https://www.iaea.org/topics/chornobyl"],
      ["IAEA - FAQ Chernobyl", "https://www.iaea.org/newscenter/focus/chernobyl/faqs"]
    ]
  },
  "indipendenza.html": {
    eyebrow: "Stato moderno",
    title: "Indipendenza: 1991 e il mandato popolare",
    intro: "Il 24 agosto 1991 la Verkhovna Rada proclamò l'indipendenza. Il referendum del 1 dicembre 1991 diede alla scelta una legittimità popolare decisiva.",
    tabs: [
      {
        label: "1991",
        title: "Dalla crisi sovietica allo stato",
        text: "Il crollo dell'URSS aprì lo spazio politico per una scelta già radicata nella storia ucraina: esistere come stato indipendente.",
        items: ["24 agosto", "1 dicembre", "Presidenza", "Riconoscimento internazionale"]
      },
      {
        label: "Sovranità",
        title: "Confini, lingua, istituzioni",
        text: "Indipendenza significa costruire governo, diplomazia, esercito, moneta, scuola, lingua pubblica e memoria condivisa.",
        items: ["Verkhovna Rada", "Costituzione", "Lingua ufficiale", "Politica estera"]
      },
      {
        label: "Eredità",
        title: "Perché pesa ancora",
        text: "La guerra russa mette in discussione proprio ciò che il 1991 ha confermato: il diritto degli ucraini a decidere il proprio futuro.",
        items: ["Referendum", "Budapest 1994", "Maidan", "Difesa del 2022"]
      }
    ],
    cards: [
      ["Data", "24 agosto 1991", "Atto di proclamazione dell'indipendenza."],
      ["Referendum", "1 dicembre 1991", "La scelta fu confermata dagli elettori in tutto il paese."],
      ["Tema", "Sovranità", "Significa non essere periferia di un impero, ma soggetto politico autonomo."],
      ["Memoria", "Continuità", "Il 1991 non nasce dal nulla: riprende tentativi e tradizioni precedenti."]
    ],
    quiz: {
      question: "Che cosa rende forte l'indipendenza del 1991?",
      answers: [
        ["Solo un accordo tra élite", false],
        ["La proclamazione e la conferma popolare tramite referendum", true],
        ["Una decisione militare straniera", false]
      ]
    },
    sources: [
      ["Britannica - Ukraine", "https://www.britannica.com/place/Ukraine"],
      ["CSCE - December 1, 1991", "https://www.csce.gov/articles/december-1-1991/"]
    ]
  },
  "euromaidan.html": {
    eyebrow: "Dignità e scelta europea",
    title: "Euromaidan: piazza, repressione e nuova direzione politica",
    intro: "Euromaidan iniziò nel novembre 2013 dopo il blocco dell'accordo con l'Unione Europea. La protesta diventò Rivoluzione della Dignità quando la repressione trasformò la piazza in richiesta di giustizia.",
    tabs: [
      {
        label: "Origine",
        title: "Accordo UE bloccato",
        text: "Il rifiuto del governo Yanukovych di procedere con l'accordo di associazione con l'UE fece esplodere proteste studentesche e civili.",
        items: ["Novembre 2013", "Maidan Nezalezhnosti", "Studenti", "Scelta europea"]
      },
      {
        label: "Dignità",
        title: "Quando la protesta cambia scala",
        text: "La violenza contro i manifestanti allargò il movimento: non era più solo geopolitica, ma dignità, diritti e responsabilità dello stato.",
        items: ["Barricate", "Società civile", "Heavenly Hundred", "Fuga di Yanukovych"]
      },
      {
        label: "Dopo",
        title: "La risposta russa",
        text: "Dopo Maidan, la Russia occupò e annesse illegalmente la Crimea e alimentò la guerra nel Donbas.",
        items: ["Crimea 2014", "Donbas", "Riforme", "Percorso europeo"]
      }
    ],
    cards: [
      ["Luogo", "Maidan", "Piazza dell'Indipendenza a Kyiv, trasformata in spazio politico nazionale."],
      ["Parola", "Dignità", "Il tema centrale: non solo Europa, ma diritti e limite al potere dello stato."],
      ["Memoria", "Heavenly Hundred", "Nome dato ai manifestanti uccisi durante la fase più violenta."],
      ["Conseguenza", "2014", "Maidan apre una nuova fase, subito seguita dall'aggressione russa."]
    ],
    quiz: {
      question: "Perché si parla di Rivoluzione della Dignità?",
      answers: [
        ["Perché riguardava solo il commercio", false],
        ["Perché la protesta divenne richiesta di diritti, giustizia e dignità politica", true],
        ["Perché fu una campagna militare", false]
      ]
    },
    sources: [
      ["Britannica - Euromaidan", "https://www.britannica.com/topic/Euromaidan"],
      ["Britannica - Ukraine crisis", "https://www.britannica.com/topic/Ukraine-crisis"]
    ]
  },
  "crimea-donbas.html": {
    eyebrow: "2014: la guerra prima della guerra totale",
    title: "Crimea e Donbas: occupazione, separatismo armato e confini violati",
    intro: "Nel 2014 la Russia occupò e annesse illegalmente la Crimea. Nello stesso periodo, nel Donbas esplose una guerra alimentata da forze separatiste sostenute da Mosca.",
    tabs: [
      {
        label: "Crimea",
        title: "Annessione illegale",
        text: "La Crimea fu occupata da forze russe e incorporata dalla Russia attraverso un processo non riconosciuto dall'Ucraina e da gran parte della comunità internazionale.",
        items: ["Febbraio-marzo 2014", "Forze senza insegne", "Referendum contestato", "Sanzioni"]
      },
      {
        label: "Donbas",
        title: "Guerra ibrida e fronte orientale",
        text: "Donetsk e Luhansk diventarono centro di combattimenti, propaganda e linee di contatto prima dell'invasione totale.",
        items: ["Separatisti armati", "Volontari", "Minsk", "Sfollati"]
      },
      {
        label: "Effetti",
        title: "Otto anni di guerra a bassa e media intensità",
        text: "La guerra dal 2014 al 2022 produsse vittime, sfollamento, militarizzazione e una frattura duratura nella sicurezza europea.",
        items: ["Linee di contatto", "Mine", "Famiglie divise", "Preparazione al 2022"]
      }
    ],
    cards: [
      ["Crimea", "Penisola strategica", "Porti, Mar Nero, identità tatara e basi militari rendono la Crimea centrale."],
      ["Donbas", "Industria e guerra", "Area di carbone, acciaio, città industriali e forte impatto sociale del conflitto."],
      ["Diritto", "Integrità territoriale", "Il nodo principale è la violazione dei confini ucraini riconosciuti."],
      ["Società", "Sfollati", "Milioni di vite sono state riorganizzate da occupazione, paura e perdita della casa."]
    ],
    quiz: {
      question: "Perché il 2014 è decisivo?",
      answers: [
        ["Perché la guerra russo-ucraina inizia lì nella sua fase armata moderna", true],
        ["Perché l'Ucraina smette di esistere", false],
        ["Perché non riguarda la Crimea", false]
      ]
    },
    sources: [
      ["Britannica - Ukraine crisis", "https://www.britannica.com/topic/Ukraine-crisis"],
      ["Britannica - Donbas", "https://www.britannica.com/place/Donbas"],
      ["GOV.UK - Crimea and separatist-occupied areas", "https://www.gov.uk/government/case-studies/crimea-and-separatist-occupied-areas-of-ukraine"]
    ]
  },
  "invasione-2022.html": {
    eyebrow: "Guerra totale",
    title: "24 febbraio 2022: invasione su vasta scala",
    intro: "La Russia lanciò un attacco da nord, est e sud, ampliando la guerra iniziata nel 2014. L'obiettivo iniziale includeva pressione sulla capitale e collasso politico dell'Ucraina.",
    tabs: [
      {
        label: "Assalto",
        title: "Più direttrici di invasione",
        text: "Le forze russe avanzarono da Russia, Bielorussia, Crimea occupata e Donbas. Kyiv, Kharkiv, Chernihiv, Sumy, Mariupol e il sud furono colpiti.",
        items: ["Nord", "Est", "Sud", "Attacchi missilistici"]
      },
      {
        label: "Difesa",
        title: "Lo stato non crolla",
        text: "Forze armate, difesa territoriale, volontari, medici, ferrovieri e società civile impedirono il collasso iniziale.",
        items: ["Kyiv resiste", "Mobilitazione", "Volontariato", "Comunicazione pubblica"]
      },
      {
        label: "Guerra lunga",
        title: "Dal blitz fallito al logoramento",
        text: "Dopo il fallimento dell'offensiva su Kyiv, la guerra si concentrò su Donbas, sud, energia, droni, artiglieria e infrastrutture.",
        items: ["Mariupol", "Kharkiv", "Kherson", "Energia"]
      }
    ],
    cards: [
      ["Data", "24 febbraio 2022", "Inizio dell'invasione su vasta scala."],
      ["Scala", "Europa", "La guerra diventa la più grande crisi militare europea da decenni."],
      ["Civili", "Profughi e sfollati", "Milioni di persone lasciano case, città e regioni sotto attacco."],
      ["Futuro", "Ricostruzione", "Difesa militare e ricostruzione civile diventano due parti dello stesso problema."]
    ],
    quiz: {
      question: "Che cosa cambia nel 2022 rispetto al 2014?",
      answers: [
        ["La guerra si allarga a invasione su vasta scala", true],
        ["La Crimea torna automaticamente libera", false],
        ["Non ci sono più civili coinvolti", false]
      ]
    },
    sources: [
      ["Britannica - Russia-Ukraine War", "https://www.britannica.com/event/Russia-Ukraine-War"],
      ["OHCHR Ukraine reports", "https://ukraine.ohchr.org/en/reports"]
    ]
  },
  "bucha.html": {
    eyebrow: "Giustizia e prove",
    title: "Bucha: civili, occupazione e documentazione dei crimini",
    intro: "Bucha fu occupata durante l'offensiva russa verso Kyiv. Dopo il ritiro russo, le prove di uccisioni di civili, torture e sparizioni resero la città un simbolo della richiesta di giustizia.",
    tabs: [
      {
        label: "Occupazione",
        title: "Marzo 2022",
        text: "La città rimase sotto controllo russo durante le prime settimane della guerra totale, con civili bloccati, paura e mancanza di servizi.",
        items: ["Checkpoint", "Case perquisite", "Comunicazioni difficili", "Civili intrappolati"]
      },
      {
        label: "Prove",
        title: "Documentare, non solo raccontare",
        text: "Giornalisti, investigatori, ONG e autorità raccolsero immagini, testimonianze, resti e dati per ricostruire responsabilità.",
        items: ["Testimonianze", "Esumazioni", "Immagini satellitari", "Indagini giudiziarie"]
      },
      {
        label: "Giustizia",
        title: "Dal trauma al tribunale",
        text: "Bucha mostra perché le prove devono essere conservate: la memoria dei civili uccisi richiede responsabilità legali.",
        items: ["War crimes", "ICC", "Procure ucraine", "Memoriali"]
      }
    ],
    cards: [
      ["Luogo", "Regione di Kyiv", "Bucha si trova a nord-ovest della capitale, lungo l'asse dell'offensiva iniziale russa."],
      ["Tema", "Civili", "Il centro della pagina non è la battaglia, ma ciò che accade alla popolazione occupata."],
      ["Metodo", "Verifica", "Immagini, testimonianze e analisi indipendenti servono contro negazione e propaganda."],
      ["Memoria", "Nomi e famiglie", "Ogni numero corrisponde a persone, case, parenti e comunità spezzate."]
    ],
    quiz: {
      question: "Perché Bucha è legata alla parola giustizia?",
      answers: [
        ["Perché riguarda prove di crimini contro civili", true],
        ["Perché fu solo un simbolo sportivo", false],
        ["Perché non ci furono indagini", false]
      ]
    },
    sources: [
      ["Human Rights Watch - Bucha", "https://www.hrw.org/news/2022/04/21/ukraine-russian-forces-trail-death-bucha"],
      ["OHCHR - Killings of civilians report", "https://www.ohchr.org/sites/default/files/documents/countries/ukraine/2022/2022-12-07-OHCHR-Thematic-Report-Killings-EN.pdf"]
    ]
  },
  "mariupol.html": {
    eyebrow: "Assedio e città martire",
    title: "Mariupol: porto, assedio, teatro, Azovstal",
    intro: "Mariupol era un grande porto industriale sul Mar d'Azov. Nel 2022 l'assedio russo trasformò la città in uno dei luoghi più devastati della guerra.",
    tabs: [
      {
        label: "Città",
        title: "Porto e industria",
        text: "Mariupol era importante per acciaio, porto, accesso al Mar d'Azov e collegamento tra Donbas e Crimea occupata.",
        items: ["Mar d'Azov", "Acciaierie", "Porto", "Popolazione civile"]
      },
      {
        label: "Assedio",
        title: "Vita senza sicurezza",
        text: "Bombardamenti, mancanza di acqua, cibo, elettricità e vie sicure trasformarono la sopravvivenza quotidiana in emergenza permanente.",
        items: ["Evacuazioni difficili", "Ospedali colpiti", "Teatro", "Cimiteri improvvisati"]
      },
      {
        label: "Azovstal",
        title: "Ultima resistenza",
        text: "Le acciaierie Azovstal divennero rifugio e fortezza. Difensori e civili rimasero intrappolati in condizioni estreme.",
        items: ["Tunnel", "Feriti", "Prigionieri", "Memoria degli sfollati"]
      }
    ],
    cards: [
      ["Simbolo", "Teatro di Mariupol", "L'edificio ospitava civili; la parola 'bambini' era visibile nei pressi del teatro."],
      ["Geografia", "Corridoio sud", "Il controllo della città era cruciale per collegare Crimea occupata e Donbas."],
      ["Cultura", "Città multiculturale", "Mariupol aveva una forte storia industriale, greca, ucraina e operaia."],
      ["Memoria", "20 Days in Mariupol", "Il documentario ha portato al mondo immagini e testimonianze dall'assedio."]
    ],
    quiz: {
      question: "Perché Mariupol è così importante nel racconto della guerra?",
      answers: [
        ["Per assedio, civili, porto e resistenza di Azovstal", true],
        ["Perché non fu mai attaccata", false],
        ["Solo per motivi turistici", false]
      ]
    },
    sources: [
      ["FRONTLINE - 20 Days in Mariupol", "https://www.pbs.org/wgbh/frontline/documentary/20-days-in-mariupol/"],
      ["Amnesty - Mariupol theatre report", "https://www.amnesty.org/en/documents/eur50/5713/2022/en/"]
    ]
  },
  "battaglie.html": {
    eyebrow: "Capire il fronte",
    title: "Battaglie: non solo mappe, ma logistica, morale e civili",
    intro: "Le battaglie della guerra russo-ucraina vanno lette come combinazione di territorio, artiglieria, droni, rifornimenti, morale, difesa urbana e impatto sui civili.",
    tabs: [
      {
        label: "Nord",
        title: "Kyiv, Chernihiv, Sumy",
        text: "Nel 2022 la difesa del nord impedì la presa rapida della capitale e costrinse la Russia a ritirarsi da quell'asse.",
        items: ["Hostomel", "Irpin", "Bucha", "Chernihiv"]
      },
      {
        label: "Est",
        title: "Donbas e guerra di logoramento",
        text: "Il fronte orientale è segnato da artiglieria, trincee, città distrutte, fanteria, droni e perdite pesanti.",
        items: ["Bakhmut", "Avdiivka", "Kupyansk", "Lyman"]
      },
      {
        label: "Sud",
        title: "Kherson, Zaporizhzhia, Mar Nero",
        text: "Nel sud contano fiumi, ponti, logistica, porti, Crimea occupata e controllo delle rotte verso il Mar Nero.",
        items: ["Dnipro", "Kherson", "Nova Kakhovka", "Snake Island"]
      }
    ],
    cards: [
      ["Logistica", "Ponti e ferrovie", "Una battaglia spesso si decide sui rifornimenti prima che sulle prime linee."],
      ["Droni", "Occhi e colpi", "Droni commerciali e militari cambiano ricognizione, artiglieria e vulnerabilità."],
      ["Morale", "Simboli", "Kyiv, Snake Island, Azovstal e Kherson hanno valore militare e psicologico."],
      ["Civili", "La città come fronte", "Quando il fronte entra nelle città, case, ospedali e scuole diventano parte della crisi."]
    ],
    quiz: {
      question: "Quale fattore è decisivo oltre ai soldati in prima linea?",
      answers: [
        ["Logistica, droni, morale e protezione dei civili", true],
        ["Solo il nome della città", false],
        ["Solo i colori delle bandiere", false]
      ]
    },
    sources: [
      ["Britannica - Russia-Ukraine War", "https://www.britannica.com/event/Russia-Ukraine-War"],
      ["OSW - Kherson under Ukrainian control", "https://www.osw.waw.pl/en/publikacje/analyses/2022-11-14/kherson-under-ukrainian-control-263rd-day-war"],
      ["DeepStateMAP", "https://deepstatemap.live/en"]
    ]
  },
  "atrocita.html": {
    eyebrow: "Diritti umani e diritto di guerra",
    title: "Atrocità: categorie, prove e responsabilità",
    intro: "Le atrocità devono essere studiate con rigore: non basta indignarsi. Servono categorie legali, prove conservate, testimonianze protette e fonti indipendenti.",
    tabs: [
      {
        label: "Categorie",
        title: "Che cosa documentare",
        text: "Uccisioni di civili, torture, sparizioni, deportazioni, violenza sessuale, attacchi indiscriminati e danni a infrastrutture civili richiedono metodi diversi di prova.",
        items: ["Civili", "Detenzione", "Bombardamenti", "Deportazioni"]
      },
      {
        label: "Metodo",
        title: "Come si costruisce una prova",
        text: "Foto, video, geolocalizzazione, referti, interviste, immagini satellitari e catena di custodia servono per evitare manipolazioni.",
        items: ["Geolocalizzazione", "Testimoni", "Medici", "Archivi digitali"]
      },
      {
        label: "Giustizia",
        title: "Dalla memoria alla responsabilità",
        text: "La giustizia richiede tempo: tribunali nazionali, Corte penale internazionale, commissioni d'inchiesta e lavoro forense.",
        items: ["ICC", "OHCHR", "Procure ucraine", "ONG"]
      }
    ],
    cards: [
      ["Attenzione", "Non spettacolarizzare", "Raccontare il dolore non significa usare immagini scioccanti senza contesto."],
      ["Lessico", "Crimine di guerra", "Non ogni fatto tragico è automaticamente la stessa categoria legale: le parole contano."],
      ["Fonti", "Rapporti", "OHCHR, HRW, Amnesty, FRONTLINE/AP e tribunali aiutano a verificare."],
      ["Memoria", "Nomi e luoghi", "Le atrocità vanno collegate a persone, date, luoghi e responsabilità."]
    ],
    quiz: {
      question: "Qual è il modo corretto di studiare le atrocità?",
      answers: [
        ["Con prove, fonti e categorie precise", true],
        ["Con slogan senza verifiche", false],
        ["Ignorando le testimonianze", false]
      ]
    },
    sources: [
      ["OHCHR Ukraine reports", "https://ukraine.ohchr.org/en/reports"],
      ["Human Rights Watch Ukraine", "https://www.hrw.org/europe/central-asia/ukraine"],
      ["FRONTLINE/AP war crimes", "https://www.pbs.org/wgbh/frontline/documentary/putins-attack-on-ukraine-documenting-war-crimes/"]
    ]
  },
  "difesa.html": {
    eyebrow: "Difesa nazionale e società civile",
    title: "Difesa ucraina: esercito, territorio, tecnologia, volontari",
    intro: "La difesa ucraina non è solo un esercito: è un ecosistema fatto di forze armate, guardia nazionale, difesa territoriale, intelligence, medici, ferrovieri, volontari e tecnologia.",
    tabs: [
      {
        label: "Forze",
        title: "Struttura della difesa",
        text: "Forze Armate, Guardia Nazionale, Difesa Territoriale, Guardia di Frontiera, intelligence e servizi di emergenza lavorano in ruoli diversi.",
        items: ["Esercito", "Aeronautica", "Marina", "Guardia Nazionale"]
      },
      {
        label: "Civili",
        title: "La società come retrovia",
        text: "Volontari raccolgono fondi, riparano veicoli, evacuano anziani, portano medicinali, costruiscono reti energetiche e aiutano scuole e ospedali.",
        items: ["Evacuazioni", "Droni donati", "Generatori", "Medicina"]
      },
      {
        label: "Tecnologia",
        title: "Adattamento rapido",
        text: "Software, droni, comunicazioni, ricognizione e produzione distribuita sono diventati parte della capacità di resistere.",
        items: ["Droni FPV", "App", "OSINT", "Guerra elettronica"]
      }
    ],
    cards: [
      ["Azov", "Da battaglione a reparti riorganizzati", "La sua storia è legata al 2014, Mariupol, Azovstal e alla Guardia Nazionale."],
      ["Territoriale", "Difendere luoghi reali", "La difesa territoriale collega quartieri, città e conoscenza locale."],
      ["Medici", "Salvare sotto fuoco", "Stabilizzazione, evacuazione e riabilitazione sono decisive quanto il fronte."],
      ["Volontari", "Una rete nazionale", "La società civile riduce distanza tra retrovia e linea del fronte."]
    ],
    quiz: {
      question: "Che cosa rende particolare la difesa ucraina?",
      answers: [
        ["La combinazione di forze militari, volontariato, tecnologia e società civile", true],
        ["L'assenza di civili", false],
        ["Solo i carri armati", false]
      ]
    },
    sources: [
      ["Ministry of Defence of Ukraine", "https://www.mil.gov.ua/en/"],
      ["National Guard of Ukraine", "https://ngu.gov.ua/en/"],
      ["DeepStateMAP", "https://deepstatemap.live/en"]
    ]
  },
  "dossier.html": {
    eyebrow: "Metodo di ricerca",
    title: "Come usare il dossier come base per un progetto serio",
    intro: "Il dossier è la pagina più enciclopedica: serve per prendere appunti, collegare fonti e trasformare il sito in una presentazione o ricerca ordinata.",
    tabs: [
      {
        label: "Fonti",
        title: "Gerarchia delle fonti",
        text: "Parti da fonti istituzionali e rapporti documentati, poi usa articoli e documentari per capire esperienze e contesto.",
        items: ["ONU/OHCHR", "Britannica", "Ukrainian Institute", "ONG e giornalismo verificato"]
      },
      {
        label: "Struttura",
        title: "Dal generale al particolare",
        text: "Prima il quadro paese, poi storia lunga, poi 2014, poi 2022, poi cultura e ricostruzione.",
        items: ["Geografia", "Lingua", "Storia", "Guerra e cultura"]
      },
      {
        label: "Output",
        title: "Cosa puoi costruire",
        text: "Dal dossier puoi ricavare una mappa concettuale, una timeline, una presentazione orale, una bibliografia o un percorso museale.",
        items: ["Timeline", "Schede evento", "Glossario", "Bibliografia"]
      }
    ],
    cards: [
      ["Ricerca", "Segna date e luoghi", "Ogni affermazione forte deve avere data, luogo e fonte."],
      ["Equilibrio", "Storia e presente", "Non schiacciare l'Ucraina solo sul 2022: serve storia lunga."],
      ["Cultura", "Autori e musica", "La cultura è parte della resistenza, non una decorazione finale."],
      ["Verifica", "Controlla le parole", "Invasione, occupazione, annessione, deportazione e genocidio non sono sinonimi."]
    ],
    quiz: {
      question: "A che cosa serve il dossier?",
      answers: [
        ["A sostituire tutte le fonti", false],
        ["A organizzare il lavoro e collegare fonti, storia e cultura", true],
        ["Solo a guardare immagini", false]
      ]
    },
    sources: [
      ["Britannica - Ukraine", "https://www.britannica.com/place/Ukraine"],
      ["OHCHR Ukraine reports", "https://ukraine.ohchr.org/en/reports"],
      ["Ukrainian Institute - Insight UA", "https://ui.org.ua/en/news-en/insight-ua-platform-to-explore-ukrainian-culture-2/"]
    ]
  },
  "museo.html": {
    eyebrow: "Museo interattivo",
    title: "Come leggere gli oggetti simbolici",
    intro: "Il museo usa oggetti, immagini e sale come chiavi di lettura. Ogni oggetto apre una domanda: chi lo usa, che memoria porta, che cosa rischia di essere cancellato?",
    tabs: [
      {
        label: "Sale",
        title: "Una visita in ordine",
        text: "Parti da Kyivan Rus', passa per cosacchi, tragedie, Maidan e invasione, poi chiudi con lingua, autori, musica e cibo.",
        items: ["Storia lunga", "Memorie traumatiche", "Guerra moderna", "Cultura viva"]
      },
      {
        label: "Oggetti",
        title: "Non sono decorazioni",
        text: "Bandura, vyshyvanka, pane, bandiera e libri sono oggetti che collegano quotidiano e storia nazionale.",
        items: ["Chi lo produce?", "Quando si usa?", "Che regione rappresenta?", "Che memoria conserva?"]
      },
      {
        label: "Attività",
        title: "Trasforma la visita in ricerca",
        text: "Scegli tre sale e scrivi per ognuna una data, un luogo, una persona e una fonte.",
        items: ["Data", "Luogo", "Persona", "Fonte"]
      }
    ],
    cards: [
      ["Percorso", "Dalla storia alla cultura", "La visita mostra che la guerra attacca anche biblioteche, musei, scuole e lingua."],
      ["Interazione", "Clicca le sale", "Ogni sala cambia immagine, periodo e oggetto simbolico."],
      ["Compito", "Crea una scheda", "Per ogni sala puoi creare una mini-scheda didattica."],
      ["Memoria", "Proteggere patrimonio", "Salvare cultura significa proteggere anche il futuro."]
    ],
    quiz: {
      question: "Perché un museo serve in un progetto sulla guerra?",
      answers: [
        ["Perché mostra che anche cultura e memoria sono bersagli", true],
        ["Perché sostituisce la storia", false],
        ["Perché evita le fonti", false]
      ]
    },
    sources: [
      ["Ukrainian Institute - Insight UA", "https://ui.org.ua/en/news-en/insight-ua-platform-to-explore-ukrainian-culture-2/"],
      ["UNESCO - Lesia Ukrainka", "https://www.unesco.org/en/articles/lesia-ukrainka-path-love-fight-and-hope"],
      ["UNESCO - Ukrainian borscht", "https://ich.unesco.org/en/USL/01852"]
    ]
  }
};

function setupPageDeepDive() {
  const currentFile = (window.location.pathname.split("/").pop() || "Main.html").toLowerCase();
  const data = pageDeepDives[currentFile];

  if (!data || document.querySelector(".page-deep-dive-section")) {
    return;
  }

  const slug = currentFile.replace(/[^a-z0-9]/g, "-");
  const tabs = data.tabs.map((tab, index) => `
    <button class="deep-tab${index === 0 ? " active" : ""}" type="button" data-deep-target="${slug}-${index}">
      ${tab.label}
    </button>
  `).join("");
  const panels = data.tabs.map((tab, index) => `
    <article class="deep-panel${index === 0 ? " active" : ""}" data-deep-panel="${slug}-${index}">
      <h3>${tab.title}</h3>
      <p>${tab.text}</p>
      <ul>${tab.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
  `).join("");
  const cards = data.cards.map(([kicker, title, text], index) => `
    <article class="deep-card reveal${index === 0 ? " active" : ""}" tabindex="0">
      <span>${kicker}</span>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join("");
  const answers = data.quiz.answers.map(([text, correct]) => `
    <button type="button" data-page-quiz-option data-correct="${correct}">${text}</button>
  `).join("");
  const sources = data.sources.map(([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`).join("");
  const section = document.createElement("section");

  section.className = "page-deep-dive-section page-band";
  section.innerHTML = `
    <div class="container">
      <div class="row align-items-end mb-4 reveal">
        <div class="col-lg-8">
          <p class="section-kicker mb-2">${data.eyebrow}</p>
          <h2 class="display-6 mb-3">${data.title}</h2>
        </div>
        <div class="col-lg-4">
          <p class="section-text">${data.intro}</p>
        </div>
      </div>

      <div class="deep-layout">
        <div class="deep-interactive reveal">
          <div class="deep-tabs">${tabs}</div>
          <div class="deep-panels">${panels}</div>
        </div>

        <aside class="deep-quiz reveal" data-page-quiz>
          <span>Verifica rapida</span>
          <h3>${data.quiz.question}</h3>
          <div class="quiz-options">${answers}</div>
          <p class="quiz-result">Scegli una risposta.</p>
        </aside>
      </div>

      <div class="deep-card-grid mt-4">
        ${cards}
      </div>

      <div class="deep-sources reveal mt-4">
        <strong>Fonti e piste di studio</strong>
        <div>${sources}</div>
      </div>
    </div>
  `;

  const globalPanel = document.querySelector(".ukraine-global-section");
  const footer = document.querySelector(".site-footer");
  const target = globalPanel || footer;

  if (target) {
    document.body.insertBefore(section, target);
    return;
  }

  document.body.appendChild(section);
}

setupPageDeepDive();

function setupTranslation() {
  const select = document.querySelector("#languageSelect");

  if (!select) {
    return;
  }

  const supportedLanguages = ["it", "en", "fr", "de", "es", "uk", "zh-CN", "hi", "ru", "pl", "ar", "pt"];
  const storedLanguage = safeStorageGet("skyy-language");
  const savedLanguage = supportedLanguages.includes(storedLanguage) ? storedLanguage : "it";

  if (storedLanguage && storedLanguage !== savedLanguage) {
    safeStorageSet("skyy-language", savedLanguage);
  }

  select.value = savedLanguage;
  document.documentElement.lang = savedLanguage;
  document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";

  if (!document.querySelector("#google_translate_element")) {
    const holder = document.createElement("div");
    holder.id = "google_translate_element";
    holder.setAttribute("aria-hidden", "true");
    document.body.appendChild(holder);
  }

  const loadGoogleTranslate = () => {
    if (document.querySelector("script[data-google-translate]")) {
      applyGoogleLanguage(select.value);
      return;
    }

    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement(
        {
          pageLanguage: "it",
          includedLanguages: supportedLanguages.join(","),
          autoDisplay: false
        },
        "google_translate_element"
      );

      if (select.value !== "it") {
        applyGoogleLanguage(select.value);
      }
    };

    const translateScript = document.createElement("script");
    translateScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    translateScript.dataset.googleTranslate = "true";
    document.body.appendChild(translateScript);
  };

  if (savedLanguage !== "it") {
    loadGoogleTranslate();
  }

  select.addEventListener("pointerdown", loadGoogleTranslate, { once: true, passive: true });
  select.addEventListener("focus", loadGoogleTranslate, { once: true });

  select.addEventListener("change", () => {
    const language = select.value;
    safeStorageSet("skyy-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    if (language === "it" && !document.querySelector("script[data-google-translate]")) {
      return;
    }

    if (!document.querySelector("script[data-google-translate]")) {
      loadGoogleTranslate();
      return;
    }

    applyGoogleLanguage(language);
  });
}

function applyGoogleLanguage(language, attempts = 0) {
  const combo = document.querySelector(".goog-te-combo");

  if (!combo) {
    if (attempts < 20) {
      window.setTimeout(() => applyGoogleLanguage(language, attempts + 1), 350);
    }
    return;
  }

  combo.value = language === "it" ? "" : language;
  combo.dispatchEvent(new Event("change"));
}

setupTranslation();

function setupImageFallbacks() {
  const fallbackImages = {
    default: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Ukraine.svg",
    map: "https://commons.wikimedia.org/wiki/Special:FilePath/Map%20of%20Ukraine%20simple%20blank.png",
    flag: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Ukraine.svg",
    tatarFlag: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20the%20Crimean%20Tatar%20people.svg",
    crimeaMap: "https://commons.wikimedia.org/wiki/Special:FilePath/Crimea%20in%20Ukraine.svg",
    azov: "https://commons.wikimedia.org/wiki/Special:FilePath/Soldiers%20from%20the%20Azov%20Battalion%20move%20into%20position.jpg",
    zaluzhnyi: "https://commons.wikimedia.org/wiki/Special:FilePath/Valerii%20Zaluzhnyi%20%28cropped%29.jpg",
    dmytro: "https://commons.wikimedia.org/wiki/Special:FilePath/Dmytro%20Kotsiubailo%20memorial%20service%2001.jpg",
    embroidery: "https://commons.wikimedia.org/wiki/Special:FilePath/Ukrainian%20embroidery.jpg",
    holodomor: "https://commons.wikimedia.org/wiki/Special:FilePath/HolodomorKharkiv.jpg",
    babynYar: "https://commons.wikimedia.org/wiki/Special:FilePath/Kiev%20BabiYar%20Monument%20070613.jpg",
    chernobyl: "https://commons.wikimedia.org/wiki/Special:FilePath/Chernobylreactor_1.jpg",
    kharkiv: "https://commons.wikimedia.org/wiki/Special:FilePath/Apartment%20block%20in%20Kharkiv%20damaged%20during%20Russian%20invasion%20%28cropped%29.jpg",
    kherson: "https://commons.wikimedia.org/wiki/Special:FilePath/Liberation%20of%20Kherson%20%2852493196300%29.jpg",
    snake: "https://commons.wikimedia.org/wiki/Special:FilePath/Sheets%20of%20stamp%20of%20Ukraine%2C%202022%2C%20Russian%20warship%2C%20go%20fuck%20yourself%20%281985%29.jpg",
    mariupol: "https://commons.wikimedia.org/wiki/Special:FilePath/Mariupol%20Drama%20Theatre%20Destroyed%201.jpg",
    bucha: "https://commons.wikimedia.org/wiki/Special:FilePath/Bucha%20after%20Russian%20invasion%20%282022-04-06%29%2016.jpg",
    euromaidan: "https://commons.wikimedia.org/wiki/Special:FilePath/We%27ll%20not%20retreat%21%20Euromaidan%202014%20in%20Kyiv.jpg"
  };

  const chooseFallbackFromText = (text) => {
    if (text.includes("tatar")) return fallbackImages.tatarFlag;
    if (text.includes("crimea")) return fallbackImages.crimeaMap;
    if (text.includes("map") || text.includes("mappa")) return fallbackImages.map;
    if (text.includes("flag") || text.includes("bandiera")) return fallbackImages.flag;
    if (text.includes("holodomor")) return fallbackImages.holodomor;
    if (text.includes("babi") || text.includes("babyn")) return fallbackImages.babynYar;
    if (text.includes("chernobyl") || text.includes("chornobyl")) return fallbackImages.chernobyl;
    if (text.includes("kharkiv")) return fallbackImages.kharkiv;
    if (text.includes("kherson")) return fallbackImages.kherson;
    if (text.includes("snake") || text.includes("warship") || text.includes("stamp") || text.includes("francobollo")) return fallbackImages.snake;
    if (text.includes("azov")) return fallbackImages.azov;
    if (text.includes("zaluzhnyi")) return fallbackImages.zaluzhnyi;
    if (text.includes("dmytro") || text.includes("kotsiubailo")) return fallbackImages.dmytro;
    if (text.includes("embroidery") || text.includes("ricamo")) return fallbackImages.embroidery;
    if (text.includes("mariupol")) return fallbackImages.mariupol;
    if (text.includes("bucha")) return fallbackImages.bucha;
    if (text.includes("euromaidan")) return fallbackImages.euromaidan;
    return fallbackImages.default;
  };

  const chooseFallback = (image) => {
    return chooseFallbackFromText(`${image.alt || ""} ${image.src || ""}`.toLowerCase());
  };

  const shouldUseContainFit = (text) => {
    return text.includes(".svg")
      || text.includes("flag")
      || text.includes("bandiera")
      || text.includes("map")
      || text.includes("mappa")
      || text.includes("stamp")
      || text.includes("francobollo");
  };

  const shouldFocusTop = (text) => {
    return text.includes("zaluzhnyi")
      || text.includes("dmytro")
      || text.includes("kotsiubailo")
      || text.includes("portrait")
      || text.includes("promoted");
  };

  document.querySelectorAll("img").forEach((image) => {
    if (image.dataset.performanceReady === "true") {
      return;
    }

    image.dataset.performanceReady = "true";
    const isActiveCarouselImage = Boolean(image.closest(".carousel-item.active"));

    image.loading = isActiveCarouselImage ? "eager" : "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";

    if (!image.classList.contains("ukraine-map-base") && shouldUseContainFit(`${image.alt || ""} ${image.getAttribute("src") || ""}`.toLowerCase())) {
      image.classList.add("image-contain-fit");
    }

    if (shouldFocusTop(`${image.alt || ""} ${image.getAttribute("src") || ""}`.toLowerCase())) {
      image.classList.add("image-focus-top");
    }

    if ("fetchPriority" in image) {
      image.fetchPriority = isActiveCarouselImage ? "high" : "low";
    }

    const applyFallback = () => {
      if (image.dataset.fallbackApplied === "true") {
        return;
      }

      image.dataset.fallbackApplied = "true";
      image.src = chooseFallback(image);
      image.classList.add("image-fallback-applied");
    };

    image.addEventListener("error", applyFallback, { once: true });

    if (image.complete && image.naturalWidth === 0) {
      applyFallback();
    }
  });

  document.querySelectorAll(".event-hero").forEach((hero) => {
    const imageValue = hero.style.getPropertyValue("--event-image");
    const match = imageValue.match(/url\(["']?(.+?)["']?\)/);

    if (!match) {
      return;
    }

    const testImage = new Image();
    const heroImageText = match[1].toLowerCase();

    if (shouldUseContainFit(heroImageText)) {
      hero.classList.add("event-hero--contain-image");
    }

    testImage.referrerPolicy = "no-referrer";
    testImage.onerror = () => {
      hero.style.setProperty("--event-image", `url("${chooseFallbackFromText(heroImageText)}")`);
      hero.classList.add("image-fallback-applied");
    };
    testImage.src = match[1];
  });
}

setupImageFallbacks();

const navLinks = Array.from(document.querySelectorAll(".nav-link[href^='#']"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointer = window.matchMedia("(pointer: coarse)");
const compactViewport = window.matchMedia("(max-width: 768px)");
const logicalCores = navigator.hardwareConcurrency || 8;
const canUseMotionEffects = !prefersReducedMotion.matches && !coarsePointer.matches && !compactViewport.matches && logicalCores > 4;
let activeNavigationUsesFallback = false;

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  root.style.setProperty("--scroll-progress", `${progress}%`);

  if (canUseMotionEffects) {
    root.style.setProperty("--parallax-y", `${Math.min(scrollTop * 0.12, 80)}px`);
  }
}

function setActiveLink() {
  let currentSection = null;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 120) {
      currentSection = section;
    }
  });

  if (!currentSection) {
    return;
  }

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection.id}`;
    link.classList.toggle("active", isActive);
    link.toggleAttribute("aria-current", isActive);
  });
}

function setupActiveNavigation() {
  if (!navLinks.length || !sections.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    activeNavigationUsesFallback = true;
    setActiveLink();
    return;
  }

  const linkById = new Map(
    navLinks.map((link) => [link.getAttribute("href")?.replace("#", ""), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) {
        return;
      }

      const activeLink = linkById.get(visibleEntry.target.id);

      if (!activeLink) {
        return;
      }

      navLinks.forEach((link) => {
        const isActive = link === activeLink;
        link.classList.toggle("active", isActive);
        link.toggleAttribute("aria-current", isActive);
      });
    },
    {
      rootMargin: "-18% 0px -68% 0px",
      threshold: [0.01, 0.18, 0.42]
    }
  );

  sections.forEach((section) => observer.observe(section));
  setActiveLink();
}

let hashNavigationReady = false;

function scrollToCurrentHash(behavior = "smooth") {
  const rawHash = window.location.hash.slice(1);

  if (!rawHash) {
    return;
  }

  let targetId = rawHash;

  try {
    targetId = decodeURIComponent(rawHash);
  } catch (error) {
    targetId = rawHash;
  }

  const target = document.getElementById(targetId);

  if (!target) {
    return;
  }

  window.requestAnimationFrame(() => {
    target.scrollIntoView({
      behavior: prefersReducedMotion.matches ? "auto" : behavior,
      block: "start"
    });
  });
}

function setupHashNavigation() {
  if (hashNavigationReady) {
    scrollToCurrentHash("auto");
    return;
  }

  hashNavigationReady = true;
  window.addEventListener("hashchange", () => scrollToCurrentHash("smooth"));

  if (window.location.hash) {
    window.setTimeout(() => scrollToCurrentHash("auto"), 80);
  }
}

let revealObserver = null;

function observeRevealItems(scope = document) {
  const revealItems = scope.querySelectorAll(".reveal:not(.is-visible)");

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
  }

  revealItems.forEach((item) => revealObserver.observe(item));
}

function setupRevealAnimations() {
  observeRevealItems(document);
}

window.SkyyObserveReveals = observeRevealItems;

function setupEventCards() {
  const cards = document.querySelectorAll(".event-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => item.classList.remove("is-selected"));
      card.classList.add("is-selected");
    });
  });
}

function setupMemoryTabs() {
  const tabGroups = document.querySelectorAll("[data-memory-tabs]");

  tabGroups.forEach((group) => {
    const tabs = group.querySelectorAll(".memory-tab");
    const panels = group.querySelectorAll(".memory-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((item) => item.classList.remove("active"));
        panels.forEach((panel) => panel.classList.remove("active"));

        tab.classList.add("active");
        const activePanel = group.querySelector(`#${tab.dataset.target}`);

        if (activePanel) {
          activePanel.classList.add("active");
        }
      });
    });
  });
}

function setupFrontFilters() {
  const filters = document.querySelectorAll("[data-front-filter]");
  const cards = document.querySelectorAll("[data-front]");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selected = filter.dataset.frontFilter;

      filters.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");

      cards.forEach((card) => {
        const shouldShow = selected === "all" || card.dataset.front === selected;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function setupLessonTimeline() {
  const steps = document.querySelectorAll(".lesson-step");
  const detail = document.querySelector("#lessonDetail");

  if (!steps.length || !detail) {
    return;
  }

  steps.forEach((step) => {
    step.addEventListener("click", () => {
      steps.forEach((item) => item.classList.remove("active"));
      step.classList.add("active");
      detail.innerHTML = `<span>${step.dataset.year}</span><h3>${step.dataset.title}</h3><p>${step.dataset.text}</p>`;
    });
  });
}

function setupQuiz() {
  const quiz = document.querySelector("[data-quiz]");
  const result = document.querySelector("#quizResult");

  if (!quiz || !result) {
    return;
  }

  quiz.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      quiz.querySelectorAll("button").forEach((item) => {
        item.classList.remove("correct", "wrong");
      });

      const isCorrect = button.dataset.correct === "true";
      button.classList.add(isCorrect ? "correct" : "wrong");
      result.textContent = isCorrect
        ? "Corretto: il 24 agosto 1991 viene proclamata l'indipendenza."
        : "Non proprio: quell'evento e importante, ma la risposta e 24 agosto 1991.";
    });
  });
}

function setupConceptCards() {
  const cards = document.querySelectorAll(".concept-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
    });
  });
}

function setupFilmFilters() {
  const filters = document.querySelectorAll("[data-film-filter]");
  const cards = document.querySelectorAll("[data-film]");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selected = filter.dataset.filmFilter;

      filters.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");

      cards.forEach((card) => {
        const tags = card.dataset.film.split(" ");
        const shouldShow = selected === "all" || tags.includes(selected);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function setupCivilFilters() {
  const filters = document.querySelectorAll("[data-civil-filter]");
  const events = document.querySelectorAll("[data-civil]");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selected = filter.dataset.civilFilter;

      filters.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");

      events.forEach((event) => {
        const tags = event.dataset.civil.split(" ");
        const shouldShow = selected === "all" || tags.includes(selected);
        event.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function setupWeaponFilters() {
  const filters = document.querySelectorAll("[data-weapon-filter]");
  const cards = document.querySelectorAll("[data-weapon]");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selected = filter.dataset.weaponFilter;

      filters.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");

      cards.forEach((card) => {
        const owner = card.dataset.weapon;
        const shouldShow = selected === "all" || owner === selected || owner === "both" && (selected === "ukraine" || selected === "russia");
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function setupAllyFilters() {
  const filters = document.querySelectorAll("[data-ally-filter]");
  const cards = document.querySelectorAll("[data-ally]");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selected = filter.dataset.allyFilter;

      filters.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");

      cards.forEach((card) => {
        const tags = card.dataset.ally.split(" ");
        const shouldShow = selected === "all" || tags.includes(selected);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function setupCultureFilters() {
  const filters = document.querySelectorAll("[data-culture-filter]");
  const cards = document.querySelectorAll("[data-culture]");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selected = filter.dataset.cultureFilter;

      filters.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");

      cards.forEach((card) => {
        const tags = card.dataset.culture.split(" ");
        const shouldShow = selected === "all" || tags.includes(selected);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function setupMapPins() {
  const pins = document.querySelectorAll(".map-pin");
  const mapNote = document.querySelector("#mapNote");

  pins.forEach((pin) => {
    pin.addEventListener("click", () => {
      pins.forEach((item) => item.classList.remove("active"));
      pin.classList.add("active");

      if (mapNote) {
        mapNote.innerHTML = `<strong>${pin.dataset.place}</strong><span>${pin.dataset.text}</span>`;
      }
    });
  });
}

function setupDeepDiveInteractions() {
  document.querySelectorAll(".page-deep-dive-section").forEach((section) => {
    const tabs = section.querySelectorAll(".deep-tab");
    const panels = section.querySelectorAll(".deep-panel");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((item) => item.classList.remove("active"));
        panels.forEach((panel) => panel.classList.remove("active"));

        tab.classList.add("active");
        section.querySelector(`[data-deep-panel="${tab.dataset.deepTarget}"]`)?.classList.add("active");
      });
    });

    section.querySelectorAll(".deep-card").forEach((card) => {
      const activate = () => {
        section.querySelectorAll(".deep-card").forEach((item) => item.classList.remove("active"));
        card.classList.add("active");
      };

      card.addEventListener("click", activate);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });

    const quiz = section.querySelector("[data-page-quiz]");
    const result = quiz?.querySelector(".quiz-result");

    if (!quiz || !result) {
      return;
    }

    quiz.querySelectorAll("[data-page-quiz-option]").forEach((button) => {
      button.addEventListener("click", () => {
        quiz.querySelectorAll("[data-page-quiz-option]").forEach((item) => {
          item.classList.remove("correct", "wrong");
        });

        const isCorrect = button.dataset.correct === "true";
        button.classList.add(isCorrect ? "correct" : "wrong");
        result.textContent = isCorrect
          ? "Esatto: hai collegato il tema al contesto giusto."
          : "Quasi: rileggi il percorso sopra e riprova.";
      });
    });
  });
}

function setupHeroButton() {
  const button = document.querySelector("[data-focus-events]");
  const eventsSection = document.querySelector("#eventi");

  if (!button || !eventsSection) {
    return;
  }

  button.addEventListener("click", () => {
    eventsSection.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
  });
}

function setupNavbarAutoClose() {
  const nav = document.querySelector(".war-navbar");
  const collapse = document.querySelector("#skyyNavbar");

  if (!nav || !collapse) {
    return;
  }

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link || !collapse.classList.contains("show") || !window.bootstrap?.Collapse) {
      return;
    }

    const instance = window.bootstrap.Collapse.getInstance(collapse)
      || new window.bootstrap.Collapse(collapse, { toggle: false });
    instance.hide();
  });
}

function setupPointerLight() {
  if (!canUseMotionEffects) {
    return;
  }

  let animationFrame = null;
  let nextX = 50;
  let nextY = 20;

  window.addEventListener("pointermove", (event) => {
    nextX = (event.clientX / window.innerWidth) * 100;
    nextY = (event.clientY / window.innerHeight) * 100;

    if (animationFrame) {
      return;
    }

    animationFrame = window.requestAnimationFrame(() => {
      root.style.setProperty("--spot-x", `${nextX}%`);
      root.style.setProperty("--spot-y", `${nextY}%`);
      animationFrame = null;
    });
  }, { passive: true });
}

function setupMediaPerformance() {
  document.querySelectorAll("iframe").forEach((frame) => {
    if (frame.dataset.performanceReady === "true") {
      return;
    }

    frame.dataset.performanceReady = "true";
    frame.loading = "lazy";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
  });
}

document.addEventListener("skyy:content-ready", () => {
  setupImageFallbacks();
  setupMediaPerformance();
  observeRevealItems(document);
  setupHashNavigation();
  updateScrollEffects();
});

let scrollTicking = false;
let resizeTicking = false;

window.addEventListener("scroll", () => {
  if (scrollTicking) {
    return;
  }

  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollEffects();
    if (activeNavigationUsesFallback) {
      setActiveLink();
    }
    scrollTicking = false;
  });
}, { passive: true });

window.addEventListener("resize", () => {
  if (resizeTicking) {
    return;
  }

  resizeTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollEffects();
    if (activeNavigationUsesFallback) {
      setActiveLink();
    }
    resizeTicking = false;
  });
}, { passive: true });

setupRevealAnimations();
setupEventCards();
setupMemoryTabs();
setupFrontFilters();
setupLessonTimeline();
setupQuiz();
setupConceptCards();
setupFilmFilters();
setupCivilFilters();
setupWeaponFilters();
setupAllyFilters();
setupCultureFilters();
setupMapPins();
setupDeepDiveInteractions();
setupHeroButton();
setupMediaPerformance();
setupNavbarAutoClose();
setupPointerLight();
setupActiveNavigation();
setupHashNavigation();
updateScrollEffects();
