import * as types from 'config/types'
import {push} from 'react-router-redux'
import {saveCookie, getCookie, signOut} from 'utils/auth'
import {showMsg} from './other'
import * as api from 'api'
import AppConfig from 'config/app'


export const getSnsLogins = () => {
    return {
        type: types.GET_SNSLOGINS,
        promise: api.getSnsLogins()
    }
}

export const getCaptchaUrl = () => {
    return {
        type: 'GET_CAPTCHAURL',
        captchaUrl: AppConfig.domain + 'login/getCaptcha?' + Math.random()
    }
}


export const loginSuccess = function (token) {
    return {
        type: 'LOGIN_SUCCESS',
        token: token
    }
}


export const localLogin = function (form) {
    return (dispatch, getState) => {

        return api.localLogin(form)
            .then(response => {

                return {
                    json: response.data,
                    status: response.statusText
                }
            })
            .then(({json, status}) => {

                if (json.errorMsg) {
                    dispatch(getCaptchaUrl())
                    return dispatch(showMsg(json.errorMsg || '登录失败'))
                }
                //得到token,并存储

                saveCookie('token', json.token)
                //获取用户信息
                dispatch(getUserInfo(json.token))


                dispatch(loginSuccess(json.token))
                dispatch(getCaptchaUrl())
                dispatch(showMsg('登录成功,欢迎光临!', 'success'))

                dispatch(push('/'))

            }).catch(err => {
                const errorMsg = err.response ? (err.response.data && err.response.data.errorMsg) ? err.response.data.errorMsg : '登录失败' : '登录失败'
                //登录异常
                dispatch(getCaptchaUrl())
                return dispatch(showMsg(errorMsg))
            })
    }
}


export const getUserInfo = (token = getCookie('token')) => {

    return {
        type: 'GET_USERINFO',
        promise: api.getUserInfo({
            headers: {
                'Authorization': `Bearer ${token}`
            },

        })
    }
}


export const logout = function () {
    return dispatch => {
        signOut()
        dispatch({type: types.LOGOUT_USER})
        window.location.pathname = '/'
    }
}

export const updateUser = function (userInfo) {

    return (dispatch, getState) => {
        return api.mdUser(userInfo)
            .then(response => ({json: response.data, status: response.statusText}))
            .then(({json, status}) => {
                if (status !== 'OK') {
                    return dispatch(showMsg(json.data && json.data.error_msg || '更新用户资料失败'))
                }
                dispatch(showMsg('更新用户资料成功', 'success'))
                return dispatch(successUpdateUser(json.data))

            }).catch(err => {
                return dispatch(showMsg(err.response.data.error_msg || '更新用户资料失败'))
            })
    }
}
