<template>
    <Page>
        <ActionBar title="Ping Pong Scorer" />
        <StackLayout class="match-container">
            <PlayerSetup v-if="!matchStarted" 
                        @start-match="startMatch" />
            
            <template v-else>
                <ScoreBoard 
                    :player1Name="player1Name"
                    :player2Name="player2Name"
                    :score="score"
                    :setsScore="setsScore"
                    :currentServer="currentServer"
                    @add-point="addPoint" />
                
                <MatchControls 
                    @undo-point="undoPoint"
                    @new-set="newSet" />
                
                <SetHistory 
                    v-if="setsHistory.length > 0"
                    :player1Name="player1Name"
                    :player2Name="player2Name"
                    :setsHistory="setsHistory" />
                
                <VoiceControls 
                    :isListening="isListening"
                    @toggle-voice="toggleVoiceRecognition" />
            </template>
        </StackLayout>
    </Page>
</template>

<script>
import PlayerSetup from '/components/PlayerSetup.vue';
import ScoreBoard from '../components/ScoreBoard.vue';
import MatchControls from '../components/MatchControls.vue';
import SetHistory from '../components/SetHistory.vue';
import VoiceControls from '../components/VoiceControls.vue';
import { useMatch } from '../composables/match/useMatch';
import { useVoice } from '../composables/voice/useVoice';

export default {
    name: 'HomePage',
    components: {
        PlayerSetup,
        ScoreBoard,
        MatchControls,
        SetHistory,
        VoiceControls
    },
    setup() {
        const matchState = useMatch();
        const voiceControl = useVoice({
            player1Name: matchState.player1Name,
            player2Name: matchState.player2Name,
            addPoint: matchState.addPoint,
            currentServer: matchState.currentServer
        });

        return {
            isListening: voiceControl.isListening,
            toggleVoiceRecognition: voiceControl.toggleVoiceRecognition,
            ...matchState
        };
    }
}
</script>

<style scoped lang="scss">
.match-container {
    padding: 20;
}
</style>