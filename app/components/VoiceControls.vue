<template>
    <StackLayout class="voice-controls">
        <Button :text="isListening ? '🎤 Arrêter le contrôle vocal' : '🎤 Démarrer le contrôle vocal'"
                @tap="onTap"
                :class="['voice-button', { 'listening': isListening }]" />
        <Label v-if="isListening" text="En écoute..." class="listening-label" />
    </StackLayout>
  </template>
  
  <script>
  import { alert } from '@nativescript/core';
  
  export default {
      props: {
          isListening: Boolean
      },
      methods: {
          onTap() {
              console.log('Bouton tapé, isListening:', this.isListening);
              try {
                  this.$emit('toggle-voice');
              } catch (error) {
                  console.error('Erreur lors du tap:', error);
                  alert({
                      title: "Erreur",
                      message: "Erreur lors du tap: " + error.message,
                      okButtonText: "OK"
                  });
              }
          }
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