import { TNSTextToSpeech } from 'nativescript-texttospeech';
import { alert } from '@nativescript/core';

export const useSpeech = () => {
    const tts = new TNSTextToSpeech();
    
    const speak = async (text) => {
        try {
            console.log('Tentative de synthèse vocale:', text);
            const options = {
                text,
                locale: 'fr-FR',
                pitch: 1.1,
                speakRate: 1.2,
                volume: 1.0
            };
            
            await tts.speak(options);
            console.log('Synthèse vocale réussie');
        } catch (error) {
            console.error('Erreur TTS:', error);
            alert({
                title: "Erreur de synthèse vocale",
                message: error.message,
                okButtonText: "OK"
            });
        }
    };

    return { speak };
};