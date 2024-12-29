<template>
    <GridLayout rows="auto, auto, auto" class="scoreboard-container">
        <PlayerScore row="0"
            :playerName="player1Name"
            :score="score.player1"
            :isServing="currentServer === 1"
            @score="$emit('add-point', 1)" />
            
        <SetScore row="1"
            :player1Sets="setsScore.player1"
            :player2Sets="setsScore.player2" />
            
        <PlayerScore row="2"
            :playerName="player2Name"
            :score="score.player2"
            :isServing="currentServer === 2"
            @score="$emit('add-point', 2)" />
    </GridLayout>
</template>

<script>
import PlayerScore from './PlayerScore';
import SetScore from './SetScore';

export default {
    components: {
        PlayerScore,
        SetScore
    },
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
.scoreboard-container {
    background: linear-gradient(180deg, #f5f5f5, #e0e0e0);
    padding: 20;
    margin: 15;
    border-radius: 25;
}
</style>