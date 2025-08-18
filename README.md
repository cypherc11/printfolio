# PrintFolio - AI-Powered Portfolio Generator

Transform your CV into a professional portfolio website in minutes using AI technology.

> 🎯 **Mission** : Créer des portfolios professionnels de qualité, 100% gratuit, en utilisant l'IA pour analyser votre CV et générer automatiquement un site web responsive déployé en ligne.

## 🚀 Features

### 🤖 Analyse IA Avancée
- **Upload multi-format** : PDF, DOCX, TXT jusqu'à 10MB
- **Extraction intelligente** : Informations personnelles, expériences, compétences, projets, formation
- **Support multilingue** : Détection automatique et génération dans la langue du CV
- **Personnalisation IA** : Adaptation du design selon votre secteur professionnel

### 🎨 Templates Professionnels
- **6 designs** : Minimal, Modern, Creative, Technical, Executive, Academic
- **Personnalisation intelligente** : Couleurs et polices adaptées à votre profil
- **Icônes dynamiques** : Visuels automatiques pour vos compétences
- **Preview temps réel** : Aperçu instantané de votre portfolio

### 🚀 Déploiement Automatique
- **URL unique** : Sous-domaine personnalisé (prenom-nom.printfolio.app)
- **HTTPS inclus** : Certificat SSL automatique
- **SEO optimisé** : Métadonnées et structured data générés
- **Responsive** : Parfait sur mobile, tablette et desktop

### ✨ Fonctionnalités Avancées
- **Intégrations** : LinkedIn, GitHub, Google Drive, Dropbox
- **Éditeur drag & drop** : Personnalisation avancée des sections
- **Analytics** : Statistiques de visites avec Google Analytics
- **Export** : Téléchargement en HTML/CSS ou PDF
- **Chatbot IA** : Assistant pour la personnalisation

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript for robust development
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** for modern, responsive styling
- **Framer Motion** for smooth animations
- **React Hook Form** with Zod validation
- **React Dropzone** for file uploads

### Backend & Database
- **Supabase** for backend services and PostgreSQL database
- **Supabase Storage** for file management
- **Row Level Security (RLS)** for data protection

### AI & NLP
- **Hugging Face Transformers** : Modèles NLP multilingues (free tier)
- **spaCy** : Traitement de texte local et reconnaissance d'entités
- **Custom algorithms** : Extraction et classification de données CV

### Deployment & Hosting
- **Netlify** : Hébergement principal avec CI/CD (free tier)
- **Supabase** : Backend, base de données et hébergement portfolios
- **Cloudflare** : CDN global pour optimisation performance (free tier)

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (free tier available)
- A Hugging Face account for AI services (free tier available)

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
```

### Required API Keys and Setup

> 📋 **Important** : Tous les services utilisés ont des plans gratuits généreux. Aucun coût n'est requis pour faire fonctionner l'application.

#### 1. Supabase Setup
1. Create a free account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API to get your URL and anon key
4. Update your `.env` file with these values

#### 2. Hugging Face Setup
1. Create a free account at [https://huggingface.co](https://huggingface.co)
2. Go to Settings > Access Tokens
3. Create a new token with read permissions
4. Add the token to your `.env` file

#### 3. Services Optionnels (Fonctionnalités Avancées)

**LinkedIn API** (pour import de profil)
1. Créer une app sur [LinkedIn Developer](https://developer.linkedin.com/)
2. Obtenir Client ID et Client Secret
3. Limites gratuites : 500 requêtes/jour

**GitHub API** (pour import de repositories)
1. Générer un token sur [GitHub Settings](https://github.com/settings/tokens)
2. Limites gratuites : 5,000 requêtes/heure

**Google Drive API** (pour import de projets)
1. Créer un projet sur [Google Cloud Console](https://console.cloud.google.com/)
2. Activer l'API Drive et obtenir les credentials
3. Limites gratuites : 1 milliard requêtes/jour

#### 3. Database Setup
The application will automatically create the necessary database tables when you connect to Supabase.

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd printfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables (see above)

4. Start the development server:
```bash
npm run dev
```

## 🎯 Guide d'Utilisation

### Étape 1 : Upload de CV
1. **Glissez-déposez** votre CV ou cliquez pour parcourir
2. **Formats acceptés** : PDF, DOCX, TXT (max 10MB)
3. **Validation automatique** : Vérification du format et de la taille

### Étape 2 : Analyse IA
1. **Extraction automatique** : L'IA analyse votre CV
2. **Détection de langue** : Reconnaissance automatique
3. **Structuration** : Organisation des données par sections

### Étape 3 : Révision et Édition
1. **Preview des données** : Vérification des informations extraites
2. **Édition en ligne** : Modification et ajout d'informations
3. **Complétion manuelle** : Ajout de liens sociaux, bio, projets

### Étape 4 : Sélection de Template
1. **6 designs disponibles** : Choix selon votre secteur
2. **Personnalisation IA** : Couleurs adaptées automatiquement
3. **Preview temps réel** : Aperçu instantané du résultat

### Étape 5 : Génération et Déploiement
1. **Génération automatique** : Création du portfolio
2. **Optimisation SEO** : Métadonnées et structured data
3. **Déploiement live** : URL unique immédiatement accessible

## 📊 Free Tier Limitations

> 💡 **Astuce** : Ces limites sont largement suffisantes pour un usage personnel et même pour de petites entreprises.

### Supabase (Free Tier)
- 500MB database storage
- 1GB file storage
- 50,000 monthly active users
- 2 million edge function invocations

### Hugging Face (Free Tier)
- 1,000 requests per month for Inference API
- Rate limit: 1 request per second

### Netlify (Free Tier)
- 100GB bandwidth per month
- 300 build minutes per month
- Deploy from Git repositories

### Cloudflare (Free Tier)
- Bandwidth illimité
- 100,000 requêtes/jour
- Protection DDoS incluse

## 🔒 Sécurité et Confidentialité

### Protection des Données
- **Chiffrement HTTPS** : Toutes les communications sécurisées
- **Authentification sécurisée** : OAuth avec Google/GitHub
- **Suppression automatique** : CVs supprimés après traitement
- **RGPD compliant** : Respect de la réglementation européenne

### Sécurité des Fichiers
- **Validation stricte** : Vérification des types MIME
- **Scan antivirus** : Protection contre les fichiers malveillants
- **Sanitisation** : Nettoyage du contenu avant traitement
- **Stockage temporaire** : Fichiers supprimés après 24h

## 🌍 Support Multilingue

### Langues Supportées
- **Interface** : Français, Anglais, Espagnol

### Netlify (Free Tier)
- 100GB bandwidth per month
- 300 build minutes per month
- Deploy from Git repositories

## 🔐 Security Features

- **HTTPS Encryption**: All data transmission is encrypted
- **Row Level Security**: Database access is restricted per user
- **File Upload Validation**: Only safe file types are accepted
- **GDPR Compliance**: Users can delete their data anytime
- **Input Sanitization**: All user inputs are validated and sanitized

## 🌐 Multi-language Support

- **CV Analysis**: Supports CVs in multiple languages
- **Portfolio Generation**: Generates content in the detected language
- **Interface**: Available in English, French, and Spanish

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interfaces
- Optimized loading for mobile networks
- Progressive Web App (PWA) features

## 🎨 Available Templates

1. **Minimal**: Clean and simple design for any profession
2. **Modern**: Contemporary design with smooth animations
3. **Creative**: Bold and colorful for creative professionals
4. **Technical**: Professional design for developers and engineers

## 🚀 Deployment

### Automatic Deployment
The application automatically deploys generated portfolios to unique URLs.

### Manual Deployment
To deploy the main application:

```bash
npm run build
```

Deploy the `dist` folder to any static hosting service like Netlify, Vercel, or GitHub Pages.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [FAQ section](#faq)
2. Search existing GitHub issues
3. Create a new issue with detailed information

## FAQ

**Q: Is PrintFolio really free?**
A: Yes! We use only free tiers of various services. You may hit rate limits with heavy usage, but basic functionality is completely free.

**Q: What file formats are supported?**
A: Currently PDF, DOCX, and TXT files up to 10MB are supported.

**Q: Can I edit my portfolio after it's generated?**
A: Yes! You can re-upload your CV or make changes and regenerate your portfolio.

**Q: Is my data secure?**
A: Absolutely. We use industry-standard encryption and never store your CV files permanently.

**Q: Can I use my own domain?**
A: The free version provides a subdomain. Custom domains require additional setup with your own hosting.

## 🔮 Future Features

- Drag-and-drop portfolio editor
- Integration with LinkedIn and GitHub APIs
- Analytics dashboard for portfolio views
- Multiple portfolio themes per user
- PDF export functionality
- Custom domain support
- Portfolio templates marketplace

---

Built with ❤️ using free and open-source technologies.