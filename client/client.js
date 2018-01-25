import React from 'react'
import ReactDOM from 'react-dom'
// import {renderRoutes} from 'react-router-config'
//import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from '../app/store/configureStore'
import createDevTools from './createDevtools'
import {BrowserRouter} from 'react-router-dom'
// import {Switch} from 'react-router'
import Login from '../app/components/Login/index'
import Home from '../app/components/Home'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'ionicons/dist/css/ionicons.css'
import 'admin-lte/dist/css/AdminLTE.css'
import 'admin-lte/dist/css/skins/_all-skins.css'
import 'icheck/skins/square/blue.css'
import '../app/assets/css/morris.css'
import '../app/assets/css/jquery-jvectormap-1.2.2.css'
import '../app/assets/css/datepicker3.css'
import '../app/assets/css/daterangepicker-bs3.css'
import '../app/assets/css/bootstrap3-wysihtml5.css'
import 'react-s-alert/dist/s-alert-default.css'
import '../app/assets/css/index.css'

const history = createHistory()
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, history)
createDevTools(store)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Route exact path="/login" component={Login}/>
        <Route path="/" component={Home}/>
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)