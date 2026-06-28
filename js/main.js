document.addEventListener('DOMContentLoaded', () => {
  console.log('Space Projects 236 loaded');

  // Members dropdown: click toggle on touch/mobile, hover handled by CSS on desktop
  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-dropdown.open').forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });

  // Membership option cards (contact.html) — clicking the card selects its radio
  document.querySelectorAll('.membership-option').forEach((option) => {
    const radio = option.querySelector('input[type="radio"]');
    if (!radio) return;
    const syncSelected = () => {
      const name = radio.name;
      document.querySelectorAll(`input[name="${name}"]`).forEach((r) => {
        r.closest('.membership-option').classList.toggle('selected', r.checked);
      });
    };
    radio.addEventListener('change', syncSelected);
  });

  // Form submission — prevent default, show success banner
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const banner = form.querySelector('.success-banner');
      if (banner) {
        banner.classList.add('visible');
      }
    });
  });

  // Smooth scroll for in-page anchor links
  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    const url = new URL(link.href, window.location.href);
    const isSamePage = url.pathname === window.location.pathname;
    if (!isSamePage || !url.hash) return;
    link.addEventListener('click', (e) => {
      const target = document.querySelector(url.hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Active nav link highlighting based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > a, .nav-dropdown-menu a').forEach((link) => {
    const linkPath = link.getAttribute('href').split('#')[0] || 'index.html';
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});
