import docManageApi from '../api/docManage.api'
import {showModal} from "./other";

export const getCategories=()=>{
  return  {
    type:'GET_CATEGORIES',
    promise:docManageApi.getCategories()
  }
};

export const addCategory=(data)=>{
  return  (dispatch,getState)=>{
    return docManageApi.addCategory(data).then(function (result) {
        debugger
      dispatch(getCategories())
        debugger
        dispatch(showModal(result.msg))
    }).catch(function (err) {
      
    });
  }
};


export const addTag=(data)=>{
  return  (dispatch,getState)=>{
    return docManageApi.addTag(data).then(function (result) {
      dispatch(getTags())
      return {
        success:result.data.success,
        msg:result.data.msg
      }
    }).catch(function (err) {

    });
  }
};


export const getTags=(data)=>{
  return  {
    type:'GET_TAGS',
    promise:docManageApi.getTags()
  }
};


export const addDoc=(data)=>{
  return  (dispatch,getState)=>{
    return docManageApi.addDoc(data).then(function (result) {
      dispatch(getDocs())
      return {
        success:result.data.success,
        msg:result.data.msg
      }
    }).catch(function (err) {

    });
  }
};

export const getDocs=(data)=>{
  return  {
    type:'GET_DOCS',
    promise:docManageApi.getDocs()
  }
};