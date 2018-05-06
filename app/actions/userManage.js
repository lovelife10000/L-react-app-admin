import * as api from 'api'



export const getAllUserGroups=()=> {
  console.log('getAllUserGroups执行')
  return {
    type: 'GET_ALL_USER_GROUPS',
    promise: api.getAllUserGroups()
  }
}

export const addUserGroup=(data)=>{
  return (dispatch,getState) => {
    // const options = getState().options.toJS()
    return api.addUserGroup(data).then(function (result) {
      console.log('then执行',result)
      if(result.data.success===true){

        dispatch(getAllUserGroups())
      }
    });

  }
}

export const getAllUsers=()=>{
  return {
    type: 'GET_ALL_USERS',
    promise: api.getAllUsers()
  }
}


export const addUser=(data)=>{
  return (dispatch,getState) => {

    return userManageApi.addUser(data).then(function (result) {

      if(result.data.success===true){
        dispatch(getAllUsers())
      }
    });

  }
}

