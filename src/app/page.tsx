'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/hooks/useResumeStore';
import { Header } from '@/components/common/Header';
import { EditorForm } from '@/components/editor/EditorForm';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { Edit3, Eye, Loader2 } from 'lucide-react';

export default function Home() {
  const {
    resume,
    isLoaded,
    lastSaved,
    validationErrors,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    setTemplate,
    setThemeColor,
    resetToSample,
    resetToBlank,
    loadFromJson,
  } = useResumeStore();

  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          <p className="text-sm font-medium">Loading LPU Resume Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Bar */}
      <Header
        lastSaved={lastSaved}
        resume={resume}
        onResetToSample={resetToSample}
        onResetToBlank={resetToBlank}
        onLoadFromJson={loadFromJson}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col">
        {/* Mobile View Toggle Bar */}
        <div className="lg:hidden flex rounded-xl p-1 bg-slate-200 dark:bg-slate-800 mb-4 shadow-inner">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'editor'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Edit3 className="w-4 h-4 text-amber-500" />
            <span>Form Editor</span>
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
              mobileTab === 'preview'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Eye className="w-4 h-4 text-amber-500" />
            <span>Live Preview</span>
          </button>
        </div>

        {/* Grid Layout: Desktop Side-by-Side, Mobile Segmented */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 items-start">
          {/* Form Editor Pane */}
          <div className={`${mobileTab === 'editor' ? 'block' : 'hidden'} lg:block h-[calc(100vh-120px)] sticky top-[72px]`}>
            <EditorForm
              resume={resume}
              validationErrors={validationErrors}
              onUpdatePersonalInfo={updatePersonalInfo}
              onAddEducation={addEducation}
              onUpdateEducation={updateEducation}
              onRemoveEducation={removeEducation}
              onAddExperience={addExperience}
              onUpdateExperience={updateExperience}
              onRemoveExperience={removeExperience}
              onAddSkill={addSkill}
              onUpdateSkill={updateSkill}
              onRemoveSkill={removeSkill}
              onAddProject={addProject}
              onUpdateProject={updateProject}
              onRemoveProject={removeProject}
              onSetTemplate={setTemplate}
              onSetThemeColor={setThemeColor}
            />
          </div>

          {/* Live Resume Preview Pane */}
          <div className={`${mobileTab === 'preview' ? 'block' : 'hidden'} lg:block h-[calc(100vh-120px)] sticky top-[72px]`}>
            <ResumePreview resume={resume} />
          </div>
        </div>
      </main>
    </div>
  );
}
