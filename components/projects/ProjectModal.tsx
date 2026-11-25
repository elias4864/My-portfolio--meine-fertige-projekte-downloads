'use client';

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  X,
  Download,
  Users,
  FileText,
  Presentation,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import type { Project } from "@/components/projects/ProjectCard";

interface ProjectModalProps {
  showModal: boolean;
  selectedProject: Project | null;
  closeModal: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
                                                     showModal,
                                                     selectedProject,
                                                     closeModal,
                                                   }) => {
  // Close on Escape + prevent body scroll
  useEffect(() => {
    if (!showModal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showModal, closeModal]);

  // Memoize project data
  const project = useMemo(() => selectedProject, [selectedProject]);

  const powerpointList = useMemo(() => {
    if (!project) return [];
    const collected = [
      project.powerpointLink1,
      project.powerpointLink2,
      ...(Array.isArray(project.powerpointLinks) ? project.powerpointLinks : []),
      project.powerpointLink,
    ].filter((link): link is string => Boolean(link && link.trim()));

    return Array.from(new Set(collected));
  }, [project]);

  const drawioList = useMemo(() => {
    if (!project) return [];
    const collected = [
      project.drawioLink1,
      project.drawioLink2,
      ...(Array.isArray(project.drawioLinks) ? project.drawioLinks : []),
      project.drawioLink,
    ].filter((link): link is string => Boolean(link && link.trim()));

    return Array.from(new Set(collected));
  }, [project]);

  return (
      <AnimatePresence>
        {showModal && project && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-geist fixed inset-0 backdrop-blur-sm z-[99]
                     p-4 flex items-center justify-center"
                onClick={closeModal}
            >
              <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-base-200 border border-primary/30 rounded-2xl shadow-2xl
                       w-full max-h-[95vh] overflow-hidden flex flex-col relative max-w-2xl mx-auto"
                  onClick={(e) => e.stopPropagation()}
              >
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-4 z-30 rounded-lg p-2 sm:p-1 text-red-500 hover:bg-primary/20 transition-all"
                    aria-label="Close modal"
                >
                  <X size={14} />
                </button>

                <div className="flex-1 overflow-y-scroll modal-scrollbar p-6 md:p-8 space-y-6">
                  <div className="w-full h-56 md:h-72 overflow-hidden flex-shrink-0 relative rounded-lg">
                    {project.videos?.length ? (
                        <video
                            src={project.videos[0]}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />
                    ) : project.images?.length ? (
                        <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    ) : null}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl md:text-3xl">
                      {project.title}
                    </h2>

                    <div className="flex flex-wrap gap-4">
                      {project.liveLink && (
                          <motion.a
                              whileHover={{ x: 3 }}
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-6 decoration-dashed hover:underline rounded-lg group inline-flex items-center gap-1 hover:text-primary font-geist text-sm cursor-pointer transition-all duration-300"
                          >
                            <ArrowUpRight size={14} />
                            Live
                          </motion.a>
                      )}

                      {/* Link zur Projektdokumentation */}
                      {project.documentationLink && (
                          <motion.a
                              whileHover={{ x: 3 }}
                              href={project.documentationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-6 decoration-dashed hover:underline rounded-lg group inline-flex items-center gap-1 hover:text-primary font-geist text-sm cursor-pointer transition-all duration-300"
                          >
                            <FileText size={14} />
                            Dokumentation
                          </motion.a>
                      )}

                      {/* Links zu PowerPoint-Präsentationen */}
                      {powerpointList.map((pptLink, idx) => (
                          <motion.a
                              key={`${pptLink}-${idx}`}
                              whileHover={{ x: 3 }}
                              href={pptLink}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-6 decoration-dashed hover:underline rounded-lg group inline-flex items-center gap-1 hover:text-primary font-geist text-sm cursor-pointer transition-all duration-300"
                          >
                            <Presentation size={14} />
                            {powerpointList.length > 1 ? `PowerPoint ${idx + 1}` : "PowerPoint"}
                          </motion.a>
                      ))}

                      {/* Links zu Draw.io Diagrammen */}
                      {drawioList.map((diagramLink, idx) => (
                          <motion.a
                              key={`${diagramLink}-${idx}`}
                              whileHover={{ x: 3 }}
                              href={diagramLink}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-6 decoration-dashed hover:underline rounded-lg group inline-flex items-center gap-1 hover:text-primary font-geist text-sm cursor-pointer transition-all duration-300"
                          >
                            <Workflow size={14} />
                            {drawioList.length > 1 ? `Draw.io ${idx + 1}` : "Draw.io"}
                          </motion.a>
                      ))}

                      {project.downloadLink && (
                          <motion.a
                              whileHover={{ x: 3 }}
                              href={project.downloadLink}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-6 decoration-dashed hover:underline rounded-lg group inline-flex items-center gap-1 hover:text-primary font-geist text-sm cursor-pointer transition-all duration-300"
                          >
                            <Download size={14} />
                            Download
                          </motion.a>
                      )}

                      {project.frontendRepo && (
                          <motion.a
                              whileHover={{ x: 3 }}
                              href={project.frontendRepo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-6 decoration-dashed hover:underline rounded-lg group inline-flex items-center gap-1 hover:text-primary font-geist text-sm cursor-pointer transition-all duration-300"
                          >
                            <Github size={14} />
                            Frontend
                          </motion.a>
                      )}

                      {project.backendRepo && (
                          <motion.a
                              whileHover={{ x: 3 }}
                              href={project.backendRepo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-6 decoration-dashed hover:underline rounded-lg group inline-flex items-center gap-1 hover:text-primary font-geist text-sm cursor-pointer transition-all duration-300"
                          >
                            <Github size={14} />
                            Backend
                          </motion.a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-base-content/80 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Contributors Section */}
                  {project.contributors && project.contributors.length > 0 && (
                      <div className="flex items-center gap-2 bg-base-300/40 border border-primary/20 rounded-xl px-4 py-3 text-sm text-base-content/90">
                        <Users size={16} className="shrink-0 text-primary" />
                        <div>
                          <span className="font-semibold text-base-content mr-1 text-lg">Mitwirkende:</span>
                          <span>{project.contributors.join(', ')}</span>
                        </div>
                      </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-base-300/40 border border-primary/20 rounded-xl p-5 space-y-3">
                      <h3 className="text-md text-base-content bg-sky-500">Key Features</h3>
                      <ul className="space-y-2 text-sm text-base-content/80 list-disc list-inside">
                        {Array.isArray(project.features) && project.features.length ? (
                            project.features.map((feature, index) => (
                                <li key={feature + index}>{feature}</li>
                            ))
                        ) : (
                            <li>No key features available</li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-base-300/40 border border-primary/20 rounded-xl p-5 space-y-3">
                      <h3 className="text-md text-base-content">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                            <span
                                key={tech + i}
                                className="px-3 py-1 text-xs border border-primary/30 rounded-lg"
                            >
                        {tech}
                      </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {project.challenges && (
                      <div>
                        <span className="text-md text-base-content font-semibold">Challenges</span>
                        <p className="text-sm text-base-content/80 mt-1">
                          {project.challenges}
                        </p>
                      </div>
                  )}

                  {project.futurePlans && (
                      <div>
                        <span className="text-md text-base-content font-semibold">Future Plans</span>
                        <p className="text-sm text-base-content/80 mt-1">
                          {project.futurePlans}
                        </p>
                      </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
  );
};

export default ProjectModal;