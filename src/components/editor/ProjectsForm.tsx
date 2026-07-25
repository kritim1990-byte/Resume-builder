import React from 'react';
import { Project } from '@/types/resume';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  items: Project[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Project, value: any) => void;
  onRemove: (id: string) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ items, onAdd, onUpdate, onRemove }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-amber-500" /> Projects
        </h3>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          No projects added yet. Click &quot;Add Project&quot; above.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3 relative group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Project #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(proj.id)}
                  className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                  title="Remove Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => onUpdate(proj.id, 'title', e.target.value)}
                    placeholder="e.g. LPU Campus Event PWA"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    value={proj.technologies}
                    onChange={(e) => onUpdate(proj.id, 'technologies', e.target.value)}
                    placeholder="e.g. Next.js, Tailwind CSS, TypeScript"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project Link / Repository
                  </label>
                  <input
                    type="url"
                    value={proj.link}
                    onChange={(e) => onUpdate(proj.id, 'link', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={proj.startDate}
                      onChange={(e) => onUpdate(proj.id, 'startDate', e.target.value)}
                      placeholder="Jan 2025"
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={proj.endDate}
                      onChange={(e) => onUpdate(proj.id, 'endDate', e.target.value)}
                      placeholder="Mar 2025"
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 text-xs">
                  Description & Impact
                </label>
                <textarea
                  rows={3}
                  value={proj.description}
                  onChange={(e) => onUpdate(proj.id, 'description', e.target.value)}
                  placeholder="• Developed full-featured Progressive Web App...&#10;• Achieved 100/100 performance score..."
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
