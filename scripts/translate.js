var Translator = {
  currentLang: 'it',
  translations: {
    it: { home: 'Home', events: 'Eventi', war: 'Guerra', study: 'Studio', resources: 'Risorse', explore: 'Esplora' },
    en: { home: 'Home', events: 'Events', war: 'War', study: 'Study', resources: 'Resources', explore: 'Explore' },
    uk: { home: 'Головна', events: 'Події', war: 'Війна', study: 'Навчання', resources: 'Ресурси', explore: 'Дослідити' },
    fr: { home: 'Accueil', events: 'Événements', war: 'Guerre', study: 'Étude', resources: 'Ressources', explore: 'Explorer' },
    de: { home: 'Startseite', events: 'Ereignisse', war: 'Krieg', study: 'Lernen', resources: 'Ressourcen', explore: 'Entdecken' }
  },
  init: function() {
    var saved = localStorage.getItem('skyyLang');
    if (saved) this.currentLang = saved;
    this.applyTranslations();
  },
  setLang: function(lang) {
    this.currentLang = lang;
    localStorage.setItem('skyyLang', lang);
    this.applyTranslations();
  },
  get: function(key) {
    return this.translations[this.currentLang][key] || key;
  },
  applyTranslations: function() {
    var t = this.translations[this.currentLang];
    document.querySelectorAll('[data-translate]').forEach(function(el) {
      var key = el.getAttribute('data-translate');
      if (t[key]) el.textContent = t[key];
    });
  },
  translatePage: function(targetLang) {
    if (targetLang === 'it') { this.setLang('it'); return; }
    var currentUrl = encodeURIComponent(window.location.href);
    var translateUrl = 'https://translate.google.com/translate?sl=it&tl=' + targetLang + '&u=' + currentUrl;
    window.open(translateUrl, '_blank');
  }
};
document.addEventListener('DOMContentLoaded', function() { Translator.init(); });
window.Translator = Translator;