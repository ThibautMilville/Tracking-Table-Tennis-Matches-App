import { confirm } from '@nativescript/core';

export const useDialog = () => {
    const showNewGameDialog = () => {
        return confirm({
            title: "🎮 Nouveau jeu",
            message: "Voulez-vous vraiment commencer une nouvelle partie ?",
            okButtonText: "✨ Nouveau jeu",
            cancelButtonText: "Annuler",
            neutralButtonText: null,
            cancelable: true,
            dialogStretch: false,
            class: 'modern-dialog new-game-dialog'
        });
    };

    return {
        showNewGameDialog
    };
};