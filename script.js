/* ==========================================================================
   AURELLA CROCHETS — script.js
   Pure vanilla JS. No dependencies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------------
     Footer year
  ---------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------------
     Mobile menu toggle
  ---------------------------------------------------------------- */
  var menuToggle = document.getElementById('menu-toggle');
  var mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close mobile menu when a nav link is clicked
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ----------------------------------------------------------------
     Sticky header shadow on scroll
  ---------------------------------------------------------------- */
  var header = document.getElementById('site-header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var current = window.scrollY;
      if (current > 8) {
        header.style.boxShadow = '0 6px 20px rgba(139, 94, 60, 0.10)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = current;
    }, { passive: true });
  }

  /* ----------------------------------------------------------------
     Gallery category filtering — driven by window.AURELLA_CATEGORIES
  ---------------------------------------------------------------- */
  var tabContainer = document.querySelector('.gallery-tabs') 
                  || document.querySelector('[role="tablist"]');
  var categories = document.querySelectorAll('.gallery-category');

  function showCategory(target) {
    categories.forEach(function (cat) {
      if (target === 'all' || cat.getAttribute('data-category') === target) {
        cat.classList.remove('is-hidden');
      } else {
        cat.classList.add('is-hidden');
      }
    });
  }

  function attachTabListeners() {
    var tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabButtons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        showCategory(btn.getAttribute('data-category'));
      });
    });
  }

  function buildCategoryTabs() {
    var cats = window.AURELLA_CATEGORIES;
    if (!tabContainer || !cats || !cats.length) {
      // No dynamic categories — fall back to whatever tabs are in the HTML
      attachTabListeners();
      return;
    }

    // Rebuild tab buttons from AURELLA_CATEGORIES
    tabContainer.innerHTML = '';

    var allBtn = document.createElement('button');
    allBtn.className = 'tab-btn active';
    allBtn.setAttribute('data-category', 'all');
    allBtn.setAttribute('aria-selected', 'true');
    allBtn.setAttribute('role', 'tab');
    allBtn.textContent = 'All';
    tabContainer.appendChild(allBtn);

    cats.forEach(function (cat) {
      var val = typeof cat === 'string' ? cat : cat.value;
      var lbl = typeof cat === 'string' ? cat : cat.label;
      var btn = document.createElement('button');
      btn.className = 'tab-btn';
      btn.setAttribute('data-category', val);
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('role', 'tab');
      btn.textContent = lbl;
      tabContainer.appendChild(btn);
    });

    attachTabListeners();
  }

  buildCategoryTabs();

  /* ----------------------------------------------------------------
     FAQ accordion
  ---------------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      // Close all others (single-open accordion)
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----------------------------------------------------------------
     Scroll reveal animation (IntersectionObserver)
  ---------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    '.featured-card, .product-card, .why-card, .review-card, .contact-card, ' +
    '.custom-text, .custom-visual, .about-text, .about-visual, .faq-item, .insta-item'
  );

  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything immediately
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ----------------------------------------------------------------
     Smooth scroll offset correction for sticky header
     (native CSS scroll-behavior handles smoothness;
      this just nudges focus for accessibility after jump)
  ---------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = link.getAttribute('href');
      if (hash.length > 1) {
        var targetEl = document.querySelector(hash);
        if (targetEl) {
          // Allow native smooth scroll to happen, then move focus for a11y
          setTimeout(function () {
            targetEl.setAttribute('tabindex', '-1');
            targetEl.focus({ preventScroll: true });
          }, 600);
        }
      }
    });
  });

});
