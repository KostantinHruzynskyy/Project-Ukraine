const searchData = [
  { title: "Holodomor", page: "holodomor.html", keywords: "carestia fame 1932 1933 stalin vittime", category: "Eventi" },
  { title: "Babyn Yar", page: "babyn-yar.html", keywords: "massacro shoah ebrei 1941 kyiv", category: "Eventi" },
  { title: "Tatari di Crimea", page: "tatari-crimea.html", keywords: "deportazione crimea 1944 islam", category: "Eventi" },
  { title: "Chernobyl", page: "chernobyl.html", keywords: "nucleare disastro 1986 radiazioni", category: "Eventi" },
  { title: "Indipendenza", page: "indipendenza.html", keywords: "1991 sovranita referendum", category: "Eventi" },
  { title: "Euromaidan", page: "euromaidan.html", keywords: "maidan 2013 2014 rivoluzione dignita", category: "Eventi" },
  { title: "Crimea e Donbas", page: "crimea-donbas.html", keywords: "2014 occupazione annessione", category: "Eventi" },
  { title: "Invasione 2022", page: "invasione-2022.html", keywords: "guerra 2022 russia attacco", category: "Eventi" },
  { title: "Bucha", page: "bucha.html", keywords: "atrocita crimini civili 2022", category: "Eventi" },
  { title: "Mariupol", page: "mariupol.html", keywords: "assedio teatro azovstal 2022", category: "Eventi" },
  { title: "Battaglie", page: "battaglie.html", keywords: "fronte militare difesa", category: "Guerra" },
  { title: "Atrocita", page: "atrocita.html", keywords: "crimini guerra violenze", category: "Guerra" },
  { title: "Difesa ucraina", page: "difesa.html", keywords: "forze armate esercito", category: "Guerra" },
  { title: "Lingua e cultura", page: "lingua-cultura.html", keywords: "ucraino lingua cultura", category: "Studio" },
  { title: "Cucina ucraina", page: "cucina.html", keywords: "borshch varenyky ricette cibo", category: "Cultura" },
  { title: "Costumi ucraini", page: "costumi.html", keywords: "vyshyvanka ricami tradizioni", category: "Cultura" },
  { title: "Sport ucraino", page: "sport.html", keywords: "calcio olimpiadi atleti", category: "Cultura" },
  { title: "Film e documentari", page: "film.html", keywords: "cinema documentari film", category: "Cultura" },
  { title: "Museo interattivo", page: "museo.html", keywords: "museo sale esplorare", category: "Risorse" },
  { title: "Timeline", page: "timeline.html", keywords: "cronologia eventi storia", category: "Risorse" },
  { title: "Mappe", page: "mappe.html", keywords: "mappe territori citta", category: "Risorse" },
  { title: "Ricerca globale", page: "ricerca.htmlcerca ricerca", category: "Risorse" },
  { title: "Fonti", page: "fonti.html", keywords: "fonti biblioteca riferimenti", category: "Risorse" },
  { title: "Dossier", page: "dossier.html", keywords: "dossier approfondimento", category: "Risorse" },
  { title: "Rifugiati", page: "rifugiati.html", keywords: "profughi diaspora", category: "Risorse" },
  { title: "Ricostruzione", page: "ricostruzione.html", keywords: "ricostruzione futuro", category: "Risorse" },
  { title: "Studio guidato", page: "studio.html", keywords: "studio quiz apprendimento", category: "Risorse" },
  { title: "Amministrazione", page: "admin.html", keywords: "admin dashboard gestione", category: "Risorse" }
];

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchForm = document.getElementById('searchForm');

  if (!searchInput) return;

  function performSearch(query) {
    if (!query || query.length < 2) {
      if (searchResults) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
      }
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();
    const keywords = normalizedQuery.split(/\s+/);

    const results = searchData.filter(item => {
      const searchableText = (item.title + ' ' + item.keywords + ' ' + item.category).toLowerCase();
      return keywords.every(keyword => searchableText.includes(keyword));
    }).sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(normalizedQuery) ? 1 : 0;
      const bTitleMatch = b.title.toLowerCase().includes(normalizedQuery) ? 1 : 0;
      return bTitleMatch - aTitleMatch;
    });

    displayResults(results, query);
  }

  function displayResults(results, query) {
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          <p>Nessun risultato per "${query}"</p>
          <p>Prova con termini diversi o esplora le sezioni del sito</p>
        </div>
      `;
    } else {
      const resultsHTML = results.map(result => `
        <a href="${result.page}" class="search-result-item">
          <span class="search-result-category">${result.category}</span>
          <strong class="search-result-title">${highlightMatch(result.title, query)}</strong>
          <span class="search-result-link">${result.page}</span>
        </a>
      `).join('');

      searchResults.innerHTML = `
        <div class="search-results-header">
          <span>${results.length} risultati per "${query}"</span>
        </div>
        ${resultsHTML}
      `;
    }

    searchResults.style.display = 'block';
  }

  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch(e.target.value);
    }, 300);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.length >= 2) {
      performSearch(searchInput.value);
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      performSearch(searchInput.value);
    });
  }
}

document.addEventListener('DOMContentLoaded', initSearch);