<div align="center">

# 🚀 Modern Developer Portfolio

### A clean, fast, and fully responsive open-source portfolio built with Next.js 16 & TypeScript

[Live Demo](https://mehedi-h.vercel.app) · [Report Bug](https://github.com/themehedihq/Open-Source-Modern-Developer-Portfolio/issues) · [Request Feature](https://github.com/themehedihq/Open-Source-Modern-Developer-Portfolio/issues)

</div>

---

## ✨ About

**Modern Developer Portfolio** is an open-source, production-ready personal website designed for developers who want a beautiful, fast, and customizable online presence. It ships with an about page, projects showcase, blog, contact form, dashboard, resume, and more — all ready to make yours.

Fork it, customize the data files, and deploy. That's it.

---

## 🌟 Features

- **🎨 Modern UI** — Clean design with TailwindCSS + DaisyUI theming (Abyss / Lemonade)
- **⚡ Blazing Fast** — Built on Next.js 16 App Router with React 19
- **📱 Fully Responsive** — Looks great on desktop, tablet, and mobile
- **🌙 Theme Switcher** — Toggle between dark and light themes
- **📂 Projects Showcase** — Driven by a simple `projects.json` file
- **✍️ Blog Section** — Write posts in Markdown / MDX
- **📊 GitHub Activity** — Live contribution calendar powered by the GitHub API
- **📄 Resume / CV** — Dedicated resume page with downloadable PDF
- **📬 Contact Form** — EmailJS-powered contact form (no backend needed)
- **🎭 Animations** — Smooth transitions with Framer Motion & GSAP
- **🔍 SEO Ready** — Open Graph tags, metadata, and optimized for search engines
- **🛡️ TypeScript** — Fully typed codebase for reliability and great DX

---

## 🛠️ Tech Stack

| Category       | Technology                        |
| -------------- | --------------------------------- |
| Framework      | Next.js 16 (App Router)           |
| Language       | TypeScript                        |
| Styling        | TailwindCSS 4 + DaisyUI 5         |
| Animations     | Framer Motion + GSAP              |
| Icons          | Lucide React + React Icons        |
| Charts         | Recharts                          |
| Blog           | Gray Matter + Remark              |
| Contact        | EmailJS                           |
| Deployment     | Vercel                            |

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/              # About me page
│   ├── blog/               # Blog listing & posts
│   ├── contact/            # Contact form
│   ├── dashboard/          # GitHub activity dashboard
│   ├── links/              # Social links page
│   ├── projects/           # Projects showcase
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── not-found.tsx       # Custom 404
├── components/             # Reusable UI components
│   ├── about/              # About page components
│   ├── blogs/              # Blog components
│   ├── common/             # Shared components (navbar, footer, etc.)
│   ├── home/               # Home page sections
│   ├── projects/           # Project card components
│   └── ui/                 # Base UI primitives
├── data/                   # Content data files
│   ├── blogs/              # Markdown blog posts
│   ├── projects.json       # Project entries
│   ├── resume.json         # Resume / CV data
│   └── skills-list.json    # Skills & technologies
├── lib/                    # Utility functions
├── public/                 # Static assets & images
└── types/                  # TypeScript type declarations
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/themehedihq/Open-Source-Modern-Developer-Portfolio.git
cd Open-Source-Modern-Developer-Portfolio

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm run build
pnpm run start
```

---

## 🎨 Customization Guide

Make this portfolio yours by editing the data files — no need to touch the component code.

### 1. Personal Info

Update your name, bio, social links, and images in the relevant component files under `components/home/` and `components/about/`.

### 2. Projects

Edit `data/projects.json`:

```json
{
  "title": "My Project",
  "description": "A short description of the project.",
  "image": "/assets/project.png",
  "liveUrl": "https://myproject.com",
  "repoUrl": "https://github.com/me/myproject",
  "tags": ["React", "Node.js", "MongoDB"]
}
```

### 3. Skills

Edit `data/skills-list.json` to list your technologies and proficiency levels.

### 4. Blog Posts

Add Markdown files to `data/blogs/`. Each file should include frontmatter:

```markdown
---
title: "My Blog Post"
date: "2025-08-17"
summary: "A brief summary of the post."
tags: ["nextjs", "tutorial"]
---

Your content here...
```

### 5. Resume

Edit `data/resume.json` for your experience, education, and certifications. Place your PDF resume in `public/` and update the download link.

### 6. Theme

The portfolio uses DaisyUI themes. Toggle between **Abyss** (dark) and **Lemonade** (light) or add your own in `app/globals.css`.

---

## 🌐 Deployment

Deploy to **Vercel** with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/themehedihq/Open-Source-Modern-Developer-Portfolio)

Or deploy to any platform that supports Next.js:

```bash
# Vercel CLI
npx vercel

# Or push to GitHub and connect via Vercel dashboard
```

---

## 🤝 Contributing

Contributions are welcome! This is an open-source project and your ideas help make it better.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Please make sure to update the data files (not personal info) when adding features so the template stays generic.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this project for personal or commercial use. Attribution is appreciated but not required.

---

## 📬 Contact

**Mehedi Hasan** — Full Stack Web Developer (MERN)

- 📧 Email: [hello@mehedi-hasan.me](mailto:hello@mehedi-hasan.me)
- 🔗 LinkedIn: [themehedihq](https://www.linkedin.com/in/themehedihq)
- 🌐 Portfolio: [mehedi-h.vercel.app](https://mehedi-h.vercel.app)
- 🐙 GitHub: [themehedihq](https://github.com/themehedihq)

---

<div align="center">

**If you find this project useful, consider giving it a ⭐ on GitHub!**

Built with ❤️ by [Mehedi Hasan](https://github.com/themehedihq)

</div>
