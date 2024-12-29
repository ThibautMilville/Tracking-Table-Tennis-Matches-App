import { POINTS_TO_WIN, MIN_DIFFERENCE, SETS_TO_WIN } from './matchConstants';

export const useMatchAnnouncements = () => {
    const announceScore = (score, p1Name, p2Name, server) => {
        const scoreAnnounce = `${score.player1}-${score.player2}`;
        const serverName = server === 1 ? p1Name : p2Name;
        return `${scoreAnnounce}, Service à ${serverName}`;
    };

    const announceSetPoint = (score, p1Name, p2Name) => {
        const { player1: p1Score, player2: p2Score } = score;
        
        if (p1Score >= POINTS_TO_WIN - 1 && p1Score - p2Score >= MIN_DIFFERENCE - 1) {
            return `Balle de set pour ${p1Name}`;
        }
        if (p2Score >= POINTS_TO_WIN - 1 && p2Score - p1Score >= MIN_DIFFERENCE - 1) {
            return `Balle de set pour ${p2Name}`;
        }
        return null;
    };

    const announceSetWinner = (score, p1Name, p2Name, setsScore) => {
        const winner = score.player1 > score.player2 ? p1Name : p2Name;
        const setScore = `${score.player1} à ${score.player2}`;
        const setsStatus = `${setsScore.player1} sets à ${setsScore.player2}`;
        return `${winner} remporte le set ${setScore}. Score des sets : ${setsStatus}`;
    };

    const announceMatchPoint = (setsScore, score, p1Name, p2Name) => {
        const p1SetsNeeded = SETS_TO_WIN - setsScore.player1;
        const p2SetsNeeded = SETS_TO_WIN - setsScore.player2;
        
        if (p1SetsNeeded === 1 && score.player1 >= POINTS_TO_WIN - 1 && score.player1 - score.player2 >= MIN_DIFFERENCE - 1) {
            return `Balle de match pour ${p1Name}`;
        }
        if (p2SetsNeeded === 1 && score.player2 >= POINTS_TO_WIN - 1 && score.player2 - score.player1 >= MIN_DIFFERENCE - 1) {
            return `Balle de match pour ${p2Name}`;
        }
        return null;
    };

    const announceMatchWinner = (setsScore, p1Name, p2Name) => {
        const winner = setsScore.player1 > setsScore.player2 ? p1Name : p2Name;
        return `${winner} remporte le match, ${setsScore.player1} sets à ${setsScore.player2}. Félicitations !`;
    };

    return {
        announceScore,
        announceSetPoint,
        announceSetWinner,
        announceMatchPoint,
        announceMatchWinner
    };
};