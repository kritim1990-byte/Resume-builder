import React from 'react';
import { Skill } from '@/types/resume';
import { Code, Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
  items: Skill[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Skill, value: any) => void;
  onRemove: (id: string) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ items, onAdd, onUpdate, onRemove }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Code className="w-4 h-4 text-amber-500" /> Skills & Expertise
        </h3>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Skill
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          No skills added yet. Click &quot;Add Skill&quot; above.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((skill) => (
            <div
              key={skill.id}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-2 text-xs"
            >
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => onUpdate(skill.id, 'name', e.target.value)}
                  placeholder="e.g. Next.js / TypeScript"
                  className="w-full px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 outline-none font-medium"
                />
                <div className="flex gap-2">
                  <select
                    value={skill.category}
                    onChange={(e) => onUpdate(skill.id, 'category', e.target.value)}
                    className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] text-slate-700 dark:text-slate-300 outline-none"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Tools">Tools</option>
                    <option value="Languages">Languages</option>
                  </select>
                  <select
                    value={skill.level}
                    onChange={(e) => onUpdate(skill.id, 'level', e.target.value)}
                    className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] text-slate-700 dark:text-slate-300 outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(skill.id)}
                className="text-slate-400 hover:text-red-500 p-1.5 rounded transition-colors"
                title="Remove Skill"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
