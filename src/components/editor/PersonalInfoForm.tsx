import React from 'react';
import { PersonalInfo } from '@/types/resume';
import { User, Mail, Phone, MapPin, Globe, Briefcase, Link as LinkIcon } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
        <User className="w-4 h-4 text-amber-500" /> Personal Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
            />
            <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            Target Job Title
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => onChange('jobTitle', e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
            />
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="e.g. aarav.sharma@lpu.in"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="e.g. Phagwara, Punjab"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
            />
            <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            Portfolio / Website URL
          </label>
          <div className="relative">
            <input
              type="url"
              value={data.website}
              onChange={(e) => onChange('website', e.target.value)}
              placeholder="https://aaravsharma.dev"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
            />
            <Globe className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <input
              type="url"
              value={data.linkedin}
              onChange={(e) => onChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
            />
            <LinkIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
            GitHub Profile
          </label>
          <div className="relative">
            <input
              type="url"
              value={data.github}
              onChange={(e) => onChange('github', e.target.value)}
              placeholder="https://github.com/username"
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
            />
            <LinkIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      <div>
        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1 text-xs">
          Professional Summary
        </label>
        <div className="relative">
          <textarea
            rows={3}
            value={data.summary}
            onChange={(e) => onChange('summary', e.target.value)}
            placeholder="A concise summary highlighting your key background, strengths, and career objectives..."
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-xs leading-relaxed transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
