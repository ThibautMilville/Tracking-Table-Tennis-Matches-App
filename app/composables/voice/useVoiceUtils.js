import { logger } from './useLogger';

export const normalizeText = (text) => {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export const findPlayerInCommand = (command, player1Name, player2Name) => {
  const normalizedCommand = normalizeText(command);
  const normalizedP1 = normalizeText(player1Name);
  const normalizedP2 = normalizeText(player2Name);

  // Name written as 'aut' or 'ault' can be recognized
  const p1Variations = [normalizedP1, normalizedP1.replace('aut', 'ault')];
  const p2Variations = [normalizedP2, normalizedP2.replace('aut', 'ault')];

  logger.info(`Recherche du joueur dans: "${normalizedCommand}"`);

  if (p1Variations.some(v => normalizedCommand.includes(v))) {
    return 1;
  }
  if (p2Variations.some(v => normalizedCommand.includes(v))) {
    return 2;
  }
  return null;
};