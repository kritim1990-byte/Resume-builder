import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
  colorHex: string;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data, colorHex }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="w-full bg-white text-slate-900 p-8 shadow-sm print:shadow-none min-h-[1050px] flex flex-col justify-between text-xs leading-relaxed font-sans">
      <div className="space-y-5">
        {/* Header */}
        <header className="flex justify-between items-start border-b pb-4 border-slate-200">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-sm font-medium text-slate-600 mt-0.5">{personalInfo.jobTitle}</p>
          </div>

          <div className="text-right text-[11px] text-slate-600 space-y-0.5">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website.replace(/^https?:\/\//, '')}</div>}
          </div>
        </header>

        {personalInfo.summary && (
          <p className="text-slate-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>
                      {exp.position} <span className="font-normal text-slate-500">at {exp.company}</span>
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-slate-700 whitespace-pre-line mt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.title}</span>
                    <span className="text-[11px] font-medium text-slate-500">{proj.startDate}</span>
                  </div>
                  {proj.technologies && (
                    <div className="text-[11px] text-slate-500 font-mono">[{proj.technologies}]</div>
                  )}
                  {proj.description && (
                    <p className="text-slate-700 whitespace-pre-line mt-0.5">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution}</div>
                    <div className="text-[10px] text-slate-400">{edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-1.5 py-0.5 bg-slate-100 font-medium text-slate-700 rounded text-[11px]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <footer className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
        Lovely Professional University
      </footer>
    </div>
  );
};
