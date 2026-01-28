
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group bg-slate-50 rounded-2xl p-8 border border-slate-200 transition-all hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-2xl font-bold text-slate-800 mb-1">{project.title}</h3>
      <p className="text-sky-600 font-medium mb-4 text-sm uppercase tracking-wide">{project.subtitle}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((tech) => (
          <span 
            key={tech} 
            className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-full shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="space-y-3">
        {project.points.map((point, i) => (
          <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
            <span className="text-sky-500 mt-1.5">•</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCard;
