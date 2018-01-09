import React from 'react'
import { render } from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from '../store/configureStore'
import createDevTools from './createDevtools'
import routes from '../routes/routes'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'ionicons/dist/css/ionicons.css'
import 'admin-lte/dist/css/AdminLTE.css'
import 'admin-lte/dist/css/skins/_all-skins.css'
import 'icheck/skins/flat/blue.css'
import '../assets/styles/morris.css'
import '../assets/styles/jquery-jvectormap-1.2.2.css'
import '../assets/styles/datepicker3.css'
import '../assets/styles/daterangepicker-bs3.css'
import '../assets/styles/bootstrap3-wysihtml5.css'
import 'jackblog-sass/dist/index.css'
import 'react-s-alert/dist/s-alert-default.css'
import '../assets/styles/index.css'

const history = createHistory()
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState,history)
createDevTools(store)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)