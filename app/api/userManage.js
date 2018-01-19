import {UserManageResource} from './resources'

export default {
  getParentUserGroups: function (data) {
    console.log('getParentUserGroups执行了3');
    return UserManageResource('get', 'getParentUserGroups', data)
  },

  addUserGroup: function (data) {
    console.log('addUserGroup执行了3');
    return UserManageResource('post', 'addUserGroup', data)
  },

}
