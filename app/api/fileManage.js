import request from 'utils/request'

export const uploadAvatar=function (data) {

  return  request['post']('admin/fileManage/uploadAvatar',data)
}