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
    "id": "HA-SimpleClip",
    "name": "Simple Clip",
    "category": "Hair Accessories",
    "categoryLabel": "Hair Accessories",
    "price": "25",
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
    "id": "HA-BowClip",
    "name": "Bow Clip",
    "category": "Hair Accessories",
    "categoryLabel": "Hair Accessories",
    "price": "40",
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
    "id": "HA-StrawberryClip",
    "name": "Strawberry Clip",
    "category": "Hair Accessories",
    "categoryLabel": "Hair Accessories",
    "price": "50",
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
    "id": "HA-TulipClip",
    "name": "Tulip Clip",
    "category": "Hair Accessories",
    "categoryLabel": "Hair Accessories",
    "price": "40",
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
    "id": "HA-Assorted",
    "name": "Assorted Hair Clips",
    "category": "Hair Accessories",
    "categoryLabel": "Hair Accessories",
    "price": "300",
    "description": "Simple Clip x 2\nBow Clip x 2\nStrawberry Clip x 2\nTulip Clip x 2",
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
    "id": "HA-SunflowerClawClip",
    "name": "Sunflower Claw Clip",
    "category": "Hair Accessories",
    "categoryLabel": "Hair Accessories",
    "price": "200",
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
  },
  {
    "value": "Hair Accessories",
    "label": "Hair Accessories"
  },
  {
    "value": "Bags",
    "label": "Bags"
  }
];

if (typeof window !== "undefined") {
  window.AURELLA_PRODUCTS = products;
  window.AURELLA_CATEGORIES = categories;
}
