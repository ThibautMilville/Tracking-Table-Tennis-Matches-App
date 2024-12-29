import { useSpeech } from './useSpeech';
import { useVoiceRecognition } from './useVoiceRecognition';
import { findPlayerInCommand } from './useVoiceUtils';
import { useMatchAnnouncements } from '../match/useMatchAnnouncements';
import { logger } from './useLogger';
import { alert } from '@nativescript/core';

export const useVoice = ({ player1Name, player2Name, addPoint, currentServer, score, setsScore }) => {
    const { speak } = useSpeech();
    const announcements = useMatchAnnouncements(speak);
    
    const announceScore = async () => {
        try {
            const p1Name = player1Name.value;
            const p2Name = player2Name.value;
            const currentScore = score.value;
            const server = currentServer.value;

            const scoreAnnouncement = announcements.announceScore(
                currentScore, 
                p1Name, 
                p2Name, 
                server
            );

            const matchPointAnnouncement = announcements.announceMatchPoint(
                setsScore.value,
                currentScore,
                p1Name,
                p2Name
            );

            const setPointAnnouncement = announcements.announceSetPoint(
                currentScore,
                p1Name,
                p2Name
            );

            const fullAnnouncement = [
                scoreAnnouncement,
                matchPointAnnouncement,
                setPointAnnouncement
            ].filter(Boolean).join('. ');

            await speak(fullAnnouncement);
        } catch (error) {
            logger.error('Erreur lors de l\'annonce:', error);
        }
    };

    const announceSetWinner = async () => {
        try {
            const announcement = announcements.announceSetWinner(
                score.value,
                player1Name.value,
                player2Name.value,
                setsScore.value
            );
            await speak(announcement);
        } catch (error) {
            logger.error('Erreur lors de l\'annonce du gagnant du set:', error);
        }
    };

    const announceMatchWinner = async () => {
        try {
            const announcement = announcements.announceMatchWinner(
                setsScore.value,
                player1Name.value,
                player2Name.value
            );
            await speak(announcement);
        } catch (error) {
            logger.error('Erreur lors de l\'annonce du gagnant du match:', error);
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
        announceScore,
        announceSetWinner,
        announceMatchWinner
    };
};