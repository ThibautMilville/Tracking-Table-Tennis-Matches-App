<template>
    <GradientBackground>
        <StackLayout class="setup-container">
            <Label text="Ping Pong" class="app-title" />
            
            <StackLayout class="form-container">
                <Label text="Configuration de la partie" class="form-title" />
                
                <StylizedInput
                    :model-value="p1Name"
                    @update:model-value="p1Name = $event"
                    label="Joueur 1"
                    placeholder="Entrez le nom du joueur 1"
                    returnKeyType="next"
                />
                
                <StylizedInput
                    :model-value="p2Name"
                    @update:model-value="p2Name = $event"
                    label="Joueur 2"
                    placeholder="Entrez le nom du joueur 2"
                    returnKeyType="done"
                />
                
                <Button 
                    text="Commencer la partie" 
                    @tap="onStartMatch" 
                    class="start-button"
                    :isEnabled="isFormValid" 
                />
            </StackLayout>

            <Label text="Version 1.0" class="version-text" />
        </StackLayout>
    </GradientBackground>
</template>

<script>
import GradientBackground from './ui/GradientBackground';
import StylizedInput from './ui/StylizedInput';
import { alert } from '@nativescript/core';

export default {
    components: {
        GradientBackground,
        StylizedInput
    },
    data() {
        return {
            p1Name: '',
            p2Name: ''
        };
    },
    computed: {
        isFormValid() {
            return this.p1Name.trim() && this.p2Name.trim();
        }
    },
    methods: {
        onStartMatch() {
            if (!this.isFormValid) {
                alert({
                    title: "Attention",
                    message: "Veuillez entrer les noms des deux joueurs",
                    okButtonText: "OK"
                });
                return;
            }
            this.$emit('start-match', { 
                p1Name: this.p1Name.trim(), 
                p2Name: this.p2Name.trim() 
            });
        }
    }
}
</script>

<style scoped lang="scss">
.setup-container {
    padding: 20;
    height: 100%;
}

.app-title {
    color: #ffffff;
    font-size: 32;
    font-weight: bold;
    text-align: center;
    margin: 40 0;
    text-transform: uppercase;
}

.form-container {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 15;
    padding: 20;
    margin: 10 0;
}

.form-title {
    color: #ffffff;
    font-size: 20;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20;
}

.start-button {
    margin-top: 20;
    background-color: #4CAF50;
    color: #ffffff;
    font-size: 18;
    font-weight: bold;
    padding: 15 20;
    border-radius: 8;
    text-transform: uppercase;

    &:disabled {
        background-color: #cccccc;
        color: #666666;
    }
}

.version-text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14;
    text-align: center;
    margin-top: 20;
}
</style>