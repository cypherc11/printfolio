/**
 * Génère le contenu HTML du portfolio à partir des données structurées (cvData) et du template.
 * Utilise Gemini ou Llama2 (API à adapter selon ton backend ou provider).
 * @param cvData Données structurées du CV (déjà extraites par HuggingFace)
 * @param template Template sélectionné
 * @returns HTML string généré par l'IA
 */
/*async generatePortfolioContent(cvData: any, template: any): Promise<string> {
  // Prépare le prompt pour l'IA générative (Gemini/Llama2)
  const prompt = `
    Génère un portfolio HTML moderne et responsive à partir des données suivantes :
    - Nom : ${cvData.personalInfo.name}
    - Bio : ${cvData.personalInfo.bio}
    - Localisation : ${cvData.personalInfo.location}
    - Compétences : ${cvData.skills.map((s: any) => s.name).join(', ')}
    - Expériences : ${cvData.experience.map((e: any) => `${e.position} chez ${e.company} (${e.startDate} - ${e.current ? 'Présent' : e.endDate})`).join(' | ')}
    - Template : ${template.name} (couleurs : ${JSON.stringify(template.colors)})
    Le HTML doit être stylé avec les couleurs du template, inclure les sections principales (profil, compétences, expériences) et être prêt à être exporté/téléchargé. Pas de JS, uniquement du HTML/CSS inline.
  `;

  // Appel à l'API Gemini ou Llama2 (exemple générique, à adapter selon ton backend)
  // Ici, on suppose une API REST POST /generate-portfolio qui prend { prompt } et retourne { html }
  try {
    const response = await fetch('https://your-llm-backend.com/generate-portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Ajoute ici l'authentification si besoin
      },
      body: JSON.stringify({ prompt })
    });
    if (!response.ok) throw new Error('Erreur lors de la génération du portfolio');
    const data = await response.json();
    return data.html; // L'API doit retourner { html: '...' }
  } catch (e) {
    // Fallback : retourne un HTML basique si l'IA échoue
    return `<div style="font-family:Arial,sans-serif;padding:2rem"><h1>${cvData.personalInfo.name}</h1><p>${cvData.personalInfo.bio}</p></div>`;
  }
}*/

import { GoogleGenAI } from "@google/genai";
//import { line } from "framer-motion/client";
//import { Mistral } from "@mistralai/mistralai";



// AI Service for CV parsing using Hugging Face free tier
//const HF_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;
//const HF_API_URL = 'https://api-inference.huggingface.co/models';

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

  async generatePortfolioContent(cvData: any, template: any): Promise<string> {
    // Prépare le prompt pour l'IA générative (Gemini)
    const prompt = `
        Tu es un expert en design web et en développement front-end. Génère un **portfolio HTML moderne, responsive et visuellement élégant**, basé sur les données suivantes extraites automatiquement d’un CV :
- Nom : ${cvData.personalInfo.name}
- Bio : ${cvData.personalInfo.bio}
- Localisation : ${cvData.personalInfo.location}
- Email : ${cvData.personalInfo.email}
- Téléphone : ${cvData.personalInfo.phone}
- Github : ${cvData.personalInfo.github}
- LinkedIn : ${cvData.personalInfo.linkedin}
- Site web : ${cvData.personalInfo.site}
- Compétences : ${Array.isArray(cvData.skills) && cvData.skills.map((s: any) => s.name).join(', ')}
- Expériences : ${Array.isArray(cvData.experience) && cvData.experience.map((e: any) => `${e.position} chez ${e.company} (${e.startDate} - ${e.current ? 'Présent' : e.endDate})`).join(' | ')}
- Formations : ${Array.isArray(cvData.education) && cvData.education.map((e: any) => `${e.degree} en ${e.field} à ${e.institution} (${e.startDate} - ${e.endDate})`).join(' | ')}
- Projets : ${Array.isArray(cvData.projects) && cvData.projects.map((p: any) => `${p.name} : ${p.description}`).join(' | ')}
- Langues : ${Array.isArray(cvData.languages) && cvData.languages.map((l: any) => `${l.name} (${l.level})`).join(' | ')}
- Certifications : ${Array.isArray(cvData.certifications) && cvData.certifications.map((c: any) => `${c.name} (${c.organization}, ${c.date})`).join(' | ')}
- Template : ${template.name} (palette de couleurs : ${JSON.stringify(template.colors)})

Contraintes et exigences de rendu
Structure du code : Le code doit être un unique fichier HTML complet. 
Le CSS sera inclus dans une balise <style> et le JavaScript dans une balise <script>, tous deux placés dans le <head> ou le <body> selon les meilleures pratiques. 
La structure HTML doit utiliser une sémantique HTML5 propre et accessible (<header>, <nav>, <main>, <footer>, <section>).
Design et Esthétique :
Le design doit être responsive et parfaitement adapté aux appareils mobiles et de bureau, en utilisant les media queries.
Intègre une typographie moderne, des espacements harmonieux et une palette de couleurs cohérente basée sur le template fourni.
Le style doit être professionnel et visuellement attrayant, avec des animations subtiles (fades, slides) et des effets de survol (hover) pour les éléments interactifs.
Fonctionnalités dynamiques :
Crée une navbar fixe et dynamique qui change de style au scroll pour une meilleure lisibilité.
Les liens de la navigation doivent permettre de naviguer en douceur vers les différentes sections de la page (effet de smooth scrolling).
La section Projets doit être présentée sous forme de galerie ou de carrousel interactif (selon la quantité de projets).
Le JavaScript doit être concis et géré directement dans la balise <script>.
Contenu :
Intègre toutes les sections du CV de manière claire et bien structurée : Profil, Compétences, Expériences, Formations, Projets, Langues, Certifications.
Utilise des icônes professionnelles via des SVG intégrés ou des codes Unicode pour éviter toute dépendance externe.
Le header et le footer doivent être impeccables et inclure toutes les informations de contact et les liens sociaux.
Qualité du code :
Le code doit être bien commenté dans la langue du CV (français ou anglais), expliquant les sections clés et les fonctionnalités.
Le résultat final est un seul bloc de code contenant le fichier index.html complet et prêt à l'emploi.
Important : La réponse doit contenir uniquement le code HTML complet, sans aucune explication ou texte additionnel, dans un seul bloc de code et dans la zone photo place un avatar.
    `;

    // Appel à l'API mistral (exemple générique, à adapter selon ton backend)
    // Ici, on suppose une API REST POST /generate-portfolio qui prend { prompt } et retourne { html }
    try {
      const response = await fetch('http://localhost:4000/generate-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!response.ok) {
        console.error('pas de reponse');
        throw new Error('Erreur lors de la génération du portfolio (réponse vide)');
      }
      const data = await response.json();
      return data.html || '';
    } catch (e) {
      console.error('Erreur backend Mistral:', e);
      alert('Erreur lors de la génération du portfolio. Un fallback basique est utilisé.');
      return `
      <div style="font-family:Arial,sans-serif;padding:2rem">
        <h1>${cvData.personalInfo.name}</h1>
        <p>${cvData.personalInfo.bio}</p>
      </div>
      `;
    }
  }
//huggingface
  /*
    async callHuggingFace(model: string, fileContent: string): Promise<any> {
      if (!HF_API_KEY) {
        // Fallback to mock data for development
        alert('contenu par defaut');
        console.log('pas de cle api');
        return this.getMockCVData();
      }
  
      try {
        const response = await fetch(`${HF_API_URL}/${model}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: fileContent }),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('HuggingFace API error:', response.status, errorText);
          throw new Error(`API call failed: ${response.status} - ${errorText}`);
        }
        return await response.json();
      } catch (error) {
        console.error('AI service error:', error);
        alert(error)  //ajout
        return this.getMockCVData();
      }
    }
  */

//mistral
    /*
    async callMistral(Prompt: string): Promise<any> {
  
  
      try {
        const apiKey = process.env.MISTRAL_API_KEY;
        const client = new Mistral({ apiKey: apiKey });
  
        const Response = await client.chat.complete({
          model: 'mistral-large-latest',
          messages: [
            {
              role: 'user',
              content: Prompt
            }
          ],
        });
  
        if (!process.env.MISTRAL_API_KEY) {
          console.log('No Mistral API key set');
          throw new Error('No Mistral API key set');
        }
  
        console.log('Chat:', Response.choices[0].message.content);
  
      } catch (error) {
        console.error('Mistral service error:', error);
        alert(error)  //ajout
        return this.getMockCVData();
      }
  
  
  
    }
  */

//extraction manuelle
  /*
    async parseCV(fileContent: string, fileName: string): Promise<ParsedCVData> {
      // For demo purposes, we'll use pattern matching and return structured data
      // In production, this would use advanced NLP models
      //return await this.callHuggingFace('nhanv/cv_parser', fileContent);
      try {
        const lines = fileContent.split('\n');
        return this.extractCVData(lines);
      } catch (error) {
        alert('Error parsing CV');
        return this.getMockCVData();
      }
    }
  */

    
  async parseCV(fileContent: string, fileName: string): Promise<ParsedCVData> {
      console.log('Contenu du fichier transmis à Gemini :', fileContent);

    // Extraction des données du CV avec Gemini
    const prompt = `
Voici le contenu d'un CV. Analyse-le et retourne un objet JSON strictement compatible avec l'interface ParsedCVData suivante :

interface ParsedCVData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location?: string;
    bio?: string;
    linkedin?: string;
    github?: string;
    site?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    category: string;
    level?: number;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description?: string;
    technologies?: string[];
    url?: string;
    github?: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer?: string;
    date?: string;
    url?: string;
  }>;
}

Le JSON doit respecter exactement cette structure et les types. Exemple minimal attendu :
{
  "personalInfo": { "name": "John Doe", "email": "john@email.com", "phone": "+1 234 567 890" },
  "experience": [],
  "education": [],
  "skills": [],
  "projects": [],
  "languages": [],
  "certifications": []
}

Ne retourne que le JSON, sans explication, sans balise de code et fais attention particulièrement aux informations personnelles. Voici le CV à analyser :
${fileContent}
  `;
    try {
      //const apiKey = import.meta.env.GEMINI_KEY;
      const apiKey = 'AIzaSyBss0I5ILOs4bntYN5wCGMJTQzpzbn0Rj0';
      if (!apiKey) {
        console.error('Aucune clé API Gemini trouvée');
        throw new Error('Aucune clé API Gemini trouvée');
      }

      const genAI = new GoogleGenAI({ apiKey });
      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash-preview-05-20',
        contents: prompt
      });
      const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || response?.text || "";
      // On parse le JSON extrait par Gemini
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) {
        console.error('Aucun JSON trouvé dans la réponse Gemini', text);
        throw new Error('Aucun JSON trouvé dans la réponse Gemini');
      }
      const jsonString = text.substring(jsonStart, jsonEnd + 1);
      console.log(jsonString);
      return JSON.parse(jsonString);
      
    } catch (error) {
      console.error('Erreur Gemini:', error);
      alert('Erreur lors de l\'extraction des données du CV. Un fallback basique est utilisé.');
      return this.getMockCVData();
    }
  }

  extractCVData(lines: string[]): ParsedCVData {
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