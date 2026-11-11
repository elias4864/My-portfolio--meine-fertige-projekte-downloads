// ================================================
// IMPORTS
// ================================================
import HeroSection from '@/components/home/Hero';
import ResumeSections from '@/components/home/Resume';
import { ScrollProgress } from "@/components/ui/scroll-progress";
import ProjectsHomePage from '@/components/home/ProjectsHomePage';
import GitHubActivitySection from '@/components/home/GitHub';
import SkillsSection from '@/components/home/Skills';
import ContactHomePage from '@/components/home/ContactHomePage';
import WhatIDoSection from '@/components/home/WhatIDoSection';
import { getSortedBlogsData } from '@/lib/blogs';

// ================================================
// HOME PAGE COMPONENT
// ================================================
export default async function Home() {
  // 🔹 Fetch all blogs
  const allBlogsData = await getSortedBlogsData();

  // 🔹 Get latest 3 blogs for homepage
  const latestBlogs = allBlogsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen font-geist relative">

      {/* ================================================
          SCROLL PROGRESS INDICATOR
      ================================================ */}
      <ScrollProgress />

      {/* ================================================
          1. Hero Section – Identity & CTA
      ================================================ */}
      <HeroSection />

      {/* ================================================
          2. Skills Section – Quick Technical Validation
      ================================================ */}
      <SkillsSection />

      {/* ================================================
          3. Featured Projects – Primary Proof
      ================================================ */}
      <ProjectsHomePage />

      {/* ================================================
          4. What I Do – Services / Offerings
      ================================================ */}
      <WhatIDoSection />

      {/* ================================================
          5. Resume Section – Hiring Support
      ================================================ */}
      <ResumeSections />

      {/* ================================================
          6. Blog Section – Thought Leadership
      ================================================ */}

      {/* ================================================
          7. GitHub Section – Activity Proof
      ================================================ */}
      <GitHubActivitySection />

      {/* ================================================
          8. Contact Section – Conversion
      ================================================ */}
      <ContactHomePage />

    </div>
  );
}
