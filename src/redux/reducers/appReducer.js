import { SET_USER_PREFS, FINISHED_INITIALIZING } from 'redux/actions/appActions';
import { CREATE_DECK, CREATE_TABLEAU, CREATE_FOUNDATION, SET_STACK_CARDS, UPDATE_STACKS } from 'redux/actions/stackActions';
import { MOVE_CARD } from 'redux/actions/cardActions';

const initialState = {
  prefs: { unicodeMode: true },
  finishedInitializing: false,
  gameStartSent: false,
  gameStarted: false,
  stacksById: {},
  tableaus: [],
  foundations: [],
  deck: {}
}

export default function solitaireApp(state = initialState, action) {
  console.log('reducer', state);

  switch (action.type) {
    case FINISHED_INITIALIZING: {
      console.log('finished initializing');
      return Object.assign({}, state, {
        finishedInitializing: true
      });
    }

    case SET_USER_PREFS: {
      return Object.assign({}, state, {
        prefs: action.userPrefs
      });
    }

    case CREATE_DECK: {
      const newState = {
        ...state,
        stacksById: Object.assign({}, state.stacksById, {
          [action.stackId]: action.cards
        }),
        deck: { stackId: action.stackId, props: action.props }
      }
      console.log('create_deck returns', newState);
      return newState;
    }

    case CREATE_TABLEAU: {
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
      console.log('create_tableau returns', newState);
      return newState;
    }

    case CREATE_FOUNDATION: {
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
      console.log('create_foundation returns', newState);
      return newState;
    }

    case SET_STACK_CARDS: {
      return {
        ...state,
        stacksById: Object.assign({}, state.stacksById, {
          [action.stackId]: action.cards
        })
      };
    }

    case UPDATE_STACKS: {
      console.log('update_stacks');
      return {
        ...state,
        stacksById: Object.assign({}, state.stacksById, action.stacksById)
      }
    }

    case MOVE_CARD: {
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
