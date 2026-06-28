var ShareUtils = {
  shareUrl: function(url, title) {
    url = url || window.location.href;
    title = title || document.title;
    if (navigator.share) {
      navigator.share({ title: title, url: url }).catch(function() {});
    } else {
      this.showShareMenu(url, title);
    }
  },
  showShareMenu: function(url, title) {
    var menu = document.getElementById('shareMenu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'shareMenu';
      menu.className = 'share-menu';
      menu.innerHTML = '<div class="share-menu-content"><h4>Condividi</h4>' +
        '<a href="https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title) + '" target="_blank" class="share-btn twitter">Twitter</a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '" target="_blank" class="share-btn facebook">Facebook</a>' +
        '<a href="https://api.whatsapp.com/send?text=' + encodeURIComponent(title + ' ' + url) + '" target="_blank" class="share-btn whatsapp">WhatsApp</a>' +
        '<a href="mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(url) + '" class="share-btn email">Email</a>' +
        '<button class="share-btn copy" onclick="ShareUtils.copyUrl()">Copia link</button>' +
        '<button class="share-close" onclick="ShareUtils.closeShareMenu()">Chiudi</button>' +
        '</div>';
      document.body.appendChild(menu);
    }
    menu.style.display = 'flex';
  },
  closeShareMenu: function() {
    var menu = document.getElementById('shareMenu');
    if (menu) menu.style.display = 'none';
  },
  copyUrl: function() {
    navigator.clipboard.writeText(window.location.href).then(function() {
      alert('Link copiato!');
      ShareUtils.closeShareMenu();
    });
  },
  printPage: function() {
    window.print();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  var style = document.createElement('style');
  style.textContent = '.share-menu{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:none;align-items:center;justify-content:center;z-index:10000}.share-menu-content{background:#fff;padding:2rem;border-radius:12px;max-width:400px;width:90%}.share-menu-content h4{margin-bottom:1rem;color:#101820}.share-btn{display:block;padding:.75rem 1rem;margin:.5rem 0;border-radius:8px;text-decoration:none;color:#fff;text-align:center;cursor:pointer;border:none;font-size:1rem;width:100%}.share-btn.twitter{background:#1da1f2}.share-btn.facebook{background:#4267b2}.share-btn.whatsapp{background:#25d366}.share-btn.email{background:#ea4335}.share-btn.copy{background:#6c757d}.share-close{background:transparent;color:#6c757d;margin-top:1rem}';
  document.head.appendChild(style);
});

window.ShareUtils = ShareUtils;