/* -------------- Custom Cursor -------------- */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top  = e.clientY + 'px';
  }, 80);
});

/* -------------- Falling Petals -------------- */
const petalsContainer = document.getElementById('petalsContainer');
const petalSymbols = ['🌸','🌹','🌺','🌷','💮','✿','❀','🏵️'];
function createPetal() {
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
  const dur = 6 + Math.random() * 8;
  p.style.animationDuration = dur + 's';
  p.style.animationDelay = '-' + (Math.random() * dur) + 's';
  petalsContainer.appendChild(p);
  setTimeout(() => p.remove(), dur * 1000 + 500);
}
setInterval(createPetal, 350);

/* -------------- Background Hearts -------------- */
const heartsBg = document.getElementById('heartsBg');
const hearts = ['💗','💓','💕','💞','❤️','🤍'];
for (let i = 0; i < 18; i++) {
  const h = document.createElement('div');
  h.className = 'bg-heart';
  h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.top  = Math.random() * 100 + 'vh';
  h.style.fontSize = (1.5 + Math.random() * 3) + 'rem';
  h.style.animationDuration = (3 + Math.random() * 4) + 's';
  h.style.animationDelay = '-' + (Math.random() * 5) + 's';
  heartsBg.appendChild(h);
}

/* -------------- Scroll Observer -------------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.section').forEach(s => observer.observe(s));

/* -------------- Letter Date -------------- */
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const today = new Date();
document.getElementById('letter-date').textContent =
  months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();

/* -------------- Countdown (since start of today) -------------- */
function updateCountdown() {
  const now = new Date();
  let birthdayStart = new Date(now.getFullYear(), 5, 6, 0, 0, 0);
  let birthdayEnd = new Date(now.getFullYear(), 5, 7, 0, 0, 0);
  const note = document.getElementById('countdown-note');

  if (now >= birthdayEnd) {
    birthdayStart = new Date(now.getFullYear() + 1, 5, 6, 0, 0, 0);
    birthdayEnd = new Date(now.getFullYear() + 1, 5, 7, 0, 0, 0);
  }

  let diff;
  if (now >= birthdayStart && now < birthdayEnd) {
    diff = Math.floor((now - birthdayStart) / 1000);
    if (note) note.textContent = 'His birthday celebration began at 12:00 AM on June 6 🎂';
  } else {
    diff = Math.floor((birthdayStart - now) / 1000);
    if (note) note.textContent = 'Until June 6 at 12:00 AM, when your birthday begins 🌹';
  }
  const days  = Math.floor(diff / 86400);
  diff %= 86400;
  const hours = Math.floor(diff / 3600);
  diff %= 3600;
  const mins  = Math.floor(diff / 60);
  const secs  = diff % 60;
  document.getElementById('cd-days').textContent  = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* -------------- Fireworks -------------- */
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y; this.color = color;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10 - 3;
    this.alpha = 1; this.radius = Math.random() * 3 + 1;
    this.gravity = 0.15; this.decay = 0.015 + Math.random() * 0.01;
  }
  update() {
    this.vx *= 0.98; this.vy += this.gravity;
    this.x += this.vx; this.y += this.vy;
    this.alpha -= this.decay;
  }
  draw() {
    ctx.save(); ctx.globalAlpha = this.alpha;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color; ctx.fill(); ctx.restore();
  }
}

let particles = [];
let animating = false;

function launchFirework(x, y) {
  const palette = ['#c0392b','#e8a0a0','#c9a84c','#f0d080','#fff5f5','#ff6b8a','#ffd700'];
  const count = 80 + Math.floor(Math.random() * 60);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, palette[Math.floor(Math.random() * palette.length)]));
  }
}

function animateFireworks() {
  if (!animating) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.alpha > 0);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateFireworks);
}

let fwInterval;
let birthdaySongPlaying = false;

function rainFlowersAndHearts() {
  const symbols = ['🌹','🌸','🌷','💐','💖','💕','💗','❤️','🎂','✨'];
  for (let i = 0; i < 95; i++) {
    setTimeout(() => {
      const drop = document.createElement('div');
      drop.className = 'celebration-drop';
      drop.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.fontSize = (1.1 + Math.random() * 1.9) + 'rem';
      drop.style.animationDuration = (3.2 + Math.random() * 3.8) + 's';
      drop.style.setProperty('--drift', ((Math.random() - 0.5) * 220) + 'px');
      drop.style.setProperty('--spin', ((Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 540)) + 'deg');
      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 7600);
    }, i * 45);
  }
}

function launchBalloons() {
  const colors = [
    ['#ffd1dc', '#c0392b'],
    ['#fff0a6', '#c9a84c'],
    ['#b6f2ff', '#1f7a9a'],
    ['#d7c2ff', '#7b4acb'],
    ['#c7ffd8', '#2b9c5c'],
    ['#ffc6a8', '#d65c32']
  ];

  for (let i = 0; i < 34; i++) {
    setTimeout(() => {
      const balloon = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      balloon.className = 'balloon';
      balloon.style.left = Math.random() * 100 + 'vw';
      balloon.style.setProperty('--balloon-light', color[0]);
      balloon.style.setProperty('--balloon-dark', color[1]);
      balloon.style.setProperty('--sway', ((Math.random() - 0.5) * 240) + 'px');
      balloon.style.setProperty('--duration', (5.5 + Math.random() * 2.8) + 's');
      balloon.style.transform = 'scale(' + (0.75 + Math.random() * 0.65) + ')';
      document.body.appendChild(balloon);
      setTimeout(() => balloon.remove(), 8800);
    }, i * 95);
  }
}

function playHappyBirthdaySong() {
  if (birthdaySongPlaying) return;
  birthdaySongPlaying = true;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    birthdaySongPlaying = false;
    return;
  }

  const audioCtx = new AudioContext();
  const notes = [
    ['G4',0.28],['G4',0.28],['A4',0.56],['G4',0.56],['C5',0.56],['B4',0.9],
    ['G4',0.28],['G4',0.28],['A4',0.56],['G4',0.56],['D5',0.56],['C5',0.9],
    ['G4',0.28],['G4',0.28],['G5',0.56],['E5',0.56],['C5',0.56],['B4',0.56],['A4',1],
    ['F5',0.28],['F5',0.28],['E5',0.56],['C5',0.56],['D5',0.56],['C5',1.15]
  ];
  const frequencies = {
    G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25,
    D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99
  };
  let time = audioCtx.currentTime + 0.05;

  notes.forEach(([note, duration]) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequencies[note];
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.22, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration - 0.03);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + duration);
    time += duration + 0.06;
  });

  setTimeout(() => {
    audioCtx.close();
    birthdaySongPlaying = false;
  }, Math.ceil((time - audioCtx.currentTime + 0.3) * 1000));
}

function celebrateExplosion() {
  launchBalloons();
  rainFlowersAndHearts();
  try { playHappyBirthdaySong(); } catch (err) { birthdaySongPlaying = false; }
  animating = true;
  animateFireworks();
  let count = 0;
  clearInterval(fwInterval);
  fwInterval = setInterval(() => {
    const x = 100 + Math.random() * (window.innerWidth - 200);
    const y = 100 + Math.random() * (window.innerHeight * 0.6);
    launchFirework(x, y);
    count++;
    if (count >= 20) {
      clearInterval(fwInterval);
      setTimeout(() => { animating = false; ctx.clearRect(0,0,canvas.width,canvas.height); }, 3000);
    }
  }, 250);
}

/* Auto-launch on load after 2s */
setTimeout(() => {
  animating = true;
  animateFireworks();
  let c = 0;
  const auto = setInterval(() => {
    const x = 100 + Math.random() * (window.innerWidth - 200);
    const y = 80 + Math.random() * (window.innerHeight * 0.5);
    launchFirework(x, y);
    c++;
    if (c >= 10) {
      clearInterval(auto);
      setTimeout(() => { animating = false; ctx.clearRect(0,0,canvas.width,canvas.height); }, 3000);
    }
  }, 300);
}, 2000);

/* -------------- Click hearts on canvas -------------- */
function openPersonalLetter() {
  const letter = document.getElementById('personalLetter');
  const button = document.getElementById('letterOpenBtn');
  const hint = document.querySelector('.letter-hint');
  letter.classList.add('open');
  button.setAttribute('aria-expanded', 'true');
  button.style.display = 'none';
  if (hint) hint.style.display = 'none';
  setTimeout(() => letter.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
  celebrateExplosion();
}

document.addEventListener('click', e => {
  if (e.target.id === 'celebrateBtn') return;
  launchFirework(e.clientX, e.clientY);
  if (!animating) { animating = true; animateFireworks(); }
  setTimeout(() => {
    if (particles.length === 0) { animating = false; ctx.clearRect(0,0,canvas.width,canvas.height); }
  }, 4000);
});

document.addEventListener('click', e => {
  const celebrateButton = e.target.closest('#celebrateBtn');
  if (!celebrateButton) return;
  e.preventDefault();
  celebrateExplosion();
});



