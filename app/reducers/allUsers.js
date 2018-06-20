import {createReducer} from 'redux-immutablejs'
import {List} from 'immutable'

export default createReducer(List(), {
  'GET_ALL_USERS_REQUEST': (state, action) => state,
  'GET_ALL_USERS_SUCCESS': (state, {json}) => state.merge(json.data),
  'GET_ALL_USERS_FAILURE': (state, action) => state,
})


