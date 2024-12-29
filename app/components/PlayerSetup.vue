<template>
    <StackLayout class="setup-container">
        <Label text="Configuration de la partie" class="form-title" />

        <TextField v-model="p1Name" hint="Entrez le nom du joueur 1" @textChange="onTextChange('p1Name', $event)"
            class="input" />

        <TextField v-model="p2Name" hint="Entrez le nom du joueur 2" @textChange="onTextChange('p2Name', $event)"
            class="input" />

        <Button text="Commencer la partie" @tap="onStartMatch" class="start-button" :isEnabled="isFormValid" />

        <Label text="Version 1.0" class="version-text" />
    </StackLayout>
</template>

<script>
import { TextField } from '@nativescript/core';
import { navigateTo } from '@nativescript/core/ui/frame';

export default {
    data() {
        return {
            p1Name: '',
            p2Name: ''
        };
    },
    computed: {
        isFormValid() {
            return this.p1Name.trim().length > 0 && this.p2Name.trim().length > 0;
        }
    },
    methods: {
        onTextChange(field, event) {
            if (event.object instanceof TextField) {
                this[field] = event.object.text;
            }
        },
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

            this.navigateToGame();
        },
        navigateToGame() {
            navigateTo({
                moduleName: "components/GameComponent",
                context: {
                    p1Name: this.p1Name.trim(),
                    p2Name: this.p2Name.trim()
                },
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
        }
    }
}
</script>

<style scoped>
.setup-container {
    padding: 20;
    height: 100%;
    background-color: #3498db;
}

.form-title {
    color: #ffffff;
    font-size: 24;
    font-weight: bold;
    text-align: center;
    margin: 20 0;
}

.input {
    color: #333333;
    font-size: 18;
    padding: 10;
    margin: 10 20;
    background-color: #ffffff;
    border-radius: 8;
}

.start-button {
    margin: 20;
    background-color: #2ecc71;
    color: #ffffff;
    font-size: 18;
    font-weight: bold;
    padding: 15 20;
    border-radius: 8;
}

.start-button:disabled {
    background-color: #bdc3c7;
    color: #7f8c8d;
}

.version-text {
    color: #ffffff;
    font-size: 14;
    text-align: center;
    margin-top: 20;
}
</style>