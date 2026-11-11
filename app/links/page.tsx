'use client';

import React from "react";
import { motion } from "framer-motion";

// React-icons imports
import { FiGlobe, FiMail, FiFileText } from "react-icons/fi";
import { Github, Linkedin, Facebook, Instagram } from "lucide-react";
import {
  FaDev,
  FaDiscord,
  FaHackerrank,
  FaMedium,
  FaDribbble,
  FaBehance,
  FaTelegramPlane,
  FaWhatsapp,
  FaPinterest,
  FaCodepen,
  FaUsers,
  FaFigma,
  FaYoutube,
  FaStackOverflow,
} from "react-icons/fa";
import { FaThreads, FaXTwitter, FaHashnode } from "react-icons/fa6";
import { SiBluesky, SiQuora, SiPeerlist } from "react-icons/si";

/* ---------------- Social Links Data ---------------- */
interface SocialLink {
  icon: React.ComponentType<{ size?: number }>;
  href: string;
  label: string;
}

interface SocialCategory {
  title: string;
  links: SocialLink[];
}

const socialCategories: SocialCategory[] = [
  {
    title: "Developer",
    links: [
      { icon: Github, href: "https://github.com/elias4864", label: "GitHub" },
      { icon: FaHashnode, href: "https://gitlab.com/elias4864", label: "Gitlab" },
    ],
  },
  {
    title: "Professional",
    links: [
      { icon: Linkedin, href: "https://www.linkedin.com/in/elias-jorin-ursin-kaiser-646638371/", label: "LinkedIn" },
      { icon: FiGlobe, href: "https://mehedi-h.vercel.app", label: "" },

      { icon: FiMail, href: "mailto:elias.kaiser@gmx.ch", label: "Email" },
      { icon: FaUsers, href: "https://teams.microsoft.com/l/chat/0/0?users=Elias.Kaiser@wiss-edu.ch", label: "Microsoft Teams" }
    ],
  },
  {
    title: "Designer",
    links: [
      { icon: FaFigma, href: "https://www.figma.com/files/team/1546370570397248215/user/1546370568436002861?fuid=1546370568436002861", label: "Figma" },
    ],
  },

  {
    title: "Messaging",
    links: [
      { icon: FaWhatsapp, href: "https://wa.me/+41764928305", label: "WhatsApp" },


    ],
  },
];

/* ---------------- Links Page ---------------- */
const LinksPage: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-base-content font-geist max-w-3xl mx-auto pt-1"
    >
      <div className="w-full max-w-3xl mx-auto min-h-screen rounded-lg p-4 bg-base-200 backdrop-blur-sm transition-shadow duration-300">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="my-4 text-start"
        >
          <h2 className="text-3xl">Links</h2>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {socialCategories.map((category, idx) => (
            <div key={idx}>
              <h3 className="mb-3 text-sm tracking-widest uppercase text-base-content/60">
                {category.title}
              </h3>

              <ul className="space-y-2">
                {category.links.map((link, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm underline-offset-6 decoration-dashed hover:underline hover:text-primary transition-all duration-300"
                    >
                      <link.icon size={14} />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default LinksPage;
