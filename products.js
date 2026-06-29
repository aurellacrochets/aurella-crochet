/* ==========================================================================
   AURELLA CROCHETS — products.js
   Single source of truth for product data, used by the navbar live search,
   the search.html results page, the product.html landing page, and the
   image slider / carousel on the gallery.

   images[0] = primary (existing real photo), images[1-3] = placeholders
   to be replaced with real photos when available.
   ========================================================================== */

const products = [];

const categories = [
  {
    "value": "cardigans",
    "label": "Cardigans"
  },
  {
    "value": "Bags",
    "label": "Bags"
  },
  {
    "value": "hair",
    "label": "Hair Accessories"
  },
  {
    "value": "keychains",
    "label": "Keychains"
  }
];

if (typeof window !== "undefined") {
  window.AURELLA_PRODUCTS = products;
  window.AURELLA_CATEGORIES = categories;
}
