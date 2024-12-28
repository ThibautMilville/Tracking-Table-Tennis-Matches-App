import { useSpeech } from './useSpeech';
import { useVoiceRecognition } from './useVoiceRecognition';

export const useVoice = ({ player1Name, player2Name, addPoint, currentServer }) => {
    const { speak } = useSpeech();
    const { isListening, startListening, stopListening } = useVoiceRecognition(processVoiceCommand);

    const announceService = () => {
        const serverName = currentServer.value === 1 ? player1Name.value : player2Name.value;
        speak(`Service pour ${serverName}`);
    };

    const processVoiceCommand = (results) => {
        const command = results[0].toLowerCase();
        
        if (command.includes('point pour') || command.includes('point à')) {
            if (command.includes(player1Name.value.toLowerCase())) {
                addPoint(1);
                speak(`Point pour ${player1Name.value}`);
            } else if (command.includes(player2Name.value.toLowerCase())) {
                addPoint(2);
                speak(`Point pour ${player2Name.value}`);
            }
        }
    };

    const toggleVoiceRecognition = async () => {
        if (isListening.value) {
            await stopListening();
        } else {
            const started = await startListening();
            if (started) {
                speak('Reconnaissance vocale activée');
            }
        }
    };

    return {
        isListening,
        toggleVoiceRecognition,
        announceService
    };
};