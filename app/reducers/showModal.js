import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'
import {SHOW_MODAL, HIDE_MODAL} from "config/types";

const initialState = fromJS({
    type: '',
    content: '',
    title: '',
    visible: false
})

export default createReducer(initialState, {
    [SHOW_MODAL]: (state, action) => {
        debugger
        return state.merge(action.message)
    },
    [HIDE_MODAL]: (state, action) => state.merge(initialState)
})