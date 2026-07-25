# 🛠️ LPU Resume Builder PWA — Comprehensive Developer Guide

Welcome to the beginner-friendly, step-by-step implementation guide for the **LPU Resume Builder PWA**. This document explains every single folder, file, data structure, component, hook, utility, service worker mechanism, and command used in this project.

---

## 📐 1. System Architecture & Folder Structure

Below is the complete project sitemap and sitemap explanation:

```text
resumebuilder/
├── public/
│   ├── favicon.ico           # Application favicon icon
│   ├── manifest.json         # PWA Web Application Manifest (defines app name, icons, colors)
│   └── sw.js                 # Service Worker (handles offline caching strategy)
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind CSS import, theme variables & @media print styles
│   │   ├── layout.tsx        # Next.js Root Layout with metadata, PWA links & font loaders
│   │   └── page.tsx          # Main entry page, responsive grid & mobile tab state
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx    # Header bar with LPU logo, save status, theme & JSON backup
│   │   │   ├── LpuLogo.tsx   # Lovely Professional University SVG crest logo
│   │   │   ├── PwaRegister.tsx# Client-side Service Worker registration & install prompt
│   │   │   └── ThemeToggle.tsx# Light/Dark mode switcher button
│   │   ├── editor/
│   │   │   ├── EditorForm.tsx# Tabbed container for form sections & validation warning banner
│   │   │   ├── PersonalInfoForm.tsx # Form for name, email, phone, location & summary
│   │   │   ├── EducationForm.tsx    # Dynamic list editor for university degree entries
│   │   │   ├── ExperienceForm.tsx   # Dynamic list editor for work experience
│   │   │   ├── SkillsForm.tsx       # Dynamic list editor for technical & soft skills
│   │   │   ├── ProjectsForm.tsx     # Dynamic list editor for software projects
│   │   │   └── StylingForm.tsx      # Template selector & color palette picker
│   │   ├── preview/
│   │   │   └── ResumePreview.tsx   # Printable A4 page container, zoom controls & PDF generator
│   │   └── templates/
│   │       ├── TemplateRenderer.tsx# Dynamic layout router & theme color injector
│   │       ├── ModernTemplate.tsx  # 2-column split layout template
│   │       ├── ClassicTemplate.tsx # Executive single-column serif/sans template
│   │       ├── CreativeTemplate.tsx# Top banner layout with pill tags
│   │       └── MinimalTemplate.tsx # High-density minimalist template
│   ├── hooks/
│   │   └── useResumeStore.ts # Central custom hook for state, autosave & validation
│   ├── types/
│   │   └── resume.ts         # TypeScript interface definitions for resume data
│   └── utils/
│       ├── sampleData.ts     # Pre-populated LPU student sample resume
│       └── validation.ts     # Form validation helper functions
├── DEVELOPER.md              # Detailed line-by-line developer reference manual
├── README.md                 # Setup, feature overview, and Vercel deployment guide
├── package.json              # Project dependencies & npm build scripts
└── tsconfig.json             # TypeScript compiler settings & alias routes (@/*)
```

---

## 📝 2. Step-by-Step File Implementation & Explanations

### A. TypeScript Type Definitions (`src/types/resume.ts`)

This file establishes the contract for all resume objects throughout the app.

- `PersonalInfo`: Stores user's name, title, contact details (email, phone, location), portfolio links, and summary.
- `Education`: Represents a single education entry (institution name, degree, field of study, start/end dates, CGPA/grade, description).
- `Experience`: Represents a work experience entry (company, position, location, dates, current status, bullet points).
- `Skill`: Represents a skill entry (name, category, proficiency level).
- `Project`: Represents a project entry (title, tech stack, link, dates, description).
- `TemplateId`: Allowed template layout names (`'modern' | 'classic' | 'creative' | 'minimal'`).
- `ThemeColor`: Allowed accent color names (`'indigo' | 'emerald' | 'navy' | 'violet' | 'rose' | 'slate'`).
- `ResumeData`: Master container holding all sections + active template & color choice.

---

### B. Pre-loaded LPU Sample Data (`src/utils/sampleData.ts`)

To ensure first-time users see a working resume immediately instead of an empty screen, we provide a complete sample featuring Lovely Professional University credentials (`aarav.sharma@lpu.in`, B.Tech in CSE at LPU, LPU Coding Club leadership, and campus projects).

---

### C. Validation Engine (`src/utils/validation.ts`)

- Checks required fields: Full Name, Email.
- Verifies email pattern using regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
- Checks phone number formatting.
- Inspects education and experience entries for missing institution/company names.
- Returns an array of `ValidationError` objects displayed live in the `EditorForm`.

---

### D. State Management & LocalStorage Hook (`src/hooks/useResumeStore.ts`)

This custom React hook handles state management without external complex state libraries:

1. **`useEffect` initialization**: Reads `lpu_resume_builder_data_v1` from `localStorage`. If found, populates state; otherwise falls back to `SAMPLE_RESUME`.
2. **Autosave mechanism**: Every mutation function (`updatePersonalInfo`, `addEducation`, `removeExperience`, etc.) updates React state AND immediately serializes data to `localStorage` with a refreshed timestamp.
3. **Data utilities**:
   - `resetToSample()`: Restores the default LPU sample resume.
   - `resetToBlank()`: Clears all fields to start fresh.
   - `loadFromJson(data)`: Restores state from an imported JSON file backup.

---

### E. LPU Logo Crest (`src/components/common/LpuLogo.tsx`)

A pure inline SVG component that renders the Lovely Professional University crest:
- **Outer Seal**: Deep maroon background with golden border (`#991B1B` to `#F59E0B`).
- **Sun & Rays**: Symbolizing enlightenment and academic excellence.
- **Open Book & Gear**: Representing knowledge, technology, and engineering.
- **Text Branding**: Gradient text for "LPU" and "Resume Builder PWA".

---

### F. Dark/Light Theme Switcher (`src/components/common/ThemeToggle.tsx`)

- Reads user preference from `localStorage.getItem('lpu_resume_theme')` or system media query (`prefers-color-scheme: dark`).
- Toggles the `.dark` class on the `<html>` root element.
- Enables Tailwind's `dark:` modifier across all components.

---

### G. Service Worker & PWA Installer (`src/components/common/PwaRegister.tsx` + `public/sw.js` + `public/manifest.json`)

1. **`public/manifest.json`**: Configures app name ("LPU Resume Builder PWA"), standalone display mode, background color (`#0f172a`), and theme color (`#f59e0b`).
2. **`public/sw.js`**: Uses a **Stale-While-Revalidate** strategy. Requests serve instantly from browser cache while updating in the background. If offline, cached assets render seamlessly.
3. **`PwaRegister.tsx`**: Registers `sw.js` on load, monitors `navigator.onLine` to display an "Offline Mode" badge when disconnected, and captures `beforeinstallprompt` to present an inline "Install PWA" button.

---

### H. Form Editor Components (`src/components/editor/`)

- **`EditorForm.tsx`**: Top navigation tab bar allowing switching between *Personal*, *Education*, *Experience*, *Skills*, *Projects*, and *Design*. Displays a validation alert box when input errors occur.
- **`PersonalInfoForm.tsx`**: Input fields with icons (`User`, `Mail`, `Phone`, `MapPin`, `Globe`, `Briefcase`, `LinkIcon`) and text area for professional summary.
- **`EducationForm.tsx`**: Dynamic list manager allowing users to add multiple degrees, grade/CGPA, and dates.
- **`ExperienceForm.tsx`**: Dynamic list manager supporting "Current Role" checkbox, location, and bullet point descriptions.
- **`SkillsForm.tsx`**: Dynamic skill tag creator with category filter (*Technical*, *Soft Skills*, *Tools*, *Languages*) and proficiency levels.
- **`ProjectsForm.tsx`**: Project entry manager with repository link inputs and tech stack descriptions.
- **`StylingForm.tsx`**: Template picker (Modern, Classic, Creative, Minimal) and accent color chooser.

---

### I. Resume Template Engine (`src/components/templates/`)

- **`TemplateRenderer.tsx`**: Maps color names to hex codes (`COLOR_MAP`) and routes to the selected template component.
- **`ModernTemplate.tsx`**: 2-Column layout with accent sidebar for education & skills.
- **`ClassicTemplate.tsx`**: Single-column executive design with classic serif header.
- **`CreativeTemplate.tsx`**: Header banner block with pill-style skill badges.
- **`MinimalTemplate.tsx`**: Ultra-compact design optimizing page space.

---

### J. Live Preview & PDF Download (`src/components/preview/ResumePreview.tsx`)

1. **Zoom Controls**: State-driven zoom scale (`60%` to `150%`) via CSS `transform: scale(...)`.
2. **Native Print (`window.print()`)**: Leverages `@media print` rules defined in `globals.css` to hide headers and form controls, rendering pure A4 paper.
3. **`html2pdf.js` Export**: Dynamically imports `html2pdf.js` client-side, targets `#resume-preview-container`, sets A4 canvas dimensions (`210mm x 297mm`), scale factor `2`, and saves the file directly to the user's computer (`Aarav_Sharma_LPU.pdf`).

---

### K. Root Layout & Main Page (`src/app/layout.tsx` & `src/app/page.tsx`)

- **`layout.tsx`**: Injects Geist fonts, PWA viewport meta tags, manifest link, and root HTML structure.
- **`page.tsx`**: Connects `useResumeStore`. On desktop (`lg:grid-cols-2`), renders Form Editor on the left and Live Preview on the right side-by-side. On mobile screens, provides a segmented pill toggle button ("Form Editor" vs "Live Preview").

---

## 💻 3. Essential Commands Cheat Sheet

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start Next.js development server at `http://localhost:3000` |
| `npm run build` | Compile Next.js production build & run TypeScript type checks |
| `npm run start` | Run production server locally after building |
| `npm run lint` | Execute ESLint checks across codebase |

---

## 🎓 Summary

The LPU Resume Builder PWA combines modern React 19 / Next.js App Router patterns with Tailwind CSS v4 and PWA offline capabilities. It provides full user privacy by persisting data exclusively inside `localStorage` while offering real-time PDF exports and multi-template customization.
