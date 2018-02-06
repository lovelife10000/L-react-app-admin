import {docManageResource} from './resources'

export default {
  getCategories:function () {
    console.log('sdfsfdf')
    return docManageResource('get','getCategories')
  },
  addCategory:function (data) {
    return docManageResource('post','addCategory',data);
  }
}