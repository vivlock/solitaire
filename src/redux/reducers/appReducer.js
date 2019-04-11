import { SET_USER_PREFS, UPDATE_VIEW } from 'redux/actions/appActions';
import { Views } from 'helpers/constants';

const initialState = {
  currentView: Views.GAME,
  prefs: { unicodeMode: true }
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_VIEW: {
      return Object.assign({}, state, {
        currentView: action.view
      })
    }

    case SET_USER_PREFS: {
      return Object.assign({}, state, {
        prefs: action.userPrefs
      });
    }

    default: {
      return state;
    }

  } // end switch

}// end solitaireApp
