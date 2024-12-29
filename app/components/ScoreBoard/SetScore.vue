<template>
    <StackLayout class="set-score-container">
        <Label text="Sets" class="set-label" />
        <GridLayout rows="auto" columns="auto, auto, auto" class="sets-display">
            <Label :text="player1Sets" col="0" class="set-number" />
            <Label text="-" col="1" class="set-separator" />
            <Label :text="player2Sets" col="2" class="set-number" />
        </GridLayout>
    </StackLayout>
</template>

<script>
export default {
    props: {
        player1Sets: { type: Number, required: true },
        player2Sets: { type: Number, required: true }
    }
}
</script>

<style scoped lang="scss">
.set-score-container {
    background: linear-gradient(145deg, #1a237e, #3949ab);
    border-radius: 15;
    padding: 15;
    margin: 10 20;
}

.set-label {
    color: #ffffff;
    font-size: 18;
    text-align: center;
    opacity: 0.9;
    margin-bottom: 5;
}

.sets-display {
    margin-top: 5;
}

.set-number {
    color: #ffffff;
    font-size: 32;
    font-weight: bold;
    text-align: center;
    padding: 0 10;
}

.set-separator {
    color: #ffffff;
    font-size: 32;
    text-align: center;
    opacity: 0.8;
}
</style>