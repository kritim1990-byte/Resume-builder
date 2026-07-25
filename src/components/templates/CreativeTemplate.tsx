import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
  colorHex: string;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data, colorHex }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="w-full bg-white text-slate-900 shadow-sm print:shadow-none min-h-[1050px] flex flex-col justify-between text-sm leading-relaxed">
      <div>
        {/* Banner Header */}
        <header
          className="p-8 text-white relative overflow-hidden"
          style={{ backgroundColor: colorHex }}
        >
          <h1 className="text-3xl font-black tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-base font-medium opacity-90 mt-1">{personalInfo.jobTitle}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-xs opacity-95">
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
            {personalInfo.website && <span>🌐 {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          </div>

          {personalInfo.summary && (
            <p className="mt-4 text-xs sm:text-sm opacity-90 leading-relaxed bg-black/10 p-3 rounded-lg backdrop-blur-sm">
              {personalInfo.summary}
            </p>
          )}
        </header>

        <div className="p-8 space-y-6">
          {/* Work Experience */}
          {experience.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorHex }} />
                <h2 className="text-base font-black tracking-wider uppercase text-slate-900">
                  Experience
                </h2>
              </div>
              <div className="space-y-4 border-l-2 pl-4 ml-1.5" style={{ borderColor: `${colorHex}40` }}>
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <span
                      className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2"
                      style={{ borderColor: colorHex }}
                    />
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-base">{exp.position}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mb-1">{exp.company} • {exp.location}</p>
                    {exp.description && (
                      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
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
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorHex }} />
                <h2 className="text-base font-black tracking-wider uppercase text-slate-900">
                  Projects
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900">{proj.title}</h3>
                      <span className="text-xs font-medium text-slate-500">
                        {proj.startDate} {proj.endDate ? `- ${proj.endDate}` : ''}
                      </span>
                    </div>
                    {proj.technologies && (
                      <span className="text-[11px] font-semibold" style={{ color: colorHex }}>
                        {proj.technologies}
                      </span>
                    )}
                    {proj.description && (
                      <p className="text-xs text-slate-700 whitespace-pre-line mt-1">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorHex }} />
                  <h2 className="text-base font-black tracking-wider uppercase text-slate-900">
                    Education
                  </h2>
                </div>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-slate-700">{edu.institution}</p>
                      <p className="text-slate-500 text-[11px]">{edu.fieldOfStudy} ({edu.startDate} - {edu.endDate})</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colorHex }} />
                  <h2 className="text-base font-black tracking-wider uppercase text-slate-900">
                    Skills
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-xs font-medium px-2.5 py-1 rounded-md text-white shadow-xs"
                      style={{ backgroundColor: colorHex }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <footer className="p-6 text-center text-[10px] text-slate-400 border-t border-slate-100">
        Lovely Professional University • Creative Resume PWA
      </footer>
    </div>
  );
};
