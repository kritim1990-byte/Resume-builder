# LPU Resume Builder PWA 🎓📄

A lightweight, minimal, privacy-first, and fully responsive Progressive Web Application (PWA) built with **Next.js (App Router)** and **Tailwind CSS**. Designed specifically for Lovely Professional University (LPU) students and developers to create, edit, preview, and download professional resumes as PDFs.

![LPU Resume Builder](https://img.shields.io/badge/LPU-Resume_Builder_PWA-amber?style=for-the-badge)
![Next.js 15+](https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![PWA Offline](https://img.shields.io/badge/PWA-Offline_Ready-emerald?style=for-the-badge)

---

## 🌟 Key Features

- ⚡ **100% Local Storage & Privacy First**: Zero external backend or database. All user data is stored safely inside `localStorage`.
- 🎓 **Lovely Professional University (LPU) Branding**: Header features official LPU crest logo and student-oriented defaults.
- 📱 **Mobile-First & Responsive UI**: Side-by-side split view on desktop and tabbed switcher ("Form Editor" vs "Live Preview") on mobile devices.
- 📄 **Real-time Live Preview & PDF Download**: Instant rendering with Zoom controls (`60%` to `150%`), native print styling, and 1-click vector PDF download via `html2pdf.js`.
- 🎨 **4 Professional Resume Templates & Theme Colors**:
  - *Modern Split* (2-column sidebar layout)
  - *Executive Classic* (traditional single-column typography)
  - *Creative Accent* (header banner with pill tags)
  - *High-Density Minimal* (ultra-clean tech layout)
  - 6 Palette themes: Indigo Blue, Emerald Green, Deep Navy, Royal Purple, Crimson Rose, Slate Gray.
- 🔄 **Autosave & Validation**: Real-time form validation with inline warning badges and instant timestamps ("Saved at 1:02 PM").
- 💾 **Backup & Restore**: Export and import full resume data as JSON.
- 🌙 **Dark/Light Mode**: Built-in toggle with persistent preferences and dark mode styling.
- 📶 **PWA & Offline Ready**: Service Worker (`sw.js`) and Web Manifest (`manifest.json`) for installing the app as a desktop/mobile PWA that works without internet connection.
- 🚀 **Vercel-Ready**: Zero server dependencies, optimized for static export and Vercel edge deployment.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js (v18.0.0 or higher)** and **npm** installed.

### Installation

```bash
# 1. Clone or navigate to project directory
cd resumebuilder

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start building your resume.

---

## 📦 Build for Production

```bash
# Build for production with TypeScript verification
npm run build

# Start production server locally
npm run start
```

---

## 🌐 Deploying to Vercel

1. Push this repository to **GitHub / GitLab / Bitbucket**.
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **Add New Project**.
3. Import your repository.
4. Keep framework setting as **Next.js**.
5. Click **Deploy**. Vercel will automatically build and publish your PWA.

---

## 📖 Developer Guide

For an in-depth, step-by-step breakdown of every file, component, hook, utility, service worker, and command in this repository, check out [DEVELOPER.md](./DEVELOPER.md).

---

## 📄 License

MIT License. Designed with ❤️ for the Lovely Professional University (LPU) developer community.
