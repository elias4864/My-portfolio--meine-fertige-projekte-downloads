'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const GitHubActivitySection: React.FC = () => {
  const GITHUB_USERNAME = "elias4864";

  return (
      <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-base-content font-geist max-w-3xl mx-auto pt-1"
      >
        <div className="rounded-lg p-2 border border-primary/30 bg-base-200 backdrop-blur-sm">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="m-4 text-start"
          >
            <p className="text-sm text-base-content mb-0">Contributions</p>
            <h2 className="text-2xl">
              GitHub <span className="text-base-content/60">Activity</span>
            </h2>
          </motion.div>

          {/* Live GitHub Contribution Graph / Image */}
          <div className="bg-base-200 rounded-lg overflow-hidden px-4 py-2 flex justify-center">
            <img
                src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
                alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
                className="w-full h-auto rounded-md"
                loading="lazy"
            />
          </div>

          {/* Footer / Links to GitHub Profile */}
          <div className="my-4 px-4 text-center flex flex-col sm:flex-row items-center justify-center gap-4">


            <Link
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm font-medium transition-all hover:text-primary hover:underline underline-offset-6 decoration-dashed"
            >
              View GitHub Profile
              <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </motion.section>
  );
};

export default GitHubActivitySection;