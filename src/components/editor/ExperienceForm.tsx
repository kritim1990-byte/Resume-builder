import React from 'react';
import { Experience } from '@/types/resume';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

interface ExperienceFormProps {
  items: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Experience, value: any) => void;
  onRemove: (id: string) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ items, onAdd, onUpdate, onRemove }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-amber-500" /> Work Experience
        </h3>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Experience
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          No experience entries added yet. Click &quot;Add Experience&quot; above.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3 relative group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Experience #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(exp.id)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                  title="Remove Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Company / Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
                    placeholder="e.g. TechNovate Solutions"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Position / Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => onUpdate(exp.id, 'position', e.target.value)}
                    placeholder="e.g. Software Engineer Intern"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => onUpdate(exp.id, 'location', e.target.value)}
                    placeholder="e.g. Bengaluru, India (Remote)"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => onUpdate(exp.id, 'startDate', e.target.value)}
                    placeholder="e.g. Jun 2025"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block font-medium text-slate-700 dark:text-slate-300">
                      End Date
                    </label>
                    <label className="flex items-center gap-1 text-[11px] cursor-pointer text-slate-600 dark:text-slate-400">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) => onUpdate(exp.id, 'isCurrent', e.target.checked)}
                        className="rounded accent-amber-500"
                      />
                      Current Role
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled={exp.isCurrent}
                    value={exp.isCurrent ? 'Present' : exp.endDate}
                    onChange={(e) => onUpdate(exp.id, 'endDate', e.target.value)}
                    placeholder="e.g. Aug 2025"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 text-xs">
                  Key Achievements & Responsibilities (Use bullets • for nice formatting)
                </label>
                <textarea
                  rows={3}
                  value={exp.description}
                  onChange={(e) => onUpdate(exp.id, 'description', e.target.value)}
                  placeholder="• Built REST APIs reducing response latency by 25%&#10;• Led team of 3 developers for mobile-first app..."
                  className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none text-xs leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
