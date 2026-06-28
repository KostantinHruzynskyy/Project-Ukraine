var Analytics = {
  STORAGE_KEY: 'skyyAnalytics',
  trackPageView: function() {
    var data = this.getData();
    var today = new Date().toISOString().split('T')[0];
    if (!data.pageViews[today]) data.pageViews[today] = 0;
    data.pageViews[today]++;
    data.totalPageViews++;
    data.lastVisit = new Date().toISOString();
    this.saveData(data);
  },
  trackSearch: function(query) {
    var data = this.getData();
    if (!data.searches[query]) data.searches[query] = 0;
    data.searches[query]++;
    this.saveData(data);
  },
  trackFavorite: function(action) {
    var data = this.getData();
    if (action === 'add') data.favoritesAdded++;
    else data.favoritesRemoved++;
    this.saveData(data);
  },
  trackThemeChange: function(theme) {
    var data = this.getData();
    if (!data.themeChanges[theme]) data.themeChanges[theme] = 0;
    data.themeChanges[theme]++;
    this.saveData(data);
  },
  getData: function() {
    try {
      var stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { totalPageViews: 0, pageViews: {}, searches: {}, favoritesAdded: 0, favoritesRemoved: 0, themeChanges: {}, firstVisit: new Date().toISOString(), lastVisit: null };
  },
  saveData: function(data) {
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  },
getSummary: function() {
    var data = this.getData();
    var today = new Date().toISOString().split('T')[0];
    return { totalPageViews: data.totalPageViews, todayPageViews: data.pageViews[today] || 0, favoritesAdded: data.favoritesAdded, firstVisit: data.firstVisit, lastVisit: data.lastVisit };
  },
  clearData: function() { localStorage.removeItem(this.STORAGE_KEY); }
};

document.addEventListener('DOMContentLoaded', function() {
  Analytics.trackPageView();
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var currentTheme = document.documentElement.getAttribute('data-theme');
      Analytics.trackThemeChange(currentTheme);
    });
  }
  var searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('search', function() {
      if (this.value.length > 2) Analytics.trackSearch(this.value.toLowerCase().trim());
    });
  }
});

window.Analytics = Analytics;