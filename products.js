/* ==========================================================================
   AURELLA CROCHETS — products.js
   Single source of truth for product data, used by the navbar live search
   and the search.html results page.

   Each product:
   - id: stable string, also used as the DOM id on its card in index.html
     (e.g. id "cardigan-1" -> <article id="cardigan-1" class="product-card">)
     so search results can deep-link / scroll to the exact card.
   - category: matches the data-category values used by the gallery tabs
   ========================================================================== */

const products = [
  {
    id: "cardigan-1",
    name: "Sage Comfort Cardigan",
    category: "cardigans",
    categoryLabel: "Cardigans",
    price: "₹NA",
    description: "Cozy, breathable sage-toned crochet cardigan, made-to-love for every season.",
    image: "Images/Cardigans/Cardigan.jpeg",
    keywords: ["cardigan", "sage", "comfort", "sweater", "layer", "cozy", "crochet cardigan"]
  },
  {
    id: "cardigan-2",
    name: "Blush Bloom Cardigan",
    category: "cardigans",
    categoryLabel: "Cardigans",
    price: "₹NA",
    description: "Soft blush pink crochet cardigan with a delicate, bloom-inspired texture.",
    image: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=600&q=80",
    keywords: ["cardigan", "blush", "bloom", "pink", "sweater", "layer", "crochet cardigan"]
  },
  {
    id: "cardigan-3",
    name: "Cream Cloud Cardigan",
    category: "cardigans",
    categoryLabel: "Cardigans",
    price: "₹NA",
    description: "Cloud-soft cream crochet cardigan, light enough for everyday wear.",
    image: "https://images.unsplash.com/photo-1610047530885-69ed4a8f3c6f?auto=format&fit=crop&w=600&q=80",
    keywords: ["cardigan", "cream", "cloud", "sweater", "layer", "crochet cardigan"]
  },
  {
    id: "bag-1",
    name: "Shoulder Bag",
    category: "Bags",
    categoryLabel: "Bags",
    price: "₹NA",
    description: "Handmade crochet shoulder bag, sturdy and finished with a sweet pastel palette.",
    image: "Images/Bags/Main Bag.jpeg",
    keywords: ["bag", "shoulder bag", "tote", "handbag", "purse", "crochet bag"]
  },
  {
    id: "bag-2",
    name: "Bag 2",
    category: "Bags",
    categoryLabel: "Bags",
    price: "₹NA",
    description: "Everyday crochet shoulder bag with a comfortable strap and roomy interior.",
    image: "Images/Bags/Shoulder Bag.jpeg",
    keywords: ["bag", "shoulder bag", "tote", "handbag", "purse", "crochet bag"]
  },
  {
    id: "bag-3",
    name: "Bag 3",
    category: "Bags",
    categoryLabel: "Bags",
    price: "₹NA",
    description: "Charming handmade crochet bag, perfect for adding texture to any outfit.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    keywords: ["bag", "tote", "handbag", "purse", "crochet bag"]
  },
  {
    id: "hair-1",
    name: "Clip",
    category: "hair",
    categoryLabel: "Hair Accessories",
    price: "₹NA",
    description: "Dainty handmade crochet hair clip, a sweet little detail for any look.",
    image: "Images/Hair Accessories/Clip.jpeg",
    keywords: ["clip", "hair clip", "hair accessory", "hairpin"]
  },
  {
    id: "hair-2",
    name: "Flower Parandi",
    category: "hair",
    categoryLabel: "Hair Accessories",
    price: "₹NA",
    description: "Traditional crochet flower parandi, handmade with care for braids and special occasions.",
    image: "Images/Hair Accessories/Paranda.jpeg",
    keywords: ["parandi", "paranda", "flower parandi", "braid", "hair accessory", "gajra"]
  },
  {
    id: "hair-3",
    name: "Bow Hair Tie Duo",
    category: "hair",
    categoryLabel: "Hair Accessories",
    price: "₹NA",
    description: "Set of two crochet bow hair ties, soft and pastel for everyday wear.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    keywords: ["bow", "hair tie", "hair accessory", "duo", "set"]
  },
  {
    id: "keychain-1",
    name: "Spiderman Keychain",
    category: "keychains",
    categoryLabel: "Keychains",
    price: "₹449",
    description: "Fun handmade Spiderman crochet keychain, a tiny huggable companion for your bag.",
    image: "Images/Key chains/Spiderman.jpeg",
    keywords: ["spiderman", "keychain", "superhero", "bag charm"]
  },
  {
    id: "keychain-2",
    name: "Bear Charm Keychain",
    category: "keychains",
    categoryLabel: "Keychains",
    price: "₹NA",
    description: "Adorable crochet bear charm keychain, soft and small enough for any keyring.",
    image: "https://images.unsplash.com/photo-1591025207163-942350e47db2?auto=format&fit=crop&w=600&q=80",
    keywords: ["bear", "keychain", "charm", "bag charm", "teddy"]
  },
  {
    id: "keychain-3",
    name: "Flower Bunch Keychain",
    category: "keychains",
    categoryLabel: "Keychains",
    price: "₹NA",
    description: "A cheerful bunch of crochet flowers in keychain form, handmade petal by petal.",
    image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=600&q=80",
    keywords: ["flower", "bunch", "keychain", "bouquet", "bag charm"]
  }
];

// Make available to both classic <script> includes and any future module use
if (typeof window !== "undefined") {
  window.AURELLA_PRODUCTS = products;
}
