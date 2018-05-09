import {createReducer} from 'redux-immutablejs'


import * as types from 'config/types'
import {fromJS} from "immutable";

const initialState = fromJS({
    data: [],
    msgForName: '',
    msgForSlug: '',
})

export const allUserGroups = createReducer(initialState, {
    [types.GET_ALL_USER_GROUPS_REQUEST]: (state, action) => state,
    [types.GET_ALL_USER_GROUPS_SUCCESS]: (state, {json}) => state.merge({data: json.data, msg: json.msg}),
    [types.GET_ALL_USER_GROUPS_FAILURE]: (state, action) => state,

    [types.SHOW_HELP]: (state, action) => state.merge(action.message),
    [types.RESET_HELP]: (state, action) => state.merge(action.message),


    [types.CHANGE_TO_USE_REQUEST]: (state, action) => state,
    [types.CHANGE_TO_USE_SUCCESS]: (state, {json}) => {
        return state.mergeDeep({

            data: state.get('data').map(item=>{
                if(item.get('_id') === json._id){
                    return item.set('status',true)
                }
                return item
            })
        })
    },
    [types.CHANGE_TO_USE_FAILURE]: (state, action) => state,


    [types.CHANGE_TO_NOT_USE_REQUEST]: (state, action) => state,
    [types.CHANGE_TO_NOT_USE_SUCCESS]: (state, {json}) => {
        return state.mergeDeep({

            data: state.get('data').map(item=>{

                if(item.get('_id') === json._id){

                    return item.set('status',false)
                }
                return item
            })
        })
    },
    [types.CHANGE_TO_NOT_USE_FAILURE]: (state, action) => state,

})

