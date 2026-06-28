var Newsletter = {
  STORAGE_KEY: 'skyyNewsletter',
  subscribe: function(email) {
    if (!this.isValidEmail(email)) return { success: false, message: 'Email non valida' };
    var subscribers = this.getSubscribers();
    if (subscribers.indexOf(email) !== -1) return { success: false, message: 'Email già iscritta' };
    subscribers.push(email);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subscribers));
    return { success: true, message: 'Iscrizione completata!' };
  },
  unsubscribe: function(email) {
    var subscribers = this.getSubscribers();
    var index = subscribers.indexOf(email);
    if (index > -1) { subscribers.splice(index, 1); localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subscribers)); return { success: true, message: 'Disiscrizione completata' }; }
    return { success: false, message: 'Email non trovata' };
  },
  isSubscribed: function(email) { return this.getSubscribers().indexOf(email) !== -1; },
  getSubscribers: function() { try { var s = localStorage.getItem(this.STORAGE_KEY); if (s) return JSON.parse(s); } catch (e) {}; return []; },
  isValidEmail: function(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); },
  showSubscribeForm: function() {
    var modal = document.getElementById('newsletterModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'newsletterModal';
      modal.className = 'newsletter-modal';
      modal.innerHTML = '<div class="newsletter-modal-content"><h3>Iscriviti alla Newsletter</h3><p>Ricevi aggiornamenti sulla storia ucraina</p><input type="email" id="newsletterEmail" placeholder="La tua email"><button onclick="Newsletter.handleSubscribe()">Iscriviti</button><button onclick="Newsletter.closeForm()">Chiudi</button><p id="newsletterMessage"></p></div>';
      document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
  },
  closeForm: function() { var m = document.getElementById('newsletterModal'); if (m) m.style.display = 'none'; },
  handleSubscribe: function() {
    var email = document.getElementById('newsletterEmail').value;
    var result = this.subscribe(email);
    var msg = document.getElementById('newsletterMessage');
    msg.textContent = result.message;
    msg.style.color = result.success ? '#4ade80' : '#b23b2e';
  }
};
window.Newsletter = Newsletter;