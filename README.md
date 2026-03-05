# 🌍 Hack the Planet — LinkedIn Post Creator

A retro 90s-themed LinkedIn card generator for the **Hack the Planet CTF 2026** event at SAIT.

---

## 📁 Project Structure

```
hack-the-planet/
├── public/
│   └── logo.png              ← Drop the HTP globe logo here
├── src/
│   ├── components/
│   │   ├── Card.jsx          ← The visual card/poster
│   │   └── Controls.jsx      ← Sidebar controls panel
│   ├── App.jsx               ← Main app, state management
│   ├── index.css             ← All styles
│   └── main.jsx              ← React entry point
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## 🚀 Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your logo
# Copy HackThePlanet-Logo.png into /public and rename it logo.png

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## ☁️ Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the repo
4. Vercel auto-detects Vite — just click **Deploy**

> No environment variables needed. It's a fully static site.

---

## ⚙️ Customization

| File | What to change |
|---|---|
| `src/components/Card.jsx` | Card layout, text, globe position |
| `src/components/Controls.jsx` | Dropdown options, slider ranges |
| `src/index.css` | Colors, fonts, animations |
| `public/logo.png` | The globe logo image |

---

## 🛠 Tech Stack

- **React 18** + **Vite 5**
- **html2canvas** for card export
- **Google Fonts** — Press Start 2P, Share Tech Mono, Rajdhani
- Deployed via **Vercel** (static)
