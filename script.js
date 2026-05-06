/* ========================================
   ELECTION LENS — JAVASCRIPT
   Nishant Anand | INT557 | 2025-26
   ======================================== */

'use strict';

// ============ CURSOR ============
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity = '1';
  cursorRing.style.opacity = '0.6';
});

// ============ PARTICLE CANVAS ============
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = -(Math.random() * 0.4 + 0.1);
    this.opacity = Math.random() * 0.6 + 0.1;
    this.color = Math.random() > 0.7 ? '#1ad4a3' : '#f4a017';
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.life > this.maxLife) this.reset();
    // Mouse repulsion
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      this.x += (dx / dist) * 1.5;
      this.y += (dy / dist) * 1.5;
    }
  }
  draw() {
    const fadeIn = Math.min(this.life / 30, 1);
    const fadeOut = Math.min((this.maxLife - this.life) / 30, 1);
    const alpha = this.opacity * fadeIn * fadeOut;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Connection lines
function drawConnections(particles) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 100) * 0.08;
        ctx.strokeStyle = '#f4a017';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

const particles = Array.from({ length: 90 }, () => new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections(particles);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ============ NAVBAR SCROLL ============
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============ SCROLL REVEAL (IntersectionObserver) ============
const revealEls = document.querySelectorAll(
  '.viz-card, .obj-card, .finding-card, .fact-card, .insight-box, ' +
  '.about-grid, .swing-banner, .party-battle, .model-race, ' +
  '.north-south-banner, .women-progress, .contact-card, .section-title'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ BAR ANIMATIONS (triggered on scroll) ============
function animateBars() {
  // Party battle bars
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const target = bar.dataset.width;
    bar.style.width = target + '%';
  });

  // Model bars
  document.querySelectorAll('.model-bar-fill').forEach(bar => {
    // Remap: 92.68-92.91 range → visual 88-100 range for better display
    const pct = parseFloat(bar.dataset.width);
    const visual = 85 + ((pct - 92) / 1.5) * 13;
    bar.style.width = Math.min(Math.max(visual, 85), 100) + '%';
  });
}

// Progress bar for women
function animateProgressBars() {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const target = parseFloat(bar.dataset.width);
    bar.style.width = target + '%';
  });
}

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(animateBars, 200);
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(animateProgressBars, 300);
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const partyBattle = document.querySelector('.party-battle');
if (partyBattle) barObserver.observe(partyBattle);

const modelRace = document.querySelector('.model-race');
if (modelRace) barObserver.observe(modelRace);

const progressBar = document.querySelector('.women-progress');
if (progressBar) progressObserver.observe(progressBar);

// ============ LIGHTBOX ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxOverlay = document.querySelector('.lightbox-overlay');

document.querySelectorAll('.viz-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const caption = card.querySelector('.viz-caption');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    lightboxImg.src = '';
  }, 300);
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ============ SMOOTH NAV LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============ ACTIVE NAV HIGHLIGHT ============
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.style.color = '');
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// ============ DYNAMIC COUNTER ANIMATION ============
function animateCounter(el, end, duration = 1500) {
  const start = 0;
  const range = end - start;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + range * eased).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ============ GLOWING BORDER HOVER ON CARDS ============
document.querySelectorAll('.obj-card, .finding-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(244,160,23,0.06), var(--bg-card) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ============ PARALLAX ON HERO BG TEXT ============
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const bgText = document.querySelector('.hero-bg-text');
  if (bgText) {
    bgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
  }
});

// ============ PAGE LOAD SEQUENCE ============
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ============ VIZ CARD TILT EFFECT ============
document.querySelectorAll('.viz-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${xRel * 4}deg) rotateX(${-yRel * 4}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============ TYPING EFFECT FOR TICKER (subtle reinforce) ============
// Already handled by CSS animation, no extra needed.

// ============ SECTION PROGRESS INDICATOR ============
const progressIndicator = document.createElement('div');
progressIndicator.style.cssText = `
  position: fixed; top: 0; left: 0;
  height: 2px; width: 0;
  background: linear-gradient(to right, #f4a017, #1ad4a3);
  z-index: 9999;
  transition: width 0.1s ease;
  box-shadow: 0 0 8px rgba(244,160,23,0.5);
`;
document.body.appendChild(progressIndicator);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  progressIndicator.style.width = pct + '%';
});

// ============ OBJ CARDS — STAGGERED ENTRANCE ============
const objCards = document.querySelectorAll('.obj-card');
const objObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80 * (Array.from(objCards).indexOf(entry.target) % 4));
      objObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

objCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
  objObserver.observe(card);
});

// ============ FINDING CARDS — STAGGERED ENTRANCE ============
const findCards = document.querySelectorAll('.finding-card');
const findObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = Array.from(findCards).indexOf(entry.target);
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 70 * (idx % 3));
      findObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

findCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
  findObserver.observe(card);
});

// ============ EASTER EGG — KONAMI CODE ============
let konamiSeq = [];
const konamiCode = [38,38,40,40,37,39,37,39,66,65];
document.addEventListener('keydown', (e) => {
  konamiSeq.push(e.keyCode);
  if (konamiSeq.length > 10) konamiSeq.shift();
  if (JSON.stringify(konamiSeq) === JSON.stringify(konamiCode)) {
    document.body.style.transition = 'filter 0.5s ease';
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => document.body.style.filter = '', 2000);
  }
});

console.log(
  '%c🗳️ Election Lens\n%cIndian Lok Sabha Election Analysis & Prediction\nBuilt by Nishant Anand — INT557 Data Science with Python 2025-26',
  'color: #f4a017; font-size: 20px; font-weight: bold;',
  'color: #8a9abf; font-size: 12px;'
);
