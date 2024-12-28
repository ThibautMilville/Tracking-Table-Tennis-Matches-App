<template>
  <Button :text="isListening ? 'Stop Voice Control' : 'Start Voice Control'"
          @tap="$emit('toggle-voice')"
          :class="['voice-button', { 'listening': isListening }]" />
</template>

<script>
export default {
  props: {
      isListening: Boolean
  }
}
</script>

<style scoped lang="scss">
.voice-button {
  margin: 10;
  padding: 10;
  background-color: #9C27B0;
  color: white;
  
  &.listening {
      background-color: #E91E63;
  }
}
</style>