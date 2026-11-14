# 🚀 Elias Kaiser — Personal Portfolio

> My personal portfolio website built to showcase my projects, skills, and professional journey as an application development student at WISS Zurich.

🌐 **Personal Live Website:** [elias-portfolio.eljourka.workers.dev](https://elias-portfolio.eljourka.workers.dev/)

---

## ✨ Features

- **🎨 Modern UI:** Clean design with Tailwind CSS 4 + DaisyUI 5 (Abyss / Lemonade themes)
- **⚡ Blazing Fast:** Built on Next.js 16 App Router with React 19 and Edge deployment
- **📱 Fully Responsive:** Optimized for desktop, tablet, and mobile viewports
- **🌙 Theme Switcher:** Seamless toggle between dark and light modes
- **📂 Projects Showcase:** Dynamic project entries driven by `projects.json`
- **✍️ Blog Section:** Markdown / MDX-powered blog posts
- **📊 GitHub Activity:** Live contribution charts and metrics
- **📄 Resume / CV:** Dedicated professional resume page with downloadable details
- **📬 Contact Form:** Fully client-side integrated contact form powered by EmailJS
- **🎭 Animations:** Smooth page transitions and micro-interactions with Framer Motion & GSAP
- **🔍 SEO Ready:** Open Graph tags, automated sitemaps, and search engine optimization
- **🛡️ TypeScript:** Fully typed codebase for maximum reliability and developer experience

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 + DaisyUI 5 |
| **Animations** | Framer Motion + GSAP |
| **Icons** | Lucide React |
| **Content & Blog** | Gray Matter + Remark |
| **Contact Integration** | EmailJS |
| **Deployment / Edge** | Cloudflare Workers & Pages (via Open-Next & Wrangler) |

---

## 📁 Project Structure

```text
├── app/                      # Next.js App Router pages
│   ├── about/                # About me page
│   ├── blog/                 # Blog listing & posts
│   ├── contact/              # Contact form
│   ├── dashboard/            # GitHub activity dashboard
│   ├── links/                # Social links page
│   ├── projects/             # Projects showcase
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── not-found.tsx         # Custom 404 page
├── components/               # Reusable UI components
│   ├── about/                # About page components
│   ├── blogs/                # Blog components
│   ├── common/               # Shared components (navbar, footer, etc.)
│   ├── home/                 # Home page sections
│   ├── projects/             # Project card components
│   └── ui/                   # Base UI primitives
├── data/                     # Content data files
│   ├── blogs/                # Markdown blog posts
│   ├── projects.json         # Project entries
│   ├── resume.json           # Resume / CV data
│   └── skills-list.json      # Skills & technologies
├── lib/                      # Utility functions & helpers
├── public/                   # Static assets & images
└── types/                    # TypeScript type declarations




⚙️ Scripts & Commands
This project uses pnpm as the package manager. Available scripts in package.json:

pnpm run dev — Starts the local Next.js development server.

pnpm run build — Builds the application for production (next build).

pnpm run start — Starts the production server locally (next start).

pnpm run lint — Runs ESLint for code quality checks.

pnpm run preview — Builds the project using Open-Next and starts a local Cloudflare Worker preview.

pnpm run deploy — Builds the application and deploys it live to Cloudflare via Wrangler.

☁️ Cloudflare Deployment Setup
This Next.js application uses Open-Next and Wrangler to run efficiently on Cloudflare's edge network.

Log in to your Cloudflare account through the CLI:


npx wrangler login
Deploy your app live on Cloudflare:


npx wrangler deploy
(Alternative via package script: pnpm run deploy)

📬 Contact
Elias Kaiser — Full Stack Application Developer

📧 Email: elias.kaiser@gmx.ch

🔗 LinkedIn: elias-kaiser

🌐 Portfolio: https://elias-portfolio.eljourka.workers.dev/

🐙 GitHub: elias4864

If you find this project useful, consider giving it a ⭐ on GitHub!

Built with ❤️ by Elias Kaiser
