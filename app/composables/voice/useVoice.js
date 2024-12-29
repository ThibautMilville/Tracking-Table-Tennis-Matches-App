import { useSpeech } from './useSpeech';
import { useVoiceRecognition } from './useVoiceRecognition';
import { findPlayerInCommand } from './useVoiceUtils';
import { createScoreAnnouncement } from './useVoiceAnnouncement';
import { logger } from './useLogger';
import { alert } from '@nativescript/core';

export const useVoice = ({ player1Name, player2Name, addPoint, currentServer, score }) => {
    const { speak } = useSpeech();
    
    const announceScore = async () => {
        try {
            const p1Name = player1Name.value;
            const p2Name = player2Name.value;
            const currentScore = score.value;
            const server = currentServer.value;

            const scoreAnnounce = createScoreAnnouncement(currentScore, p1Name, p2Name);
            
            const serverName = server === 1 ? p1Name : p2Name;
            const fullAnnouncement = `${scoreAnnounce}, Service à ${serverName}`;

            await speak(fullAnnouncement);
        } catch (error) {
            logger.error('Erreur lors de l\'annonce:', error);
        }
    };
    
    const processVoiceCommand = async (result) => {
        if (!result?.text) return;

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
                await announceScore();
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
        toggleVoiceRecognition,
        announceScore
    };
};