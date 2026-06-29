/* ==========================================================================
   AURELLA CROCHETS — cart.js
   Cart logic: localStorage persistence, product fetching from Apps Script,
   checkout form, UPI/COD payment, POST to formCreateOrder, WhatsApp redirect.
   ========================================================================== */

(function () {

  var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4ZrHDn93K819PkkkTliDegVEia28itbFyvcqzcOr70gfzLLJCj5z1_Cpx6Uz65Vn6_g/exec';
  var UPI_ID = 'dsouzaar21-1@okhdfcbank';
  var FREE_SHIPPING_THRESHOLD = 500;
  var SHIPPING_CHARGE = 70;
  var CART_KEY = 'aurella_cart';

  /* ----------------------------------------------------------------
     CART STORE — localStorage backed
  ---------------------------------------------------------------- */
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  function addToCart(sku, name, price, image) {
    var cart = getCart();
    var existing = cart.find(function (i) { return i.sku === sku; });
    if (existing) {
      existing.quantity += 1;
    } else {
      var cleanPrice = parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0;
cart.push({ sku: sku, name: name, price: cleanPrice, image: image || '', quantity: 1 });
    }
    saveCart(cart);
    showCartToast(name);
    refreshCardButtons();
  }

  function removeFromCart(sku) {
    saveCart(getCart().filter(function (i) { return i.sku !== sku; }));
  }

  function updateQuantity(sku, qty) {
    var cart = getCart();
    var item = cart.find(function (i) { return i.sku === sku; });
    if (item) {
      item.quantity = Math.max(1, parseInt(qty) || 1);
      saveCart(cart);
    }
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartBadge();
  }

  function cartTotal(cart) {
    return cart.reduce(function (sum, i) { return sum + i.price * i.quantity; }, 0);
  }

  function shippingCost(total) {
    return total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  }

  /* ----------------------------------------------------------------
     CART BADGE — shown in navbar on all pages
  ---------------------------------------------------------------- */
  function updateCartBadge() {
    var cart = getCart();
    var count = cart.length;
    document.querySelectorAll('.cart-badge').forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  /* ----------------------------------------------------------------
     TOAST — "Added to cart" notification
  ---------------------------------------------------------------- */
  function showCartToast(name) {
    var existing = document.getElementById('cart-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.className = 'cart-toast';
    toast.innerHTML = '🧶 <strong>' + name + '</strong> added to cart! <a href="cart.html">View Cart →</a>';
    document.body.appendChild(toast);
    setTimeout(function () { toast.classList.add('cart-toast-show'); }, 10);
    setTimeout(function () {
      toast.classList.remove('cart-toast-show');
      setTimeout(function () { toast.remove(); }, 400);
    }, 3000);
  }

  /* ----------------------------------------------------------------
     CARD BUTTON SYNC
     Turns every .atc-control[data-sku] on the current page into
     either an "Add to Cart" button or a "− qty +" stepper,
     depending on what's in the cart right now.
  ---------------------------------------------------------------- */
  function refreshCardButtons() {
    var cart = getCart();

    document.querySelectorAll('.atc-control[data-sku]').forEach(function (wrap) {
      var sku = wrap.getAttribute('data-sku');
      var item = cart.find(function (i) { return i.sku === sku; });

      if (item && item.quantity > 0) {
        /* ── show stepper ── */
        if (wrap.classList.contains('is-stepper')) {
          /* already a stepper — just update the count */
          var valEl = wrap.querySelector('.atc-qty-val');
          if (valEl) valEl.textContent = item.quantity;
        } else {
          wrap.classList.add('is-stepper');
          wrap.innerHTML =
            '<button class="atc-qty-btn atc-dec" aria-label="Decrease quantity">−</button>' +
            '<span class="atc-qty-val">' + item.quantity + '</span>' +
            '<button class="atc-qty-btn atc-inc" aria-label="Increase quantity">+</button>';

          wrap.querySelector('.atc-dec').addEventListener('click', function () {
            var current = getCart().find(function (i) { return i.sku === sku; });
            if (!current) return;
            if (current.quantity <= 1) {
              removeFromCart(sku);
            } else {
              updateQuantity(sku, current.quantity - 1);
            }
            refreshCardButtons();
          });

          wrap.querySelector('.atc-inc').addEventListener('click', function () {
            var current = getCart().find(function (i) { return i.sku === sku; });
            if (current) updateQuantity(sku, current.quantity + 1);
            refreshCardButtons();
          });
        }
      } else {
        /* ── show "Add to Cart" button ── */
        if (!wrap.classList.contains('is-stepper')) return; /* already a button */
        wrap.classList.remove('is-stepper');

        /* Reconstruct the button from the data attributes stored on the wrap */
        var name    = wrap.getAttribute('data-name')    || '';
        var price   = wrap.getAttribute('data-price')   || '0';
        var image   = wrap.getAttribute('data-image')   || '';

        var btn = document.createElement('button');
        btn.className = 'btn-add-to-cart';
        btn.textContent = '🛒 Add to Cart';
        btn.addEventListener('click', function () {
          addToCart(sku, name, price, image);
          refreshCardButtons();
        });
        wrap.innerHTML = '';
        wrap.appendChild(btn);
      }
    });
  }

  /* ----------------------------------------------------------------
     EXPOSE addToCart globally so inline onclick= buttons work
  ---------------------------------------------------------------- */
  window.AurellaCart = {
    addToCart: addToCart,
    getCart: getCart,
    updateCartBadge: updateCartBadge,
    refreshCardButtons: refreshCardButtons
  };

  /* ----------------------------------------------------------------
     FETCH LIVE PRODUCTS from Apps Script
  ---------------------------------------------------------------- */
  function fetchLiveProducts(callback) {
    fetch(APPS_SCRIPT_URL + '?action=getProducts&_t=' + Date.now())
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var list = data.products || data || [];
        callback(null, list);
      })
      .catch(function (err) { callback(err, []); });
  }

  /* ----------------------------------------------------------------
     CART PAGE — only runs on cart.html
  ---------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {

    updateCartBadge(); // always update badge on every page
    refreshCardButtons(); // sync Add-to-Cart ↔ stepper on gallery/product cards

    var isCartPage = document.querySelector('[data-page="cart-page"]');
    if (!isCartPage) return;

    var step1 = document.getElementById('cart-step-1');
    var step2 = document.getElementById('cart-step-2');
    var step3 = document.getElementById('cart-step-3');

    /* ── Step 1: Cart review ── */
    function renderCartStep() {
      var cart = getCart();
      var listEl = document.getElementById('cart-items-list');
      var emptyEl = document.getElementById('cart-empty');
      var summaryEl = document.getElementById('cart-summary');
      var proceedBtn = document.getElementById('cart-proceed-btn');

      listEl.innerHTML = '';

      if (!cart.length) {
        emptyEl.style.display = 'block';
        summaryEl.style.display = 'none';
        proceedBtn.style.display = 'none';
        return;
      }

      emptyEl.style.display = 'none';
      summaryEl.style.display = 'block';
      proceedBtn.style.display = 'inline-flex';

      cart.forEach(function (item) {
        var row = document.createElement('div');
        row.className = 'cart-item';
        var priceNum = parseFloat(item.price) || 0;
        var displayPrice = priceNum > 0 ? '₹' + priceNum : 'Price on request';
        var lineTotal = priceNum > 0 ? '₹' + (priceNum * item.quantity).toFixed(0) : '—';

        row.innerHTML = [
          '<div class="cart-item-img">',
            item.image ? '<img src="' + item.image + '" alt="' + item.name + '" loading="lazy">' : '<div class="cart-item-img-placeholder">🧶</div>',
          '</div>',
          '<div class="cart-item-info">',
            '<p class="cart-item-name">' + item.name + '</p>',
            '<p class="cart-item-sku">SKU: ' + item.sku + '</p>',
            '<p class="cart-item-price">' + displayPrice + '</p>',
          '</div>',
          '<div class="cart-item-qty">',
            '<button class="cart-qty-btn" data-sku="' + item.sku + '" data-action="dec">−</button>',
            '<span class="cart-qty-val">' + item.quantity + '</span>',
            '<button class="cart-qty-btn" data-sku="' + item.sku + '" data-action="inc">+</button>',
          '</div>',
          '<div class="cart-item-total">' + lineTotal + '</div>',
          '<button class="cart-item-remove" data-sku="' + item.sku + '" aria-label="Remove">✕</button>'
        ].join('');

        listEl.appendChild(row);
      });

      // Qty buttons and remove
      listEl.querySelectorAll('.cart-qty-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var sku = btn.getAttribute('data-sku');
          var action = btn.getAttribute('data-action');
          var item = getCart().find(function (i) { return i.sku === sku; });
          if (!item) return;
          if (action === 'inc') updateQuantity(sku, item.quantity + 1);
          else if (action === 'dec') {
            if (item.quantity <= 1) removeFromCart(sku);
            else updateQuantity(sku, item.quantity - 1);
          }
          renderCartStep();
        });
      });

      listEl.querySelectorAll('.cart-item-remove').forEach(function (btn) {
        btn.addEventListener('click', function () {
          removeFromCart(btn.getAttribute('data-sku'));
          renderCartStep();
        });
      });

      // Summary totals
      var total = cartTotal(cart);
      var shipping = shippingCost(total);
      var grandTotal = total + shipping;

      var summaryHTML = '';
      cart.forEach(function (i) {
        var p = parseFloat(i.price) || 0;
        if (p > 0) summaryHTML += '<div class="cart-summary-row"><span>' + i.name + ' × ' + i.quantity + '</span><span>₹' + (p * i.quantity).toFixed(0) + '</span></div>';
      });
      summaryHTML += '<div class="cart-summary-row"><span>Subtotal</span><span>₹' + total.toFixed(0) + '</span></div>';
      summaryHTML += '<div class="cart-summary-row"><span>Shipping' + (shipping === 0 ? ' (Free!)' : '') + '</span><span>' + (shipping === 0 ? '₹0' : '₹' + shipping) + '</span></div>';
      summaryHTML += '<div class="cart-summary-row cart-summary-total"><span>Total</span><span>₹' + grandTotal.toFixed(0) + '</span></div>';
      if (shipping > 0) summaryHTML += '<p class="cart-free-shipping-note">Add ₹' + (FREE_SHIPPING_THRESHOLD - total).toFixed(0) + ' more for free shipping!</p>';
      document.getElementById('cart-summary').innerHTML = summaryHTML;
    }

    renderCartStep();

    document.getElementById('cart-proceed-btn').addEventListener('click', function () {
      if (!getCart().length) return;
      step1.style.display = 'none';
      step2.style.display = 'block';
      renderCheckoutSummary();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('cart-back-btn').addEventListener('click', function () {
      step2.style.display = 'none';
      step1.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ── Step 2: Checkout form ── */
    function renderCheckoutSummary() {
      var cart = getCart();
      var total = cartTotal(cart);
      var shipping = shippingCost(total);
      var grandTotal = total + shipping;
      var el = document.getElementById('checkout-order-summary');
      var html = '<p class="checkout-summary-title">Order Summary</p>';
      cart.forEach(function (i) {
        var p = parseFloat(i.price) || 0;
        html += '<div class="checkout-summary-row"><span>' + i.name + ' × ' + i.quantity + '</span><span>' + (p > 0 ? '₹' + (p * i.quantity).toFixed(0) : '—') + '</span></div>';
      });
      html += '<div class="checkout-summary-row checkout-summary-shipping"><span>Shipping</span><span>' + (shipping === 0 ? 'Free' : '₹' + shipping) + '</span></div>';
      html += '<div class="checkout-summary-row checkout-summary-grand"><span>Total</span><span>₹' + grandTotal.toFixed(0) + '</span></div>';
      el.innerHTML = html;
    }

    // Payment method toggle
    var payNowBtn = document.getElementById('pay-now-btn');
    var payLaterBtn = document.getElementById('pay-later-btn');
    var upiSection = document.getElementById('upi-section');

    payNowBtn.addEventListener('click', function () {
      payNowBtn.classList.add('active');
      payLaterBtn.classList.remove('active');
      upiSection.style.display = 'block';
    });

    payLaterBtn.addEventListener('click', function () {
      payLaterBtn.classList.add('active');
      payNowBtn.classList.remove('active');
      upiSection.style.display = 'none';
    });

    // Checkout form submit
    document.getElementById('checkout-form').addEventListener('submit', function (e) {
      e.preventDefault();
      submitOrder();
    });

    /* ── Step 3: Submit order ── */
    async function submitOrder() {
      var cart = getCart();
      if (!cart.length) return;

      var paymentMethod = payNowBtn.classList.contains('active') ? 'Paid (UPI - Unverified)' : 'Not Paid';

      var body = {
        action: 'formCreateOrder',
        customerName: document.getElementById('co-name').value.trim(),
        email: document.getElementById('co-email').value.trim(),
        phone: document.getElementById('co-phone').value.trim(),
        address: document.getElementById('co-address').value.trim(),
        landmark: document.getElementById('co-landmark').value.trim(),
        city: document.getElementById('co-city').value.trim(),
        pincode: document.getElementById('co-pincode').value.trim(),
        deliveryType: 'Shipping',
        paymentStatus: paymentMethod,
        products: cart.map(function (i) {
          return { sku: i.sku, quantity: i.quantity };
        })
      };

      var submitBtn = document.getElementById('checkout-submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Placing order…';

      try {
        var res = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(body)
        });
        var data = await res.json();

        if (data.ok && data.orderId) {
          var orderId = data.orderId;
          clearCart();
          renderSuccessStep(orderId, body, cart);
        } else {
          throw new Error(data.error || 'Order failed');
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Place Order';
        showFormError('Something went wrong: ' + err.message + '. Please try WhatsApp ordering instead.');
      }
    }

    function renderSuccessStep(orderId, body, cart) {
      step2.style.display = 'none';
      step3.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });

      document.getElementById('success-order-id').textContent = orderId;

      var itemLines = cart.map(function (i) { return i.name + ' x' + i.quantity; }).join(', ');
      var total = cartTotal(cart);
      var shipping = shippingCost(total);
      var grandTotal = total + shipping;

      var msg = [
        'Hey Aurella! 🧶',
        'I just placed an order!',
        '',
        'Order ID: ' + orderId,
        'Name: ' + body.customerName,
        'Items: ' + itemLines,
        'Total: ₹' + grandTotal.toFixed(0),
        'Payment: ' + body.paymentStatus,
        '',
        'Please confirm my order!'
      ].join('\n');

      var waLink = 'https://wa.me/917259309613?text=' + encodeURIComponent(msg);
      document.getElementById('success-whatsapp-btn').href = waLink;
    }

    function showFormError(msg) {
      var el = document.getElementById('checkout-error');
      el.textContent = msg;
      el.style.display = 'block';
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

  });

})();