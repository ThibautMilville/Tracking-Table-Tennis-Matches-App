<template>
  <ScrollView>
      <StackLayout class="history-container">
          <Label text="Match History" class="history-title" />
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
  </ScrollView>
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
  margin: 10;
  padding: 10;
  background-color: #f5f5f5;
  border-radius: 5;
}

.history-title {
  font-size: 18;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10;
}

.set-item {
  padding: 5;
  margin: 2;
  background-color: white;
  border-radius: 3;
}

.player-name {
  font-size: 14;
  color: #666;
}

.set-score {
  font-size: 16;
  font-weight: bold;
  margin: 0 10;
}
</style>