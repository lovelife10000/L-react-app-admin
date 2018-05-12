import { 
  CHANGE_STYLE_MODE,
  GET_INDEX_IMG_SUCCESS,
  GET_INDEX_IMG_FAILURE,
  GET_CAPTCHAURL
} from 'config/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import img from '../assets/img/shanghai.jpg'
import { domain } from 'config/app'
// import { getCookie} from '../utils/auth.util'

export default createReducer(fromJS({
  indexImg:'',
  styleMode: '',
  captchaUrl: domain + 'login/getCaptcha?',
  collapsed:false
}), {
  [CHANGE_STYLE_MODE]: (state, action) => {
    console.log('读取state.get(styleMode)',state.get('styleMode'))
    let styleMode = state.get('styleMode') === 'skin-blue sidebar-mini wysihtml5-supported'?'hold-transition login-page':'skin-blue sidebar-mini wysihtml5-supported'
    // saveCookie('styleMode', styleMode)
    return state.set('styleMode',styleMode)
  },
  [GET_CAPTCHAURL]: (state, action) => state.set('captchaUrl',action.captchaUrl),
  [GET_INDEX_IMG_SUCCESS]: (state, {json}) => state.set('indexImg',json.img),
  [GET_INDEX_IMG_FAILURE]: (state, {json}) => state.set('indexImg',img)
})