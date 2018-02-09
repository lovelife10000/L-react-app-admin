import {docManageResource} from './resources'

export default {
  handleMenuCollapse:function () {
    return docManageResource('get','getCategories')
  },

}