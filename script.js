emailjs.init('CqZOjoTB78vWzsxg3'); 

const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

// Load saved theme, or detect system preference as fallback
const savedTheme     = localStorage.getItem('theme');
const prefersDark    = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme   = savedTheme ?? (prefersDark ? 'dark' : 'light');

applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

function toggleMenu() {
  const isOpen = mobileNav.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
}

function openMenu() {
  hamburger.classList.add('open');
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

const phrases = [
  'Aspiring AI/ML Engineer',
  'Computer Science Student',
  'Ethical Hacking Enthusiast',
  'Building Tomorrow\'s Tech',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;

const typedText  = document.getElementById('typedText');

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  // Finished typing — pause then start deleting
  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => { isDeleting = true; }, 2200);
  }

  // Finished deleting — move to next phrase
  if (isDeleting && charIndex === 0) {
    isDeleting   = false;
    phraseIndex  = (phraseIndex + 1) % phrases.length;
  }

  const speed = isDeleting ? 55 : 95;
  setTimeout(type, speed);
}

// Small initial delay before typing starts
setTimeout(type, 500);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Use a small staggered delay based on position
        const delay = i * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('.counter-num').forEach(el => counterObserver.observe(el));

/**
 * Counts up from 0 to data-target using an ease-out cubic curve.
 * @param {HTMLElement} el — the element to animate
 */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1600; // ms
  const startTime = performance.now();

  function update(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic: decelerates toward end
    const eased = 1 - Math.pow(1 - progress, 3);

    el.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target; // Ensure exact final value
    }
  }

  requestAnimationFrame(update);
}


const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', highlightNav, { passive: true });

function highlightNav() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      navAnchors.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

const contactForm   = document.getElementById('contactForm');
const nameInput     = document.getElementById('name');
const emailInput    = document.getElementById('email');
const messageInput  = document.getElementById('message');
const nameError     = document.getElementById('nameError');
const emailError    = document.getElementById('emailError');
const messageError  = document.getElementById('messageError');
const formStatus    = document.getElementById('formStatus');
const submitBtn     = document.getElementById('submitBtn');
const btnText       = document.getElementById('btnText');
const btnIcon       = document.getElementById('btnIcon');

// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  // --- Client-side validation ---
  let isValid = true;

  const nameVal    = nameInput.value.trim();
  const emailVal   = emailInput.value.trim();
  const messageVal = messageInput.value.trim();

  if (!nameVal) {
    showError(nameInput, nameError, 'Name is required.');
    isValid = false;
  } else if (nameVal.length < 2) {
    showError(nameInput, nameError, 'Name must be at least 2 characters.');
    isValid = false;
  }

  if (!emailVal) {
    showError(emailInput, emailError, 'Email address is required.');
    isValid = false;
  } else if (!emailRegex.test(emailVal)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    isValid = false;
  }

  if (!messageVal) {
    showError(messageInput, messageError, 'Message cannot be empty.');
    isValid = false;
  } else if (messageVal.length < 10) {
    showError(messageInput, messageError, 'Message must be at least 10 characters.');
    isValid = false;
  }

  if (!isValid) return;

  // --- Send via EmailJS ---
  setSubmitting(true);

  try {
    await emailjs.send(
      'service_t8eql4j',   
      'template_opk7atv',  
      {
        from_name:  nameVal,
        from_email: emailVal,
        message:    messageVal,
        reply_to:   emailVal,
      }
    );

    setStatus('✓ Message sent! I\'ll get back to you soon.', 'success');
    contactForm.reset();

  } catch (err) {
    console.error('EmailJS error:', err);
    setStatus('✗ Something went wrong. Please try again later.', 'error');
  } finally {
    setSubmitting(false);
  }
});

/* --- Helper functions for form --- */

function showError(input, errorEl, message) {
  input.classList.add('error');
  errorEl.textContent = message;
}

function clearErrors() {
  [nameInput, emailInput, messageInput].forEach(input => {
    input.classList.remove('error');
  });
  [nameError, emailError, messageError].forEach(el => {
    el.textContent = '';
  });
  formStatus.textContent = '';
  formStatus.className   = 'form-status';
}

function setSubmitting(state) {
  submitBtn.disabled = state;
  btnText.textContent = state ? 'Sending...' : 'Send Message';
  btnIcon.className   = state ? 'fas fa-spinner fa-spin' : 'fas fa-paper-plane';
}

function setStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className   = `form-status ${type}`;
}

// Clear individual field error on input
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('error');
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) errorEl.textContent = '';
  });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // Navbar height offset
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
