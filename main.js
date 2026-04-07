// =============================================
// MILLESVC STUDIO — main.js
// =============================================

// ── CURSOR PERSONALIZADO ──
(function () {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  // Mover dot instantáneamente
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    dot.classList.add('visible');
    ring.classList.add('visible');
  });

  // Ring sigue con lag suave
  (function animRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Ocultar al salir de la ventana
  document.addEventListener('mouseleave', () => {
    dot.classList.remove('visible');
    ring.classList.remove('visible');
  });
  document.addEventListener('mouseenter', () => {
    dot.classList.add('visible');
    ring.classList.add('visible');
  });

  // Efecto hover en elementos interactivos
  const HOVER_SEL = 'a, button, label, [onclick], select, .filter-btn, .tipo-card, .faq-q, .hamburger, .cta-btn-primary, .cta-btn-secondary, .nav-cta, .btn, .card, .srv-card, .srv-full-card, .pkg-card, .proy-card, .proceso-card, .contact-item, .wsp-btn';
  document.querySelectorAll(HOVER_SEL).forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });

  // Efecto click
  document.addEventListener('mousedown', () => { dot.classList.add('clicked'); ring.classList.add('clicked'); });
  document.addEventListener('mouseup',   () => { dot.classList.remove('clicked'); ring.classList.remove('clicked'); });
})();

// ── NAV SCROLL ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));
}

// ── ACTIVE NAV LINK ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('navbar').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navbar').classList.remove('open'));
});

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    let count = 0;
    const step = target / 55;
    const t = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = Math.floor(count) + suffix;
      if (count >= target) { el.textContent = target + suffix; clearInterval(t); }
    }, 22);
  });
}
const statsEl = document.querySelector('.stats-row');
if (statsEl) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); }
  }, { threshold: 0.4 }).observe(statsEl);
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── COTIZAR WIZARD ──
const PRESUPUESTOS = [
  '$80.000', '$120.000', '$150.000', '$200.000', '$250.000',
  '$300.000', '$400.000', '$500.000', '$600.000', '$800.000', '$1.000.000+'
];
let cotTipoSel = '';

window.updatePresupuesto = function (v) {
  const el = document.getElementById('presupuestoVal');
  if (el) el.textContent = PRESUPUESTOS[v] + ' CLP';
};

window.selectTipo = function (el, val) {
  document.querySelectorAll('.tipo-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  cotTipoSel = val;
  const btn = document.getElementById('btnNext1');
  if (btn) btn.disabled = false;
};

window.validarPag2 = function () {
  const n = document.getElementById('cotNombre')?.value.trim();
  const t = document.getElementById('cotTel')?.value.trim();
  const e = document.getElementById('cotEmail')?.value.trim();
  const btn = document.getElementById('btnNext2');
  if (btn) btn.disabled = !(n && t && e && e.includes('@'));
};

window.goStep = function (step) {
  [1, 2, 3].forEach(i => {
    document.getElementById('cpage' + i)?.classList.remove('active');
    const ind = document.getElementById('step-ind-' + i);
    if (!ind) return;
    ind.classList.remove('active', 'done');
    if (i < step) ind.classList.add('done');
    if (i === step) ind.classList.add('active');
  });
  document.getElementById('cpage' + step)?.classList.add('active');
  if (step === 3) fillResumen();
  document.getElementById('cotizar-section')?.scrollIntoView({ behavior: 'smooth' });
};

function fillResumen() {
  document.getElementById('r-tipo').textContent        = cotTipoSel;
  document.getElementById('r-presupuesto').textContent = PRESUPUESTOS[document.getElementById('presupuestoSlider').value] + ' CLP';
  document.getElementById('r-nombre').textContent      = document.getElementById('cotNombre').value;
  document.getElementById('r-tel').textContent         = document.getElementById('cotTel').value;
  document.getElementById('r-email').textContent       = document.getElementById('cotEmail').value;
  document.getElementById('r-empresa').textContent     = document.getElementById('cotEmpresa').value || 'No indicada';
  const nota = document.getElementById('cotNota').value;
  if (nota) { document.getElementById('r-nota').textContent = nota; document.getElementById('r-nota-wrap').style.display = 'block'; }
}

window.enviarCotizacion = function () {
  const tipo    = cotTipoSel;
  const presup  = PRESUPUESTOS[document.getElementById('presupuestoSlider').value] + ' CLP';
  const nombre  = document.getElementById('cotNombre').value;
  const tel     = document.getElementById('cotTel').value;
  const email   = document.getElementById('cotEmail').value;
  const empresa = document.getElementById('cotEmpresa').value || 'No indicada';
  const nota    = document.getElementById('cotNota').value    || 'Sin notas';
  const msg = `🌐 *Cotización — Millesvc Studio*\n\n📋 *Tipo:* ${tipo}\n💰 *Presupuesto:* ${presup}\n\n👤 *Nombre:* ${nombre}\n📱 *Tel:* ${tel}\n✉️ *Email:* ${email}\n🏢 *Empresa:* ${empresa}\n\n📝 *Notas:* ${nota}`;
  window.open(`https://wa.me/56990643785?text=${encodeURIComponent(msg)}`, '_blank');
  document.querySelectorAll('.cotizar-page').forEach(p => p.style.display = 'none');
  document.getElementById('cotizarSteps').style.display  = 'none';
  document.getElementById('cotizarSuccess').style.display = 'block';
};

// ── CONTACTO WSP ──
window.enviarContacto = function () {
  const nombre   = document.getElementById('ctcNombre')?.value   || 'Sin nombre';
  const tel      = document.getElementById('ctcTel')?.value      || 'Sin tel';
  const email    = document.getElementById('ctcEmail')?.value    || 'Sin email';
  const servicio = document.getElementById('ctcServicio')?.value || 'No indicado';
  const mensaje  = document.getElementById('ctcMensaje')?.value  || 'Sin mensaje';
  const txt = `👋 *Consulta — Millesvc Studio*\n\n*Nombre:* ${nombre}\n*Tel:* ${tel}\n*Email:* ${email}\n*Servicio:* ${servicio}\n*Mensaje:* ${mensaje}`;
  window.open(`https://wa.me/56990643785?text=${encodeURIComponent(txt)}`, '_blank');
};
