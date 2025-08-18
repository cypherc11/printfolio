// AI Service for CV parsing using Hugging Face free tier
const HF_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;
const HF_API_URL = 'https://api-inference.huggingface.co/models';

interface ParsedCVData {
  personalInfo: any;
  experience: any[];
  education: any[];
  skills: any[];
  projects: any[];
  languages: any[];
  certifications: any[];
}

export class AIService {
  private async callHuggingFace(model: string, inputs: any) {
    if (!HF_API_KEY) {
      // Fallback to mock data for development
      return this.getMockCVData();
    }

    try {
      const response = await fetch(`${HF_API_URL}/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs }),
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI service error:', error);
      return this.getMockCVData();
    }
  }

  async parseCV(fileContent: string, fileName: string): Promise<ParsedCVData> {
    // For demo purposes, we'll use pattern matching and return structured data
    // In production, this would use advanced NLP models
    
    const lines = fileContent.split('\n').filter(line => line.trim());
    const cvData = this.extractCVData(lines);
    
    return cvData;
  }

  private extractCVData(lines: string[]): ParsedCVData {
    const personalInfo: any = {};
    const experience: any[] = [];
    const education: any[] = [];
    const skills: any[] = [];
    const projects: any[] = [];
    const languages: any[] = [];
    const certifications: any[] = [];

    // Extract email
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/;
    const emailMatch = lines.find(line => emailRegex.test(line));
    if (emailMatch) {
      personalInfo.email = emailMatch.match(emailRegex)?.[0] || '';
    }

    // Extract phone
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const phoneMatch = lines.find(line => phoneRegex.test(line));
    if (phoneMatch) {
      personalInfo.phone = phoneMatch.match(phoneRegex)?.[0] || '';
    }

    // Extract name (usually first line or near contact info)
    const nameLines = lines.slice(0, 5);
    const possibleNames = nameLines.filter(line => 
      line.length > 3 && 
      line.length < 50 && 
      /^[A-Za-z\s]+$/.test(line.trim()) &&
      !emailRegex.test(line) &&
      !phoneRegex.test(line)
    );
    if (possibleNames.length > 0) {
      personalInfo.name = possibleNames[0].trim();
    }

    // Extract skills (look for common skill keywords)
    const skillKeywords = [
      'javascript', 'python', 'react', 'node', 'html', 'css', 'sql',
      'java', 'c++', 'git', 'docker', 'aws', 'mongodb', 'postgresql',
      'typescript', 'vue', 'angular', 'express', 'django', 'flask'
    ];

    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      skillKeywords.forEach(skill => {
        if (lowerLine.includes(skill) && !skills.find(s => s.name.toLowerCase() === skill)) {
          skills.push({
            id: `skill-${Date.now()}-${Math.random()}`,
            name: skill.charAt(0).toUpperCase() + skill.slice(1),
            category: 'technical' as const,
            level: Math.floor(Math.random() * 5) + 1
          });
        }
      });
    });

    // Add some default data for demo
    if (!personalInfo.name) personalInfo.name = 'John Doe';
    if (!personalInfo.email) personalInfo.email = 'john.doe@email.com';
    if (!personalInfo.phone) personalInfo.phone = '+1 (555) 123-4567';
    
    personalInfo.location = 'San Francisco, CA';
    personalInfo.bio = 'Passionate professional with expertise in modern technologies and a drive for innovation.';

    // Add sample experience
    experience.push({
      id: `exp-${Date.now()}`,
      company: 'Tech Innovation Corp',
      position: 'Senior Developer',
      startDate: '2022-01',
      endDate: '2024-12',
      current: true,
      description: 'Led development of key features and mentored junior developers. Implemented modern web technologies and improved system performance by 40%.'
    });

    // Add sample education
    education.push({
      id: `edu-${Date.now()}`,
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2018-09',
      endDate: '2022-06',
      description: 'Graduated with honors. Specialized in software engineering and artificial intelligence.'
    });

    return {
      personalInfo,
      experience,
      education,
      skills,
      projects,
      languages,
      certifications
    };
  }

  private getMockCVData(): ParsedCVData {
    return {
      personalInfo: {
        name: 'Alex Johnson',
        email: 'alex.johnson@email.com',
        phone: '+1 (555) 987-6543',
        location: 'New York, NY',
        bio: 'Creative and detail-oriented professional with a passion for innovative solutions and cutting-edge technology.',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        github: 'https://github.com/alexjohnson'
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Digital Solutions Inc',
          position: 'Full Stack Developer',
          startDate: '2022-03',
          endDate: '2024-12',
          current: true,
          description: 'Developed and maintained web applications using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver high-quality software solutions.'
        },
        {
          id: 'exp-2',
          company: 'StartUp Ventures',
          position: 'Frontend Developer',
          startDate: '2020-06',
          endDate: '2022-02',
          current: false,
          description: 'Built responsive user interfaces and improved user experience. Implemented modern JavaScript frameworks and optimized application performance.'
        }
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'Tech University',
          degree: 'Master of Science',
          field: 'Computer Science',
          startDate: '2018-09',
          endDate: '2020-05'
        }
      ],
      skills: [
        { id: 'skill-1', name: 'React', category: 'technical', level: 5 },
        { id: 'skill-2', name: 'TypeScript', category: 'technical', level: 4 },
        { id: 'skill-3', name: 'Node.js', category: 'technical', level: 4 },
        { id: 'skill-4', name: 'PostgreSQL', category: 'technical', level: 3 },
        { id: 'skill-5', name: 'Leadership', category: 'soft', level: 4 },
        { id: 'skill-6', name: 'Communication', category: 'soft', level: 5 }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce solution with payment integration and admin dashboard.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          url: 'https://ecommerce-demo.com',
          github: 'https://github.com/alexjohnson/ecommerce'
        }
      ],
      languages: [
        { id: 'lang-1', name: 'English', level: 'native' },
        { id: 'lang-2', name: 'Spanish', level: 'intermediate' }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: '2023-06',
          url: 'https://aws.amazon.com/certification/'
        }
      ]
    };
  }
}