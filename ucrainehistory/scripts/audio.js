var AudioGuide = {
  audio: null,
  currentTrack: 0,
  tracks: [],
  isPlaying: false,
  init: function() {
    this.audio = new Audio();
    this.audio.addEventListener('ended', this.next.bind(this));
    this.loadTracks();
  },
  loadTracks: function() {
    this.tracks = [
      { id: 1, title: 'Introduzione', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 2, title: 'Kyiv', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 3, title: 'Holodomor', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
      { id: 4, title: 'Euromaidan', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
      { id: 5, title: 'Invasione 2022', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
    ];
  },
  play: function(trackId) {
    var track = this.tracks.find(function(t) { return t.id === trackId; });
    if (track) { this.audio.src = track.src; this.audio.play(); this.isPlaying = true; this.currentTrack = trackId; this.updateUI(); }
  },
  pause: function() { this.audio.pause(); this.isPlaying = false; this.updateUI(); },
  stop: function() { this.audio.pause(); this.audio.currentTime = 0; this.isPlaying = false; this.updateUI(); },
  next: function() { if (this.currentTrack < this.tracks.length) { this.play(this.currentTrack + 1); } else { this.stop(); } },
  prev: function() { if (this.currentTrack > 1) { this.play(this.currentTrack - 1); } },
  setVolume: function(value) { this.audio.volume = Math.max(0, Math.min(1, value)); },
  seek: function(percent) { if (this.audio.duration) { this.audio.currentTime = this.audio.duration * (percent / 100); } },
  updateUI: function() {
    var playBtn = document.getElementById('audioPlay');
    var pauseBtn = document.getElementById('audioPause');
    var trackTitle = document.getElementById('audioTrackTitle');
    if (playBtn) playBtn.style.display = this.isPlaying ? 'none' : 'inline-block';
    if (pauseBtn) pauseBtn.style.display = this.isPlaying ? 'inline-block' : 'none';
    if (trackTitle) { var track = this.tracks.find(function(t) { return t.id === AudioGuide.currentTrack; }); trackTitle.textContent = track ? track.title : ''; }
  },
  showPlayer: function() {
    var player = document.getElementById('audioPlayer');
    if (!player) {
      player = document.createElement('div');
      player.id = 'audioPlayer';
      player.className = 'audio-player';
      player.innerHTML = '<div class="audio-controls"><button onclick="AudioGuide.prev()">&#9198;</button><button id="audioPlay" onclick="AudioGuide.play(1)">&#9654;</button><button id="audioPause" onclick="AudioGuide.pause()" style="display:none">&#9646;&#9646;</button><button onclick="AudioGuide.stop()">&#9632;</button><button onclick="AudioGuide.next()">&#9197;</button><span id="audioTrackTitle"></span></div>';
      document.body.appendChild(player);
    }
    player.style.display = 'block';
  },
  hidePlayer: function() { var player = document.getElementById('audioPlayer'); if (player) player.style.display = 'none'; },
  speak: function(text, lang) { if ('speechSynthesis' in window) { var u = new SpeechSynthesisUtterance(text); u.lang = lang || 'it-IT'; u.rate = 0.9; speechSynthesis.speak(u); } },
  speakUkrainian: function(text) { this.speak(text, 'uk-UA'); },
  speakItalian: function(text) { this.speak(text, 'it-IT'); }
};
document.addEventListener('DOMContentLoaded', function() { AudioGuide.init(); });
window.AudioGuide = AudioGuide;