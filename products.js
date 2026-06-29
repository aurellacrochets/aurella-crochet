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
    "id": "BA-TB-BL",
    "name": "Tote Bag",
    "category": "Bags",
    "categoryLabel": "Bags",
    "price": "1000",
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
  },
  {
    "id": "BA-SB-PN",
    "name": "Shoulder Bag",
    "category": "Bags",
    "categoryLabel": "Bags",
    "price": "800",
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
  },
  {
    "id": "BA-CB-PN",
    "name": "Chunky Bag",
    "category": "Bags",
    "categoryLabel": "Bags",
    "price": "800",
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
