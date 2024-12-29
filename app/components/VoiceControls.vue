<template>
    <StackLayout class="voice-controls">
        <Button :text="isListening ? '🎤 Arrêter le contrôle vocal' : '🎤 Activer le contrôle vocal'"
                @tap="onTap"
                :class="['voice-button', { 'listening': isListening }]" />
        <Label v-if="isListening" text="En écoute..." class="listening-label" />
    </StackLayout>
</template>

<script>
export default {
    props: {
        isListening: Boolean
    },
    methods: {
        onTap() {
            this.$emit('toggle-voice');
        }
    }
}
</script>

<style scoped lang="scss">
.voice-controls {
    margin: 10 20;
}

.voice-button {
    padding: 15;
    font-size: 16;
    font-weight: bold;
    border-radius: 8;
    background-color: #6c757d;
    color: white;
    width: 100%;
    
    &.listening {
        background-color: #17a2b8;
        animation-name: pulse;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
}

.listening-label {
    color: #17a2b8;
    text-align: center;
    margin-top: 8;
    font-size: 14;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
}
</style>