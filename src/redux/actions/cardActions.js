export const cardActions = {
  CREATE_DECK: 'CREATE_DECK',
  CREATE_TABLEAU:'ADD_TABLEAU',
  CREATE_FOUNDATION: 'CREATE_FOUNDATION',
  SET_STACK_CARDS: 'SET_STACK_CARDS',
  UPDATE_STACKS: 'UPDATE_STACKS',
  MOVE_CARD: 'MOVE_CARD'
}

export const cardFunctions = {
  createDeck: (stackId, props, cards) => ({
    type: cardActions.CREATE_DECK,
    cards, stackId, props
  }),

  createTableau: (stackId, props) => ({
    type: cardActions.CREATE_TABLEAU,
    stackId, props
  }),

  createFoundation: (stackId, props) => ({
    type: cardActions.CREATE_FOUNDATION,
    stackId, props
  }),

  setStackCards: (stackId, cards) => ({
    type: cardActions.SET_STACK_CARDS,
    stackId, cards
  }),

  updateStacks: (stacksById) => ({
    type: cardActions.UPDATE_STACKS,
    stacksById
  }),

  moveCard: (card, fromId, toId) => ({
    type: cardActions.MOVE_CARD,
    card, fromId, toId
  })
}
