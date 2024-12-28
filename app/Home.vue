<template>
    <Page>
        <ActionBar title="Ping Pong Scorer" />
        <StackLayout class="match-container">
            <PlayerSetup v-if="!matchStarted" @start-match="startMatch" />

            <template v-else>
                <ScoreBoard :player1Name="player1Name" :player2Name="player2Name" :score="score" :setsScore="setsScore"
                    :currentServer="currentServer" @add-point="addPoint" />

                <MatchControls @undo-point="undoPoint" @new-set="newSet" />

                <SetHistory v-if="setsHistory.length > 0" :player1Name="player1Name" :player2Name="player2Name"
                    :setsHistory="setsHistory" />

                <VoiceControls :isListening="isListening" @toggle-voice="toggleVoiceRecognition" />
            </template>
        </StackLayout>
    </Page>
</template>

<script>
import PlayerSetup from './components/PlayerSetup';
import ScoreBoard from './components/ScoreBoard';
import MatchControls from './components/MatchControls';
import SetHistory from './components/SetHistory';
import VoiceControls from './components/VoiceControls';

export default {
    name: 'HomePage',
    components: {
        PlayerSetup,
        ScoreBoard,
        MatchControls,
        SetHistory,
        VoiceControls
    },
    data() {
        return {
            matchStarted: false,
            player1Name: 'Player 1',
            player2Name: 'Player 2',
            score: { player1: 0, player2: 0 },
            setsScore: { player1: 0, player2: 0 },
            currentServer: 1,
            setsHistory: [],
            lastPoints: [],
            isListening: false
        };
    },
    methods: {
        startMatch({ p1Name, p2Name }) {
            this.player1Name = p1Name;
            this.player2Name = p2Name;
            this.matchStarted = true;
            this.resetScore();
        },
        addPoint(player) {
            this.lastPoints.push({
                score: { ...this.score },
                server: this.currentServer
            });

            if (player === 1) {
                this.score.player1++;
            } else {
                this.score.player2++;
            }

            this.updateService();
            if (this.checkSetWinner()) {
                this.newSet();
            }
        },
        undoPoint() {
            if (this.lastPoints.length === 0) return;

            const lastState = this.lastPoints.pop();
            this.score = { ...lastState.score };
            this.currentServer = lastState.server;
        },
        newSet() {
            this.score = { player1: 0, player2: 0 };
            this.currentServer = 1;
            this.lastPoints = [];
        },
        resetScore() {
            this.newSet();
            this.setsScore = { player1: 0, player2: 0 };
            this.setsHistory = [];
        },
        updateService() {
            const totalPoints = this.score.player1 + this.score.player2;
            if (totalPoints >= 20) {
                this.currentServer = this.currentServer === 1 ? 2 : 1;
            } else if (totalPoints % 2 === 0) {
                this.currentServer = this.currentServer === 1 ? 2 : 1;
            }
        },
        checkSetWinner() {
            const score1 = this.score.player1;
            const score2 = this.score.player2;
            const diff = Math.abs(score1 - score2);

            if ((score1 >= 11 || score2 >= 11) && diff >= 2) {
                this.setsHistory.push({ ...this.score });

                if (score1 > score2) {
                    this.setsScore.player1++;
                } else {
                    this.setsScore.player2++;
                }

                return true;
            }
            return false;
        },
        toggleVoiceRecognition() {
            this.isListening = !this.isListening;
        }
    }
}
</script>

<style scoped lang="scss">
.match-container {
    padding: 20;
}
</style>