import {createReducer} from 'redux-immutablejs'
import {List} from 'immutable'


export default createReducer(List(), {
  'GET_CATEGORIES_REQUEST': (state, action) => state,
  'GET_CATEGORIES_SUCCESS': (state, {json}) => state.merge(json.data),
  'GET_CATEGORIES_FAILURE': (state, action) => state,
});


