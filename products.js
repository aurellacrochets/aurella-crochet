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
    "id": "cardigan-2",
    "name": "Blush Bloom Cardigan",
    "category": "cardigans",
    "categoryLabel": "Cardigans",
    "price": "₹NA",
    "description": "Soft blush pink crochet cardigan with a delicate, bloom-inspired texture. A romantic everyday layer that pairs with anything.",
    "image": "Images/Cardigans/Cardigan.jpeg",
    "images": [
      "Images/Cardigans/Cardigan.jpeg"
    ],
    "keywords": [
      "cardigan",
      "blush",
      "bloom",
      "pink",
      "sweater",
      "layer",
      "crochet cardigan"
    ],
    "details": {
      "material": "100% soft acrylic yarn",
      "sizes": "XS, S, M, L, XL (custom size available)",
      "dimensions": "Length: 60–70 cm | Chest: 80–110 cm",
      "care": "Hand wash cold, lay flat to dry",
      "deliveryTime": "7–10 business days",
      "customizable": "Yes — colours and sizing on request"
    }
  },
  {
    "id": "bag-1",
    "name": "Shoulder Bag",
    "category": "Bags",
    "categoryLabel": "Bags",
    "price": "₹NA",
    "description": "Handmade crochet shoulder bag, sturdy and finished with a sweet pastel palette. Spacious enough for daily essentials.",
    "image": "Images/Bags/Shoulder Bag.jpeg",
    "images": [
      "Images/Bags/Shoulder Bag.jpeg"
    ],
    "keywords": [
      "bag",
      "shoulder bag",
      "tote",
      "handbag",
      "purse",
      "crochet bag"
    ],
    "details": {
      "material": "Cotton macramé cord + lining fabric",
      "sizes": "One size",
      "dimensions": "Width: 30 cm | Height: 28 cm | Depth: 10 cm",
      "care": "Spot clean only, air dry",
      "deliveryTime": "7–10 business days",
      "customizable": "Yes — strap length and colour on request"
    }
  },
  {
    "id": "bag-2",
    "name": "Bag 2",
    "category": "Bags",
    "categoryLabel": "Bags",
    "price": "₹NA",
    "description": "Everyday crochet shoulder bag with a comfortable strap and roomy interior. Perfect for a day out.",
    "image": "Images/Bags/Main Bag.jpeg",
    "images": [
      "Images/Bags/Main Bag.jpeg"
    ],
    "keywords": [
      "bag",
      "shoulder bag",
      "tote",
      "handbag",
      "purse",
      "crochet bag"
    ],
    "details": {
      "material": "Cotton macramé cord + lining fabric",
      "sizes": "One size",
      "dimensions": "Width: 28 cm | Height: 26 cm | Depth: 8 cm",
      "care": "Spot clean only, air dry",
      "deliveryTime": "7–10 business days",
      "customizable": "Yes — strap length and colour on request"
    }
  },
  {
    "id": "bag-3",
    "name": "Bag 3",
    "category": "Bags",
    "categoryLabel": "Bags",
    "price": "₹NA",
    "description": "Charming handmade crochet bag, perfect for adding texture to any outfit.",
    "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    "keywords": [
      "bag",
      "tote",
      "handbag",
      "purse",
      "crochet bag"
    ],
    "details": {
      "material": "Cotton macramé cord",
      "sizes": "One size",
      "dimensions": "Width: 25 cm | Height: 24 cm | Depth: 8 cm",
      "care": "Spot clean only, air dry",
      "deliveryTime": "7–10 business days",
      "customizable": "Yes — colour on request"
    }
  },
  {
    "id": "hair-1",
    "name": "Clip",
    "category": "hair",
    "categoryLabel": "Hair Accessories",
    "price": "40",
    "description": "Dainty handmade crochet hair clip, a sweet little detail for any look. Lightweight and secure.",
    "image": "Images/hair/Picsart_26-06-28_21-43-27-079.jpg.jpeg",
    "images": [
      "Images/hair/Picsart_26-06-28_21-43-27-079.jpg.jpeg",
      "Images/hair/Picsart_26-06-28_21-37-06-090.jpg.jpeg"
    ],
    "keywords": [
      "clip",
      "hair clip",
      "hair accessory",
      "hairpin"
    ],
    "details": {
      "material": "Crochet yarn + metal clip base",
      "sizes": "One size fits all",
      "dimensions": "Approx. 5–7 cm",
      "care": "Avoid water",
      "deliveryTime": "5–7 business days",
      "customizable": "Yes — colour and flower design on request"
    }
  },
  {
    "id": "hair-2",
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
    "id": "hair-3",
    "name": "Bow Hair Tie Duo",
    "category": "hair",
    "categoryLabel": "Hair Accessories",
    "price": "₹NA",
    "description": "Set of two crochet bow hair ties, soft and pastel for everyday wear. A cute matching pair.",
    "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "Images/Hair Accessories/Clip.jpeg",
      "Images/Hair Accessories/Paranda.jpeg",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    "keywords": [
      "bow",
      "hair tie",
      "hair accessory",
      "duo",
      "set"
    ],
    "details": {
      "material": "Soft yarn + elastic hair tie",
      "sizes": "One size",
      "dimensions": "Bow width: approx. 6 cm",
      "care": "Gentle hand wash, air dry",
      "deliveryTime": "5–7 business days",
      "customizable": "Yes — colour on request"
    }
  },
  {
    "id": "keychain-1",
    "name": "Spiderman Keychain",
    "category": "keychains",
    "categoryLabel": "Keychains",
    "price": "₹449",
    "description": "Fun handmade Spiderman crochet keychain, a tiny huggable companion for your bag. A perfect gift for Marvel fans.",
    "image": "Images/Key chains/Spiderman.jpeg",
    "images": [
      "Images/Key chains/Spiderman.jpeg",
      "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    "keywords": [
      "spiderman",
      "keychain",
      "superhero",
      "bag charm"
    ],
    "details": {
      "material": "Amigurumi yarn + keyring hardware",
      "sizes": "One size",
      "dimensions": "Height: approx. 8–10 cm",
      "care": "Avoid water",
      "deliveryTime": "5–7 business days",
      "customizable": "Yes — other characters available on request"
    }
  },
  {
    "id": "keychain-2",
    "name": "Bear Charm Keychain",
    "category": "keychains",
    "categoryLabel": "Keychains",
    "price": "₹NA",
    "description": "Adorable crochet bear charm keychain, soft and small enough for any keyring. A handmade teddy that goes everywhere with you.",
    "image": "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=800&q=80",
      "Images/Key chains/Spiderman.jpeg",
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    "keywords": [
      "bear",
      "keychain",
      "charm",
      "bag charm",
      "teddy"
    ],
    "details": {
      "material": "Amigurumi yarn + keyring hardware",
      "sizes": "One size",
      "dimensions": "Height: approx. 7–9 cm",
      "care": "Avoid water",
      "deliveryTime": "5–7 business days",
      "customizable": "Yes — colour on request"
    }
  },
  {
    "id": "keychain-3",
    "name": "Flower Bunch Keychain",
    "category": "keychains",
    "categoryLabel": "Keychains",
    "price": "₹NA",
    "description": "A cheerful bunch of crochet flowers in keychain form, handmade petal by petal. Colourful and cheerful.",
    "image": "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=800&q=80",
      "Images/Key chains/Spiderman.jpeg",
      "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    "keywords": [
      "flower",
      "bunch",
      "keychain",
      "bouquet",
      "bag charm"
    ],
    "details": {
      "material": "Amigurumi yarn + keyring hardware",
      "sizes": "One size",
      "dimensions": "Length: approx. 10–12 cm",
      "care": "Avoid water",
      "deliveryTime": "5–7 business days",
      "customizable": "Yes — flower colours on request"
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
