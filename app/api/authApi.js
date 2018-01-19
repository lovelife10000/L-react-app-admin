import {AuthResource,UserResource} from './resources'

export default {
  localLogin: function (data) {
    console.log('authApi中login执行')
    return AuthResource('post', 'local', data)
  },
  getUserInfo: function (data) {
    return UserResource('get', '', data)
  },

}