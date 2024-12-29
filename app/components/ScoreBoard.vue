<template>
    <GridLayout rows="auto, auto" columns="*, auto, *" class="score-container">
        <StackLayout col="0" rowSpan="2" class="player-score" :class="{ 'serving': currentServer === 1 }" @tap="$emit('add-point', 1)">
            <Label :text="player1Name" class="player-name" />
            <Label :text="score.player1" class="score" />
            <Label text="Service" class="serving-indicator" v-if="currentServer === 1" />
        </StackLayout>
        
        <StackLayout col="1" row="0" class="sets-container">
            <Label text="Sets" class="sets-label" />
            <Label :text="setsScore.player1 + ' - ' + setsScore.player2" class="sets-score" />
        </StackLayout>
        
        <Label col="1" row="1" text="VS" class="vs-label" />
        
        <StackLayout col="2" rowSpan="2" class="player-score" :class="{ 'serving': currentServer === 2 }" @tap="$emit('add-point', 2)">
            <Label :text="player2Name" class="player-name" />
            <Label :text="score.player2" class="score" />
            <Label text="Service" class="serving-indicator" v-if="currentServer === 2" />
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
.score-container {
    background: linear-gradient(to bottom, #1a237e, #3949ab);
    padding: 20;
    margin: 10;
    border-radius: 15;
}

.player-score {
    padding: 20;
    border-radius: 12;
    background-color: rgba(255, 255, 255, 0.95);
    
    &.serving {
        background-color: #e3f2fd;
        animation-name: pulse;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
}

.player-name {
    font-size: 20;
    font-weight: bold;
    color: #1a237e;
    text-align: center;
    margin-bottom: 10;
}

.score {
    font-size: 56;
    font-weight: bold;
    color: #304ffe;
    text-align: center;
}

.serving-indicator {
    font-size: 14;
    color: #1565c0;
    text-align: center;
    margin-top: 8;
    font-weight: bold;
}

.sets-container {
    margin: 0 15;
}

.sets-label {
    font-size: 16;
    color: #ffffff;
    text-align: center;
    opacity: 0.9;
}

.sets-score {
    font-size: 24;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
}

.vs-label {
    font-size: 20;
    color: #ffffff;
    text-align: center;
    font-weight: bold;
    opacity: 0.8;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.8; }
    100% { opacity: 1; }
}
</style>