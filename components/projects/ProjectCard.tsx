'use client';

import React from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  Eye,
  Download,
  Users,
  FileText,
  Presentation,
  Workflow,
} from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

export interface Project {
  title: string;
  description: string;
  images: string[];
  videos?: string[];
  techStack: string[];
  type:
      | 'Frontend'
      | 'Backend'
      | 'Full Stack'
      | 'Mobile Development'
      | 'DevOps'
      | 'Deployment'
      | 'Other'
      | 'Design'
      | 'Fullstack'
      | 'Android Development'
      | 'Microservices Deployment'
      | 'Mobile App';
  period?: string;
  liveLink?: string;
  frontendRepo?: string;
  backendRepo?: string;
  Repo?: string;
  frontendRep?: string;
  challenges?: string;
  futurePlans?: string;
  downloadLink?: string;
  features?: string[];
  contributors?: string[];
  documentationLink?: string;
  powerpointLink?: string;
  drawioLink?: string;
}

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const hasVideo = Boolean(project.videos && project.videos.length > 0);
  const hasImage = Boolean(project.images && project.images.length > 0);
  const shortDescription =
      project.description.length > 64
          ? `${project.description.slice(0, 64)}...`
          : project.description;

  return (
      <article
          className="
        group relative bg-base-100 rounded-lg p-4 overflow-hidden
        shadow-sm transition-[transform,box-shadow] duration-300
        transform-gpu will-change-transform
        hover:shadow-xl hover:-translate-y-1
      "
      >
        <BorderBeam
            size={32}
            duration={8}
            colorFrom="#22c55e"
            colorTo="#16a34a"
            className="absolute top-0 left-0 pointer-events-none"
        />

        {(hasVideo || hasImage) && (
            <div className="overflow-hidden rounded-lg relative w-full h-32 sm:h-36 mb-3 hidden sm:block bg-base-200">
              {hasVideo ? (
                  <video
                      src={project.videos![0]}
                      className="w-full h-full object-cover rounded-lg shadow-sm"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={project.images?.[0] ?? '/fallback-image.jpg'}
                  />
              ) : (
                  <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover rounded-lg transition-transform duration-500 transform-gpu will-change-transform motion-safe:group-hover:scale-105"
                  />
              )}
            </div>
        )}

        <div className="space-y-2">
          <h3 className="font-medium text-base leading-snug">{project.title}</h3>
          <p className="text-sm text-base-content/80 leading-relaxed">
            {shortDescription}
          </p>

          {project.contributors && project.contributors.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-base-content/70 pt-0.5">
                <Users size={13} className="shrink-0 text-primary" />
                <span className="truncate">
              Mitwirkende: {project.contributors.join(', ')}
            </span>
              </div>
          )}

          {project.techStack && project.techStack.length > 0 && (
              <div className="flex gap-1.5 pt-1 pb-1 flex-wrap">
                {project.techStack.slice(0, 3).map((tech, index) => (
                    <span
                        key={`${tech}-${index}`}
                        className="px-2 py-0.5 text-xs rounded-full bg-base-100 shadow-xs whitespace-nowrap border border-primary/30"
                    >
                {tech}
              </span>
                ))}
              </div>
          )}

          <div className="flex items-center justify-between text-sm whitespace-nowrap pt-1 gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              {project.downloadLink ? (
                  <a
                      href={project.downloadLink}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 decoration-dashed hover:underline rounded-lg inline-flex items-center gap-1 hover:text-primary text-sm transition-transform duration-300 hover:translate-x-1"
                  >
                    <Download size={14} /> Download Project Files
                  </a>
              ) : project.powerpointLink ? (
                  <a
                      href={project.powerpointLink}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 decoration-dashed hover:underline rounded-lg inline-flex items-center gap-1 hover:text-primary text-sm transition-transform duration-300 hover:translate-x-1"
                  >
                    <Presentation size={14} /> Download Powerpoint-Presentation
                  </a>
              ) : project.documentationLink ? (
                  <a
                      href={project.documentationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 decoration-dashed hover:underline rounded-lg inline-flex items-center gap-1 hover:text-primary text-sm transition-transform duration-300 hover:translate-x-1"
                  >
                    <FileText size={14} /> Documentation
                  </a>
              ) : project.liveLink ? (
                  <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 decoration-dashed hover:underline rounded-lg inline-flex items-center gap-1 hover:text-primary text-sm transition-transform duration-300 hover:translate-x-1"
                  >
                    <ArrowUpRight size={14} /> Live
                  </a>
              ) : !project.drawioLink ? (
                  <span className="text-xs text-base-content/50">Local Project</span>
              ) : null}

              {project.drawioLink && (
                  <a
                      href={project.drawioLink}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 decoration-dashed hover:underline rounded-lg inline-flex items-center gap-1 hover:text-primary text-sm transition-transform duration-300 hover:translate-x-1"
                  >
                    <Workflow size={14} /> Download Draw.io
                  </a>
              )}
            </div>

            <button
                type="button"
                onClick={() => onOpenModal(project)}
                aria-label={`View details for ${project.title}`}
                className="underline-offset-4 decoration-dashed hover:underline rounded-lg inline-flex items-center gap-1 hover:text-primary text-sm transition-transform duration-300 hover:translate-x-1 cursor-pointer"
            >
              <Eye size={14} /> Details
            </button>
          </div>
        </div>
      </article>
  );
};

export default React.memo(ProjectCard);