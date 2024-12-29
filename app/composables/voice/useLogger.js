// Utilitaire de logging centralisé
export const logger = {
  info: (message) => {
    console.log(`🎤 ${message}`);
  },
  error: (message, error) => {
    console.error(`❌ ${message}`, error);
  }
};