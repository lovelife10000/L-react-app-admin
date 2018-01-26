import {AuthResource,UserResource} from './resources'

export default {
  localLogin: function (data) {
    console.log('authApi中login执行')
    return AuthResource('post', 'local', data)
  },
  getUserInfo: function (data) {
    console.log('authApi中getUserInfo执行')
    return UserResource('get', '', data)
  },


}