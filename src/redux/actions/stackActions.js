export const CREATE_DECK = 'CREATE_DECK';
export function createDeck(stackId, props, cards) {
  return {
    type: CREATE_DECK,
    cards, stackId, props
  }
}

export const CREATE_TABLEAU = 'ADD_TABLEAU';
export function createTableau(stackId, props) {
  return {
    type: CREATE_TABLEAU,
    stackId, props
  }
}

export const CREATE_FOUNDATION = 'CREATE_FOUNDATION';
export function createFoundation(stackId, props) {
  return {
    type: CREATE_FOUNDATION,
    stackId, props
  }
}

export const SET_STACK_CARDS = 'SET_STACK_CARDS';
export function setStackCards(stackId, cards) {
  return {
    type: SET_STACK_CARDS,
    stackId, cards
  }
}
