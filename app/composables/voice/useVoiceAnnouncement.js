export const createScoreAnnouncement = (score, player1Name, player2Name) => {
  const { player1, player2 } = score;
  let announcement = `${player1}-${player2}`;

  if (player1 > player2) {
      announcement += `, ${player1Name} mène`;
  } else if (player2 > player1) {
      announcement += `, ${player2Name} mène`;
  }

  return announcement;
};