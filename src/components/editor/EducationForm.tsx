import React from 'react';
import { Education } from '@/types/resume';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  items: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Education, value: any) => void;
  onRemove: (id: string) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ items, onAdd, onUpdate, onRemove }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-amber-500" /> Education
        </h3>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Education
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          No education entries added yet. Click &quot;Add Education&quot; above.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((edu, idx) => (
            <div
              key={edu.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3 relative group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Education #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(edu.id)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                  title="Remove Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Institution / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => onUpdate(edu.id, 'institution', e.target.value)}
                    placeholder="e.g. Lovely Professional University (LPU)"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Degree / Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => onUpdate(edu.id, 'degree', e.target.value)}
                    placeholder="e.g. B.Tech in CSE"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => onUpdate(edu.id, 'fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science Engineering"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Grade / CGPA / %
                  </label>
                  <input
                    type="text"
                    value={edu.grade}
                    onChange={(e) => onUpdate(edu.id, 'grade', e.target.value)}
                    placeholder="e.g. CGPA: 8.85 / 10.0"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Start Date / Year
                  </label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => onUpdate(edu.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2022"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    End Date / Year
                  </label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => onUpdate(edu.id, 'endDate', e.target.value)}
                    placeholder="e.g. 2026 (Expected)"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 text-xs">
                  Additional Details / Highlights
                </label>
                <textarea
                  rows={2}
                  value={edu.description}
                  onChange={(e) => onUpdate(edu.id, 'description', e.target.value)}
                  placeholder="e.g. Key coursework, honors, or societies..."
                  className="w-full p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
