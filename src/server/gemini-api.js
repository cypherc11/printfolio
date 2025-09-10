// src/server/gemini-api.js
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();
router.use(cors());

// Charge la clé API Gemini depuis les variables d'environnement
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('Aucune clé API Gemini trouvée dans les variables d\'environnement.');
}

// Endpoint POST /parse-cv
router.post('/parse-cv', async (req, res) => {
  const { fileContent } = req.body;
  if (!fileContent) {
    return res.status(400).json({ error: 'fileContent manquant' });
  }

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

Ne retourne que le JSON, sans explication, sans balise de code. Voici le CV à analyser :
${fileContent}
`;

  try {
    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || response?.text || '';
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) {
      return res.status(500).json({ error: 'Aucun JSON trouvé dans la réponse Gemini', raw: text });
    }
    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    return res.json(JSON.parse(jsonString));
  } catch (error) {
    console.error('Erreur Gemini backend:', error);
    return res.status(500).json({ error: 'Erreur Gemini', details: error.message });
  }
});

export default router;
