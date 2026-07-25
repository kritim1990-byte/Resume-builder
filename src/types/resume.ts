export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Tools' | 'Languages';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  title: string;
  technologies: string;
  link: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type TemplateId = 'modern' | 'classic' | 'creative' | 'minimal';
export type ThemeColor = 'indigo' | 'emerald' | 'navy' | 'violet' | 'rose' | 'slate';

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  templateId: TemplateId;
  themeColor: ThemeColor;
}

export interface ValidationError {
  field: string;
  message: string;
}
