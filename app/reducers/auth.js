import {
  LOGOUT_USER,
  UPDATE_USER_SUCCESS
} from '../actions/types'
import {getCookie} from '../utils/auth.util'
import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'
import {AppConfig} from '../config/app.config'

const initialState = fromJS({
  token: getCookie('token') || null,
  user: null
})

export default createReducer(initialState, {
  'LOGIN_SUCCESS': (state, action) => {

    return state.merge({
      token: action.token
    })
  },
  'GET_USERINFO_SUCCESS': (state, {json}) => {
    return state.merge({
      user: json
    })
  },
  'GET_USERINFO_FAILURE': (state, action) => state.set('user', null),
  [LOGOUT_USER]: (state, action) => initialState.set('token', null),
  [UPDATE_USER_SUCCESS]: (state, action) => {
    return state.merge({
      user: action.user
    })
  },
  'UPDATE_USER_AVATAR': (state, action) => {
    return state.mergeDeep({
      user: {
        avatar:AppConfig.DOMAIN + action.avatar
      }
    })
  }
})


