export const CREATE_DECK = 'CREATE_DECK';
export function createDeck(cardsById, stackId) {
  return {
    type: CREATE_DECK,
    cardsById, stackId
  }
}

export const CREATE_TABLEAU = 'ADD_TABLEAU';
export function createTableau(stackId) {
  return {
    type: CREATE_TABLEAU,
    stackId
  }
}

export const CREATE_FOUNDATION = 'CREATE_FOUNDATION';
export function createFoundation(stackId) {
  return {
    type: CREATE_FOUNDATION,
    stackId
  }
}

export const SHUFFLE = 'SHUFFLE';
export function shuffle(stackId) {
  return {
    type: SHUFFLE,
    stackId
  }
}

export const SET_STACK_CARDS = 'SET_STACK_CARDS';
export function setStackCards(stackId, cardIds) {
  return {
    type: SET_STACK_CARDS,
    stackId, cardIds
  }
}
