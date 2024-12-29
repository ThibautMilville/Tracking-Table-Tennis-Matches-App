<template>
  <StackLayout class="history-container">
      <Label text="Historique des sets" class="history-title" />
      <GridLayout v-for="(set, index) in setsHistory" 
                 :key="index"
                 rows="auto" 
                 columns="*, auto, *"
                 class="set-item">
          <Label :text="player1Name" col="0" class="player-name" />
          <Label :text="`${set.player1} - ${set.player2}`" col="1" class="set-score" />
          <Label :text="player2Name" col="2" class="player-name" />
      </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  name: 'SetHistory',
  props: {
      player1Name: String,
      player2Name: String,
      setsHistory: Array
  }
}
</script>

<style scoped lang="scss">
.history-container {
  margin: 20 10;
  padding: 15;
  background-color: #f5f5f5;
  border-radius: 8;
}

.history-title {
  font-size: 18;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15;
  color: #2c3e50;
}

.set-item {
  padding: 10;
  margin: 5 0;
  background-color: white;
  border-radius: 6;
}

.player-name {
  font-size: 14;
  color: #666;
  text-align: center;
}

.set-score {
  font-size: 16;
  font-weight: bold;
  margin: 0 15;
  color: #2c3e50;
  text-align: center;
}
</style>