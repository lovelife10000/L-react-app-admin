import request from 'utils/request'


export const getCategories = function () {
    return request.get('admin/docManage/getCategories')
}
export const addCategory = function (data) {
    return request.post('admin/docManage/addCategory', data);
}

export const editCategory = function (data) {
    return request.post('admin/docManage/editCategory', data);
}

export const removeCategory = function (data) {
    return request.post('admin/docManage/removeCategory', data);
}

export const addTag = function (data) {
    return request.post('admin/docManage/addTag', data);
}

export const getTags = function () {
    return request.get('admin/docManage/getTags')
}

export const addDoc = function (data) {
    return request.post('admin/docManage/addDoc', data);
}

export const getDocs = function (data) {
    return request.post('admin/docManage/getDocs', data)
}

export const searchDocs = function (data) {
    return request.post('admin/docManage/searchDocs', data)
}

export const changeToHot = function (data) {
    return request.post('admin/docManage/changeToHot', data)
}

export const changeToNotHot = function (data) {
    return request.post('admin/docManage/changeToNotHot', data)
}

export const changeToTop = function (data) {
    return request.post('admin/docManage/changeToTop', data)
}

export const changeToNotTop = function (data) {
    return request.post('admin/docManage/changeToNotTop', data)
}
