/* ==========================================================================
   AURELLA CROCHETS — search.js
   Fuzzy product search (Fuse.js), navbar live suggestions, and the logic
   used by search.html to render full results.
   Depends on: products.js (window.AURELLA_PRODUCTS), Fuse.js (CDN)
   ========================================================================== */

(function () {

  if (typeof products === 'undefined' && typeof window.AURELLA_PRODUCTS === 'undefined') {
    return; // products.js not loaded
  }

  var PRODUCTS = (typeof products !== 'undefined') ? products : window.AURELLA_PRODUCTS;

  /* ----------------------------------------------------------------
     Fuse.js instance — shared search ranking config
     Ranking priority (handled by weights + Fuse's own scoring):
       1. Exact / partial product name match  (highest weight)
       2. Keyword match
       3. Description match
       4. Closest fuzzy match (Fuse's default behaviour as a fallback)
  ---------------------------------------------------------------- */
  var fuse = null;
  if (typeof Fuse !== 'undefined') {
    fuse = new Fuse(PRODUCTS, {
      includeScore: true,
      includeMatches: true,
      threshold: 0.45,      // generous, so misspellings still match
      ignoreLocation: true,
      minMatchCharLength: 1,
      keys: [
        { name: 'name', weight: 0.5 },
        { name: 'keywords', weight: 0.35 },
        { name: 'description', weight: 0.15 }
      ]
    });
  }

  /**
   * Run a search and always return useful results.
   * If there are no strong matches, falls back to the closest fuzzy matches
   * so the user is never shown a dead "no results" message.
   * Returns { results: Product[], isFallback: boolean }
   */
  function searchProducts(query, limit) {
    limit = limit || 8;
    query = (query || '').trim();

    if (!query) {
      return { results: [], isFallback: false };
    }

    if (!fuse) {
      // Extremely defensive fallback if Fuse failed to load: simple substring match
      var q = query.toLowerCase();
      var simple = PRODUCTS.filter(function (p) {
        return p.name.toLowerCase().indexOf(q) !== -1 ||
               p.keywords.join(' ').toLowerCase().indexOf(q) !== -1 ||
               p.description.toLowerCase().indexOf(q) !== -1;
      });
      return { results: simple.slice(0, limit), isFallback: simple.length === 0 };
    }

    var fuseResults = fuse.search(query, { limit: limit });

    if (fuseResults.length > 0) {
      return {
        results: fuseResults.map(function (r) { return r.item; }),
        isFallback: false
      };
    }

    // No matches at all even with fuzzy threshold — widen the net so the
    // user always sees *something* useful ("closest matches").
    var looseFuse = new Fuse(PRODUCTS, {
      threshold: 0.9,
      ignoreLocation: true,
      keys: ['name', 'keywords', 'description']
    });
    var loose = looseFuse.search(query, { limit: limit });
    var resultsList = loose.length > 0 ? loose.map(function (r) { return r.item; }) : PRODUCTS.slice(0, limit);

    return { results: resultsList, isFallback: true };
  }

  /**
   * Wrap matching substrings of `text` with <mark> for highlighting.
   * Simple case-insensitive whole-query and per-word highlighting.
   */
  function highlightMatch(text, query) {
    if (!query) return text;
    var words = query.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return text;

    var pattern = words
      .map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); })
      .join('|');

    try {
      var re = new RegExp('(' + pattern + ')', 'ig');
      return text.replace(re, '<mark>$1</mark>');
    } catch (e) {
      return text;
    }
  }

  function whatsappLink(product) {
    var msg = 'Hello Aurella crochet,%0AI am interested in your "' + product.name + '" and would like more information.';
    return 'https://wa.me/917259309613?text=' + msg;
  }

  // Expose helpers for use by inline scripts in index.html and search.html
  window.AurellaSearch = {
    searchProducts: searchProducts,
    highlightMatch: highlightMatch,
    whatsappLink: whatsappLink,
    products: PRODUCTS
  };

  /* ======================================================================
     NAVBAR LIVE SEARCH (only runs if the navbar search markup is present)
  ====================================================================== */

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('search-toggle');
    var box = document.getElementById('search-box');
    var form = document.getElementById('search-form');
    var input = document.getElementById('search-input');
    var suggestionsEl = document.getElementById('search-suggestions');

    if (!toggle || !box || !form || !input || !suggestionsEl) return;

    var activeIndex = -1;
    var currentItems = []; // currently rendered {id} list for keyboard nav

    function openBox() {
      box.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      input.setAttribute('aria-expanded', 'true');
      setTimeout(function () { input.focus(); }, 50);
    }

    function closeBox() {
      box.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      input.setAttribute('aria-expanded', 'false');
      activeIndex = -1;
    }

    toggle.addEventListener('click', function () {
      var isOpen = box.classList.contains('open');
      if (isOpen) {
        closeBox();
      } else {
        openBox();
      }
    });

    // Click outside closes the search box + suggestions
    document.addEventListener('click', function (e) {
      var navSearch = document.getElementById('nav-search');
      if (navSearch && !navSearch.contains(e.target)) {
        closeBox();
      }
    });

    function renderSuggestions(query) {
      suggestionsEl.innerHTML = '';
      activeIndex = -1;
      currentItems = [];

      if (!query.trim()) return;

      var outcome = searchProducts(query, 6);
      var items = outcome.results;

      if (!items.length) return;

      var label = document.createElement('div');
      label.className = 'search-suggestion-label';
      label.textContent = outcome.isFallback ? 'You may be looking for' : 'Suggestions';
      suggestionsEl.appendChild(label);

      items.forEach(function (product, idx) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'search-suggestion';
        btn.setAttribute('role', 'option');
        btn.dataset.index = idx;

        var thumb = document.createElement('span');
        thumb.className = 'search-suggestion-thumb';
        var img = document.createElement('img');
        img.src = product.image;
        img.alt = '';
        img.loading = 'lazy';
        thumb.appendChild(img);

        var info = document.createElement('span');
        info.className = 'search-suggestion-info';

        var name = document.createElement('span');
        name.className = 'search-suggestion-name';
        name.innerHTML = highlightMatch(product.name, query);

        var price = document.createElement('span');
        price.className = 'search-suggestion-price';
        price.textContent = product.price;

        info.appendChild(name);
        info.appendChild(price);
        btn.appendChild(thumb);
        btn.appendChild(info);

        btn.addEventListener('click', function () {
          goToProduct(product);
        });

        suggestionsEl.appendChild(btn);
        currentItems.push(btn);
      });
    }

    function goToProduct(product) {
      closeBox();
      input.value = '';
      suggestionsEl.innerHTML = '';

      // If we're already on the page that has the product card, scroll to it.
      var existingCard = document.getElementById(product.id);
      if (existingCard) {
        existingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        existingCard.setAttribute('tabindex', '-1');
        existingCard.focus({ preventScroll: true });
        existingCard.classList.add('search-highlighted');
        setTimeout(function () { existingCard.classList.remove('search-highlighted'); }, 1600);
      } else {
        window.location.href = 'search.html?q=' + encodeURIComponent(product.name);
      }
    }

    function setActive(idx) {
      currentItems.forEach(function (el) { el.classList.remove('is-active'); });
      if (idx >= 0 && idx < currentItems.length) {
        currentItems[idx].classList.add('is-active');
        currentItems[idx].scrollIntoView({ block: 'nearest' });
      }
      activeIndex = idx;
    }

    input.addEventListener('input', function () {
      renderSuggestions(input.value);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentItems.length) setActive((activeIndex + 1) % currentItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentItems.length) setActive((activeIndex - 1 + currentItems.length) % currentItems.length);
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && currentItems[activeIndex]) {
          e.preventDefault();
          currentItems[activeIndex].click();
        }
        // else: let form submit naturally -> search.html
      } else if (e.key === 'Escape') {
        suggestionsEl.innerHTML = '';
        currentItems = [];
        activeIndex = -1;
        closeBox();
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = input.value.trim();
      if (!q) return;
      window.location.href = 'search.html?q=' + encodeURIComponent(q);
    });
  });

})();
