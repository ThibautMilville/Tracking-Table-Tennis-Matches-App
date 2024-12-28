import { POINTS_TO_WIN, MIN_DIFFERENCE, POINTS_BEFORE_SERVICE_CHANGE } from './matchConstants';

export const useMatchLogic = (state) => {
    const updateService = () => {
        const totalPoints = state.score.value.player1 + state.score.value.player2;
        if (totalPoints >= 20) {
            state.currentServer.value = state.currentServer.value === 1 ? 2 : 1;
        } else if (totalPoints % POINTS_BEFORE_SERVICE_CHANGE === 0) {
            state.currentServer.value = state.currentServer.value === 1 ? 2 : 1;
        }
    };

    const checkSetWinner = () => {
        const score1 = state.score.value.player1;
        const score2 = state.score.value.player2;
        const diff = Math.abs(score1 - score2);

        if ((score1 >= POINTS_TO_WIN || score2 >= POINTS_TO_WIN) && diff >= MIN_DIFFERENCE) {
            state.setsHistory.value.push({ ...state.score.value });
            
            if (score1 > score2) {
                state.setsScore.value.player1++;
            } else {
                state.setsScore.value.player2++;
            }
            
            return true;
        }
        return false;
    };

    return {
        updateService,
        checkSetWinner
    };
};