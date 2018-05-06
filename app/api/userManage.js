import request from 'utils/request'


export const addUserGroup= function (data) {

    return request.post('admin/userManage/addUserGroup', data)
}
export const getAllUserGroups= function (data) {
    return request.get('admin/userManage/getAllUserGroups', data)
}
export const getAllUsers= function (data) {
    return request.get('admin/userManage/getAllUsers', data)
}

export const addUser= function (data) {
    return request.post('admin/userManage/addUser', data)
}
