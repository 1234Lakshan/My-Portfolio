/* ============================================================
   P.D. LAKSHAN JANITH - PORTFOLIO
   File: js/main.js
   Description: All JavaScript logic for the portfolio
   ============================================================ */

/* ════════════════════════════════════════════
   1. CANVAS PARTICLE BACKGROUND
════════════════════════════════════════════ */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = (Math.random() - 0.5) * 0.25;
    this.alpha = Math.random() * 0.5 + 0.1;
    const colors = ['139,92,246', '6,182,212', '16,185,129', '236,72,153'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(139,92,246,${0.06 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, H * 0.3, 0, W / 2, H * 0.3, W * 0.6);
  g.addColorStop(0, 'rgba(139,92,246,0.04)');
  g.addColorStop(1, 'transparent');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateCanvas);
}
animateCanvas();


/* ════════════════════════════════════════════
   2. TYPEWRITER ANIMATION
════════════════════════════════════════════ */
const titles = [
  'Software Engineering Undergraduate',
  'Full Stack Web Developer',
  'Flutter Developer',
  'Entrepreneur',
  'AI Enthusiast'
];
let ti = 0, ci = 0, deleting = false;
const typed = document.getElementById('typed-text');
const cursor = document.getElementById('cursor');

function typeLoop() {
  const cur = titles[ti];
  if (!deleting) {
    typed.textContent = cur.slice(0, ci + 1);
    ci++;
    if (ci === cur.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typed.textContent = cur.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      ti = (ti + 1) % titles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 75);
}
typeLoop();
setInterval(() => {
  cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
}, 500);


/* ════════════════════════════════════════════
   3. NAVBAR — Scroll Effect & Active Link
════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active link highlight
  let current = '';
  document.querySelectorAll('section').forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Mobile menu toggle
document.getElementById('nav-toggle').onclick = () =>
  document.getElementById('mobile-menu').classList.add('open');
document.getElementById('mobile-close').onclick = closeMobile;

function closeMobile() {
  document.getElementById('mobile-menu').classList.remove('open');
}


/* ════════════════════════════════════════════
   4. SMOOTH SCROLL
════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ════════════════════════════════════════════
   5. SKILLS DATA & RENDERING
════════════════════════════════════════════ */
const skillsData = {
  languages: [
    { icon: '🌐', name: 'HTML5', pct: 95 },
    { icon: '🎨', name: 'CSS3', pct: 90 },
    { icon: '⚡', name: 'JavaScript', pct: 85 },
    { icon: '⚛️', name: 'React', pct: 80 },
    { icon: '🐘', name: 'PHP', pct: 75 },
    { icon: '☕', name: 'Java', pct: 70 },
    { icon: '📱', name: 'Flutter', pct: 75 },
    { icon: '🎯', name: 'Dart', pct: 70 },
  ],
  databases: [
    { icon: '🗄️', name: 'MySQL', pct: 85 },
    { icon: '🔥', name: 'Firebase', pct: 75 },
    { icon: '📦', name: 'SQLite', pct: 70 },
  ],
  tools: [
    { icon: '🐙', name: 'GitHub', pct: 90 },
    { icon: '💻', name: 'VS Code', pct: 95 },
    { icon: '🐧', name: 'Linux', pct: 70 },
    { icon: '📓', name: 'Jupyter', pct: 65 },
    { icon: '🖥️', name: 'WordPress', pct: 85 },
    { icon: '🎨', name: 'Figma', pct: 72 },
  ],
  ai: [
    { icon: '🤖', name: 'ChatGPT', pct: 95 },
    { icon: '💎', name: 'Gemini', pct: 90 },
    { icon: '🧠', name: 'Claude AI', pct: 88 },
    { icon: '🔍', name: 'Perplexity AI', pct: 85 },
    { icon: '🚀', name: 'Antigravity AI', pct: 80 },
    { icon: '🎨', name: 'Midjourney', pct: 75 },
  ]
};

function renderSkills(key) {
  const pane = document.getElementById('tab-' + key);
  pane.innerHTML = skillsData[key].map(s => `
    <div class="skill-card">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar"><div class="skill-fill" data-pct="${s.pct}"></div></div>
      <div class="skill-pct">${s.pct}%</div>
    </div>
  `).join('');
}
Object.keys(skillsData).forEach(k => renderSkills(k));

function switchTab(key, btn) {
  document.querySelectorAll('.skill-tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + key).classList.add('active');
  btn.classList.add('active');
  animateBars();
}

function animateBars() {
  document.querySelectorAll('.skill-tab-pane.active .skill-fill').forEach(el => {
    el.style.width = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.width = el.dataset.pct + '%';
    }));
  });
}
setTimeout(animateBars, 400);

// Professional Skills
const proSkills = [
  'Full Stack Development', 'WordPress Development', 'UI/UX Design',
  'Responsive Web Design', 'Mobile App Development', 'Database Design',
  'Digital Marketing', 'SEO', 'Business Management',
  'Team Leadership', 'Problem Solving', 'E-Commerce'
];
document.getElementById('pro-tags').innerHTML =
  proSkills.map(s => `<span class="tag">${s}</span>`).join('');


/* ════════════════════════════════════════════
   6. PROJECTS DATA & RENDERING
════════════════════════════════════════════ */
const projects = [
  {
    emoji: '🛒', badge: 'badge-web', type: 'Web App',
    name: 'MrLucky.lk – E-Commerce Platform',
    desc: 'A fully-featured e-commerce store with product management, order processing, payment integration, and a responsive modern UI.',
    tags: ['WordPress', 'WooCommerce', 'Domain & DNS Management', 'cPanel Hosting', 'MySQL'],
    github: 'N/A',
    demo: 'https://mrlucky.lk'
  },
  {
    emoji: '📚', badge: 'badge-web', type: 'Web App',
    name: 'Online Learning Management System',
    desc: 'A comprehensive LMS with student/admin portals, course management, live quizzes, and progress tracking with Firebase backend.',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    github: '#', demo: '#'
  },
  {
    emoji: '🏠', badge: 'badge-iot', type: 'IoT',
    name: 'Smart Home Monitoring System',
    desc: 'IoT project using ESP32, Flutter and MQTT. Supports real-time monitoring of temperature, gas detection, smart lighting and mobile notifications.',
    tags: ['ESP32', 'Flutter', 'MQTT', 'IoT'],
    github: '#', demo: '#'
  },
  {
    emoji: '🥁', badge: 'badge-iot', type: 'IoT',
    name: 'Arduino Octapad',
    desc: 'Digital drum system using Arduino sensors with real-time response. A creative blend of hardware engineering and software integration.',
    tags: ['Arduino', 'C++', 'Sensors', 'Audio'],
    github: '#', demo: '#'
  },
  {
    emoji: '🤖', badge: 'badge-ai', type: 'AI App',
    name: 'AI-Powered Content Generator',
    desc: 'A web app that uses OpenAI APIs to generate marketing content, blog posts, and product descriptions based on user prompts.',
    tags: ['React', 'OpenAI API', 'Node.js'],
    github: '#', demo: '#'
  },
  {
    emoji: '📱', badge: 'badge-mobile', type: 'Mobile',
    name: 'Student Attendance App',
    desc: 'Flutter mobile app for universities with QR-code attendance marking, Firebase sync, and admin dashboard with reports.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API'],
    github: '#', demo: '#'
  },
];

document.getElementById('projects-grid').innerHTML = projects.map(p => `
  <div class="project-card reveal">
    <div class="project-img-placeholder"
      style="background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(6,182,212,0.1));">
      ${p.emoji}
    </div>
    <div class="project-body">
      <span class="project-badge ${p.badge}">${p.type}</span>
      <div class="project-name">${p.name}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${p.github}" class="project-link"><i class="fab fa-github"></i> Source</a>
        <a href="${p.demo}" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>
      </div>
    </div>
  </div>
`).join('');


/* ════════════════════════════════════════════
   7. SERVICES DATA & RENDERING
════════════════════════════════════════════ */
const services = [
  { icon: 'fa-code', name: 'Web Development', desc: 'Custom, responsive websites built with modern technologies focusing on performance and great user experience.' },
  { icon: 'fa-wordpress', name: 'WordPress Development', desc: 'Custom themes, plugins, and full website setups using WordPress for easy content management.' },
  { icon: 'fa-shopping-cart', name: 'E-Commerce Solutions', desc: 'Secure, scalable online stores with payment gateway integrations and inventory management.' },
  { icon: 'fa-mobile-alt', name: 'Mobile App Development', desc: 'Cross-platform mobile applications using Flutter for iOS and Android devices.' },
  { icon: 'fa-paint-brush', name: 'UI/UX Design', desc: 'Intuitive, beautiful interfaces designed in Figma with user-centric design principles.' },
  { icon: 'fa-tools', name: 'Website Maintenance', desc: 'Ongoing updates, security checks, and performance optimizations to keep your site running smoothly.' },
  { icon: 'fa-search', name: 'SEO Optimization', desc: 'Improving website visibility on search engines through technical SEO and content strategies.' },
  { icon: 'fa-robot', name: 'AI Integration', desc: 'Integrating AI tools and APIs to automate workflows and add intelligent features to your products.' },
];

document.getElementById('services-grid').innerHTML = services.map(s => `
  <div class="service-card reveal">
    <div class="service-icon"><i class="fas ${s.icon}"></i></div>
    <div class="service-name">${s.name}</div>
    <div class="service-desc">${s.desc}</div>
  </div>
`).join('');


/* ════════════════════════════════════════════
   8. SCROLL REVEAL ANIMATION
════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

function observeAll() {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => revealObserver.observe(el));
}
observeAll();
setTimeout(observeAll, 300); // Re-observe after dynamic content renders

// Animate skill bars on scroll
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(el => {
        el.style.width = el.dataset.pct + '%';
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-tab-pane').forEach(p => barObserver.observe(p));


/* ════════════════════════════════════════════
   9. CONTACT FORM
════════════════════════════════════════════ */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const status = document.getElementById('form-status');

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // Simulate form submission (replace with real backend/EmailJS)
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    status.className = 'success';
    status.textContent = "✅ Message sent! I'll get back to you soon.";
    e.target.reset();
    setTimeout(() => { status.className = ''; status.textContent = ''; }, 5000);
  }, 1800);
}
