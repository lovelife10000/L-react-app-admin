import {AuthResource,UserResource} from './resources'

export default {
  localLogin: function (data) {
    return AuthResource('post', 'local', data)
  },
  getUserInfo: function (data) {
    return UserResource('get', '', data)
  },


}