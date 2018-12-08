import {combineReducers} from 'redux';
import oauthReducer from './oauthReducer';

export default combineReducers({
  auth: oauthReducer
});