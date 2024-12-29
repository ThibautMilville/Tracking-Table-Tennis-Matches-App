import { ref } from 'nativescript-vue';
import { SETS_TO_WIN } from './matchConstants';

export const useMatchState = () => {
    const matchStarted = ref(false);
    const matchFinished = ref(false);
    const player1Name = ref('Player 1');
    const player2Name = ref('Player 2');
    const score = ref({ player1: 0, player2: 0 });
    const setsScore = ref({ player1: 0, player2: 0 });
    const currentServer = ref(1);
    const setsHistory = ref([]);
    const lastPoints = ref([]);

    const isMatchPoint = () => {
        const p1SetsNeeded = SETS_TO_WIN - setsScore.value.player1;
        const p2SetsNeeded = SETS_TO_WIN - setsScore.value.player2;
        return p1SetsNeeded === 1 || p2SetsNeeded === 1;
    };

    const isMatchFinished = () => {
        return setsScore.value.player1 === SETS_TO_WIN || 
               setsScore.value.player2 === SETS_TO_WIN;
    };

    return {
        matchStarted,
        matchFinished,
        player1Name,
        player2Name,
        score,
        setsScore,
        currentServer,
        setsHistory,
        lastPoints,
        isMatchPoint,
        isMatchFinished
    };
};