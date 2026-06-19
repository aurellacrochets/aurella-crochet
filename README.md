# Aurella Crochets — Website

A complete, deployment-ready website for Aurella Crochets, built with pure HTML, CSS, and JavaScript — no frameworks, no build tools, no external dependencies (other than Google Fonts and placeholder images, both of which you can swap out).

## 📁 Folder Structure

```
aurella-crochets/
├── index.html      → All page content, sections, SEO meta tags
├── style.css        → All styling, colors, layout, animations
├── script.js         → Mobile menu, gallery filters, FAQ accordion, scroll reveal
└── README.md          → This file
```

---

## 🖼️ Replacing Placeholder Images

Every product image currently uses a placeholder photo from Unsplash. Search `<!-- PLACEHOLDER IMAGE` or `<!-- PRODUCT PLACEHOLDER` in `index.html` to find every spot that needs a real photo.

To replace an image:
1. Save your product photo (ideally a square crop, at least 800×800px, compressed as `.jpg` or `.webp`).
2. Replace the `src="..."` URL in the relevant `<img>` tag with your image's path, e.g. `src="images/cardigan-01.jpg"`.
3. Update the `alt="..."` text to describe the actual photo.

**To add more products** to any category (Cardigans, Hair Accessories, Clips, Parandas, Gajra Flowers, Keychains): copy an existing `<article class="product-card">...</article>` block within that category's `.product-grid` and edit the image, title, and price.

**To update a price**: replace `Price: ₹NA` with the real price, e.g. `Price: ₹499`.

---

## 🚀 Deployment Instructions

### Option A — Netlify (easiest, drag & drop)

1. Go to [https://app.netlify.com](https://app.netlify.com) and sign up / log in (free).
2. From your Netlify dashboard, click **"Add new site" → "Deploy manually"**.
3. Drag the entire `aurella-crochets` folder (containing `index.html`, `style.css`, `script.js`) into the upload area.
4. Netlify will instantly deploy and give you a live URL like `https://aurella-crochets.netlify.app`.
5. (Optional) Go to **Site settings → Domain management** to connect a custom domain like `aurellacrochets.com`.

**Alternative (Git-based, auto-redeploy on changes):**
1. Push this folder to a GitHub repository (see Option B, steps 1–4 below).
2. In Netlify, click **"Add new site" → "Import an existing project"** and connect your GitHub repo.
3. Leave build settings blank (no build command needed — it's a static site). Set publish directory to `/` (root).
4. Click **Deploy site**.

---

### Option B — GitHub Pages

1. Create a free GitHub account at [https://github.com](https://github.com) if you don't have one.
2. Create a new repository (e.g. `aurella-crochets`). Keep it **Public**.
3. Upload `index.html`, `style.css`, and `script.js` to the repository:
   - Click **"Add file" → "Upload files"** on the repo page, drag in all three files, then **Commit changes**.
4. Go to the repository's **Settings → Pages**.
5. Under **Build and deployment → Source**, select **Deploy from a branch**.
6. Choose **Branch: main**, **Folder: / (root)**, then click **Save**.
7. Wait 1–2 minutes. Your site will be live at:
   `https://YOUR-USERNAME.github.io/aurella-crochets/`
8. (Optional) Add a custom domain under **Settings → Pages → Custom domain**.

---

## ✅ Pre-Launch Checklist

- [ ] Replace all placeholder product photos with real Aurella Crochets photography
- [ ] Update all `Price: ₹NA` once pricing is finalized
- [ ] Replace the favicon (currently a 🧶 emoji) with a real logo icon
- [ ] Update `og:image` and `twitter:image` URLs in `index.html` to a real banner image once hosted
- [ ] Update `og:url` and `canonical` link once you have a final domain
- [ ] Test the WhatsApp button on a real phone to confirm the prefilled message opens correctly
- [ ] Proofread the About, FAQ, and Reviews sections — reviews are sample placeholders and should be replaced with real customer feedback once available

---

## 🛠️ Notes for Future Edits

- **Colors** are defined once as CSS variables at the top of `style.css` (`:root { ... }`) — change `--pink`, `--sage`, `--brown` etc. there to retheme the whole site at once.
- **WhatsApp message**: the prefilled text appears in every "Order Now" link as a URL-encoded string after `?text=`. Edit the encoded text directly, or generate a new encoded link using any "URL encode" tool online.
- **Fonts**: Fraunces (headings) and Quicksand (body text) load from Google Fonts via the `<link>` tags in the `<head>`. No local font files needed.
- The site has **no backend** — all "ordering" happens via WhatsApp deep links, so there's no database, server, or payment processing to maintain.
