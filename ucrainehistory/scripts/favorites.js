// Favorites and History System
const FavoritesManager = {
  STORAGE_KEY: 'skyyFavorites',
  HISTORY_KEY: 'skyyHistory',

  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  addFavorite(title, url, category) {
    category = category || 'Generale';
    const favorites = this.getFavorites();
    const exists = favorites.some(function(f) { return f.url === url; });
    
    if (!exists) {
      favorites.unshift({
        title: title,
        url: url,
        category: category,
        dateAdded: new Date().toISOString()
      });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
      return true;
    }
    return false;
  },

  removeFavorite(url) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(function(f) { return f.url !== url; });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
  },

  isFavorite(url) {
    const favorites = this.getFavorites();
    return favorites.some(function(f) { return f.url === url; });
  },

  toggleFavorite(title, url, category) {
    if (this.isFavorite(url)) {
      this.removeFavorite(url);
      return false;
    } else {
      this.addFavorite(title, url, category);
      return true;
    }
  },

  getHistory() {
    try {
      return JSON.parse(localStorage.getItem(this.HISTORY_KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  addToHistory(title, url) {
    let history = this.getHistory();
    history = history.filter(function(h) { return h.url !== url; });
    history.unshift({
      title: title,
      url: url,
      visitedAt: new Date().toISOString()
    });
    if (history.length > 50) {
      history = history.slice(0, 50);
    }
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
  }
};

function initFavorites() {
  if (document.title && window.location.pathname) {
    FavoritesManager.addToHistory(
      document.title.replace(' | Skyy History', ''),
      window.location.pathname
    );
  }

  const favoriteBtn = document.createElement('button');
  favoriteBtn.id = 'favoriteBtn';
  favoriteBtn.className = 'favorite-btn';
  favoriteBtn.innerHTML = '☆';
  favoriteBtn.setAttribute('aria-label', 'Aggiungi ai preferiti');
  favoriteBtn.style.cssText = 'position: fixed; bottom: 6rem; right: 2rem; width: 50px; height: 50px; border-radius: 50%; background: var(--ukraine-gold); color: var(--ink); border: none; font-size: 1.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); transition: transform 0.2s, background 0.2s; z-index: 999;';

  favoriteBtn.addEventListener('click', function() {
    const isNowFavorite = FavoritesManager.toggleFavorite(
      document.title,
      window.location.pathname,
      'Pagina'
    );
    this.innerHTML = isNowFavorite ? '★' : '☆';
    this.style.background = isNowFavorite ? 'var(--signal)' : 'var(--ukraine-gold)';
    this.style.color = isNowFavorite ? '#fff' : 'var(--ink)';
    showNotification(isNowFavorite ? 'Aggiunto ai preferiti!' : 'Rimosso dai preferiti');
  });

  document.body.appendChild(favoriteBtn);

  if (FavoritesManager.isFavorite(window.location.pathname)) {
    favoriteBtn.innerHTML = '★';
    favoriteBtn.style.background = 'var(--signal)';
    favoriteBtn.style.color = '#fff';
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = 'position: fixed; bottom: 10rem; right: 2rem; padding: 1rem 1.5rem; background: var(--signal); color: #fff; border-radius: 8px; font-weight: 600;1000; animation: slideIn 0.3s ease;';
  document.body.appendChild(notification);
  setTimeout(function() {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(function() { notification.remove(); }, 300);
  }, 2000);
}

const style = document.createElement('style');
style.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', initFavorites);
window.FavoritesManager = FavoritesManager;