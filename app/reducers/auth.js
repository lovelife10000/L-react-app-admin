import {getCookie} from 'utils/auth'
import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'
import appConfig from 'config/app'
import * as types from 'config/types'

const initialState = fromJS({
    token: getCookie('token') || null,
    user: null
})

export default createReducer(initialState, {
    [types.LOGIN_SUCCESS]: (state, action) => {

        return state.merge({
            token: action.token
        })
    },
    [types.GET_USERINFO_SUCCESS]: (state, {json}) => {
        return state.merge({
            user: json.data
        })
    },
    [types.GET_USERINFO_FAILURE]: (state, action) => state.set('user', null),
    [types.LOGOUT]: (state, action) => initialState.set('token', null),
    [types.UPDATE_USER_SUCCESS]: (state, action) => {
        return state.merge({
            user: action.user
        })
    },
    [types.UPDATE_USER_AVATAR]: (state, action) => {

        return state.mergeDeep({
            user: {
                avatar: appConfig.domain + action.avatar
            }
        })
    }
})


