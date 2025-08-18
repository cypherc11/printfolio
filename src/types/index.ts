export interface CVData {
  id?: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    photo?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    bio?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    category: 'technical' | 'soft' | 'language' | 'certification';
    level?: number;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    github?: string;
    image?: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'native';
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'minimal' | 'modern' | 'creative' | 'technical';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export interface Portfolio {
  id: string;
  userId: string;
  cvData: CVData;
  template: string;
  customizations: Record<string, any>;
  deployUrl?: string;
  status: 'draft' | 'generating' | 'deployed' | 'error';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  portfolios: Portfolio[];
}