const root = document.documentElement;

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
          <a href="https://uinp.gov.ua/">Ukrainian Institute of National Memory</a>
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
          <p>Usa il selettore in alto per tradurre il sito in italiano, inglese, francese, tedesco, spagnolo, cinese, hindi, russo, polacco, arabo e portoghese.</p>
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

function setupTranslation() {
  const select = document.querySelector("#languageSelect");

  if (!select) {
    return;
  }

  const savedLanguage = localStorage.getItem("skyy-language") || "it";
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
          includedLanguages: "it,en,fr,de,es,zh-CN,hi,ru,pl,ar,pt",
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
    localStorage.setItem("skyy-language", language);
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
    azov: "https://commons.wikimedia.org/wiki/Special:FilePath/Soldiers%20from%20the%20Azov%20Battalion%20move%20into%20position.jpg",
    zaluzhnyi: "https://commons.wikimedia.org/wiki/Special:FilePath/Valerii%20Zaluzhnyi%20%28cropped%29.jpg",
    dmytro: "https://commons.wikimedia.org/wiki/Special:FilePath/Dmytro%20Kotsiubailo%20memorial%20service%2001.jpg",
    embroidery: "https://commons.wikimedia.org/wiki/Special:FilePath/Ukrainian%20embroidery.jpg",
    mariupol: "https://commons.wikimedia.org/wiki/Special:FilePath/Mariupol%20Drama%20Theatre%20Destroyed%201.jpg",
    bucha: "https://commons.wikimedia.org/wiki/Special:FilePath/Bucha%20after%20Russian%20invasion%20%282022-04-06%29%2016.jpg",
    euromaidan: "https://commons.wikimedia.org/wiki/Special:FilePath/We%27ll%20not%20retreat%21%20Euromaidan%202014%20in%20Kyiv.jpg"
  };

  const chooseFallback = (image) => {
    const text = `${image.alt || ""} ${image.src || ""}`.toLowerCase();

    if (text.includes("map") || text.includes("mappa")) return fallbackImages.map;
    if (text.includes("azov")) return fallbackImages.azov;
    if (text.includes("zaluzhnyi")) return fallbackImages.zaluzhnyi;
    if (text.includes("dmytro") || text.includes("kotsiubailo")) return fallbackImages.dmytro;
    if (text.includes("embroidery") || text.includes("ricamo")) return fallbackImages.embroidery;
    if (text.includes("mariupol")) return fallbackImages.mariupol;
    if (text.includes("bucha")) return fallbackImages.bucha;
    if (text.includes("euromaidan")) return fallbackImages.euromaidan;
    return fallbackImages.default;
  };

  document.querySelectorAll("img").forEach((image) => {
    image.loading = image.closest(".carousel") ? "eager" : "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";

    const applyFallback = () => {
      if (image.dataset.fallbackApplied === "true") {
        return;
      }

      image.dataset.fallbackApplied = "true";
      image.src = chooseFallback(image);
      image.classList.add("image-fallback-applied");
    };

    image.addEventListener("error", applyFallback);

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
    testImage.referrerPolicy = "no-referrer";
    testImage.onerror = () => {
      hero.style.setProperty("--event-image", `url("${fallbackImages.euromaidan}")`);
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

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  root.style.setProperty("--scroll-progress", `${progress}%`);
  root.style.setProperty("--parallax-y", `${Math.min(scrollTop * 0.18, 120)}px`);
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

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

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

function setupHeroButton() {
  const button = document.querySelector("[data-focus-events]");
  const eventsSection = document.querySelector("#eventi");

  if (!button || !eventsSection) {
    return;
  }

  button.addEventListener("click", () => {
    eventsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setupPointerLight() {
  if (window.matchMedia("(pointer: coarse)").matches) {
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

let scrollTicking = false;

window.addEventListener("scroll", () => {
  if (scrollTicking) {
    return;
  }

  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollEffects();
    setActiveLink();
    scrollTicking = false;
  });
}, { passive: true });

window.addEventListener("resize", () => {
  updateScrollEffects();
  setActiveLink();
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
setupHeroButton();
setupPointerLight();
updateScrollEffects();
setActiveLink();
