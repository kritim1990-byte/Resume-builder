'use client';

import { useState, useEffect, useCallback } from 'react';
import { ResumeData, PersonalInfo, Education, Experience, Skill, Project, TemplateId, ThemeColor, ValidationError } from '@/types/resume';
import { SAMPLE_RESUME } from '@/utils/sampleData';
import { validateResume } from '@/utils/validation';

const LOCAL_STORAGE_KEY = 'lpu_resume_builder_data_v1';

export function useResumeStore() {
  const [resume, setResume] = useState<ResumeData>(SAMPLE_RESUME);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setResume(parsed);
        setLastSaved(new Date(parsed.updatedAt || Date.now()).toLocaleTimeString());
      }
    } catch (err) {
      console.error('Failed to load resume from localStorage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Autosave to LocalStorage when resume data changes
  const saveToStorage = useCallback((newData: ResumeData) => {
    try {
      const timestamp = new Date().toISOString();
      const updated = { ...newData, updatedAt: timestamp };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      setLastSaved(new Date().toLocaleTimeString());
      setValidationErrors(validateResume(updated));
    } catch (err) {
      console.error('Autosave to localStorage failed:', err);
    }
  }, []);

  // Generic updater
  const updateResume = (updater: (prev: ResumeData) => ResumeData) => {
    setResume((prev) => {
      const updated = updater(prev);
      saveToStorage(updated);
      return updated;
    });
  };

  // Personal Info
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    updateResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: '',
    };
    updateResume((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    updateResume((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeEducation = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // Experience Handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    };
    updateResume((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    updateResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeExperience = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  // Skill Handlers
  const addSkill = () => {
    const newSkill: Skill = {
      id: `sk-${Date.now()}`,
      name: '',
      category: 'Technical',
      level: 'Intermediate',
    };
    updateResume((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    updateResume((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeSkill = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
  };

  // Project Handlers
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    updateResume((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    updateResume((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const removeProject = (id: string) => {
    updateResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  // Styling Handlers
  const setTemplate = (templateId: TemplateId) => {
    updateResume((prev) => ({ ...prev, templateId }));
  };

  const setThemeColor = (themeColor: ThemeColor) => {
    updateResume((prev) => ({ ...prev, themeColor }));
  };

  // Reset to sample
  const resetToSample = () => {
    setResume(SAMPLE_RESUME);
    saveToStorage(SAMPLE_RESUME);
  };

  // Reset to blank
  const resetToBlank = () => {
    const blank: ResumeData = {
      id: `resume-${Date.now()}`,
      title: 'Untitled Resume',
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        github: '',
        linkedin: '',
        summary: '',
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
      templateId: 'modern',
      themeColor: 'indigo',
    };
    setResume(blank);
    saveToStorage(blank);
  };

  // Load JSON
  const loadFromJson = (imported: ResumeData) => {
    setResume(imported);
    saveToStorage(imported);
  };

  return {
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
  };
}
