<template>
  <GridLayout rows="auto" columns="*, *" class="controls-container">
      <Button text="↩ Undo" 
              @tap="$emit('undo-point')" 
              col="0"
              class="control-button undo-button" />
      <Button text="New Set +" 
              @tap="$emit('new-set')" 
              col="1"
              class="control-button new-set-button" />
  </GridLayout>
</template>

<script>
export default {
  name: 'MatchControls'
}
</script>

<style scoped lang="scss">
.controls-container {
  margin: 10;
}

.control-button {
  margin: 5;
  padding: 12;
  font-size: 16;
  font-weight: bold;
  border-radius: 8;
  
  &.undo-button {
      background-color: #dc3545;
      color: white;
  }
  
  &.new-set-button {
      background-color: #28a745;
      color: white;
  }
}
</style>