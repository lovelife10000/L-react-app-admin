require('es6-promise').polyfill()
import axios from 'axios'
import  AppConfig  from '../config/app.config'
import { getCookie,signOut } from '../utils/auth.util'

axios.defaults.baseURL =AppConfig.domain
axios.defaults.withCredentials = true

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers = config.headers || {}
  if (getCookie('token')) {
    config.headers.Authorization ='Bearer ' +  getCookie('token').replace(/(^\")|(\"$)/g, '')

  }
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

export const UserResource = (method, id, data, api='admin/userInfo') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
export const AuthResource = (method, id, data, api='admin/auth') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
export const ArticleResource = (method, id, controller, data, api='admin/article') => {
  return axios[method](api + (id ? ('/' + id) : '') + (controller ? ('/' + controller) : ''), data)
}
export const TagResource = (method, id, data, api='admin/tags') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
export const CommentResource = (method, id, controller, data, api='admin/comment') => {
  return axios[method](api + (id ? ('/' + id) : '') + (controller ? ('/' + controller) : ''), data)
}
export const MobileResource = (method, id, data, api='admin/mobile') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
export const UserManageResource = (method, id, data, api='admin/userManage') => {
  console.log('UserManageResource');
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const FileManageResource = (method, id, data, api='admin/fileManage') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const docManageResource = (method, id, data, api='admin/docManage') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}