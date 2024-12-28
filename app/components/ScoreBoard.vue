<template>
  <GridLayout rows="auto" columns="*, auto, *" class="score-container">
      <StackLayout col="0" class="player-score" @tap="$emit('add-point', 1)">
          <Label :text="player1Name" class="player-name" />
          <Label :text="score.player1" class="score" />
      </StackLayout>
      
      <StackLayout col="1" class="sets-container">
          <Label text="Sets" class="sets-label" />
          <Label :text="setsScore.player1 + ' - ' + setsScore.player2" class="sets-score" />
      </StackLayout>
      
      <StackLayout col="2" class="player-score" @tap="$emit('add-point', 2)">
          <Label :text="player2Name" class="player-name" />
          <Label :text="score.player2" class="score" />
      </StackLayout>
  </GridLayout>
</template>

<script>
export default {
  props: {
      player1Name: String,
      player2Name: String,
      score: Object,
      setsScore: Object,
      currentServer: Number
  }
}
</script>

<style scoped lang="scss">
// ... (styles from original component)
</style>