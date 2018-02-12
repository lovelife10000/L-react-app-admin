import { createReducer } from 'redux-immutablejs'
import {List} from 'immutable'

export default createReducer(List(), {
  'GET_TAGS_SUCCESS': (state, {json}) => state.merge(json.data),
  'GET_TAGS_FAILURE': (state) => state
})