/* ==========================================================================
   AURELLA CROCHETS — slider.js
   1. Product card image sliders (gallery page)
      - Auto-advances every 3 s
      - Pauses on mouse hover / touch start
      - Injects images from products.js into the slider track
      - Dot indicators
   2. Browse All horizontal carousel (index.html + product.html)
   3. Product Detail Page (product.html)
      - Reads ?id= from URL, populates all content from products.js
      - Thumbnail strip + main image viewer + dot indicators
   ========================================================================== */

(function () {

  /* -----------------------------------------------------------------------
     Helpers
  ----------------------------------------------------------------------- */
  function getProducts() {
    return (typeof products !== 'undefined') ? products
         : (window.AURELLA_PRODUCTS || []);
  }

  function findProduct(id) {
    return getProducts().find(function (p) { return p.id === id; }) || null;
  }

  function whatsappLink(product) {
    var msg = encodeURIComponent(
      'Hello Aurella Crochet,\nI am interested in your "' + product.name + '" and would like more information.'
    );
    return 'https://wa.me/917259309613?text=' + msg;
  }

  /* =======================================================================
     1. PRODUCT CARD IMAGE SLIDERS
     Each .product-img-slider[data-product-id] gets:
     - Its images[] loaded from products.js
     - Auto-scroll every 3 s (pauses on hover)
     - Prev / Next buttons
     - Dot indicators
     - Clicking the image navigates to product.html?id=...
  ======================================================================= */

  function initCardSliders() {
    var sliders = document.querySelectorAll('.product-img-slider[data-product-id]');
    sliders.forEach(function (sliderEl) {
      var pid      = sliderEl.getAttribute('data-product-id');
      var product  = findProduct(pid);
      if (!product || !product.images || product.images.length < 2) return;

      var track    = sliderEl.querySelector('.slider-track');
      var dotsWrap = sliderEl.querySelector('.slider-dots');
      var prevBtn  = sliderEl.querySelector('.slider-prev');
      var nextBtn  = sliderEl.querySelector('.slider-next');

      var imgs     = product.images;
      var current  = 0;
      var timer    = null;

      /* -- Build slides -- */
      // The first <img> already exists in HTML; replace all content with JS-built slides
      track.innerHTML = '';
      imgs.forEach(function (src, i) {
        var img = document.createElement('img');
        img.src = src;
        img.alt = product.name + ' — image ' + (i + 1);
        img.loading = i === 0 ? 'eager' : 'lazy';
        img.className = 'slide' + (i === 0 ? ' active' : '');
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
          window.location.href = 'product.html?id=' + encodeURIComponent(pid);
        });
        track.appendChild(img);
      });

      /* -- Build dots -- */
      dotsWrap.innerHTML = '';
      imgs.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Image ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
      });

      var slides = track.querySelectorAll('.slide');
      var dots   = dotsWrap.querySelectorAll('.slider-dot');

      function goTo(idx) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (idx + imgs.length) % imgs.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
      }

      function next() { goTo(current + 1); }
      function prev() { goTo(current - 1); }

      prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); resetTimer(); });
      nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); resetTimer(); });

      /* -- Auto-scroll -- */
      function startTimer() {
        timer = setInterval(next, 3000);
      }
      function stopTimer() {
        clearInterval(timer);
        timer = null;
      }
      function resetTimer() {
        stopTimer();
        startTimer();
      }

      sliderEl.addEventListener('mouseenter', stopTimer);
      sliderEl.addEventListener('mouseleave', startTimer);
      sliderEl.addEventListener('touchstart', stopTimer, { passive: true });
      sliderEl.addEventListener('touchend',   startTimer, { passive: true });

      startTimer();
    });
  }

  /* =======================================================================
     2. BROWSE ALL HORIZONTAL CAROUSEL
     Populates every .browse-carousel with mini product cards.
     Each card: image (first img), name, price, links to product.html?id=
  ======================================================================= */

  function buildCarouselCard(product) {
    var card = document.createElement('a');
    card.className = 'browse-card';
    card.href = 'product.html?id=' + encodeURIComponent(product.id);

    var imgWrap = document.createElement('div');
    imgWrap.className = 'browse-card-img';
    var img = document.createElement('img');
    img.src = product.images ? product.images[0] : product.image;
    img.alt = product.name;
    img.loading = 'lazy';
    imgWrap.appendChild(img);

    var info = document.createElement('div');
    info.className = 'browse-card-info';

    var name = document.createElement('p');
    name.className = 'browse-card-name';
    name.textContent = product.name;

    var price = document.createElement('p');
    price.className = 'browse-card-price';
    price.textContent = product.price;

    info.appendChild(name);
    info.appendChild(price);
    card.appendChild(imgWrap);
    card.appendChild(info);
    return card;
  }

  function initCarousels(excludeId) {
    var carousels = document.querySelectorAll('.browse-carousel');
    var allProducts = getProducts();

    carousels.forEach(function (carousel) {
      carousel.innerHTML = '';
      var list = excludeId
        ? allProducts.filter(function (p) { return p.id !== excludeId; })
        : allProducts;

      list.forEach(function (p) {
        carousel.appendChild(buildCarouselCard(p));
      });

      /* Arrow buttons */
      var wrap = carousel.closest('.browse-carousel-wrap');
      if (!wrap) return;
      var prevBtn = wrap.querySelector('.browse-prev');
      var nextBtn = wrap.querySelector('.browse-next');
      var scrollAmt = 260;

      if (prevBtn) prevBtn.addEventListener('click', function () {
        carousel.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
      });
      if (nextBtn) nextBtn.addEventListener('click', function () {
        carousel.scrollBy({ left: scrollAmt, behavior: 'smooth' });
      });

      /* Hide arrows when at ends */
      function updateArrows() {
        if (!prevBtn || !nextBtn) return;
        prevBtn.style.opacity = carousel.scrollLeft < 10 ? '0.3' : '1';
        nextBtn.style.opacity =
          carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10
            ? '0.3' : '1';
      }
      carousel.addEventListener('scroll', updateArrows, { passive: true });
      updateArrows();
    });
  }

  /* =======================================================================
     3. PRODUCT DETAIL PAGE (product.html)
     Reads ?id= from URL, populates all fields.
  ======================================================================= */

  function initProductPage() {
    var pdp = document.getElementById('pdp');
    if (!pdp) return;

    var params  = new URLSearchParams(window.location.search);
    var pid     = params.get('id');
    var product = findProduct(pid);

    // Update page title regardless
    var titleEl = document.getElementById('page-title');

    if (!product) {
      pdp.innerHTML = '<div class="container" style="padding:4rem 0;text-align:center"><h2>Product not found</h2><a href="index.html" class="btn btn-primary" style="margin-top:1rem">← Back to shop</a></div>';
      return;
    }

    /* -- Meta -- */
    if (titleEl) titleEl.textContent = product.name + ' | Aurella Crochet';
    document.querySelector('meta[name="description"]').setAttribute('content',
      product.description + ' Order on WhatsApp from Aurella Crochet.');

    /* -- Breadcrumb -- */
    var bcName = document.getElementById('breadcrumb-name');
    var bcCat  = document.getElementById('breadcrumb-category');
    if (bcName) bcName.textContent = product.name;
    if (bcCat)  { bcCat.textContent = product.categoryLabel; bcCat.href = 'index.html#gallery'; }

    /* -- Gallery -- */
    var imgs     = product.images && product.images.length ? product.images : [product.image];
    var mainImg  = document.getElementById('pdp-main-img');
    var thumbsEl = document.getElementById('pdp-thumbs');
    var dotsEl   = document.getElementById('pdp-dots');
    var prevBtn  = document.getElementById('pdp-img-prev');
    var nextBtn  = document.getElementById('pdp-img-next');
    var current  = 0;

    mainImg.src = imgs[0];
    mainImg.alt = product.name;

    /* -- Build thumbnails -- */
    thumbsEl.innerHTML = '';
    imgs.forEach(function (src, i) {
      var thumb = document.createElement('button');
      thumb.className = 'pdp-thumb' + (i === 0 ? ' active' : '');
      thumb.setAttribute('aria-label', 'View image ' + (i + 1));
      var timg = document.createElement('img');
      timg.src = src;
      timg.alt = '';
      timg.loading = 'lazy';
      thumb.appendChild(timg);
      thumb.addEventListener('click', function () { goTo(i); });
      thumbsEl.appendChild(thumb);
    });

    /* -- Build dots -- */
    dotsEl.innerHTML = '';
    imgs.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'pdp-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Image ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsEl.appendChild(dot);
    });

    var thumbBtns = thumbsEl.querySelectorAll('.pdp-thumb');
    var dotBtns   = dotsEl.querySelectorAll('.pdp-dot');

    function goTo(idx) {
      thumbBtns[current].classList.remove('active');
      dotBtns[current].classList.remove('active');
      current = (idx + imgs.length) % imgs.length;
      mainImg.src = imgs[current];
      thumbBtns[current].classList.add('active');
      dotBtns[current].classList.add('active');
      thumbBtns[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    /* Swipe support on main image */
    var touchStartX = 0;
    mainImg.parentElement.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    mainImg.parentElement.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { if (dx < 0) goTo(current + 1); else goTo(current - 1); }
    }, { passive: true });

    /* -- Info fields -- */
    var fields = {
      'pdp-category':    product.categoryLabel,
      'pdp-title':       product.name,
      'pdp-price':       product.price,
      'pdp-description': product.description
    };
    Object.keys(fields).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = fields[id];
    });

    /* -- Details table -- */
    var detailsEl = document.getElementById('pdp-details');
    if (detailsEl && product.details) {
      var d = product.details;
      var rows = [
        ['Material', d.material],
        ['Sizes available', d.sizes],
        ['Dimensions', d.dimensions],
        ['Care', d.care],
        ['Delivery time', d.deliveryTime],
        ['Customizable', d.customizable]
      ];
      var table = '<table class="details-table"><tbody>';
      rows.forEach(function (r) {
        if (r[1]) {
          table += '<tr><th>' + r[0] + '</th><td>' + r[1] + '</td></tr>';
        }
      });
      table += '</tbody></table>';
      detailsEl.innerHTML = table;
    }

    /* -- CTA -- */
    var ctaEl = document.getElementById('pdp-cta');
    if (ctaEl) ctaEl.href = whatsappLink(product);

    /* -- "You might also like" carousel (exclude current) -- */
    initCarousels(product.id);
  }

  /* =======================================================================
     INIT
  ======================================================================= */

  document.addEventListener('DOMContentLoaded', function () {
    initCardSliders();

    // If we are on the product page, do PDP logic, otherwise just carousels
    if (document.getElementById('pdp')) {
      initProductPage();
    } else {
      initCarousels(null);
    }
  });

})();
