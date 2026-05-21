# 🎮 KAI SHI — Cyberpunk Anime Portfolio

> *"Level up your digital journey."*

A futuristic, anime-cyberpunk portfolio built with React + TypeScript + Vite + TailwindCSS + Framer Motion.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## 📦 Build

```bash
npm run build
npm run preview
```

## 📁 Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Top navigation with HUD icons
│   │   └── Footer.tsx       # Footer with status indicator
│   ├── sections/
│   │   ├── Hero.tsx         # Hero with parallax character + HUD panels
│   │   ├── About.tsx        # Character profile + stat attributes
│   │   ├── Skills.tsx       # Skill tree with animated progress bars
│   │   ├── Projects.tsx     # Quest board with project cards + modal
│   │   └── Contact.tsx      # Message portal + social links
│   └── ui/
│       ├── HUDFrame.tsx     # Reusable HUD panel + progress bar
│       ├── PixelGrid.tsx    # Background grid overlay
│       ├── ScanlineOverlay.tsx  # CRT scanlines + vignette
│       └── FloatingParticles.tsx # Ambient particle system
├── hooks/
│   ├── useMouseParallax.ts  # Mouse position tracking
│   └── useTypingEffect.ts   # Typewriter cycling text
├── App.tsx
├── main.tsx
└── index.css                # Global styles, pixel-border, glitch-text, etc.
```

## 🛠 Stack

| Tool | Version |
|------|---------|
| React | 19 |
| TypeScript | 5 |
| Vite | 6 |
| TailwindCSS | 3 |
| Framer Motion | 11 |

## 🎨 Design Tokens

```
Primary Red:  #cc1133
Crimson:      #ff1144
Background:   #080808
Panel:        #110a0d
Border:       #3d0f1a
Text:         #e8e0e3
Muted:        #7a6068
```

## ✨ Features

- 🌀 Mouse parallax on hero character
- 🌊 Floating + breathing idle animation
- 💡 Glow pulse effects
- ⌨️ Typewriter cycling text
- 🖥️ CRT scanline + vignette overlay
- 🎮 HUD panels with pixel-corner borders
- ✨ Ambient floating particles
- 🗺️ Scroll-triggered reveal animations
- 📋 Quest board modal detail view
- 📱 Fully responsive (mobile, tablet, desktop)
