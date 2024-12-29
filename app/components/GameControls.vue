<template>
  <StackLayout class="controls-container">
      <Button text="↩️ Annuler le point" 
              @tap="$emit('undo-point')" 
              class="control-button undo-button" />
      <Button text="➕ Nouveau set" 
              @tap="$emit('new-set')" 
              class="control-button new-set-button" />
      <Button text="➕ Nouveau jeu" 
              @tap="$emit('new-game')" 
              class="control-button new-game-button" />
  </StackLayout>
</template>

<script>
export default {
  name: 'GameControls'
}
</script>

<style scoped lang="scss">
.controls-container {
  margin: 10 20;
}

.control-button {
  margin: 5 0;
  padding: 15;
  font-size: 16;
  font-weight: bold;
  border-radius: 8;
  width: 100%;
  
  &.undo-button {
      background-color: #dc3545;
      color: white;
  }
  
  &.new-set-button {
      background-color: #28a745;
      color: white;
      margin-top: 10;
  }

  &.new-game-button {
      background-color: #007bff;
      color: white;
      margin-top: 10;
  }
}
</style>