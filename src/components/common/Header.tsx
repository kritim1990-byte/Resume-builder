'use client';

import React, { useRef } from 'react';
import { LpuLogo } from './LpuLogo';
import { ThemeToggle } from './ThemeToggle';
import { PwaRegister } from './PwaRegister';
import { Save, RefreshCw, FileText, Upload, Download } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface HeaderProps {
  lastSaved: string | null;
  resume: ResumeData;
  onResetToSample: () => void;
  onResetToBlank: () => void;
  onLoadFromJson: (data: ResumeData) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lastSaved,
  resume,
  onResetToSample,
  onResetToBlank,
  onLoadFromJson,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download JSON backup
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.personalInfo.fullName.replaceAll(' ', '_') || 'Resume'}_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo) {
          onLoadFromJson(parsed);
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: LPU Branding */}
        <LpuLogo />

        {/* Right: Actions and Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Autosave Status Badge */}
          {lastSaved && (
            <div className="hidden md:flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              <Save className="w-3 h-3 text-emerald-500" />
              <span>Saved at {lastSaved}</span>
            </div>
          )}

          {/* Load Sample Button */}
          <button
            onClick={onResetToSample}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            title="Load Sample LPU Student Resume"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Load Sample</span>
          </button>

          {/* New Blank Resume */}
          <button
            onClick={onResetToBlank}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            title="Clear Form & Start Blank"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">New Blank</span>
          </button>

          {/* Export / Import JSON */}
          <button
            onClick={handleExportJson}
            type="button"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Export Backup JSON"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            type="button"
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Import Backup JSON"
          >
            <Upload className="w-4 h-4" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 my-auto" />

          {/* PWA Register Install */}
          <PwaRegister />

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
