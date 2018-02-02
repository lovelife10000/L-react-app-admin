import {FileManageResource} from './resources'

export default {
  uploadAvatar:function (data) {
    console.log('上传4');
    return  FileManageResource('post','uploadAvatar',data)
  }
}