import {
  LOGOUT_USER,
  UPDATE_USER_SUCCESS
} from '../actions/types'
import {getCookie} from '../utils/auth.util'
import { createReducer } from 'redux-immutablejs'
import {fromJS} from 'immutable'

const initialState = fromJS({
  token: getCookie('token') || null,
  user: null
})

export default createReducer(initialState,{
  'LOGIN_SUCCESS': (state,action)=>{
    console.log('LOGIN_SUCCESS执行');
    return state.merge({
      token: action.token
    })
  },
  'GET_USERINFO_SUCCESS': (state,{json})=>{
    console.log('GET_USERINFO_SUCCESS执行了',json);
    return state.merge({
      user: json
    })
  },
  'GET_USERINFO_FAILURE': (state,action)=> state.set('user',null),
  [LOGOUT_USER]: (state,action)=> initialState.set('token',null),
  [UPDATE_USER_SUCCESS]: (state,action)=> {
    return state.merge({
      user: action.user
    })
  }
})