import Vue from 'nativescript-vue';
import { SpeechRecognition } from 'nativescript-speech-recognition';

export const useVoiceRecognition = (onCommand) => {
    const speechRecognition = new SpeechRecognition();
    const isListening = Vue.observable({ value: false });
    let recognitionInstance = null;

    const startListening = async () => {
        try {
            console.log('Vérification de la disponibilité...');
            const available = await speechRecognition.available();

            if (!available) {
                throw new Error('La reconnaissance vocale n\'est pas disponible sur cet appareil');
            }

            console.log('Demande de permission...');
            await speechRecognition.requestPermission();

            if (recognitionInstance) {
                console.log('Une instance existe déjà, arrêt...');
                await stopListening();
            }

            console.log('Démarrage de l\'écoute...');
            recognitionInstance = await speechRecognition.startListening({
                locale: "fr-FR",
                onResult: onCommand,
                returnPartialResults: true
            });

            isListening.value = true;
            console.log('Écoute démarrée avec succès');
            return true;
        } catch (error) {
            console.error('Erreur au démarrage:', error);
            isListening.value = false;
            throw error;
        }
    };

    const stopListening = async () => {
        try {
            console.log('Arrêt de l\'écoute...');
            if (recognitionInstance) {
                await speechRecognition.stopListening();
                recognitionInstance = null;
            }
            isListening.value = false;
            console.log('Arrêt réussi');
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'arrêt:', error);
            isListening.value = false;
            if (error.message === 'Not running') {
                return true;
            }
            throw error;
        }
    };

    return {
        isListening,
        startListening,
        stopListening
    };
};