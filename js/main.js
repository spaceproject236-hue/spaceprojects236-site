// Force scroll to top on every page load, including back/forward navigation
function forceScrollTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

forceScrollTop();
window.addEventListener('load', forceScrollTop);
window.addEventListener('pageshow', forceScrollTop);

document.addEventListener('DOMContentLoaded', () => {
  console.log('Space Projects 236 loaded');

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked (but not the Members dropdown toggle)
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

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

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      emailjs.sendForm('service_t694b8o', 'sp236_contact_form', contactForm)
        .then(function() {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          const banner = document.createElement('div');
          banner.style.cssText = 'background:#eafaf1; border:1px solid #2a9d5c; color:#1a5c35; padding:16px 20px; border-radius:8px; margin-top:16px; font-size:14px; text-align:center;';
          banner.innerHTML = '✅ Thanks! We\'ll be in touch within 24 hours. 🚀';
          contactForm.appendChild(banner);
          contactForm.reset();
        }, function(error) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          const banner = document.createElement('div');
          banner.style.cssText = 'background:#fdf0ef; border:1px solid #c0392b; color:#7b2d2d; padding:16px 20px; border-radius:8px; margin-top:16px; font-size:14px; text-align:center;';
          banner.innerHTML = '❌ Something went wrong. Please email us directly at brandon@spaceprojects236.com';
          contactForm.appendChild(banner);
        });
    });
  }

  // Members/Space Cadet signup form submission
  const membersForm = document.getElementById('members-form');
  if (membersForm) {
    membersForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = membersForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Launching...';
      submitBtn.disabled = true;

      emailjs.sendForm('service_t694b8o', 'sp236_contact_form', membersForm)
        .then(function() {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          const banner = document.createElement('div');
          banner.style.cssText = 'background:#eafaf1; border:1px solid #2a9d5c; color:#1a5c35; padding:16px 20px; border-radius:8px; margin-top:16px; font-size:14px; text-align:center;';
          banner.innerHTML = '🚀 Welcome to the crew! We\'ll be in touch within 24 hours to get you set up.';
          membersForm.appendChild(banner);
          membersForm.reset();
        }, function(error) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          const banner = document.createElement('div');
          banner.style.cssText = 'background:#fdf0ef; border:1px solid #c0392b; color:#7b2d2d; padding:16px 20px; border-radius:8px; margin-top:16px; font-size:14px; text-align:center;';
          banner.innerHTML = '❌ Something went wrong. Please email us directly at brandon@spaceprojects236.com';
          membersForm.appendChild(banner);
        });
    });
  }

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

  // Active nav link highlighting
  const allNavLinks = document.querySelectorAll('.nav-links a');
  let currentPage = window.location.pathname;

  // Normalize: remove leading slash, handle root, remove trailing slash
  currentPage = currentPage.replace(/^\//, '').replace(/\/$/, '');
  if (currentPage === '' || currentPage === '/') currentPage = 'index.html';
  if (!currentPage.includes('.')) currentPage = currentPage + '.html';

  allNavLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (!href) return;

    // Get just the page filename from the href, ignore hash
    let linkPage = href.split('#')[0].split('/').pop();
    if (!linkPage || linkPage === '') linkPage = 'index.html';
    if (!linkPage.includes('.')) linkPage = linkPage + '.html';

    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // Also highlight Members dropdown toggle when on a members-related page
  const membersToggle = document.querySelector('.nav-dropdown-toggle');
  if (membersToggle) {
    const membersPages = ['members.html'];
    if (membersPages.includes(currentPage)) {
      membersToggle.classList.add('active');
      membersToggle.style.color = '#4da6ff';
    }
  }
});
