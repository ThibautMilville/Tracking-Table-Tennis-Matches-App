import { ref } from 'nativescript-vue';

export const useMatchState = () => {
    const matchStarted = ref(false);
    const player1Name = ref('Player 1');
    const player2Name = ref('Player 2');
    const score = ref({ player1: 0, player2: 0 });
    const setsScore = ref({ player1: 0, player2: 0 });
    const currentServer = ref(1);
    const setsHistory = ref([]);
    const lastPoints = ref([]);

    return {
        matchStarted,
        player1Name,
        player2Name,
        score,
        setsScore,
        currentServer,
        setsHistory,
        lastPoints
    };
};