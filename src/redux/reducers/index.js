import { combineReducers } from 'redux'
import appReducer from 'redux/reducers/appReducer';
import gameplayReducer from 'redux/reducers/gameplayReducer';

export default combineReducers({
  app: appReducer,
  game: gameplayReducer
});
