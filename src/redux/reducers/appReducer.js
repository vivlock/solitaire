import { SET_USER_PREFS, FINISHED_INITIALIZING, UPDATE_VIEW } from 'redux/actions/appActions';
import { cardActions } from 'redux/actions/cardActions';
import { Views } from 'helpers/constants';

const initialState = {
  currentView: Views.GAME,
  prefs: { unicodeMode: true },
  gameInitialized: false,
  stacksById: {},
  tableaus: [],
  foundations: [],
  deck: {}
}

export default function solitaireApp(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VIEW: {
      return Object.assign({}, state, {
        currentView: action.view
      })
    }

    case FINISHED_INITIALIZING: {
      console.log('finished initializing');
      return Object.assign({}, state, {
        gameInitialized: true
      });
    }

    case SET_USER_PREFS: {
      return Object.assign({}, state, {
        prefs: action.userPrefs
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
      const card = action.card;
      const from = state.stacksById[action.fromId];
      const to = state.stacksById[action.toId];
      const updatedFrom = from.filter(function (thisCard) {
        return thisCard.id !== card.id;
      });

      return {
        ...state,
        stacksById: Object.assign({}, state.stacksById, {
          [action.fromId]: updatedFrom,
          [action.toId]: to.concat([card])
        })
      }
    }

    default: {
      return state;
    }

  } // end switch

}// end solitaireApp
