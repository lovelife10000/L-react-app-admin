import {createReducer} from 'redux-immutablejs'
import {fromJS} from 'immutable'
import * as  types from 'config/types'

const initialState = fromJS({
  total: 0,
  docs: [],

})

export default createReducer(initialState, {
  [types.GET_DOCS_REQUEST]: (state, action) => state,
  [types.GET_DOCS_SUCCESS]: (state, {json}) => state.merge({
    total:json.data.total,
    docs: json.data.docs,

  }),
  [types.GET_DOCS_FAILURE]: (state, action) => state,


  [types.CHANGE_TO_HOT_REQUEST]: (state, action) => state,
  [types.CHANGE_TO_HOT_SUCCESS]: (state, {json}) => {
    return state.mergeDeep({

      docs: state.get('docs').map(item=>{
        if(item.get('_id') === json._id){
          return item.set('hot',true)
        }
        return item
      })
    })
  },
  [types.CHANGE_TO_HOT_FAILURE]: (state, action) => state,


  [types.CHANGE_TO_NOT_HOT_REQUEST]: (state, action) => state,
  [types.CHANGE_TO_NOT_HOT_SUCCESS]: (state, {json}) => {
    return state.mergeDeep({

      docs: state.get('docs').map(item=>{
        if(item.get('_id') === json._id){
          return item.set('hot',false)
        }
        return item
      })
    })
  },
  [types.CHANGE_TO_NOT_HOT_FAILURE]: (state, action) => state,


  [types.CHANGE_TO_TOP_REQUEST]: (state, action) => state,
  [types.CHANGE_TO_TOP_SUCCESS]: (state, {json}) => {
    return state.mergeDeep({

      docs: state.get('docs').map(item=>{
        if(item.get('_id') === json._id){
          return item.set('top',true)
        }
        return item
      })
    })
  },
  [types.CHANGE_TO_TOP_FAILURE]: (state, action) => state,


  [types.CHANGE_TO_NOT_TOP_REQUEST]: (state, action) => state,
  [types.CHANGE_TO_NOT_TOP_SUCCESS]: (state, {json}) => {
    return state.mergeDeep({

      docs: state.get('docs').map(item=>{
        if(item.get('_id') === json._id){
          return item.set('top',false)
        }
        return item
      })
    })
  },
  [types.CHANGE_TO_NOT_TOP_FAILURE]: (state, action) => state,
})


