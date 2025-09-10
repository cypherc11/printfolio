// server/mistral-api.js
import express from 'express';
import cors from 'cors';
import { Mistral } from '@mistralai/mistralai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = 'Esnw0uXdwZ79WuLNaQZqrNkLUm1mmLSc';

if (!apiKey) {
    console.error('Aucune clé API Mistral trouvée');
    throw new Error('MISTRAL_API_KEY manquant dans .env');
}

app.post('/generate-portfolio', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt manquant' });
    }
    const models = ['mistral-large-latest', 'mistral-medium-latest', 'mistral-small-latest'];
    const client = new Mistral({ apiKey });
    let lastError = null;

    for (const model of models) {
        try {
            console.log('Prompt reçu:', prompt);
            console.log(`Tentative avec le modèle : ${model}`);
            const response = await client.chat.complete({
                model,
                messages: [
                    { role: 'user', content: prompt }
                ],
            });
            console.log('Réponse Mistral brute:', response);
            if (response.choices && response.choices[0]?.message?.content) {
                const html = response.choices[0].message.content;
                console.log('success');
                return res.json({ html });
            } else {
                lastError = new Error('Réponse vide ou mal formée');
            }
        } catch (error) {
            lastError = error;
            // Si c'est une erreur de capacité (429/service_tier_capacity_exceeded), on tente le modèle suivant
            if (error.statusCode === 429 && error.message && error.message.includes('service_tier_capacity_exceeded')) {
                console.warn(`Capacité dépassée pour ${model}, essai du modèle suivant...`);
                continue;
            } else {
                // Autre erreur, on arrête
                break;
            }
        }
    }
    console.error('Erreur Mistral backend:', lastError);
    res.status(500).json({ error: 'Erreur lors de la génération du portfolio', details: lastError?.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Mistral backend listening on port ${PORT}`);
});