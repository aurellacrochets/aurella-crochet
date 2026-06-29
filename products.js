/* ==========================================================================
   AURELLA CROCHETS — products.js
   Single source of truth for product data, used by the navbar live search,
   the search.html results page, the product.html landing page, and the
   image slider / carousel on the gallery.

   images[0] = primary (existing real photo), images[1-3] = placeholders
   to be replaced with real photos when available.
   ========================================================================== */

const products = [
  {
    "id": "CL-CA-YL",
    "name": "Cardigan",
    "category": "Clothing",
    "categoryLabel": "Clothing",
    "price": "1500",
    "description": "",
    "image": "",
    "images": [],
    "keywords": [],
    "details": {
      "material": "",
      "sizes": "",
      "dimensions": "",
      "care": "",
      "deliveryTime": "",
      "customizable": ""
    }
  }
];

const categories = [
  {
    "value": "Clothing",
    "label": "Clothing"
  }
];

if (typeof window !== "undefined") {
  window.AURELLA_PRODUCTS = products;
  window.AURELLA_CATEGORIES = categories;
}
