import {createReducer} from 'redux-immutablejs'
import {List} from 'immutable'
import * as  types from 'actions/types'


export default createReducer(List(), {
    [types.GET_DOCS_REQUEST]: (state, action) => state,
    [types.GET_DOCS_SUCCESS]: (state, {json}) => state.merge(json.data),
    [types.GET_DOCS_FAILURE]: (state, action) => state,
});


