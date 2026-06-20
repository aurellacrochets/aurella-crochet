/* ==========================================================================
   AURELLA CROCHETS — search-results.js
   Renders the results grid on search.html based on the ?q= URL parameter.
   Depends on: products.js, search.js (window.AurellaSearch), Fuse.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  if (!window.AurellaSearch) return; // search.js / products.js failed to load

  var grid = document.getElementById('results-grid');
  var queryEl = document.getElementById('results-query');
  var noteEl = document.getElementById('results-note');
  var emptyState = document.getElementById('search-empty-state');
  var titleEl = document.getElementById('results-title');

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name) || '';
  }

  function renderResults() {
    var query = getQueryParam('q').trim();
    grid.innerHTML = '';

    if (!query) {
      titleEl.hidden = true;
      noteEl.hidden = true;
      emptyState.hidden = false;
      return;
    }

    titleEl.hidden = false;
    emptyState.hidden = true;
    queryEl.textContent = query;

    var outcome = window.AurellaSearch.searchProducts(query, 24);
    var items = outcome.results;

    if (outcome.isFallback) {
      noteEl.hidden = false;
      noteEl.textContent = 'You may be looking for';
    } else {
      noteEl.hidden = true;
    }

    items.forEach(function (product) {
      grid.appendChild(buildCard(product, query));
    });
  }

  function buildCard(product, query) {
    var card = document.createElement('article');
    card.className = 'result-card';
    card.id = 'result-' + product.id;

    var imgWrap = document.createElement('div');
    imgWrap.className = 'result-img';
    var img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.loading = 'lazy';
    img.width = 600;
    img.height = 600;
    imgWrap.appendChild(img);

    var h3 = document.createElement('h3');
    h3.innerHTML = window.AurellaSearch.highlightMatch(product.name, query);

    var price = document.createElement('span');
    price.className = 'price';
    price.textContent = 'Price: ' + product.price;

    var desc = document.createElement('p');
    desc.className = 'result-desc';
    desc.textContent = product.description;

    var cta = document.createElement('a');
    cta.className = 'btn btn-outline btn-small';
    cta.target = '_blank';
    cta.rel = 'noopener';
    cta.href = window.AurellaSearch.whatsappLink(product);
    cta.textContent = 'Order on WhatsApp';

    card.appendChild(imgWrap);
    card.appendChild(h3);
    card.appendChild(price);
    card.appendChild(desc);
    card.appendChild(cta);

    return card;
  }

  renderResults();

  // If the navbar search is used again while already on search.html,
  // re-render in place instead of reloading the page.
  var form = document.getElementById('search-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('search-input');
      var q = input.value.trim();
      if (!q) return;
      var newUrl = window.location.pathname + '?q=' + encodeURIComponent(q);
      window.history.pushState({}, '', newUrl);
      input.value = '';
      document.getElementById('search-suggestions').innerHTML = '';
      document.getElementById('search-box').classList.remove('open');
      renderResults();
    });
  }
});
