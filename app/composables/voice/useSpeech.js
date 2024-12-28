import { TextToSpeech } from 'nativescript-texttospeech';

export const useSpeech = () => {
    const tts = new TextToSpeech();
    
    const speak = async (text) => {
        try {
            await tts.speak({
                text,
                language: 'fr-FR',
                pitch: 1,
                speakRate: 1
            });
        } catch (error) {
            console.error('Erreur TTS:', error);
        }
    };

    return { speak };
};