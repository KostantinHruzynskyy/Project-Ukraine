(() => {
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
    const items = await loadJson("../data/search-index.json");

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
      loadJson("../data/pages/index.json"),
      loadJson("../data/films.json"),
      loadJson("../data/sources.json"),
      loadJson("../data/cucina-data.json").catch(() => ({ recipes: [] }))
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
    const index = await loadJson("../data/pages/index.json").catch(() => []);
    const page = index.find((entry) => (entry.file || "").toLowerCase() === currentFile);
    if (!page) return;
    const data = await loadJson(`../data/pages/${page.slug}.json`).catch(() => null);
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
