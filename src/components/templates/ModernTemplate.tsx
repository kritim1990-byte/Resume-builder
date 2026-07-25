import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink, Link as LinkIcon } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  colorHex: string;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data, colorHex }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="w-full bg-white text-slate-800 p-8 shadow-sm print:shadow-none min-h-[1050px] flex flex-col justify-between text-sm leading-relaxed">
      <div>
        {/* Header */}
        <header className="border-b-2 pb-6 mb-6" style={{ borderColor: colorHex }}>
          <h1 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: colorHex }}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p className="text-lg font-medium text-slate-600 mt-1">
            {personalInfo.jobTitle || 'Your Target Job Title'}
          </p>

          {/* Contact Bar */}
          <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-xs text-slate-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:underline">
                <Mail className="w-3.5 h-3.5" style={{ color: colorHex }} />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" style={{ color: colorHex }} />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: colorHex }} />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                <Globe className="w-3.5 h-3.5" style={{ color: colorHex }} />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                <LinkIcon className="w-3.5 h-3.5" style={{ color: colorHex }} />
                <span>LinkedIn</span>
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                <LinkIcon className="w-3.5 h-3.5" style={{ color: colorHex }} />
                <span>GitHub</span>
              </a>
            )}
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <p className="mt-4 text-slate-700 text-xs sm:text-sm leading-relaxed italic border-l-2 pl-3 py-0.5" style={{ borderColor: colorHex }}>
              {personalInfo.summary}
            </p>
          )}
        </header>

        {/* 2-Column Grid Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            {/* Experience Section */}
            {experience.length > 0 && (
              <section>
                <h2
                  className="text-base font-bold tracking-wider uppercase border-b pb-1 mb-3 flex items-center gap-2"
                  style={{ color: colorHex, borderColor: `${colorHex}40` }}
                >
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-slate-900">{exp.position}</h3>
                        <span className="text-xs font-semibold text-slate-500">
                          {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs font-medium text-slate-600">
                        <span>{exp.company}</span>
                        <span>{exp.location}</span>
                      </div>
                      {exp.description && (
                        <p className="text-xs text-slate-700 whitespace-pre-line mt-1.5 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <section>
                <h2
                  className="text-base font-bold tracking-wider uppercase border-b pb-1 mb-3 flex items-center gap-2"
                  style={{ color: colorHex, borderColor: `${colorHex}40` }}
                >
                  Projects & Key Initiatives
                </h2>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <span>{proj.title}</span>
                          {proj.link && (
                            <a href={proj.link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-500">
                          {proj.startDate} {proj.endDate ? `- ${proj.endDate}` : ''}
                        </span>
                      </div>
                      {proj.technologies && (
                        <div className="text-[11px] font-semibold text-slate-500">
                          Tech: <span className="font-normal text-slate-700">{proj.technologies}</span>
                        </div>
                      )}
                      {proj.description && (
                        <p className="text-xs text-slate-700 whitespace-pre-line mt-1 leading-relaxed">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar (1 col) */}
          <div className="space-y-6">
            {/* Education Section */}
            {education.length > 0 && (
              <section>
                <h2
                  className="text-base font-bold tracking-wider uppercase border-b pb-1 mb-3"
                  style={{ color: colorHex, borderColor: `${colorHex}40` }}
                >
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs space-y-0.5">
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <p className="font-medium text-slate-700">{edu.institution}</p>
                      <p className="text-slate-500 text-[11px]">
                        {edu.fieldOfStudy} ({edu.startDate} - {edu.endDate})
                      </p>
                      {edu.grade && (
                        <p className="font-semibold text-slate-700 text-[11px]">{edu.grade}</p>
                      )}
                      {edu.description && (
                        <p className="text-slate-600 text-[11px] mt-1">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
              <section>
                <h2
                  className="text-base font-bold tracking-wider uppercase border-b pb-1 mb-3"
                  style={{ color: colorHex, borderColor: `${colorHex}40` }}
                >
                  Skills & Expertise
                </h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-800">{skill.name}</span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${colorHex}15`, color: colorHex }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Footer Branding Accent */}
      <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 flex justify-between items-center">
        <span>Created with LPU Resume Builder PWA</span>
        <span>Lovely Professional University</span>
      </footer>
    </div>
  );
};
