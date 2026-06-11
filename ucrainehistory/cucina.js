(function () {
  const root = document.querySelector("[data-cuisine-app]");

  if (!root) {
    return;
  }

  const endpoints = ["cucina-api.php", "cucina-data.json", "api/cucina"];
  const state = {
    data: null,
    category: "all",
    query: ""
  };

  const get = (selector) => root.querySelector(selector);
  const explorer = get("#recipeExplorer");
  const detail = get("#recipeDetail");
  const filters = get("#recipeFilterButtons");
  const count = get("#recipeCount");
  const search = get("#recipeSearch");

  function createNode(tag, className, text) {
    const node = document.createElement(tag);

    if (className) {
      node.className = className;
    }

    if (text) {
      node.textContent = text;
    }

    return node;
  }

  async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  async function loadCuisineData() {
    for (const endpoint of endpoints) {
      try {
        const payload = await fetchJson(endpoint);

        if (payload && Array.isArray(payload.recipes)) {
          return payload;
        }
      } catch (error) {
        // Try the next endpoint. Static HTML still contains the complete recipes.
      }
    }

    return null;
  }

  function filteredRecipes() {
    if (!state.data) {
      return [];
    }

    const query = state.query.trim().toLowerCase();

    return state.data.recipes.filter((recipe) => {
      const categoryMatch = state.category === "all" || recipe.category === state.category;
      const text = JSON.stringify(recipe).toLowerCase();
      const queryMatch = !query || text.includes(query);

      return categoryMatch && queryMatch;
    });
  }

  function renderFilters() {
    if (!filters || !state.data) {
      return;
    }

    const categories = ["all", ...(state.data.categories || [])];
    filters.innerHTML = "";

    categories.forEach((category) => {
      const button = createNode("button", `recipe-pill${category === state.category ? " active" : ""}`, category === "all" ? "Tutte" : category);
      button.type = "button";
      button.dataset.category = category;
      button.addEventListener("click", () => {
        state.category = category;
        render();
      });
      filters.appendChild(button);
    });
  }

  function renderRecipeCard(recipe, index) {
    const card = createNode("button", "recipe-mini-card", "");
    card.type = "button";
    card.innerHTML = `
      <span></span>
      <strong></strong>
      <small></small>
      <em></em>
    `;
    card.querySelector("span").textContent = recipe.category;
    card.querySelector("strong").textContent = recipe.title;
    card.querySelector("small").textContent = `${recipe.region} · ${recipe.time}`;
    card.querySelector("em").textContent = recipe.occasion;
    card.addEventListener("click", () => renderDetail(recipe));

    if (index === 0) {
      card.classList.add("active");
    }

    return card;
  }

  function renderDetail(recipe) {
    if (!detail) {
      return;
    }

    const ingredients = (recipe.ingredients || []).map((item) => `<li>${item}</li>`).join("");
    const steps = (recipe.steps || []).map((item) => `<li>${item}</li>`).join("");

    detail.innerHTML = `
      <span>${recipe.category}</span>
      <h3>${recipe.title}</h3>
      <div class="recipe-meta-grid">
        <p><strong>Regione</strong>${recipe.region}</p>
        <p><strong>Occasione</strong>${recipe.occasion}</p>
        <p><strong>Tempo</strong>${recipe.time}</p>
        <p><strong>Dosi</strong>${recipe.servings}</p>
      </div>
      <div class="recipe-detail-columns">
        <section>
          <h4>Ingredienti</h4>
          <ul>${ingredients}</ul>
        </section>
        <section>
          <h4>Passaggi</h4>
          <ol>${steps}</ol>
        </section>
      </div>
      <p class="recipe-note">${recipe.notes || ""}</p>
    `;
  }

  function renderRecipes() {
    if (!explorer || !state.data) {
      return;
    }

    const recipes = filteredRecipes();
    explorer.innerHTML = "";

    if (count) {
      count.textContent = `${recipes.length} ricette`;
    }

    if (!recipes.length) {
      explorer.appendChild(createNode("p", "recipe-empty", "Nessuna ricetta trovata con questi filtri."));
      return;
    }

    recipes.forEach((recipe, index) => {
      explorer.appendChild(renderRecipeCard(recipe, index));
    });

    renderDetail(recipes[0]);
  }

  function render() {
    renderFilters();
    renderRecipes();
  }

  if (search) {
    search.addEventListener("input", () => {
      state.query = search.value;
      renderRecipes();
    });
  }

  loadCuisineData().then((data) => {
    if (!data) {
      root.classList.add("cuisine-app-fallback");
      return;
    }

    state.data = data;
    render();
  });
}());
