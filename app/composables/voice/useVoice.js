import { useSpeech } from './useSpeech';
import { useVoiceRecognition } from './useVoiceRecognition';
import { alert } from '@nativescript/core';

export const useVoice = ({ player1Name, player2Name, addPoint, currentServer }) => {
    console.log('useVoice initialisé');
    const { speak } = useSpeech();

    const processVoiceCommand = (result) => {
        console.log('Commande vocale reçue:', result);

        if (!result || !result.text) {
            console.log('Résultat invalide');
            return;
        }
        
        if (!result.finished) {
            console.log('Résultat partiel, en attente du résultat final');
            return;
        }

        const command = result.text.toLowerCase();
        console.log('Commande traitée:', command);

        if (command.includes('point pour') || command.includes('point à')) {
            const p1NameLower = player1Name.value.toLowerCase();
            const p2NameLower = player2Name.value.toLowerCase();

            console.log('Noms des joueurs:', p1NameLower, p2NameLower);

            if (command.includes(p1NameLower)) {
                console.log('Point pour joueur 1');
                addPoint(1);
                speak(`Point pour ${player1Name.value}`);
            } else if (command.includes(p2NameLower)) {
                console.log('Point pour joueur 2');
                addPoint(2);
                speak(`Point pour ${player2Name.value}`);
            } else {
                console.log('Joueur non reconnu dans la commande');
            }
        } else {
            console.log('Commande non reconnue');
        }
    };

    const { isListening, startListening, stopListening } = useVoiceRecognition(processVoiceCommand);

    const announceService = () => {
        const serverName = currentServer.value === 1 ? player1Name.value : player2Name.value;
        speak(`Service pour ${serverName}`);
    };

    const toggleVoiceRecognition = async () => {
        console.log('Toggle voice recognition appelé, état actuel:', isListening.value);
        try {
            if (isListening.value) {
                await stopListening();
                console.log('Arrêt de l\'écoute réussi');
            } else {
                const started = await startListening();
                console.log('Démarrage de l\'écoute:', started ? 'réussi' : 'échoué');
                if (started) {
                    speak('Reconnaissance vocale activée');
                }
            }
        } catch (error) {
            console.error('Erreur lors du toggle de la reconnaissance vocale:', error);
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
        announceService
    };
};