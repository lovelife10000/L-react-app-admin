import {createReducer} from 'redux-immutablejs'
import {List} from 'immutable'


export const allUserGroups = createReducer(List(), {
  'GET_ALL_USER_GROUPS_REQUEST': (state, action)=>state,
  'GET_ALL_USER_GROUPS_SUCCESS': (state, {json})=>state.merge(json.data),
  'GET_ALL_USER_GROUPS_FAILURE': (state, action)=>state
})

