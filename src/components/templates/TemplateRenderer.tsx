import React from 'react';
import { ResumeData, ThemeColor } from '@/types/resume';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { MinimalTemplate } from './MinimalTemplate';

interface TemplateRendererProps {
  data: ResumeData;
}

export const COLOR_MAP: Record<ThemeColor, string> = {
  indigo: '#4f46e5',
  emerald: '#059669',
  navy: '#1e3a8a',
  violet: '#7c3aed',
  rose: '#e11d48',
  slate: '#334155',
};

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data }) => {
  const colorHex = COLOR_MAP[data.themeColor] || COLOR_MAP.indigo;

  switch (data.templateId) {
    case 'classic':
      return <ClassicTemplate data={data} colorHex={colorHex} />;
    case 'creative':
      return <CreativeTemplate data={data} colorHex={colorHex} />;
    case 'minimal':
      return <MinimalTemplate data={data} colorHex={colorHex} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} colorHex={colorHex} />;
  }
};
