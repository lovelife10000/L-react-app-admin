import docManageApi from '../api/docManage.api'

export const getCategories=()=>{
  return  {
    type:'GET_CATEGORIES',
    promise:docManageApi.getCategories()
  }
};

export const addCategory=(data)=>{
  return  (dispatch,getState)=>{
    return docManageApi.addCategory(data).then(function (result) {
      dispatch(getCategories())
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