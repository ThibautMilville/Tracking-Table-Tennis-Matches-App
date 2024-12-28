import { ref } from 'nativescript-vue';
import { SpeechRecognition } from 'nativescript-speech-recognition';

export const useVoiceRecognition = (onCommand) => {
    const speechRecognition = new SpeechRecognition();
    const isListening = ref(false);

    const startListening = async () => {
        try {
            const available = await speechRecognition.available();
            if (available) {
                await speechRecognition.requestPermission();
                
                speechRecognition.startListening({
                    locale: "fr-FR",
                    onResult: onCommand,
                    returnPartialResults: true
                });
                
                isListening.value = true;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erreur de reconnaissance vocale:', error);
            return false;
        }
    };

    const stopListening = async () => {
        try {
            await speechRecognition.stopListening();
            isListening.value = false;
            return true;
        } catch (error) {
            console.error('Erreur de reconnaissance vocale:', error);
            return false;
        }
    };

    return {
        isListening,
        startListening,
        stopListening
    };
};