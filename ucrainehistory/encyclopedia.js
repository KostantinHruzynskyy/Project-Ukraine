(function () {
  const data = window.SkyyEncyclopediaData;

  if (!data) {
    return;
  }

  const currentFile = (window.location.pathname.split("/").pop() || "Main.html").toLowerCase();
  const isMainPage = currentFile === "main.html" || currentFile === "";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function applyMeta() {
    const meta = data.meta[currentFile] || data.meta["main.html"];

    if (!meta) {
      return;
    }

    document.title = meta.title;

    let description = document.querySelector('meta[name="description"]');

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    description.content = meta.description;
  }

  function sourceLinks(sourceLabels) {
    if (!Array.isArray(sourceLabels) || !sourceLabels.length) {
      return "";
    }

    const lookup = new Map(data.sources.map((source) => [source.label, source]));

    return sourceLabels.map((label) => {
      const exact = lookup.get(label);
      const loose = exact || data.sources.find((source) => label.toLowerCase().includes(source.label.toLowerCase().split(" - ")[0]));
      const href = data.sourceUrls?.[label] || loose?.href || "#";

      return `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
    }).join("");
  }

  function renderStats() {
    return data.stats.map(([label, value, text]) => `
      <article class="encyclopedia-stat reveal">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
        <p>${escapeHtml(text)}</p>
      </article>
    `).join("");
  }

  function renderTopics() {
    return data.topics.map((topic) => `
      <article class="encyclopedia-card reveal" data-encyclopedia-topic="${escapeHtml(topic.id)}">
        <span>${escapeHtml(topic.label)}</span>
        <h3>${escapeHtml(topic.title)}</h3>
        <p>${escapeHtml(topic.text)}</p>
        <ul>${topic.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul>
        <small>${escapeHtml(topic.source)}</small>
      </article>
    `).join("");
  }

  function renderTimeline() {
    return data.timeline.map(([date, title, text]) => `
      <li>
        <span>${escapeHtml(date)}</span>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(text)}</p>
      </li>
    `).join("");
  }

  function renderGlossary() {
    return data.glossary.map(([term, text]) => `
      <article>
        <strong>${escapeHtml(term)}</strong>
        <p>${escapeHtml(text)}</p>
      </article>
    `).join("");
  }

  function renderSourceLibrary() {
    return data.sources.map((source) => `
      <a href="${escapeHtml(source.href)}" target="_blank" rel="noreferrer">
        <strong>${escapeHtml(source.label)}</strong>
        <span>${escapeHtml(source.note)}</span>
      </a>
    `).join("");
  }

  function renderProfessionalData(options = {}) {
    const details = data.professionalData;

    if (!details) {
      return "";
    }

    const groups = details.groups?.map((group) => `
      <article class="professional-data-group reveal">
        <div class="professional-group-head">
          <span>Dossier dati</span>
          <h3>${escapeHtml(group.title)}</h3>
          <p>${escapeHtml(group.text)}</p>
        </div>

        <div class="professional-metric-grid">
          ${group.metrics.map((metric) => `
            <article class="professional-metric-card">
              <span>${escapeHtml(metric.label)}</span>
              <div class="professional-metric-value">
                <strong>${escapeHtml(metric.value)}</strong>
                <small>${escapeHtml(metric.unit)}</small>
              </div>
              <p>${escapeHtml(metric.note)}</p>
              <footer>
                <em>${escapeHtml(metric.date)}</em>
                ${metric.source ? sourceLinks([metric.source]) : ""}
              </footer>
            </article>
          `).join("")}
        </div>
      </article>
    `).join("") || "";
    const briefings = details.briefings?.map((briefing) => `
      <article class="professional-briefing-card reveal">
        <h3>${escapeHtml(briefing.title)}</h3>
        <p>${escapeHtml(briefing.text)}</p>
        <ul>${briefing.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
      </article>
    `).join("") || "";
    const methodology = details.methodology?.map((item) => `
      <article class="professional-method-card reveal">
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `).join("") || "";
    const sourceLabels = [...new Set((details.groups || []).flatMap((group) => group.metrics.map((metric) => metric.source).filter(Boolean)))];
    const compactClass = options.compact ? " professional-data-section--compact" : "";

    return `
      <section class="professional-data-section${compactClass} reveal" aria-label="${escapeHtml(details.title)}">
        <div class="professional-data-head">
          <div>
            <p class="section-kicker mb-2">Dati, statistiche e metodo</p>
            <h3>${escapeHtml(details.title)}</h3>
          </div>
          <p>${escapeHtml(details.intro)}</p>
        </div>

        <div class="professional-group-grid">
          ${groups}
        </div>

        <div class="professional-briefing-grid">
          ${briefings}
        </div>

        <div class="professional-methodology">
          <div>
            <span>Metodo di lettura</span>
            <h3>${escapeHtml(details.updated)}</h3>
          </div>
          <div class="professional-method-grid">
            ${methodology}
          </div>
        </div>

        <div class="professional-source-strip" aria-label="Fonti statistiche principali">
          ${sourceLinks(sourceLabels)}
        </div>
      </section>
    `;
  }

  function renderKnowledgeNetwork(options = {}) {
    const network = data.knowledgeNetwork;

    if (!network) {
      return "";
    }

    const lookup = new Map((network.pages || []).map((page) => [page.href.toLowerCase(), page]));

    function renderPageLink(href) {
      const page = lookup.get(String(href).toLowerCase());

      if (!page) {
        return "";
      }

      return `
        <a class="knowledge-page-link" href="${escapeHtml(page.href)}">
          <span>${escapeHtml(page.category)}</span>
          <strong>${escapeHtml(page.title)}</strong>
          <em>${escapeHtml(page.era)}</em>
          <p>${escapeHtml(page.summary)}</p>
        </a>
      `;
    }

    function renderChipList(items) {
      return (items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }

    if (options.home) {
      const routes = (network.routes || []).map((route) => `
        <article class="knowledge-route-card reveal">
          <span>Percorso</span>
          <h3>${escapeHtml(route.title)}</h3>
          <p>${escapeHtml(route.aim)}</p>
          <div class="knowledge-mini-links">
            ${route.pages.map(renderPageLink).join("")}
          </div>
          <small>${escapeHtml(route.output)}</small>
        </article>
      `).join("");
      const themes = (network.thematicConnections || []).map((theme) => `
        <article class="knowledge-theme-card reveal">
          <div>
            <span>Collegamento tematico</span>
            <h3>${escapeHtml(theme.title)}</h3>
            <p>${escapeHtml(theme.text)}</p>
          </div>
          <div class="knowledge-mini-links">
            ${theme.pages.map(renderPageLink).join("")}
          </div>
          <ul>${renderChipList(theme.notes)}</ul>
          <footer>${sourceLinks(theme.sources)}</footer>
        </article>
      `).join("");
      const pages = (network.pages || []).map((page) => `
        <a class="knowledge-index-card reveal" href="${escapeHtml(page.href)}">
          <span>${escapeHtml(page.category)}</span>
          <strong>${escapeHtml(page.title)}</strong>
          <em>${escapeHtml(page.era)}</em>
          <p>${escapeHtml(page.summary)}</p>
          <div>${page.tags.map((tag) => `<small>${escapeHtml(tag)}</small>`).join("")}</div>
        </a>
      `).join("");

      return `
        <section class="knowledge-network-section reveal" aria-label="${escapeHtml(network.title)}">
          <div class="knowledge-network-head">
            <div>
              <p class="section-kicker mb-2">Collegamenti ovunque</p>
              <h3>${escapeHtml(network.title)}</h3>
            </div>
            <p>${escapeHtml(network.intro)} ${escapeHtml(network.updated)}.</p>
          </div>

          <div class="knowledge-route-grid">
            ${routes}
          </div>

          <div class="knowledge-theme-grid">
            ${themes}
          </div>

          <div class="knowledge-index-grid">
            ${pages}
          </div>
        </section>
      `;
    }

    const currentLinks = network.pageLinks?.[currentFile];
    const currentPage = lookup.get(currentFile);

    if (!currentLinks || !currentPage) {
      return "";
    }

    return `
      <section class="knowledge-network-section knowledge-network-section--compact reveal" aria-label="Collegamenti e fonti">
        <div class="knowledge-network-head">
          <div>
            <p class="section-kicker mb-2">Rete di collegamenti</p>
            <h3>${escapeHtml(currentPage.title)}: collega, confronta, verifica</h3>
          </div>
          <p>${escapeHtml(currentPage.summary)}</p>
        </div>

        <div class="knowledge-detail-grid">
          <article class="knowledge-detail-panel knowledge-detail-panel--wide">
            <span>Pagine collegate</span>
            <div class="knowledge-mini-links">
              ${currentLinks.related.map(renderPageLink).join("")}
            </div>
          </article>

          <article class="knowledge-detail-panel">
            <span>Confronta con</span>
            <ul>${renderChipList(currentLinks.compare)}</ul>
          </article>

          <article class="knowledge-detail-panel">
            <span>Concetti da usare</span>
            <ul class="knowledge-chip-list">${renderChipList(currentLinks.concepts)}</ul>
          </article>

          <article class="knowledge-detail-panel">
            <span>Luoghi e scala</span>
            <ul class="knowledge-chip-list">${renderChipList(currentLinks.places)}</ul>
          </article>

          <article class="knowledge-detail-panel knowledge-detail-panel--wide">
            <span>Domande guida</span>
            <ul>${renderChipList(currentLinks.questions)}</ul>
          </article>

          <article class="knowledge-detail-panel">
            <span>Prossimo passo</span>
            <p>${escapeHtml(currentLinks.next)}</p>
          </article>
        </div>

        <div class="deep-sources knowledge-source-panel">
          <strong>Fonti e collegamenti esterni mirati</strong>
          <div>${sourceLinks(currentLinks.external)}</div>
        </div>
      </section>
    `;
  }

  function renderDeepening(details) {
    if (!details) {
      return "";
    }

    const chapters = details.chapters?.map((chapter) => `
      <article class="page-deepening-chapter reveal">
        <h3>${escapeHtml(chapter.title)}</h3>
        <p>${escapeHtml(chapter.text)}</p>
        <ul>${chapter.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
      </article>
    `).join("") || "";
    const timeline = details.timeline?.map(([date, title, text]) => `
      <li>
        <span>${escapeHtml(date)}</span>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(text)}</p>
      </li>
    `).join("") || "";
    const lenses = details.lenses?.map(([title, text]) => `
      <article class="page-lens reveal">
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(text)}</p>
      </article>
    `).join("") || "";
    const mistakes = details.mistakes?.map((mistake) => `<li>${escapeHtml(mistake)}</li>`).join("") || "";

    return `
      <section class="page-deepening reveal" aria-label="Approfondimento completo">
        <div class="page-deepening-head">
          <div>
            <p class="section-kicker mb-2">Approfondimento completo</p>
            <h3>${escapeHtml(details.title)}</h3>
          </div>
          <p>${escapeHtml(details.intro)}</p>
        </div>

        <div class="page-deepening-grid">
          ${chapters}
        </div>

        <div class="page-study-grid">
          <section class="page-mini-timeline reveal">
            <span>Micro-cronologia</span>
            <ol>${timeline}</ol>
          </section>

          <section class="page-lenses">
            <span>Chiavi di lettura</span>
            <div>${lenses}</div>
          </section>

          <section class="page-mistakes reveal">
            <span>Errori da evitare</span>
            <ul>${mistakes}</ul>
          </section>
        </div>
      </section>
    `;
  }

  function renderHomeEncyclopedia() {
    if (!isMainPage || document.querySelector("#enciclopedia-ucraina")) {
      return;
    }

    const section = document.createElement("section");
    section.className = "encyclopedia-section page-band";
    section.id = "enciclopedia-ucraina";
    section.innerHTML = `
      <div class="container">
        <div class="row align-items-end mb-4 reveal">
          <div class="col-lg-8">
            <p class="section-kicker mb-2">Enciclopedia del paese</p>
            <h2 class="display-5 mb-3">Ucraina: storia, cultura, societa, guerra e futuro</h2>
          </div>
          <div class="col-lg-4">
            <p class="section-text">Una sezione piu ordinata e completa, costruita da fonti ucraine, accademiche, ONU, UNESCO e diritti umani.</p>
          </div>
        </div>

        <div class="encyclopedia-stat-grid">
          ${renderStats()}
        </div>

        ${renderProfessionalData()}

        ${renderKnowledgeNetwork({ home: true })}

        <div class="encyclopedia-controls reveal" aria-label="Filtri enciclopedia">
          <button class="front-filter active" type="button" data-encyclopedia-filter="all">Tutto</button>
          ${data.topics.map((topic) => `<button class="front-filter" type="button" data-encyclopedia-filter="${escapeHtml(topic.id)}">${escapeHtml(topic.label)}</button>`).join("")}
        </div>

        <div class="encyclopedia-grid" data-encyclopedia-grid>
          ${renderTopics()}
        </div>

        <div class="encyclopedia-lower-grid mt-4">
          <section class="encyclopedia-timeline reveal" aria-label="Cronologia enciclopedica">
            <span>Cronologia lunga</span>
            <h3>Dal medioevo alla guerra contemporanea</h3>
            <ol>${renderTimeline()}</ol>
          </section>

          <section class="encyclopedia-glossary reveal" aria-label="Glossario storico">
            <span>Glossario</span>
            <h3>Parole da usare bene</h3>
            <div>${renderGlossary()}</div>
          </section>
        </div>

        <section class="encyclopedia-source-library reveal mt-4" aria-label="Biblioteca fonti">
          <div>
            <span>Fonti affidabili</span>
            <h3>Biblioteca minima per verificare</h3>
            <p>Fonti scelte per coprire storia, cultura, dati ufficiali, toponimi, diritti umani e guerra. Aggiornamento contenuti: ${escapeHtml(data.updated)}.</p>
          </div>
          <div class="encyclopedia-source-grid">
            ${renderSourceLibrary()}
          </div>
        </section>
      </div>
    `;

    const anchor = document.querySelector(".country-atlas-section") || document.querySelector("#forze-ucraine") || document.querySelector("#eventi");

    if (anchor) {
      anchor.insertAdjacentElement("afterend", section);
      return;
    }

    document.body.appendChild(section);
  }

  function renderPageContext() {
    if (isMainPage || document.querySelector(".page-context-section")) {
      return;
    }

    const pageData = data.pageContexts[currentFile];
    const deepening = data.internalDeepening?.[currentFile];

    if (!pageData) {
      return;
    }

    const section = document.createElement("section");
    section.className = "page-context-section page-band";
    section.innerHTML = `
      <div class="container">
        <div class="row align-items-end mb-4 reveal">
          <div class="col-lg-8">
            <p class="section-kicker mb-2">Contesto enciclopedico</p>
            <h2 class="display-6 mb-3">${escapeHtml(pageData.title)}</h2>
          </div>
          <div class="col-lg-4">
            <p class="section-text">${escapeHtml(pageData.text)}</p>
          </div>
        </div>

        <div class="page-context-grid">
          ${pageData.cards.map(([label, title, text]) => `
            <article class="page-context-card reveal">
              <span>${escapeHtml(label)}</span>
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(text)}</p>
            </article>
          `).join("")}
        </div>

        ${renderDeepening(deepening)}

        ${renderKnowledgeNetwork({ compact: true })}

        ${renderProfessionalData({ compact: true })}

        <div class="deep-sources reveal mt-4">
          <strong>Fonti consigliate per questa pagina</strong>
          <div>${sourceLinks(pageData.sources)}</div>
        </div>
      </div>
    `;

    const main = document.querySelector("main");
    const target = document.querySelector(".page-deep-dive-section") || document.querySelector(".ukraine-global-section") || document.querySelector(".site-footer");

    if (target) {
      document.body.insertBefore(section, target);
      return;
    }

    if (main) {
      main.insertAdjacentElement("afterend", section);
      return;
    }

    document.body.appendChild(section);
  }

  function setupEncyclopediaFilters() {
    const controls = document.querySelector(".encyclopedia-controls");
    const cards = document.querySelectorAll("[data-encyclopedia-topic]");

    if (!controls || !cards.length) {
      return;
    }

    controls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-encyclopedia-filter]");

      if (!button) {
        return;
      }

      const selected = button.dataset.encyclopediaFilter;

      controls.querySelectorAll("[data-encyclopedia-filter]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      cards.forEach((card) => {
        const visible = selected === "all" || card.dataset.encyclopediaTopic === selected;
        card.classList.toggle("is-hidden", !visible);
      });
    });
  }

  function renderDeferredContent() {
    renderHomeEncyclopedia();
    renderPageContext();
    setupEncyclopediaFilters();

    if (window.SkyyObserveReveals) {
      window.SkyyObserveReveals(document);
    }

    document.dispatchEvent(new Event("skyy:content-ready"));
  }

  function scheduleNonBlocking(callback) {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(callback, { timeout: 500 });
      return;
    }

    window.setTimeout(callback, 0);
  }

  applyMeta();
  scheduleNonBlocking(renderDeferredContent);
})();
