import React from 'react'
import ReactDOM from 'react-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from '../app/store/configureStore'
import createDevTools from './createDevtools'
import {renderRoutes} from 'react-router-config'


import 'react-image-crop/dist/ReactCrop.css';
import 'draft-js/dist/Draft.css'
// import 'font-awesome/css/font-awesome.css'
import 'antd/dist/antd.css'
import '../app/assets/css/index.css'

import routes from '../app/config/routes.config'

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