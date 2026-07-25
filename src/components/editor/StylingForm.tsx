import React from 'react';
import { TemplateId, ThemeColor } from '@/types/resume';
import { COLOR_MAP } from '@/components/templates/TemplateRenderer';
import { Palette, Layout } from 'lucide-react';

interface StylingFormProps {
  templateId: TemplateId;
  themeColor: ThemeColor;
  onSelectTemplate: (id: TemplateId) => void;
  onSelectColor: (color: ThemeColor) => void;
}

const TEMPLATES: { id: TemplateId; name: string; desc: string }[] = [
  { id: 'modern', name: 'Modern Split', desc: 'Clean 2-column sidebar layout perfect for technical & engineering roles.' },
  { id: 'classic', name: 'Executive Classic', desc: 'Traditional single-column layout with centered typography & classic rules.' },
  { id: 'creative', name: 'Creative Accent', desc: 'Bold colored header banner with pill tags and timeline accents.' },
  { id: 'minimal', name: 'High-Density Minimal', desc: 'Ultra-clean, crisp design maximizing content density.' },
];

const COLORS: { id: ThemeColor; name: string }[] = [
  { id: 'indigo', name: 'Indigo Blue' },
  { id: 'emerald', name: 'Emerald Green' },
  { id: 'navy', name: 'Deep Navy' },
  { id: 'violet', name: 'Royal Purple' },
  { id: 'rose', name: 'Crimson Rose' },
  { id: 'slate', name: 'Slate Gray' },
];

export const StylingForm: React.FC<StylingFormProps> = ({
  templateId,
  themeColor,
  onSelectTemplate,
  onSelectColor,
}) => {
  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Layout className="w-4 h-4 text-amber-500" /> Choose Resume Layout Template
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                templateId === tmpl.id
                  ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/20 ring-2 ring-amber-500/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100 mb-0.5">
                {tmpl.name}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                {tmpl.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Accent Picker */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-amber-500" /> Accent Color Theme
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {COLORS.map((col) => {
            const hex = COLOR_MAP[col.id];
            const isSelected = themeColor === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => onSelectColor(col.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-500/20 ring-2 ring-amber-500/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <span
                  className="w-6 h-6 rounded-full shadow-sm border border-black/10"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">
                  {col.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
