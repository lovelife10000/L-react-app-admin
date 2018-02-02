import fileManageApi from '../api/fileManage.api'



export const uploadAvatar=(data)=>{
  console.log('上传2');
  return (dispatch,getState)=> {
    console.log('上传3');
    return fileManageApi.uploadAvatar(data).then(function () {
      console.log('获得响应')
    });
  }
}

