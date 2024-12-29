import { useSpeech } from './useSpeech';
import { useVoiceRecognition } from './useVoiceRecognition';
import { findPlayerInCommand } from './useVoiceUtils';
import { logger } from './useLogger';
import { alert } from '@nativescript/core';

export const useVoice = ({ player1Name, player2Name, addPoint, currentServer }) => {
    const { speak } = useSpeech();
    
    const announceServer = async () => {
        const serverName = currentServer.value === 1 ? player1Name.value : player2Name.value;
        await speak(`Service à ${serverName}`);
    };
    
    const processVoiceCommand = async (result) => {
        if (!result?.text || !result.finished) return;

        const command = result.text.toLowerCase();
        logger.info(`Commande reçue: ${command}`);
        
        if (command.includes('point pour') || command.includes('point à')) {
            const playerNumber = findPlayerInCommand(
                command, 
                player1Name.value, 
                player2Name.value
            );

            if (playerNumber) {
                addPoint(playerNumber);
                await speak(`Point pour ${playerNumber === 1 ? player1Name.value : player2Name.value}`);
                await announceServer();
            } else {
                await speak('Joueur non reconnu');
            }
        }
    };

    const { isListening, startListening, stopListening } = useVoiceRecognition(processVoiceCommand);

    const toggleVoiceRecognition = async () => {
        try {
            if (isListening.value) {
                await stopListening();
            } else {
                await startListening();
            }
        } catch (error) {
            logger.error('Erreur de reconnaissance vocale:', error);
            alert({
                title: "Erreur",
                message: "Erreur de reconnaissance vocale: " + error.message,
                okButtonText: "OK"
            });
        }
    };

    return {
        isListening,
        toggleVoiceRecognition
    };
};