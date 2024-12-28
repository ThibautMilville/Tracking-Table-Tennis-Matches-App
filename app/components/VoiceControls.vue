<template>
  <StackLayout class="voice-controls">
      <Button :text="isListening ? '🎤 Stop Voice Control' : '🎤 Start Voice Control'"
              @tap="$emit('toggle-voice')"
              :class="['voice-button', { 'listening': isListening }]" />
      <Label v-if="isListening" text="Listening..." class="listening-label" />
  </StackLayout>
</template>

<script>
export default {
    props: {
        isListening: Boolean
    }
}
</script>

<style scoped lang="scss">
.voice-controls {
    margin: 10;
}

.voice-button {
    padding: 12;
    font-size: 16;
    font-weight: bold;
    border-radius: 8;
    background-color: #6c757d;
    color: white;
    
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
    margin-top: 5;
    font-size: 14;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
}
</style>