# Guide de Déploiement PrintFolio

## 🚀 Déploiement Rapide (5 minutes)

### Prérequis
- Compte GitHub
- Compte Netlify
- Compte Supabase
- Compte Hugging Face

### Étapes de Déploiement

#### 1. Fork du Repository
```bash
# Cloner le repository
git clone https://github.com/your-username/printfolio.git
cd printfolio

# Installer les dépendances
npm install
```

#### 2. Configuration Supabase
1. Créer un nouveau projet sur [Supabase](https://supabase.com)
2. Aller dans Settings > API
3. Copier l'URL et la clé anonyme
4. Créer les tables nécessaires :

```sql
-- Table des portfolios
CREATE TABLE portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  cv_data JSONB NOT NULL,
  template VARCHAR(50) NOT NULL,
  customizations JSONB DEFAULT '{}',
  deploy_url TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Politique pour les utilisateurs authentifiés
CREATE POLICY "Users can manage their own portfolios" ON portfolios
  FOR ALL USING (auth.uid() = user_id);
```

#### 3. Configuration Hugging Face
1. Créer un compte sur [Hugging Face](https://huggingface.co)
2. Aller dans Settings > Access Tokens
3. Créer un nouveau token avec permissions de lecture

#### 4. Variables d'Environnement
Créer un fichier `.env` :
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_HUGGING_FACE_API_KEY=hf_your-token
```

#### 5. Déploiement sur Netlify
1. Connecter votre repository GitHub à Netlify
2. Configurer les variables d'environnement dans Netlify
3. Définir la commande de build : `npm run build`
4. Définir le dossier de publication : `dist`

## 🔧 Configuration Avancée

### Domaine Personnalisé
```bash
# Dans Netlify, aller dans Domain settings
# Ajouter votre domaine personnalisé
# Configurer les DNS selon les instructions
```

### SSL et Sécurité
- SSL automatique avec Netlify
- Headers de sécurité configurés
- CORS configuré pour Supabase

### CDN Cloudflare (Optionnel)
1. Créer un compte [Cloudflare](https://cloudflare.com)
2. Ajouter votre domaine
3. Configurer les DNS
4. Activer les optimisations

## 📊 Monitoring et Analytics

### Google Analytics 4
```env
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Uptime Monitoring
- Configurer [Uptime Robot](https://uptimerobot.com)
- Surveiller la disponibilité
- Alertes par email/SMS

## 🔄 CI/CD Pipeline

### GitHub Actions (Optionnel)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🐛 Dépannage

### Problèmes Courants

#### Erreur de Build
```bash
# Vérifier les dépendances
npm install

# Nettoyer le cache
npm run clean
rm -rf node_modules package-lock.json
npm install
```

#### Problème de Variables d'Environnement
- Vérifier que toutes les variables sont définies
- Redémarrer le serveur de développement
- Vérifier la configuration Netlify

#### Erreur Supabase
- Vérifier les URLs et clés API
- Contrôler les politiques RLS
- Vérifier les permissions

### Logs et Debugging
```javascript
// Activer les logs en développement
if (import.meta.env.DEV) {
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Environment:', import.meta.env.MODE);
}
```

## 📈 Optimisation des Performances

### Build Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@headlessui/react', 'framer-motion']
        }
      }
    }
  }
});
```

### Image Optimization
- Utiliser des formats WebP
- Lazy loading des images
- Compression automatique

### Caching Strategy
```javascript
// Service Worker pour le cache
const CACHE_NAME = 'printfolio-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];
```

## 🔒 Sécurité en Production

### Headers de Sécurité
```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Rate Limiting
```javascript
// Limitation des requêtes API
const rateLimiter = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite de 100 requêtes par fenêtre
};
```

## 📋 Checklist de Déploiement

### Avant le Déploiement
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Variables d'environnement configurées
- [ ] Base de données initialisée
- [ ] SSL configuré

### Après le Déploiement
- [ ] Site accessible
- [ ] Fonctionnalités principales testées
- [ ] Analytics configurées
- [ ] Monitoring activé
- [ ] Sauvegardes configurées

### Maintenance Continue
- [ ] Surveillance des quotas
- [ ] Mise à jour des dépendances
- [ ] Sauvegarde des données
- [ ] Monitoring des performances

Ce guide vous permet de déployer PrintFolio en production de manière sécurisée et optimisée, tout en respectant les contraintes des services gratuits.