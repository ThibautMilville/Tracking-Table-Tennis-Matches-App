<template>
  <GridLayout rows="auto, auto, auto" columns="*, *" class="setup-container">
      <Label text="Player 1" row="0" col="0" class="player-label" />
      <TextField v-model="p1Name" hint="Enter player 1 name" row="1" col="0" class="player-input" />
      
      <Label text="Player 2" row="0" col="1" class="player-label" />
      <TextField v-model="p2Name" hint="Enter player 2 name" row="1" col="1" class="player-input" />
      
      <Button text="Start Match" @tap="onStartMatch" row="2" colSpan="2" class="start-button" />
  </GridLayout>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(_, { emit }) {
      const p1Name = ref('Player 1');
      const p2Name = ref('Player 2');

      const onStartMatch = () => {
          if (!p1Name.value.trim() || !p2Name.value.trim()) {
              alert('Please enter names for both players');
              return;
          }
          emit('start-match', { p1Name: p1Name.value, p2Name: p2Name.value });
      };

      return {
          p1Name,
          p2Name,
          onStartMatch
      };
  }
}
</script>

<style scoped lang="scss">
// ... (styles from original component)
</style>