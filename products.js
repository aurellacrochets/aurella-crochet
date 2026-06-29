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
    "id": "HA-PW",
    "name": "Flower Parandi",
    "category": "hair",
    "categoryLabel": "Hair Accessories",
    "price": "₹NA",
    "description": "Traditional crochet flower parandi, handmade with care for braids and special occasions. A beautiful blend of tradition and craft.",
    "image": "Images/Hair Accessories/Paranda.jpeg",
    "images": [
      "Images/Hair Accessories/Paranda.jpeg",
      "Images/Hair Accessories/Clip.jpeg",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80"
    ],
    "keywords": [
      "parandi",
      "paranda",
      "flower parandi",
      "braid",
      "hair accessory",
      "gajra"
    ],
    "details": {
      "material": "Yarn + ribbon base",
      "sizes": "Standard parandi length (~50 cm)",
      "dimensions": "Flowers: 3–4 cm each",
      "care": "Avoid water, store flat",
      "deliveryTime": "5–7 business days",
      "customizable": "Yes — colour, length, and flower count on request"
    }
  },
  {
    "id": "HA-BA",
    "name": "Bandana",
    "category": "hair",
    "categoryLabel": "hair",
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
  },
  {
    "id": "CL-SW-MR",
    "name": "Sweater",
    "category": "cardigans",
    "categoryLabel": "cardigans",
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
