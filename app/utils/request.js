require('es6-promise').polyfill()
import axios from 'axios'
import  AppConfig  from 'config/app'
import { getCookie,signOut } from 'utils/auth'

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


export default axios
