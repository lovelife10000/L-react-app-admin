import {createReducer} from 'redux-immutablejs'
import {List} from 'immutable'
import * as  types from 'config/types'


export default createReducer(List(), {
  [types.GET_SEARCHDOCS_REQUEST]: (state, action) => state,
  [types.GET_SEARCHDOCS_SUCCESS]: (state, {json}) => state.merge(json.data),
  [types.GET_SEARCHDOCS_FAILURE]: (state, action) => state,
})


