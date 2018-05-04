import {docManageResource} from './resources'

export default {
    getCategories: function () {
        return docManageResource('get', 'getCategories')
    },
    addCategory: function (data) {
        return docManageResource('post', 'addCategory', data);
    },

    editCategory: function (data) {
        return docManageResource('post', 'editCategory', data);
    },

    removeCategory: function (data) {
        return docManageResource('post', 'removeCategory', data);
    },

    addTag: function (data) {
        return docManageResource('post', 'addTag', data);
    },

    getTags: function () {
        return docManageResource('get', 'getTags')
    },

    addDoc: function (data) {
        return docManageResource('post', 'addDoc', data);
    },

    getDocs: function () {
        return docManageResource('get', 'getDocs')
    },

    searchDocs: function (data) {
        return docManageResource('post', 'searchDocs',data)
    },
}