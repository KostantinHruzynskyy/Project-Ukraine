var MapManager = {
  map: null,
  markers: [],
  layers: {},
  init: function(containerId) {
    if (typeof L === 'undefined') {
      this.loadLeaflet();
    } else {
      this.createMap(containerId);
    }
  },
  loadLeaflet: function() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    var script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = function() { MapManager.createMap('map'); };
    document.head.appendChild(script);
  },
  createMap: function(containerId) {
    this.map = L.map(containerId).setView([49.0, 31.0], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(this.map);
    this.addHistoricalMarkers();
    this.addLayers();
  },
  addHistoricalMarkers: function() {
    var locations = [
      { lat: 50.4501, lng: 30.5234, title: 'Kyiv', category: 'capital', description: 'Capitale dell\'Ucraina' },
      { lat: 49.8397, lng: 24.0297, title: 'Lviv', category: 'culture', description: 'Patrimonio UNESCO' },
      { lat: 46.4825, lng: 30.7233, title: 'Odesa', category: 'port', description: 'Porto sul Mar Nero' },
      { lat: 49.9935, lng: 36.2304, title: 'Kharkiv', category: 'industry', description: 'Centro industriale' },
      { lat: 47.8388, lng: 35.1396, title: 'Zaporizhzhia', category: 'industry', description: 'Centrale nucleare' },
      { lat: 48.4647, lng: 35.0462, title: 'Dnipro', category: 'industry', description: 'Aerospazio' },
      { lat: 46.3585, lng: 37.8516, title: 'Mariupol', category: 'war', description: 'Città martire 2022' },
      { lat: 48.5079, lng: 22.2622, title: 'Uzhhorod', category: 'culture', description: 'Città multiculturale' },
      { lat: 48.9226, lng: 24.7111, title: 'Ivano-Frankivsk', category: 'culture', description: 'Carpazi' },
      { lat: 47.0105, lng: 28.8638, title: 'Chisinau', category: 'capital', description: 'Moldova' }
    ];
    locations.forEach(function(loc) {
      var marker = L.marker([loc.lat, loc.lng]).addTo(MapManager.map);
      marker.bindPopup('<strong>' + loc.title + '</strong><br>' + loc.description);
      marker.bindTooltip(loc.title);
      MapManager.markers.push(marker);
    });
  },
  addLayers: function() {
    var warZone = L.polygon([[50.5, 33.0], [50.5, 38.0], [47.5, 38.0], [47.5, 33.0]], { color: '#b23b2e', fillOpacity: 0.2, weight: 2 });
    warZone.bindTooltip('Zona del conflitto');
    warZone.addTo(this.map);
    this.layers.warZone = warZone;
  },
  filterByCategory: function(category) {
    this.markers.forEach(function(marker) { marker.setOpacity(category === 'all' ? 1 : 0.3); });
  },
  locateUser: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(MapManager.map).bindPopup('La tua posizione');
        MapManager.map.setView([pos.coords.latitude, pos.coords.longitude], 10);
      });
    }
  }
};
window.MapManager = MapManager;