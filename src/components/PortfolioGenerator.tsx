
// Importation des dépendances React et des librairies externes
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Pour les animations
import { CheckCircle, ExternalLink, Copy, Share2, Download } from 'lucide-react'; // Icônes
import { CVData, PortfolioTemplate } from '../types'; // Types personnalisés
import toast from 'react-hot-toast'; // Notifications toast
import { AIService } from '../lib/aiService' // Import personnel (non utilisé ici)
 //je ne vois pas d'appel a la fonction d'extraction de la donner uploader.
import { supabase } from '../lib/supabase';


// Définition des props attendues par le composant
interface PortfolioGeneratorProps {
  cvData: CVData; // Données du CV à afficher
  template: PortfolioTemplate; // Template sélectionné
  onBack: () => void; // Callback pour revenir à la sélection de template
  onNewPortfolio: () => void; // Callback pour générer un nouveau portfolio
}



// Composant principal qui gère la génération et l'affichage du portfolio
export const PortfolioGenerator: React.FC<PortfolioGeneratorProps> = ({
  cvData,
  template,
  onBack,
  onNewPortfolio
}) => {
  // État pour suivre l'étape de génération (génération, déploiement, terminé)
  const [generationStatus, setGenerationStatus] = useState<'generating' | 'deploying' | 'completed'>('generating');
  // État pour stocker l'URL du portfolio généré
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');

  // useEffect pour lancer la génération du portfolio au montage du composant
  useEffect(() => {
    generatePortfolio();
  }, []);

  const [portfolioHtml, setPortfolioHtml] = useState<string>(''); // Ajoute cet état en haut du composant
  // Fonction asynchrone qui simule la génération et le déploiement du portfolio
  /*const generatePortfolio = async () => {
    // Simule la génération du contenu (3s)
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGenerationStatus('deploying');
    // Simule le déploiement (2s)
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Génère une URL unique pour le portfolio
    const username = cvData.personalInfo.name.toLowerCase().replace(/\s+/g, '-');
    const uniqueId = Math.random().toString(36).substring(2, 8);
    const url = `https://${username}-${uniqueId}.printfolio.app`;
    setPortfolioUrl(url);
    setGenerationStatus('completed');
    toast.success('Portfolio deployed successfully!');
  };*/

const generatePortfolio = async () => {
  setGenerationStatus('generating');
  try {
    // Appel à l'IA pour générer le contenu du portfolio
    const ai = new AIService();
    // Tu dois créer cette méthode dans AIService si elle n'existe pas encore
    const html = await ai.generatePortfolioContent(cvData, template);
    setPortfolioHtml(html);

    setGenerationStatus('deploying');
    await new Promise(resolve => setTimeout(resolve, 2000));
    const username = cvData.personalInfo.name.toLowerCase().replace(/\s+/g, '-');
    const uniqueId = Math.random().toString(36).substring(2, 8);
    const url = `https://${username}-${uniqueId}.printfolio.app`;
    setPortfolioUrl(url);
    setGenerationStatus('completed');
    toast.success('Portfolio deployed successfully!');
  } catch (error) {
    toast.error('Erreur lors de la génération du portfolio.');
    setGenerationStatus('completed');
  }
};

  // Copie l'URL du portfolio dans le presse-papier et affiche une notification
  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioUrl);
    toast.success('URL copied to clipboard!');
  };

  // Utilise l'API de partage du navigateur si disponible, sinon copie l'URL
  const sharePortfolio = () => {
    if (navigator.share) {
      navigator.share({
        title: `${cvData.personalInfo.name}'s Portfolio`,
        text: 'Check out my professional portfolio',
        url: portfolioUrl,
      });
    } else {
      copyToClipboard();
    }
  };

  // Fonction d'export : exporte l'aperçu du portfolio en HTML a revoir
  const exportPortofolio = () => {
    // Génère un HTML simple basé sur l'aperçu affiché
    const htmlContent = portfolioHtml || '<div>Erreur : aucun code généré</div>';

    // Création d'un blob et déclenchement du téléchargement
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${cvData.personalInfo.name.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Portfolio exported as HTML!');
  };

  return (
  <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-8 py-4">
      {/* En-tête et message d'état de génération */}
  <div className="text-center mb-8 px-2">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {generationStatus === 'completed' ? 'Portfolio Ready!' : 'Generating Your Portfolio'}
        </h2>
  <p className="text-base sm:text-lg text-gray-600">
          {/* Affiche le message selon l'étape */}
          {generationStatus === 'generating' && 'Our AI is creating your personalized portfolio...'}
          {generationStatus === 'deploying' && 'Deploying your portfolio to the web...'}
          {generationStatus === 'completed' && 'Your portfolio is now live and ready to share!'}
        </p>
      </div>

      {/* Bloc d'affichage de la progression de génération */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-8 mb-8"
      >
  <div className="space-y-4 sm:space-y-6">
          {/* Étape 1 : Génération du contenu */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              generationStatus === 'generating' 
                ? 'bg-blue-100 border-2 border-blue-500' 
                : 'bg-green-100'
            }`}>
              {generationStatus === 'generating' ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-gray-900">Creating Portfolio Content</h3>
              <p className="text-sm text-gray-600">
                Formatting your experience, skills, and projects with the {template.name} template
              </p>
            </div>
          </div>

          {/* Étape 2 : Déploiement */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              generationStatus === 'deploying' 
                ? 'bg-blue-100 border-2 border-blue-500' 
                : generationStatus === 'completed'
                ? 'bg-green-100'
                : 'bg-gray-100'
            }`}>
              {generationStatus === 'deploying' ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : generationStatus === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <span className="text-sm font-medium text-gray-400">2</span>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-gray-900">Deploying to Web</h3>
              <p className="text-sm text-gray-600">
                Publishing your portfolio with SEO optimization and SSL certificate
              </p>
            </div>
          </div>

          {/* Étape 3 : Portfolio prêt */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              generationStatus === 'completed' 
                ? 'bg-green-100' 
                : 'bg-gray-100'
            }`}>
              {generationStatus === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <span className="text-sm font-medium text-gray-400">3</span>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-gray-900">Portfolio Live</h3>
              <p className="text-sm text-gray-600">
                Your portfolio is accessible worldwide with a unique URL
              </p>
            </div>
          </div>
        </div>

        {/* Aperçu du portfolio généré (affiché uniquement à la fin) */}
        {generationStatus === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200"
          >
            <h4 className="font-semibold text-gray-900 mb-4">Portfolio Preview</h4>
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-4 min-h-64">
              {/* Affichage d'un aperçu fictif du portfolio */}
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <h2 className="text-xl sm:text-2xl font-bold" style={{ color: template.colors.primary }}>
                  {cvData.personalInfo.name}
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">{cvData.experience[0]?.position || 'Professional'}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">{cvData.personalInfo.location}</p>
              </div>
              {/* Bloc à deux colonnes : À propos et compétences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-base sm:text-lg" style={{ color: template.colors.primary }}>
                    About
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">{cvData.personalInfo.bio}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-base sm:text-lg" style={{ color: template.colors.primary }}>
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {cvData.skills.slice(0, 6).map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 rounded text-xs sm:text-sm"
                        style={{ 
                          backgroundColor: template.colors.accent + '20',
                          color: template.colors.accent 
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Actions disponibles une fois le portfolio généré */}
      {generationStatus === 'completed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-8"
        >
          <div className="text-center mb-6 px-2">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Your Portfolio is Live!
            </h3>
            <p className="text-gray-600 text-base sm:text-lg">
              Share your professional portfolio with potential employers and clients
            </p>
          </div>

          {/* Affichage de l'URL du portfolio et bouton de copie */}
          <div className="bg-gray-50 rounded-lg p-2 sm:p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Portfolio URL
                </label>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    value={portfolioUrl}
                    readOnly
                    className="flex-1 px-2 sm:px-3 py-2 bg-white border border-gray-300 rounded-md text-xs sm:text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action : voir, partager, copier, exporter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(portfolioUrl, '_blank')}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View Portfolio</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={sharePortfolio}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyToClipboard}
              className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span>Copy URL</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={exportPortofolio}
              className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              {/* Fonction d'export non implémentée */}
              <Download className="h-4 w-4" />
              <span>Export</span>
            </motion.button>
          </div>

          {/* Boutons pour générer un nouveau portfolio ou revenir à la sélection */}
          <div className="text-center px-2">
            <button
              onClick={onNewPortfolio}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 mr-2 sm:mr-4"
            >
              Create Another Portfolio
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Back to Templates
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};