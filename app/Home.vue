<template>
    <Page>
        <ActionBar title="Ping Pong Scorer" />
        <StackLayout class="match-container">
            <PlayerSetup v-if="!matchStarted" @start-match="startMatch" />
            <template v-else>
                <ScoreBoard 
                    :player1Name="player1Name" 
                    :player2Name="player2Name" 
                    :score="score" 
                    :setsScore="setsScore"
                    :currentServer="currentServer" 
                    @add-point="addPoint" 
                />

                <MatchControls 
                    @undo-point="undoPoint" 
                    @new-set="newSet" 
                />

                <SetHistory 
                    v-if="setsHistory.length > 0" 
                    :player1Name="player1Name" 
                    :player2Name="player2Name"
                    :setsHistory="setsHistory" 
                />

                <VoiceControls 
                    :isListening="isVoiceListening" 
                    @toggle-voice="toggleVoiceControl" 
                />
            </template>
        </StackLayout>
    </Page>
</template>

<script>
import Vue from 'nativescript-vue';
import { alert } from '@nativescript/core';
import PlayerSetup from './components/PlayerSetup';
import ScoreBoard from './components/ScoreBoard';
import MatchControls from './components/MatchControls';
import SetHistory from './components/SetHistory';
import VoiceControls from './components/VoiceControls';
import { useVoice } from './composables/voice/useVoice';

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
                this.voiceControl = useVoice({
                    player1Name: Vue.observable({ value: this.player1Name }),
                    player2Name: Vue.observable({ value: this.player2Name }),
                    addPoint: this.addPoint,
                    currentServer: Vue.observable({ value: this.currentServer })
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
            console.log('Toggle voice control appelé');
            try {
                if (this.voiceControl) {
                    await this.voiceControl.toggleVoiceRecognition();
                    console.log('État après toggle:', this.isVoiceListening);
                } else {
                    console.error('voiceControl non initialisé');
                    alert({
                        title: "Erreur",
                        message: "Le contrôle vocal n'est pas initialisé",
                        okButtonText: "OK"
                    });
                }
            } catch (error) {
                console.error('Erreur lors du toggle:', error);
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
        }
    }
}
</script>

<style scoped lang="scss">
.match-container {
    padding: 20;
}
</style>