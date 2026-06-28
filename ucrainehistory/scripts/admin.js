var AdminDashboard = {
  init: function() { this.loadStats(); this.loadAnalytics(); this.loadFavorites(); this.loadNewsletter(); },
  loadStats: function() {
    var stats = { totalPages: 34, totalVisits: Analytics.getSummary().totalPageViews, totalFavorites: Analytics.getSummary().favoritesAdded, totalSearches: Object.keys(Analytics.getData().searches).length };
    var container = document.getElementById('adminStats');
    if (container) { container.innerHTML = '<div class="stat-card"><h3>Pagine</h3><strong>' + stats.totalPages + '</strong></div><div class="stat-card"><h3>Visite</h3><strong>' + stats.totalVisits + '</strong></div><div class="stat-card"><h3>Preferiti</h3><strong>' + stats.totalFavorites + '</strong></div><div class="stat-card"><h3>Ricerche</h3><strong>' + stats.totalSearches + '</strong></div>'; }
  },
  loadAnalytics: function() {
    var summary = Analytics.getSummary();
    var container = document.getElementById('analyticsData');
    if (container) { container.innerHTML = '<h3>Ultime 7 giorni</h3><div class="chart">' + summary.last7Days.map(function(day) { return '<div class="bar" style="height:' + (day.views * 10 + 10) + 'px" title="' + day.date + ': ' + day.views + '"></div>'; }).join('') + '</div>'; }
  },
  loadFavorites: function() {
    var favorites = FavoritesManager.getFavorites();
    var container = document.getElementById('favoritesList');
    if (container) { container.innerHTML = favorites.length > 0 ? favorites.map(function(f) { return '<li>' + f.title + ' (' + f.category + ')</li>'; }).join('') : '<li>Nessun preferito</li>'; }
  },
  loadNewsletter: function() {
    var subscribers = Newsletter.getSubscribers();
    var container = document.getElementById('newsletterList');
    if (container) { container.innerHTML = '<h3>Iscritti: ' + subscribers.length + '</h3>' + (subscribers.length > 0 ? '<ul>' + subscribers.map(function(s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' : '<li>Nessun iscritto</li>'); }
  },
  clearData: function() { if (confirm('Cancellare tutti i dati?')) { Analytics.clearData(); localStorage.removeItem('skyyFavorites'); localStorage.removeItem('skyyHistory'); localStorage.removeItem('skyyNewsletter'); alert('Dati cancellati!'); location.reload(); } },
  exportData: function() {
    var data = { analytics: Analytics.getData(), favorites: FavoritesManager.getFavorites(), history: FavoritesManager.getHistory(), newsletter: Newsletter.getSubscribers(), exportDate: new Date().toISOString() };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'skyy-history-backup-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
  }
};
document.addEventListener('DOMContentLoaded', function() { if (document.getElementById('adminStats')) { AdminDashboard.init(); } });
window.AdminDashboard = AdminDashboard;