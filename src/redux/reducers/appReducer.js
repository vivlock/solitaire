import { SET_USER_PREFS } from 'redux/actions/appActions';
import { CREATE_DECK, CREATE_TABLEAU, CREATE_FOUNDATION, SET_STACK_CARDS } from 'redux/actions/stackActions';
import { MOVE_CARD } from 'redux/actions/cardActions';

import Stack from 'stacks/Stack';

const initialState = {
  userPrefs: {},
  stacksById: {},
  cardsById: {},
  tableaus: [],
  foundations: [],
  deck: {}
}

export default function solitaireApp(state = initialState, action) {
  switch (action.type) {
    case SET_USER_PREFS:
      return {
        ...state,
        userPrefs: action.userPrefs
      };

    case CREATE_DECK:
      let cards = [];
      for (const card of action.cardsById) {
        cards.push(card);
      }
      return {
        ...state,
        cardsById: action.cardsById,
        stacksById: {
          ...state.stacksById,
          [action.stackId]: new Stack(cards)
        },
        deck: { stackId: action.stackId }
      };

    case CREATE_TABLEAU:
      const tableaus = state.tableaus;
      const newTableau = {
        stackId: action.id
      }
      return {
        ...state,
        stacksById: {
          ...state.stacksById,
          [action.id]: new Stack()
        },
        tableaus: tableaus.concat([newTableau])
      };

    case CREATE_FOUNDATION:
      const foundations = state.foundations;
      const newFoundation = {
        stackId: action.id
      }
      return {
        ...state,
        stacksById: {
          ...state.stacksById,
          [action.id]: new Stack(),
        },
        foundations: foundations.concat([newFoundation])
      };

    case SET_STACK_CARDS:
      return {
        ...state,
        stacksById: {
          ...state.stacksById,
          [action.stackId]: action.cardIds
        }
      };

    case MOVE_CARD:
      const fromStack = state.stacksById[action.fromId];
      const toStack = state.stacksById[action.toId];

      fromStack.removeCardId(action.cardId);
      toStack.push(action.cardId);

      return {
        ...state,
        stacksById: {
          ...state.stacksById,
          [action.fromId]: fromStack,
          [action.toId]: toStack
        }
      }

    default:
      return state;
  }
}
