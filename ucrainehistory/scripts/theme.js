function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  
  const savedTheme = localStorage.getItem('skyyTheme') || 'dark';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('skyyTheme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i') || themeToggle;
    if (theme === 'dark') {
      icon.textContent = '☀️';
      themeToggle.setAttribute('aria-label', 'Passa al tema chiaro');
    } else {
      icon.textContent = '🌙';
      themeToggle.setAttribute('aria-label', 'Passa al tema scuro');
    }
  }
}

function initBreadcrumbs() {
  const breadcrumbContainer = document.getElementById('breadcrumb');
  if (!breadcrumbContainer) return;

  const pathArray = window.location.pathname.split('/').filter(Boolean);
  const pageName = pathArray[pathArray.length - 1] || 'index.html';
  
  const pageNames = {
    'Main.html': 'Home',
    'index.html': 'Accesso',
    'holodomor.html': 'Holodomor',
    'babyn-yar.html': 'Babyn Yar',
    'tatari-crimea.html': 'Tatari di Crimea',
    'chernobyl.html': 'Chernobyl',
    'indipendenza.html': 'Indipendenza',
    'euromaidan.html': 'Euromaidan',
    'crimea-donbas.html': 'Crimea e Donbas',
    'invasione-2022.html': 'Invasione 2022',
    'bucha.html': 'Bucha',
    'mariupol.html': 'Mariupol',
    'battaglie.html': 'Battaglie',
    'atrocita.html': 'Atrocità',
    'difesa.html': 'Difesa Ucraina',
    'lingua-cultura.html': 'Lingua e Cultura',
    'cucina.html': 'Cucina Ucraina',
    'costumi.html': 'Costumi Ucraini',
    'sport.html': 'Sport Ucraino',
    'film.html': 'Film e Documentari',
    'museo.html': 'Museo',
    'timeline.html': 'Timeline',
    'mappe.html': 'Mappe',
    'ricerca.html': 'Ricerca',
    'fonti.html': 'Fonti',
    'dossier.html': 'Dossier',
    'rifugiati.html': 'Rifugiati',
    'ricostruzione.html': 'Ricostruzione',
    'studio.html': 'Studio',
    'admin.html': 'Amministrazione'
  };

  const isMainPage = pageName === 'Main.html' || pageName === 'index.html';
  
  if (isMainPage) {
    breadcrumbContainer.style.display = 'none';
    return;
  }

  const crumbs = [
    { name: 'Home', href: 'Main.html' },
    { name: pageNames[pageName] || pageName.replace('.html', ''), href: null }
  ];

  const breadcrumbHTML = crumbs.map((crumb, index) => {
    if (index === crumbs.length - 1 || !crumb.href) {
      return `<span class="breadcrumb-current">${crumb.name}</span>`;
    }
    return `<a href="${crumb.href}" class="breadcrumb-link">${crumb.name}</a>`;
  }).join('<span class="breadcrumb-separator">/</span>');

  breadcrumbContainer.innerHTML = breadcrumbHTML;
  breadcrumbContainer.style.display = 'flex';
}

function initLanguageSwitcher() {
  const languageSelect = document.getElementById('languageSelect');
  if (!languageSelect) return;

  const savedLang = localStorage.getItem('skyyLanguage');
  if (savedLang) {
    languageSelect.value = savedLang;
  }

  languageSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('skyyLanguage', selectedLang);
    
    if (selectedLang === 'it') {
      window.location.reload();
      return;
    }

    const currentUrl = encodeURIComponent(window.location.href);
    const translateUrl = `https://translate.google.com/translate?sl=it&tl=${selectedLang}&u=${currentUrl}`;
    window.open(translateUrl, '_blank');
  });
}

function initImageLazyLoading() {
  const images = document.querySelectorAll('img:not([loading])');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          img.setAttribute('loading', 'lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      if (img.src && !img.src.includes('data:')) {
        img.dataset.src = img.src;
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        imageObserver.observe(img);
      }
    });
  } else {
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  }
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) {
    const btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Torna in cima');
    btn.style.display = 'none';
    document.body.appendChild(btn);
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const observerTarget = document.getElementById('backToTop') || document.currentScript;
  
  window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTop');
    if (btn) {
      if (window.scrollY > 500) {
        btn.style.display = 'flex';
      } else {
        btn.style.display = 'none';
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBreadcrumbs();
  initLanguageSwitcher();
  initImageLazyLoading();
  initBackToTop();
});