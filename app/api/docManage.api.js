import {docManageResource} from './resources'

export default {
  getCategories:function () {
    return docManageResource('get','getCategories')
  },
  addCategory:function (data) {
    return docManageResource('post','addCategory',data);
  },

    editCategory:function (data) {
    debugger
        return docManageResource('post','editCategory',data);
    },

  addTag:function (data) {
    return docManageResource('post','addTag',data);
  },

  getTags:function () {
    return docManageResource('get','getTags')
  },

  addDoc:function (data) {
    return docManageResource('post','addDoc',data);
  },

  getDocs:function () {
    return docManageResource('get','getDocs')
  },
}