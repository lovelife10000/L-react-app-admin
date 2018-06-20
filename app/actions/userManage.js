import * as api from 'api'
import { push } from 'react-router-redux'
import { showHelp, showModal } from './other'
import * as types from 'config/types'

export const getAllUserGroups = () => {
  console.log('getAllUserGroups执行')
  return {
    type: 'GET_ALL_USER_GROUPS',
    promise: api.getAllUserGroups()
  }
}

export const addUserGroup = (data) => {
  return (dispatch, getState) => {
    // const options = getState().options.toJS()
    return api.addUserGroup(data).then(function (result) {
      if (result.data.success === false && result.data.msg === '未登录') {
        return dispatch(push('/login'))
      }

      if (result.data.field === 'name') {

        dispatch(showHelp(result.data.msg, 'Name'))
      }
      if (result.data.field === 'slug') {

        dispatch(showHelp(result.data.msg, 'Slug'))
      }
      if (result.data.success === true) {

        dispatch(getAllUserGroups())
      }

      dispatch(showModal(result.data.msg))
    })

  }
}

export const getAllUsers = () => {
  return {
    type: 'GET_ALL_USERS',
    promise: api.getAllUsers()
  }
}


export const addUser = (data) => {
  return (dispatch, getState) => {

    return api.addUser(data).then(function (result) {

      if (result.data.success === true) {
        dispatch(getAllUsers())
      }
    })

  }
}


export const changeToUse = (data) => {
  return {
    type: types.CHANGE_TO_USE,
    promise: api.changeToUse(data)
  }
}

export const changeToNotUse = (data) => {
  return {
    type: types.CHANGE_TO_NOT_USE,
    promise: api.changeToNotUse(data)
  }
}

