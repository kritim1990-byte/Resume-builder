'use client';

import React, { useState } from 'react';
import { ResumeData, PersonalInfo, Education, Experience, Skill, Project, TemplateId, ThemeColor, ValidationError } from '@/types/resume';
import { PersonalInfoForm } from './PersonalInfoForm';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { StylingForm } from './StylingForm';
import { User, GraduationCap, Briefcase, Code, FolderGit2, Palette, AlertCircle } from 'lucide-react';

interface EditorFormProps {
  resume: ResumeData;
  validationErrors: ValidationError[];
  onUpdatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
  onAddEducation: () => void;
  onUpdateEducation: (id: string, field: keyof Education, value: any) => void;
  onRemoveEducation: (id: string) => void;
  onAddExperience: () => void;
  onUpdateExperience: (id: string, field: keyof Experience, value: any) => void;
  onRemoveExperience: (id: string) => void;
  onAddSkill: () => void;
  onUpdateSkill: (id: string, field: keyof Skill, value: any) => void;
  onRemoveSkill: (id: string) => void;
  onAddProject: () => void;
  onUpdateProject: (id: string, field: keyof Project, value: any) => void;
  onRemoveProject: (id: string) => void;
  onSetTemplate: (id: TemplateId) => void;
  onSetThemeColor: (color: ThemeColor) => void;
}

type TabType = 'personal' | 'education' | 'experience' | 'skills' | 'projects' | 'styling';

export const EditorForm: React.FC<EditorFormProps> = ({
  resume,
  validationErrors,
  onUpdatePersonalInfo,
  onAddEducation,
  onUpdateEducation,
  onRemoveEducation,
  onAddExperience,
  onUpdateExperience,
  onRemoveExperience,
  onAddSkill,
  onUpdateSkill,
  onRemoveSkill,
  onAddProject,
  onUpdateProject,
  onRemoveProject,
  onSetTemplate,
  onSetThemeColor,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'styling', label: 'Design', icon: Palette },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 overflow-x-auto no-scrollbar scroll-smooth">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 outline-none ${
                isActive
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Validation Warnings Banner */}
      {validationErrors.length > 0 && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Form Validation: </span>
            {validationErrors.map((err) => err.message).join(' • ')}
          </div>
        </div>
      )}

      {/* Active Form Body */}
      <div className="p-5 flex-1 overflow-y-auto">
        {activeTab === 'personal' && (
          <PersonalInfoForm data={resume.personalInfo} onChange={onUpdatePersonalInfo} />
        )}
        {activeTab === 'education' && (
          <EducationForm
            items={resume.education}
            onAdd={onAddEducation}
            onUpdate={onUpdateEducation}
            onRemove={onRemoveEducation}
          />
        )}
        {activeTab === 'experience' && (
          <ExperienceForm
            items={resume.experience}
            onAdd={onAddExperience}
            onUpdate={onUpdateExperience}
            onRemove={onRemoveExperience}
          />
        )}
        {activeTab === 'skills' && (
          <SkillsForm
            items={resume.skills}
            onAdd={onAddSkill}
            onUpdate={onUpdateSkill}
            onRemove={onRemoveSkill}
          />
        )}
        {activeTab === 'projects' && (
          <ProjectsForm
            items={resume.projects}
            onAdd={onAddProject}
            onUpdate={onUpdateProject}
            onRemove={onRemoveProject}
          />
        )}
        {activeTab === 'styling' && (
          <StylingForm
            templateId={resume.templateId}
            themeColor={resume.themeColor}
            onSelectTemplate={onSetTemplate}
            onSelectColor={onSetThemeColor}
          />
        )}
      </div>
    </div>
  );
};
