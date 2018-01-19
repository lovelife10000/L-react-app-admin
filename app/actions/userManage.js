import userManage from '../api/userManage'

export const getParentUserGroups=()=>{
  console.log('getParentUserGroups执行了');
  return (dispatch,getState) => {
    console.log('getParentUserGroups执行了2');
    // const options = getState().options.toJS()
    return dispatch({
      type: 'GET_PARENT_USER_GROUPS',
      // itemsPerPage: options.itemsPerPage,
      promise: userManage.getParentUserGroups(),
      // isAdd: isAdd
    })
  }
}

export const addUserGroup=()=>{
  console.log('addUserGroup执行了');
  return (dispatch,getState) => {
    console.log('addUserGroup执行了2');
    // const options = getState().options.toJS()
    return dispatch({
      type: 'ADD_USER_GROUP',
      // itemsPerPage: options.itemsPerPage,
      promise: userManage.addUserGroup(),
      // isAdd: isAdd
    })
  }
}
