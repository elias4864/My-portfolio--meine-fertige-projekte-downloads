// ================================================
// GLOBAL IMPORTS
// ================================================
import "./globals.css";
import 'simplebar/dist/simplebar.min.css';
import { ReactNode } from "react";

// ================================================
// COMPONENT IMPORTS
// ================================================
import Background from "@/components/ui/Background";
import { ClientThemeProvider } from "@/components/common/ClientThemeProvider";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ScrollToTopButton from "@/components/common/ScrollButton";
import Navbar from "@/components/common/NavBar";
import Splash from '@/components/ui/Splash';
// import CustomCursor from "@/components/common/CustomCursor";
import { Toaster } from "react-hot-toast";
import AvailabilityBadge from "@/components/common/AvailabilityBadge";

// ================================================
// METADATA (SEO / SOCIAL SHARING)
// ================================================
export const metadata = {
  title: "Elias Kaiser | Application Developer",
  description:
      "Portfolio of Elias Kaiser – Application Developer specializing in Next.js, React, JavaScript, and modern web applications.",
  keywords: [
    "Elias Kaiser",
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Express.js Developer",
    "MongoDB Developer",
    "Portfolio",
    "Web Engineer",
    "Software Engineer",
    "ReactJS Portfolio",
    "Next.js Portfolio",
    "Full-Stack Web Developer",
    "Web Application Developer"
  ],
  authors: [{ name: "Elias Kaiser" }],
  openGraph: {
    title: "Elias Kaiser | Application Developer",
    description: "Portfolio of Elias Kaiser – Fullstack Application Developer",
    url: "",
    siteName: 'Elias Kaiser Portfolio',
    images: [
      {
        url: "../assets/images/Initalen.jpg",
        width: 5000,
        height: 5000,
        alt: "Elias Kaiser-Portfolio",
      },
    ],
    locale: "en_US",
    alternateLocales: ["en_BD"],
    type: "website",
  },

  robots: "index, follow",
  icons: { icon: "/EK.jpg" },
};

// ================================================
// ROOT LAYOUT (SERVER COMPONENT)
// ================================================
export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured data JSON-LD for SEO */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Elias Kaiser",
                url: "https://m-hasan.vercel.app",
                sameAs: [
                  "https://www.linkedin.com/in/elias-jorin-ursin-kaiser-646638371/",
                  "https://github.com/elias4864",
                ],
                jobTitle: "Applikationsentwickler",
                worksFor: {
                  "@type": "Organization",
                  name: "Self-employed",
                },
              }),
            }}
        />
        {/* Canonical URL */}
        <link rel="canonical" href="https://m-hasan.vercel.app" />
      </head>

      <body suppressHydrationWarning>
      {/* ================================================
            CLIENT THEME PROVIDER
        ================================================ */}
      <ClientThemeProvider>

        {/* 🔹 Splash Screen */}
        <Splash />

        {/* 🔹 Background Canvas / Animation */}
        <Background />

        {/* 🔹 Optional Custom Cursor */}
        {/* <CustomCursor /> */}

        {/* ================================================
              GLOBAL TOASTER
          ================================================ */}
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: "transparent",
                boxShadow: "none",
              },
            }}
        />

        {/* ================================================
              PAGE LAYOUT WRAPPER
          ================================================ */}
        <div className="px-2 lg:px-0">
          {/* 🔹 Navbar */}
          <Navbar />

          {/* 🔹 Main Content */}
          <main>{children}</main>

          {/* 🔹 Footer */}
          <Footer />
        </div>

        {/* ================================================
              CLIENT WIDGETS
          ================================================ */}
        <ScrollToTopButton />
        <WhatsAppButton />
        <AvailabilityBadge status="Full-time" />

      </ClientThemeProvider>
      </body>
      </html>
  );
}