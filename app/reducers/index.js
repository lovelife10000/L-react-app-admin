import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { articleList, articleDetail,prenextArticle } from './article'
import tagList from './tagList'
import commentList from './comment'
import auth from './auth'
import options from './options'
import apps from './apps'
import sns from './sns'
import showMsg from './showMsg'
import {allUserGroups} from './allUserGroups'
import globalVal from './globalVal'
import allUsers from './allUsers'
import categories from './categories'
import showModal from './showModal'
import allDocs from './allDocs'
import searchDocs from './searchDocs'

const rootReducer = combineReducers({
  globalVal,
  apps,
  sns,
  tagList,
  articleList,
  articleDetail,
  commentList,
  prenextArticle,
  options,
  auth,
  showMsg,
  router: routerReducer,
  form: formReducer,
  allUserGroups,
  allUsers,
  categories,
    showModal,
    allDocs,
    searchDocs
})

export default rootReducer
