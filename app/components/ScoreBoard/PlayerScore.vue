<template>
    <StackLayout class="player-container" :class="{ 'serving': isServing }" @tap="$emit('score')">
        <Label :text="playerName" class="player-name" />
        <Label :text="score" class="score-value" />
        <Label v-if="isServing" text="Service" class="service-indicator" />
    </StackLayout>
</template>

<script>
export default {
    props: {
        playerName: { type: String, required: true },
        score: { type: Number, required: true },
        isServing: { type: Boolean, default: false }
    }
}
</script>

<style scoped lang="scss">
.player-container {
    background: linear-gradient(145deg, #ffffff, #f8f9fa);
    border-radius: 20;
    padding: 20;
    margin: 10;
    
    &.serving {
        background: linear-gradient(145deg, #e3f2fd, #bbdefb);
        animation-name: pulseService;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
}

.player-name {
    font-size: 24;
    font-weight: bold;
    color: #1a237e;
    text-align: center;
    margin-bottom: 10;
}

.score-value {
    font-size: 72;
    font-weight: bold;
    color: #304ffe;
    text-align: center;
}

.service-indicator {
    color: #1565c0;
    font-size: 16;
    font-weight: bold;
    text-align: center;
    margin-top: 10;
    opacity: 0.9;
}

@keyframes pulseService {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}
</style>