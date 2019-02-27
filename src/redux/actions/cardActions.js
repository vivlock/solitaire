export const MOVE_CARD = 'MOVE_CARD'; // card id, from stack id, to stack id
export function moveCard(cardId, fromId, toId) {
  return {
    type: MOVE_CARD,
    cardId, fromId, toId
  }
}
