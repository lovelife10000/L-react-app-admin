import * as api from 'api'


function updateUserAvatar(avatar) {
  return {
    type: 'UPDATE_USER_AVATAR',
    avatar:avatar
  }
}

export const uploadAvatar=(data)=>{
  console.log('上传2');
  return (dispatch,getState)=> {

    return api.uploadAvatar(data).then(function (response) {
      console.log('上传3',response);
      if(response.data.success){
        dispatch(updateUserAvatar(response.data.url))
      }

      console.log('获得响应')
    });
  }
}

