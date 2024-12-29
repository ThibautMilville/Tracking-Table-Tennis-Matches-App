import Vue from 'nativescript-vue';
import { SpeechRecognition } from 'nativescript-speech-recognition';
import { logger } from './useLogger';

const RESTART_DELAY = 1000;
const MAX_RECOGNITION_TIME = 10000;

export const useVoiceRecognition = (onCommand) => {
    const speechRecognition = new SpeechRecognition();
    const isListening = Vue.observable({ value: false });
    let recognitionInstance = null;
    let shouldContinueListening = false;
    let recognitionTimer = null;

    const clearRecognitionTimer = () => {
        if (recognitionTimer) {
            clearTimeout(recognitionTimer);
            recognitionTimer = null;
        }
    };

    const startListeningInstance = async () => {
        try {
            clearRecognitionTimer();

            recognitionInstance = await speechRecognition.startListening({
                locale: "fr-FR",
                onResult: async (result) => {
                    try {
                        await onCommand(result);
                    } finally {
                        if (shouldContinueListening && result.finished) {
                            await restartListening();
                        }
                    }
                },
                returnPartialResults: true
            });

            isListening.value = true;

            recognitionTimer = setTimeout(() => {
                restartListening();
            }, MAX_RECOGNITION_TIME);

        } catch (error) {
            logger.error('Erreur de démarrage:', error);
            if (shouldContinueListening) {
                setTimeout(() => restartListening(), RESTART_DELAY);
            }
        }
    };

    const startListening = async () => {
        try {
            const available = await speechRecognition.available();
            if (!available) {
                throw new Error('La reconnaissance vocale n\'est pas disponible');
            }

            await speechRecognition.requestPermission();

            if (recognitionInstance) {
                await stopListening();
            }

            shouldContinueListening = true;
            await startListeningInstance();
            logger.info('Reconnaissance vocale démarrée');
            return true;
        } catch (error) {
            isListening.value = false;
            throw error;
        }
    };

    const stopListening = async () => {
        try {
            shouldContinueListening = false;
            clearRecognitionTimer();

            if (recognitionInstance) {
                await speechRecognition.stopListening();
                recognitionInstance = null;
            }

            isListening.value = false;
            logger.info('Reconnaissance vocale arrêtée');
            return true;
        } catch (error) {
            isListening.value = false;
            if (error.message === 'Not running') {
                return true;
            }
            throw error;
        }
    };

    const restartListening = async () => {
        if (!shouldContinueListening) return;

        try {
            if (recognitionInstance) {
                await speechRecognition.stopListening();
                recognitionInstance = null;
            }
            await startListeningInstance();
        } catch (error) {
            logger.error('Erreur de redémarrage:', error);
            if (shouldContinueListening) {
                setTimeout(() => restartListening(), RESTART_DELAY);
            }
        }
    };

    return {
        isListening,
        startListening,
        stopListening
    };
};