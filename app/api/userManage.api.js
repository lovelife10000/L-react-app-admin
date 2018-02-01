import {UserManageResource} from './resources'

export default {

  addUserGroup: function (data) {
    console.log('addUserGroup执行了3');
    return UserManageResource('post', 'addUserGroup', data)
  },
  getAllUserGroups: function (data) {
    return UserManageResource('get', 'getAllUserGroups', data)
  },
  getAllUsers: function (data) {
    return UserManageResource('get', 'getAllUsers', data)
  },

  addUser: function (data) {
    return UserManageResource('post', 'addUser', data)
  },

}
