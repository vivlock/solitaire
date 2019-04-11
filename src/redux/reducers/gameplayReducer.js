import { cardActions } from 'redux/actions/cardActions';
import { FINISHED_INITIALIZING } from 'redux/actions/appActions';

const initialState = {
  gameInitialized: false,
  gameWon: false,
  stacksById: {},
  tableaus: [],
  foundations: [],
  deck: {}
}

export default function gameplayReducer(state = initialState, action) {
  switch(action.type) {
    case FINISHED_INITIALIZING: {
      return Object.assign({}, state, {
        gameInitialized: true
      });
    }

    case cardActions.CREATE_DECK: {
      const newState = {
        ...state,
        stacksById: Object.assign({}, state.stacksById, {
          [action.stackId]: action.cards
        }),
        deck: { stackId: action.stackId, props: action.props }
      }
      return newState;
    }

    case cardActions.CREATE_TABLEAU: {
      const tableaus = state.tableaus;
      const newTableau = {
        stackId: action.stackId,
        props: action.props
      }
      const newState = {
        ...state,
        stacksById: Object.assign({}, state.stacksById, {
          [action.stackId]: []
        }),
        tableaus: tableaus.concat([newTableau])
      };
      return newState;
    }

    case cardActions.CREATE_FOUNDATION: {
      const foundations = state.foundations;
      const newFoundation = {
        stackId: action.stackId,
        props: action.props
      }
      const newState = {
        ...state,
        stacksById: Object.assign({}, state.stacksById, {
          [action.stackId]: []
        }),
        foundations: foundations.concat([newFoundation])
      };
      return newState;
    }

    case cardActions.SET_STACK_CARDS: {
      return {
        ...state,
        stacksById: Object.assign({}, state.stacksById, {
          [action.stackId]: action.cards
        })
      };
    }

    case cardActions.UPDATE_STACKS: {
      return {
        ...state,
        stacksById: Object.assign({}, state.stacksById, action.stacksById)
      }
    }

    case cardActions.MOVE_CARD: {
      console.log('move card', action);
      const card = action.card;
      const from = state.stacksById[action.fromId];
      const to = state.stacksById[action.toId];
      const updatedFrom = from.filter(function (thisCard) {
        return thisCard.id !== card.id;
      });
      const newState = {
        ...state,
        stacksById: Object.assign({}, state.stacksById, {
          [action.fromId]: updatedFrom,
          [action.toId]: to.concat([card])
        })
      }
      if (typeof action.checkWinCondition === 'function') {
        const win = action.checkWinCondition(newState);
        if (win) {
          newState.gameWon = true;
        }
      }
      return newState;
    }

    case cardActions.REDEAL: {
      const stacksById = action.stacksById;
      const newDeckObj = Object.assign({}, state.deck);
      const redeals = newDeckObj.props.redeals - 1;
      newDeckObj.props.redeals = redeals;
      return {
        ...state,
        stacksById: Object.assign({}, state.stacksById, stacksById),
        deck: newDeckObj
      }
    }

    default:
      return state;
  }
}
