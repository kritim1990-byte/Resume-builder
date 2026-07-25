import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
  colorHex: string;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data, colorHex }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="w-full bg-white text-slate-900 p-8 shadow-sm print:shadow-none min-h-[1050px] flex flex-col justify-between text-sm leading-normal">
      <div>
        {/* Header - Centered Classic Style */}
        <header className="text-center pb-5 mb-5 border-b-2" style={{ borderColor: colorHex }}>
          <h1 className="text-3xl font-serif font-bold tracking-wide uppercase" style={{ color: colorHex }}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p className="text-base font-semibold text-slate-700 mt-1 uppercase tracking-widest text-xs">
            {personalInfo.jobTitle || 'Your Target Job Title'}
          </p>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3 text-xs text-slate-600">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.email && <span>• {personalInfo.email}</span>}
            {personalInfo.website && (
              <span>
                •{' '}
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="underline">
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </span>
            )}
            {personalInfo.linkedin && <span>• LinkedIn</span>}
            {personalInfo.github && <span>• GitHub</span>}
          </div>

          {personalInfo.summary && (
            <p className="mt-4 text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          )}
        </header>

        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-3 pb-0.5" style={{ color: colorHex, borderColor: colorHex }}>
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.position} — <span className="font-semibold text-slate-700">{exp.company}</span></span>
                    <span className="text-xs text-slate-600 font-medium">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-slate-700 whitespace-pre-line mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-3 pb-0.5" style={{ color: colorHex, borderColor: colorHex }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                    <p className="text-xs text-slate-700">
                      {edu.degree} in {edu.fieldOfStudy} {edu.grade ? `(${edu.grade})` : ''}
                    </p>
                    {edu.description && <p className="text-xs text-slate-600 mt-0.5">{edu.description}</p>}
                  </div>
                  <span className="text-xs text-slate-600 font-medium whitespace-nowrap">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-3 pb-0.5" style={{ color: colorHex, borderColor: colorHex }}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.title}</span>
                    <span className="text-xs text-slate-600 font-medium">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  </div>
                  {proj.technologies && (
                    <div className="text-[11px] font-semibold text-slate-600">
                      Technologies: <span className="font-normal">{proj.technologies}</span>
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-xs text-slate-700 whitespace-pre-line mt-0.5 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b mb-3 pb-0.5" style={{ color: colorHex, borderColor: colorHex }}>
              Technical Skills & Competencies
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2.5 py-1 rounded bg-slate-100 font-medium text-slate-800 border border-slate-200"
                >
                  {skill.name} <span className="text-slate-500 font-normal">({skill.level})</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
        Lovely Professional University • Resume Builder PWA
      </footer>
    </div>
  );
};
