import React from 'react'
import {renderToString} from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {matchRoutes, renderRoutes} from 'react-router-config'
import createMemoryHistory from 'history/createMemoryHistory'
import {Provider} from 'react-redux'
import Cookies from 'universal-cookie'
import {fromJS} from 'immutable'
import configureStore from '../app/store/configureStore'
import routes from '../app/config/routes.config'
import {AppConfig} from '../app/config/app.config'
import url from 'url'


async function fetchAllData(batch, dispatch, token) {
  const needs = batch.map(({route, match}, index) => {
    match.params = Object.assign({}, match.params, {token: token})
    return {component: route.component, params: match.params,route:route}
  }).filter(x => x.component.fetchData).reduce((prev, current) => {
    return current.component.fetchData(current.params).concat(prev)
  }, []).map(x => {
    return dispatch(x)
  })

  return await Promise.all(needs)
}

export default function render(req, res) {
  console.log('刷新页面，请求来了', req.url)
  const cookies = new Cookies(req.headers.cookie)
  const history = createMemoryHistory()
  const token = cookies.get('token') || null
  let styleMode = 'hold-transition login-page'
  // if (url.parse(req.url).pathname == '/login') {
  //   styleMode = 'hold-transition login-page'
  // }else {
  //   styleMode = 'skin-blue sidebar-mini wysihtml5-supported'
  // }
  const store = configureStore({
    auth: fromJS({
      token: token,
      user: null
    }),
    globalVal: fromJS({
      styleMode: styleMode,
      captchaUrl: AppConfig.DOMAIN + 'login/getCaptcha?',
      collapsed:false
    })
  }, history)
  const batch = matchRoutes(routes, req.url)
  console.log(batch.length);
  return fetchAllData(batch, store.dispatch, token).then(function (data) {

    const context = {}
    const initialState = store.getState()
    const InitialView = (
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>)

    const componentHTML = renderToString(InitialView)


    if (context.status === 404) {
      res.status(404)
    }

    if (context.status === 302) {
      return res.redirect(302, context.url)
    }

    if (__DEVSERVER__) {
      res.set('Content-Type', 'text/html')
      if (url.parse(req.url).pathname == '/login') {
        return res.status(200).send(renderFullPageForLogin(componentHTML, initialState, 'hold-transition login-page'))
      }
      return res.status(200).send(renderFullPage(componentHTML, initialState, 'skin-blue sidebar-mini wysihtml5-supported'))
    } else {
      if (url.parse(req.url).pathname == '/') {
        styleMode='skin-blue sidebar-mini wysihtml5-supported'
      }
      if (url.parse(req.url).pathname == '/login') {
        styleMode='hold-transition login-page'
      }else {
        styleMode='skin-blue sidebar-mini wysihtml5-supported'
      }
      return res.render('index', {
        __html__: componentHTML,
        __state__: JSON.stringify(initialState),
        __styleMode__: styleMode
      })
    }

  })
  //   .catch(err => {
  //   if (__DEVSERVER__) {
  //     res.set('Content-Type', 'text/html')
  //     return res.status(200).send(renderFullPage('', {}))
  //   } else {
  //     return res.render('index', {__html__: '', __state__: {}})
  //   }
  // })
}

function renderFullPage(renderedContent, initialState, styleMode) {
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="renderer" content="webkit">
      <title>L-react-app-admin</title>
      <meta name="description" content="L-react-app-admin">
      <meta name="keyword" content="L-react-app-admin">    
      <link rel="stylesheet" href="/style.css"/>
    </head>
    <body class="${styleMode}">
      <!--[if lt IE 9]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
      <div class="" id="root">${renderedContent}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>      
      <script type="text/javascript" charset="utf-8" src="/vendor.js"></script>
      <script type="text/javascript" charset="utf-8" src="/bundle.js"></script>
      
    </body>
  </html>
  `
}

function renderFullPageForLogin(renderedContent, initialState, styleMode) {
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="renderer" content="webkit">
      <title>L-react-app-admin</title>
      <meta name="description" content="L-react-app-admin">
      <meta name="keyword" content="L-react-app-admin">
      <link rel="stylesheet" href="/style.css"/>
    </head>
    <body class="${styleMode}">
      <!--[if lt IE 9]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
      <div class="" id="root">${renderedContent}</div>   
     
 
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>      
      <script type="text/javascript" charset="utf-8" src="/vendor.js"></script>
      <script type="text/javascript" charset="utf-8" src="/bundle.js"></script>     
     
    
    </body>
  </html>
  `
}