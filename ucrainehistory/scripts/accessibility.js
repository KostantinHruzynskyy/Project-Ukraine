var Accessibility = {
  fontSize: 100,
  highContrast: false,
  init: function() {
    var saved = localStorage.getItem('a11yFontSize');
    if (saved) this.fontSize = parseInt(saved);
    saved = localStorage.getItem('a11yHighContrast');
    if (saved) this.highContrast = saved === 'true';
    this.apply();
    this.addKeyboardNavigation();
  },
  increaseFontSize: function() { this.fontSize = Math.min(150, this.fontSize + 10); this.save(); this.apply(); },
  decreaseFontSize: function() { this.fontSize = Math.max(80, this.fontSize - 10); this.save(); this.apply(); },
  resetFontSize: function() { this.fontSize = 100; this.save(); this.apply(); },
  toggleHighContrast: function() { this.highContrast = !this.highContrast; this.save(); this.apply(); },
  apply: function() {
    document.documentElement.style.fontSize = this.fontSize + '%';
    document.body.classList.toggle('high-contrast', this.highContrast);
  },
  save: function() { localStorage.setItem('a11yFontSize', this.fontSize); localStorage.setItem('a11yHighContrast', this.highContrast); },
  addKeyboardNavigation: function() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
      if (e.key === 'Escape') { document.querySelectorAll('.modal, .share-menu, .newsletter-modal').forEach(function(m) { m.style.display = 'none'; }); }
    });
    document.addEventListener('mousedown', function() { document.body.classList.remove('keyboard-nav'); });
  },
  showAccessibilityPanel: function() {
    var panel = document.getElementById('a11yPanel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'a11yPanel';
      panel.className = 'a11y-panel';
      panel.innerHTML = '<h3>Accessibilità</h3><button onclick="Accessibility.decreaseFontSize()">A-</button><button onclick="Accessibility.resetFontSize()">A</button><button onclick="Accessibility.increaseFontSize()">A+</button><button onclick="Accessibility.toggleHighContrast()">Alto contrasto</button><button onclick="Accessibility.showAccessibilityPanel()">Chiudi</button>';
      document.body.appendChild(panel);
    }
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  },
  announceToScreenReader: function(message) {
    var announcer = document.getElementById('srAnnouncer');
    if (!announcer) { announcer = document.createElement('div'); announcer.id = 'srAnnouncer'; announcer.setAttribute('aria-live', 'polite'); announcer.className = 'sr-only'; document.body.appendChild(announcer); }
    announcer.textContent = message;
  }
};
document.addEventListener('DOMContentLoaded', function() { Accessibility.init(); });
window.Accessibility = Accessibility;