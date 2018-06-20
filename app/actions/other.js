import * as types from 'config/types'
import * as api from 'api'


//显示提示消息
export const showMsg = (content, type = 'error') => {
  return {
    type: 'SHOW_MSG',
    message: {content: content, type: type}
  }
}
export const hideMsg = () => ({type: types.HIDE_MSG})

export const showModal = (content, type = 'error') => {
  console.log(types.SHOW_Modal)
  return {
    type: types.SHOW_MODAL,
    message: {content: content, type: type, visible: true}
  }
}
export const hideModal = (content, type = 'error') => ({
  type: types.HIDE_MODAL,
  message: {content: content, type: type, visible: false}
})

//获取apps
export const getApps = () => {
  return {
    type: types.GET_APPS,
    promise: api.getApps()
  }
}
//首页图片success
export const getIndexImage = () => {
  return {
    type: types.GET_INDEX_IMG,
    promise: api.getIndexImage()
  }
}

export const handleMenuCollapse = () => {
  return {
    type: 'CHANGE_LAYOUT_COLLAPSED',
    promise: api.handleMenuCollapse()
  }
}

export const showHelp = (msg,field) => {
  return {
    type: types.SHOW_HELP,
    message: {['msgFor'+field]:msg}
  }
}
export const resetHelp = (field) => {
  return {
    type: types.RESET_HELP,
    message: {['msgFor'+field]:''}
  }
}
