import { ResumeData, ValidationError } from '@/types/resume';

export function validateResume(data: ResumeData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate Personal Info
  if (!data.personalInfo.fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Full Name is required' });
  }

  if (!data.personalInfo.email.trim()) {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email.trim())) {
    errors.push({ field: 'email', message: 'Invalid email address format' });
  }

  if (data.personalInfo.phone && !/^[+0-9\s-()]{7,20}$/.test(data.personalInfo.phone.trim())) {
    errors.push({ field: 'phone', message: 'Invalid phone number format' });
  }

  // Validate Education items
  data.education.forEach((edu, idx) => {
    if (!edu.institution.trim()) {
      errors.push({ field: `edu-${idx}-institution`, message: `Education #${idx + 1}: Institution name is required` });
    }
    if (!edu.degree.trim()) {
      errors.push({ field: `edu-${idx}-degree`, message: `Education #${idx + 1}: Degree is required` });
    }
  });

  // Validate Experience items
  data.experience.forEach((exp, idx) => {
    if (!exp.company.trim()) {
      errors.push({ field: `exp-${idx}-company`, message: `Experience #${idx + 1}: Company name is required` });
    }
    if (!exp.position.trim()) {
      errors.push({ field: `exp-${idx}-position`, message: `Experience #${idx + 1}: Position / Title is required` });
    }
  });

  return errors;
}
