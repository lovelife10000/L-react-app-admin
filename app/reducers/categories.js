import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'
import * as types from 'config/types'

const initialState = fromJS({
    data: [],
    msgForName: '',
    msgForSlug: '',
})


export default createReducer(initialState, {
    [types.GET_CATEGORIES_REQUEST]: (state, action) => state,
    [types.GET_CATEGORIES_SUCCESS]: (state, {json}) => state.merge({data: json.data, msg: json.msg}),
    [types.GET_CATEGORIES_FAILURE]: (state, action) => state,


    [types.SHOW_HELP]: (state, action) => state.merge(action.message),
    [types.RESET_HELP]: (state, action) => state.merge(action.message),
});


