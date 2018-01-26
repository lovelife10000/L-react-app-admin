require('es6-promise').polyfill()
import axios from 'axios'
import { AppConfig } from '../config/app.config'
import { getCookie,signOut } from '../utils/auth.util'

axios.defaults.baseURL =AppConfig.DOMAIN
axios.defaults.withCredentials = true

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers = config.headers || {}
  if (getCookie('token')) {
    config.headers.Authorization = getCookie('token').replace(/(^\")|(\"$)/g, '')
    config.headers.Cookie = getCookie('connect.sid').replace(/(^\")|(\"$)/g, '')+';'+getCookie('token').replace(/(^\")|(\"$)/g, '')
  }
  console.log('axios config 是',config);
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.status === 401) {
    signOut()
    window.location.pathname = '/login'
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export const UserResource = (method, id, data, api='userInfo') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
export const AuthResource = (method, id, data, api='auth') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
export const ArticleResource = (method, id, controller, data, api='article') => {
  return axios[method](api + (id ? ('/' + id) : '') + (controller ? ('/' + controller) : ''), data)
}
export const TagResource = (method, id, data, api='tags') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
export const CommentResource = (method, id, controller, data, api='comment') => {
  return axios[method](api + (id ? ('/' + id) : '') + (controller ? ('/' + controller) : ''), data)
}
export const MobileResource = (method, id, data, api='mobile') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
export const UserManageResource = (method, id, data, api='userManage') => {
  console.log('UserManageResource');
  return axios[method](api + (id ? ('/' + id) : ''), data)
}