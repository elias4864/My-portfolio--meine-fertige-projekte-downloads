
import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

const GITHUB_USERNAME = "elias4864";

const GitHubAboutSection: React.FC = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-base-content font-geist max-w-3xl mx-auto pt-1"
        >
            <div className="rounded-lg backdrop-blur-sm">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="my-4 text-center"
                >
                    <h2 className="text-xl text-start">
                        GitHub Activity
                    </h2>
                    <p className="text-sm text-base-content/60 text-start mt-1">
                        My coding journey and open-source contributions.
                    </p>
                </motion.div>

                {/* Contribution Graph */}
                <div className="rounded-lg overflow-hidden p-4">
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/Github%20Activity.png"
                            alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
                            className="w-full h-auto"
                            loading="lazy"
                        />
                    </a>
                </div>

                {/* Footer */}
                <div className="my-4 px-4 text-start">
                    <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">
                        Every contribution represents a step forward in my
                        development journey. Explore my projects and coding
                        activities on{" "}

                        <a
                            href={`https://github.com/${GITHUB_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium hover:text-primary underline underline-offset-6 decoration-dashed transition-all duration-300"
                        >
                            <Github size={16} />
                            GitHub
                        </a>.
                    </p>
                </div>

            </div>
        </motion.section>
    );
};

export default GitHubAboutSection;
