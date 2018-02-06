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