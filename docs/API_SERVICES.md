# API et Services Gratuits - Guide Complet

## 📋 Services Obligatoires

### 1. Supabase - Backend Principal
- **URL** : https://supabase.com
- **Plan gratuit** : 500MB DB, 1GB storage, 50K MAU
- **Utilisation** : Base de données, authentification, stockage de fichiers
- **Configuration** :
  ```env
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```

### 2. Hugging Face - Intelligence Artificielle
- **URL** : https://huggingface.co
- **Plan gratuit** : 1,000 requêtes/mois, 1 req/sec
- **Utilisation** : Analyse NLP des CVs, extraction de données
- **Modèles utilisés** :
  - `bert-base-multilingual-cased` : Reconnaissance d'entités nommées
  - `distilbert-base-uncased` : Classification de texte
  - `facebook/bart-large-cnn` : Résumé de texte
- **Configuration** :
  ```env
  VITE_HUGGING_FACE_API_KEY=hf_your-token
  ```

### 3. Netlify - Hébergement et Déploiement
- **URL** : https://netlify.com
- **Plan gratuit** : 100GB bandwidth/mois, 300 min build/mois
- **Utilisation** : Hébergement de l'application principale et des portfolios générés
- **Features incluses** : CI/CD, SSL automatique, domaines personnalisés

## 🔧 Services Optionnels

### 4. Cloudflare - CDN et Performance
- **URL** : https://cloudflare.com
- **Plan gratuit** : Bandwidth illimité, 100K req/jour
- **Utilisation** : Accélération du contenu, protection DDoS
- **Benefits** : Réduction de la charge sur Netlify

### 5. Google Analytics 4 - Statistiques
- **URL** : https://analytics.google.com
- **Plan gratuit** : 10M events/mois
- **Utilisation** : Suivi des visites, analyse du comportement utilisateur
- **Configuration** :
  ```env
  VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
  ```

### 6. LinkedIn API - Import de Profil
- **URL** : https://developer.linkedin.com
- **Plan gratuit** : 500 requêtes/jour
- **Utilisation** : Import automatique des données de profil LinkedIn
- **Scopes requis** : `r_liteprofile`, `r_emailaddress`
- **Configuration** :
  ```env
  VITE_LINKEDIN_CLIENT_ID=your-client-id
  ```

### 7. GitHub API - Import de Repositories
- **URL** : https://docs.github.com/en/rest
- **Plan gratuit** : 5,000 req/heure (authentifié)
- **Utilisation** : Récupération des repositories et projets
- **Configuration** :
  ```env
  VITE_GITHUB_CLIENT_ID=your-client-id
  ```

### 8. Google Drive API - Import de Documents
- **URL** : https://developers.google.com/drive
- **Plan gratuit** : 1 milliard req/jour, 1,000 req/100sec/user
- **Utilisation** : Import de projets et documents depuis Google Drive

## 📚 Bibliothèques Open Source

### Traitement de Documents
- **PDF-Parse** : https://www.npmjs.com/package/pdf-parse
- **Mammoth.js** : https://www.npmjs.com/package/mammoth
- **spaCy** : https://spacy.io (fallback local pour NLP)

### Interface Utilisateur
- **React DnD** : https://react-dnd.github.io/react-dnd/
- **Framer Motion** : https://www.framer.com/motion/
- **React Hook Form** : https://react-hook-form.com/

### Utilitaires
- **Franc** : https://github.com/wooorm/franc (détection de langue)
- **LibreTranslate** : https://libretranslate.com (traduction)

## ⚠️ Limites et Solutions

### Hugging Face (1,000 req/mois)
**Solutions** :
- Cache intelligent des résultats d'analyse
- Fallback vers spaCy pour le traitement local
- Optimisation des requêtes (batch processing)

### Netlify (100GB bandwidth/mois)
**Solutions** :
- Compression et optimisation des assets
- Utilisation de Cloudflare CDN
- Lazy loading des images et composants

### Supabase (50K MAU)
**Solutions** :
- Optimisation des requêtes SQL
- Nettoyage automatique des données anciennes
- Utilisation efficace du cache

## 🚀 Alternatives de Secours

### Si Hugging Face atteint ses limites
1. **spaCy local** : Traitement NLP côté client
2. **OpenAI API** : 18$ de crédit gratuit
3. **Cohere API** : Plan gratuit avec limitations

### Si Netlify atteint ses limites
1. **Vercel** : 100GB bandwidth/mois
2. **Render** : 750h/mois pour sites statiques
3. **GitHub Pages** : Illimité pour sites publics

### Si Supabase atteint ses limites
1. **Firebase** : 1GB storage, 10GB transfer/mois
2. **MongoDB Atlas** : 512MB storage gratuit
3. **PlanetScale** : 5GB storage gratuit

## 📊 Monitoring des Quotas

### Outils de Surveillance Gratuits
- **Uptime Robot** : https://uptimerobot.com (50 monitors gratuits)
- **Pingdom** : https://pingdom.com (plan gratuit limité)
- **StatusCake** : https://statuscake.com (plan gratuit disponible)

### Alertes de Consommation
```javascript
// Exemple de monitoring des quotas
const quotaMonitoring = {
  huggingFace: {
    limit: 1000,
    current: 0,
    alertThreshold: 800
  },
  netlify: {
    limit: 100 * 1024 * 1024 * 1024, // 100GB
    current: 0,
    alertThreshold: 80 * 1024 * 1024 * 1024 // 80GB
  }
}
```

## 🔐 Sécurité des API Keys

### Bonnes Pratiques
1. **Variables d'environnement** : Jamais de clés en dur dans le code
2. **Rotation régulière** : Changer les clés tous les 3 mois
3. **Permissions minimales** : Accorder seulement les droits nécessaires
4. **Monitoring** : Surveiller l'utilisation des APIs

### Configuration Sécurisée
```env
# Production
VITE_SUPABASE_URL=https://prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod-anon-key

# Development
VITE_SUPABASE_URL=https://dev-project.supabase.co
VITE_SUPABASE_ANON_KEY=dev-anon-key
```

## 📈 Optimisation des Coûts

### Stratégies pour Rester Gratuit
1. **Cache intelligent** : Réduire les appels API répétitifs
2. **Compression** : Optimiser la taille des données
3. **Lazy loading** : Charger le contenu à la demande
4. **CDN** : Utiliser Cloudflare pour réduire la bande passante

### Métriques à Surveiller
- Nombre de requêtes API par service
- Consommation de bande passante
- Utilisation du stockage
- Nombre d'utilisateurs actifs

Cette documentation complète vous permet de configurer tous les services nécessaires pour faire fonctionner PrintFolio sans aucun coût, tout en ayant des solutions de secours en cas de dépassement des quotas gratuits.