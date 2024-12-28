import { useMatchState } from './useMatchState';
import { useMatchLogic } from './useMatchLogic';

export const useMatch = () => {
    const state = useMatchState();
    const { updateService, checkSetWinner } = useMatchLogic(state);

    const startMatch = ({ p1Name, p2Name }) => {
        state.player1Name.value = p1Name;
        state.player2Name.value = p2Name;
        state.matchStarted.value = true;
        resetScore();
    };

    const addPoint = (player) => {
        state.lastPoints.value.push({
            score: { ...state.score.value },
            server: state.currentServer.value
        });

        if (player === 1) {
            state.score.value.player1++;
        } else {
            state.score.value.player2++;
        }

        updateService();
        if (checkSetWinner()) {
            newSet();
        }
    };

    const undoPoint = () => {
        if (state.lastPoints.value.length === 0) return;
        
        const lastState = state.lastPoints.value.pop();
        state.score.value = { ...lastState.score };
        state.currentServer.value = lastState.server;
    };

    const newSet = () => {
        state.score.value = { player1: 0, player2: 0 };
        state.currentServer.value = 1;
        state.lastPoints.value = [];
    };

    const resetScore = () => {
        newSet();
        state.setsScore.value = { player1: 0, player2: 0 };
        state.setsHistory.value = [];
    };

    return {
        ...state,
        startMatch,
        addPoint,
        undoPoint,
        newSet,
        resetScore
    };
};