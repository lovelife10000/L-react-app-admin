import * as api from 'api'
import {showHelp, showModal} from "./other";
import * as types from 'config/types'
import {push} from 'react-router-redux'

export const getCategories = () => {
    return {
        type: types.GET_CATEGORIES,
        promise: api.getCategories()
    }
};

export const addCategory = (data) => {
    return (dispatch, getState) => {

        return api.addCategory(data).then(function (result) {

            if (result.data.success === false && result.data.msg === '未登录') {
                return dispatch(push('/login'))
            }
            if (result.data.field === 'name') {

                dispatch(showHelp(result.data.msg, 'Name'))
            }
            if (result.data.field === 'slug') {
                debugger
                dispatch(showHelp(result.data.msg, 'Slug'))
            }

            if (result.data.success) {
                dispatch(getCategories())
            }


            dispatch(showModal(result.data.msg))
        }).catch(function (err) {

        });
    }
};


export const editCategory = (data) => {
    return (dispatch, getState) => {

        return api.editCategory(data).then(function (result) {

            dispatch(getCategories())
            dispatch(showModal(result.data.msg))
        }).catch(function (err) {

        });
    }
};


export const removeCategory = (data) => {
    return (dispatch, getState) => {
        debugger
        return api.removeCategory(data).then(function (result) {
            debugger
            dispatch(getCategories())
            dispatch(showModal(result.data.msg))
        }).catch(function (err) {

        });
    }
};


export const addTag = (data) => {
    return (dispatch, getState) => {
        return api.addTag(data).then(function (result) {
            dispatch(getTags())
            return {
                success: result.data.success,
                msg: result.data.msg
            }
        }).catch(function (err) {

        });
    }
};


export const getTags = (data) => {
    return {
        type: 'GET_TAGS',
        promise: api.getTags()
    }
};


export const addDoc = (data) => {
    return (dispatch, getState) => {
        return api.addDoc(data).then(function (result) {
            dispatch(getDocs())
            return {
                success: result.data.success,
                msg: result.data.msg
            }
        }).catch(function (err) {

        });
    }
};

export const getDocs = (data) => {
    return {
        type: types.GET_DOCS,
        promise: api.getDocs(data)
    }
};
export const searchDocs = (data) => {
    return {
        type: types.GET_SEARCHDOCS,
        promise: api.searchDocs(data)
    }
};


export const changeToHot = (data) => {
    return {
        type: types.CHANGE_TO_HOT,
        promise: api.changeToHot(data)
    }
};

export const changeToNotHot = (data) => {
    return {
        type: types.CHANGE_TO_NOT_HOT,
        promise: api.changeToNotHot(data)
    }
};

export const changeToTop = (data) => {
    return {
        type: types.CHANGE_TO_TOP,
        promise: api.changeToTop(data)
    }
};

export const changeToNotTop = (data) => {
    return {
        type: types.CHANGE_TO_NOT_TOP,
        promise: api.changeToNotTop(data)
    }
};
