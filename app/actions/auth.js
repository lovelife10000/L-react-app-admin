import * as types from './types'
import { push } from 'react-router-redux'
import { saveCookie,getCookie,signOut } from '../utils/auth.util'
import { showMsg,changeStyleMode } from './other'
import authApi from '../api/authApi'
import { AppConfig } from '../config/app.config'


//获取snslogins
export const getSnsLogins = ()=>{
  return {
    type: types.GET_SNSLOGINS,
    promise: authApi.getSnsLogins()
  }
}
//获取验证码
export const getCaptchaUrl = () =>{
  return {
    type: 'GET_CAPTCHAURL',
    captchaUrl: AppConfig.DOMAIN + 'login/getCaptcha?' + Math.random()
  }
}

//登录
function loginSuccess(token) {
  return {
    type: 'LOGIN_SUCCESS',
    token: token
  }
}


export function localLogin(form) {
  return (dispatch,getState) =>{
    console.log('authApi.login是什么')
    return authApi.localLogin(form)
      .then(response => {
        console.log('login中response是什么',response)
        return {
          json: response.data,
          status: response.statusText
        }
      })
      .then(({json,status}) => {
        console.log(status)
        if(json.errorMsg){
          dispatch(getCaptchaUrl())
          return dispatch(showMsg(json.errorMsg || '登录失败'))
        }
        //得到token,并存储
        console.log('验证码通过');
        saveCookie('token',json.token)
        //获取用户信息
        dispatch(getUserInfo(json.token))
        console.log('getUserInfo通过');

        dispatch(loginSuccess(json.token))
        dispatch(getCaptchaUrl())
        dispatch(showMsg('登录成功,欢迎光临!','success'))
        dispatch(changeStyleMode())
        dispatch(push('/'))

      }).catch(err => {
        const errorMsg = err.response?(err.response.data && err.response.data.errorMsg)?err.response.data.errorMsg:'登录失败':'登录失败'
        //登录异常
        dispatch(getCaptchaUrl())
        return dispatch(showMsg(errorMsg))
      })
  }
}

//获取用户信息
export const getUserInfo = (token = getCookie('token'))=>{
  return {
    type: 'GET_USERINFO',
    promise: authApi.getUserInfo({
      headers: {
        'Authorization':`Bearer ${token}`
      },

    })
  }
}

//退出登录
export function logout() {
  return dispatch => {
    signOut()
    dispatch({type: types.LOGOUT_USER})
    window.location.pathname = '/'
  }
}
//修改用户资料
function successUpdateUser(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user:user
  }
}
export function updateUser(userInfo) {
  return (dispatch,getState)=>{
    return authApi.mdUser(userInfo)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json,status}) => {
        if(status !== 'OK'){
          return dispatch(showMsg(json.data && json.data.error_msg || '更新用户资料失败'))
        }
        dispatch(showMsg('更新用户资料成功','success'))
        return dispatch(successUpdateUser(json.data))

      }).catch(err=>{
        return dispatch(showMsg(err.response.data.error_msg || '更新用户资料失败'))
      })
  }
}
