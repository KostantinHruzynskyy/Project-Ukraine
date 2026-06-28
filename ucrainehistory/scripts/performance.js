var Performance = {
  init: function() { this.preloadCriticalResources(); this.deferNonCritical(); this.monitorWebVitals(); },
  preloadCriticalResources: function() {
    ['https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css'].forEach(function(url) {
      var link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'style';
      document.head.appendChild(link);
    });
  },
  deferNonCritical: function() {
    window.addEventListener('load', function() {
      setTimeout(function() {
        ['map.js', 'audio.js', 'share.js', 'admin.js', 'translate.js', 'accessibility.js'].forEach(function(src) {
          var script = document.createElement('script');
          script.src = '../scripts/' + src;
          script.defer = true;
          document.body.appendChild(script);
        });
      }, 2000);
    });
  },
  monitorWebVitals: function() {
    if ('PerformanceObserver' in window) {
      try {
        var lcpObserver = new PerformanceObserver(function(entryList) {
          var entries = entryList.getEntries();
          console.log('LCP:', entries[entries.length - 1].startTime);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {}
    }
  },
  lazyLoadImages: function() {
    if ('IntersectionObserver' in window) {
      var imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
            img.setAttribute('loading', 'lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      document.querySelectorAll('img:not([loading])').forEach(function(img) {
        if (img.src && !img.src.includes('data:')) {
          img.dataset.src = img.src;
          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
          imageObserver.observe(img);
        }
      });
    }
  }
};
document.addEventListener('DOMContentLoaded', function() { Performance.init(); });
window.Performance = Performance;