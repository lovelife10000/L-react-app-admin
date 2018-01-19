import {createReducer} from 'redux-immutablejs'
import {List} from 'immutable'


export const parentUserGroups = createReducer(List(), {
  'GET_PARENT_USER_GROUPS_REQUEST': (state, action)=>state,
  'GET_PARENT_USER_GROUPS_SUCCESS': (state, {json})=>state.merge(json.data),
  'GET_PARENT_USER_GROUPS_FAILURE': (state, action)=>state
})

