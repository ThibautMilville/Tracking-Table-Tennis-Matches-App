<template>
    <Page>
        <ActionBar title="Ping Pong Scorer" />
        <StackLayout class="match-container">
            <PlayerSetup v-if="!matchStarted" @start-match="startMatch" />
            <template v-else>
                <ScoreBoard :player1Name="player1Name" :player2Name="player2Name" :score="score" :setsScore="setsScore"
                    :currentServer="currentServer" @add-point="addPoint" />

                <GameControls @undo-point="undoPoint" @new-set="newSet" @new-game="newGame" />

                <SetHistory v-if="setsHistory.length > 0" :player1Name="player1Name" :player2Name="player2Name"
                    :setsHistory="setsHistory" />

                <VoiceControls :isListening="isVoiceListening" @toggle-voice="toggleVoiceControl" />
            </template>
        </StackLayout>
    </Page>
</template>

<script>
import Vue from 'nativescript-vue';
import { alert } from '@nativescript/core';
import PlayerSetup from './components/PlayerSetup';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import SetHistory from './components/SetHistory';
import VoiceControls from './components/VoiceControls';
import { useVoice } from './composables/voice/useVoice';
import { SETS_TO_WIN, POINTS_TO_WIN, MIN_DIFFERENCE } from './composables/match/matchConstants';

export default {
    name: 'HomePage',
    components: {
        PlayerSetup,
        ScoreBoard,
        GameControls,
        SetHistory,
        VoiceControls
    },
    data() {
        return {
            matchStarted: false,
            matchFinished: false,
            player1Name: 'Player 1',
            player2Name: 'Player 2',
            score: { player1: 0, player2: 0 },
            setsScore: { player1: 0, player2: 0 },
            currentServer: 1,
            setsHistory: [],
            lastPoints: [],
            voiceControl: null
        };
    },
    computed: {
        isVoiceListening() {
            return this.voiceControl?.isListening?.value || false;
        }
    },
    methods: {
        initVoiceControl() {
            console.log('Initialisation du contrôle vocal');
            try {
                const serverRef = Vue.observable({ value: this.currentServer });
                const scoreRef = Vue.observable({ value: this.score });
                const player1NameRef = Vue.observable({ value: this.player1Name });
                const player2NameRef = Vue.observable({ value: this.player2Name });
                const setsScoreRef = Vue.observable({ value: this.setsScore });

                this.$watch('currentServer', (newVal) => serverRef.value = newVal);
                this.$watch('score', (newVal) => Object.assign(scoreRef.value, newVal), { deep: true });
                this.$watch('player1Name', (newVal) => player1NameRef.value = newVal);
                this.$watch('player2Name', (newVal) => player2NameRef.value = newVal);
                this.$watch('setsScore', (newVal) => Object.assign(setsScoreRef.value, newVal), { deep: true });

                this.voiceControl = useVoice({
                    player1Name: player1NameRef,
                    player2Name: player2NameRef,
                    addPoint: this.addPoint,
                    currentServer: serverRef,
                    score: scoreRef,
                    setsScore: setsScoreRef
                });
                console.log('Contrôle vocal initialisé');
            } catch (error) {
                console.error('Erreur lors de l\'initialisation du contrôle vocal:', error);
                alert({
                    title: "Erreur d'initialisation",
                    message: "Impossible d'initialiser le contrôle vocal: " + error.message,
                    okButtonText: "OK"
                });
            }
        },
        async toggleVoiceControl() {
            try {
                if (this.voiceControl) {
                    await this.voiceControl.toggleVoiceRecognition();
                } else {
                    alert({
                        title: "Erreur",
                        message: "Le contrôle vocal n'est pas initialisé",
                        okButtonText: "OK"
                    });
                }
            } catch (error) {
                alert({
                    title: "Erreur",
                    message: "Erreur lors de l'activation/désactivation: " + error.message,
                    okButtonText: "OK"
                });
            }
        },
        startMatch({ p1Name, p2Name }) {
            this.player1Name = p1Name;
            this.player2Name = p2Name;
            this.matchStarted = true;
            this.resetScore();
            this.initVoiceControl();
        },
        async addPoint(player) {
            if (this.matchFinished) return;

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

            if (this.voiceControl) {
                await this.$nextTick();
                await this.voiceControl.announceScore();

                if (this.checkSetWinner()) {
                    await this.voiceControl.announceSetWinner();

                    if (this.isMatchFinished()) {
                        this.matchFinished = true;
                        await this.voiceControl.announceMatchWinner();
                    } else {
                        this.newSet();
                    }
                }
            }
        },
        undoPoint() {
            if (this.lastPoints.length === 0) return;

            const lastState = this.lastPoints.pop();
            this.score = { ...lastState.score };
            this.currentServer = lastState.server;

            if (this.matchFinished) {
                this.matchFinished = false;
            }
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
            this.matchFinished = false;
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

            if ((score1 >= POINTS_TO_WIN || score2 >= POINTS_TO_WIN) && diff >= MIN_DIFFERENCE) {
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
        isMatchFinished() {
            return this.setsScore.player1 === SETS_TO_WIN ||
                this.setsScore.player2 === SETS_TO_WIN;
        },
        newGame() {
            alert({
                title: "Nouveau jeu",
                message: "Voulez-vous vraiment commencer un nouveau jeu ?",
                okButtonText: "Oui",
                cancelButtonText: "Non"
            }).then(result => {
                if (result) {
                    this.matchStarted = false;
                    this.resetScore();
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
.match-container {
    padding: 20;
}
</style>