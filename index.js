/* ── Mobile menu ── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn  = document.getElementById('hamburgerBtn');
  const open = menu.classList.toggle('open');
  btn.classList.toggle('active', open);
  btn.setAttribute('aria-expanded', open);
  // Prevent body scroll while menu is open
  document.body.style.overflow = open ? 'hidden' : '';
}

/* Close menu if viewport widens past 768px */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const menu = document.getElementById('mobileMenu');
    const btn  = document.getElementById('hamburgerBtn');
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
});

/* ── Booking modal ── */
function openBooking() {
  const modal = document.getElementById('bookingModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Focus first input for accessibility
  setTimeout(() => modal.querySelector('.modal-input')?.focus(), 100);
}

function closeBooking() {
  document.getElementById('bookingModal').classList.remove('active');
  document.body.style.overflow = '';
}

function submitBooking() {
  const btn = document.querySelector('.modal-submit');
  btn.textContent = '✓ Request Sent! We\'ll Call Soon';
  btn.style.background = '#2A3D1C';
  btn.disabled = true;
  setTimeout(closeBooking, 2200);
}

/* Close on backdrop click */
document.getElementById('bookingModal').addEventListener('click', e => {
  if (e.target === document.getElementById('bookingModal')) closeBooking();
});

/* Close on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBooking();
});

/* ── Scroll-reveal (IntersectionObserver) ── */
const fadeEls   = document.querySelectorAll('.fade-up');
const ioOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, ioOptions);
fadeEls.forEach(el => io.observe(el));

/* ── Nav shadow on scroll ── */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.style.boxShadow = window.scrollY > 40
    ? '0 4px 28px rgba(26,18,8,0.45)'
    : 'none';
}, { passive: true });