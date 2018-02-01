import React from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from '../app/store/configureStore'
import createDevTools from './createDevtools'
import {renderRoutes} from 'react-router-config'
import routes from '../app/config/routes.config'

import 'react-image-crop/dist/ReactCrop.css';
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
import 'antd/dist/antd.css'
import '../app/assets/css/index.css'

const history = createHistory()
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, history)
createDevTools(store)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)