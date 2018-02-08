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
      captchaUrl: AppConfig.DOMAIN + 'login/getCaptcha?'
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
      <script type="text/javascript" charset="utf-8" src="https://cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
      <script type="text/javascript" charset="utf-8" src="https://cdn.bootcss.com/admin-lte/2.3.0/js/app.js"></script>
      <script type="text/javascript" charset="utf-8" src="https://cdn.bootcss.com/select2/4.0.3/js/select2.full.min.js"></script>
      <script type="text/javascript" charset="utf-8" src="https://cdn.bootcss.com/select2/4.0.3/js/select2.full.min.js"></script>
     
      <script>
        $(function () {  
          $(".select2").select2();      
        });
      </script>

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
      <script type="text/javascript" charset="utf-8" src="https://cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
      <script type="text/javascript" charset="utf-8" src="https://cdn.bootcss.com/admin-lte/2.3.0/js/app.js"></script>
      <script type="text/javascript" charset="utf-8" src="http://apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min.js"></script>
      <script type="text/javascript" charset="utf-8" src="https://cdn.bootcss.com/select2/4.0.3/js/select2.full.min.js"></script>
     
      <script>
        $(function () {  
          $(".select2").select2();      
        });
      </script>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>      
      <script type="text/javascript" charset="utf-8" src="/vendor.js"></script>
      <script type="text/javascript" charset="utf-8" src="/bundle.js"></script>      
      <script>
      (function(h){function F(a,b,d){var c=a[0],e=/er/.test(d)?m:/bl/.test(d)?s:l,f=d==H?{checked:c[l],disabled:c[s],indeterminate:"true"==a.attr(m)||"false"==a.attr(w)}:c[e];if(/^(ch|di|in)/.test(d)&&!f)D(a,e);else if(/^(un|en|de)/.test(d)&&f)t(a,e);else if(d==H)for(e in f)f[e]?D(a,e,!0):t(a,e,!0);else if(!b||"toggle"==d){if(!b)a[p]("ifClicked");f?c[n]!==u&&t(a,e):D(a,e)}}function D(a,b,d){var c=a[0],e=a.parent(),f=b==l,A=b==m,B=b==s,K=A?w:f?E:"enabled",p=k(a,K+x(c[n])),N=k(a,b+x(c[n]));if(!0!==c[b]){if(!d&&
b==l&&c[n]==u&&c.name){var C=a.closest("form"),r='input[name="'+c.name+'"]',r=C.length?C.find(r):h(r);r.each(function(){this!==c&&h(this).data(q)&&t(h(this),b)})}A?(c[b]=!0,c[l]&&t(a,l,"force")):(d||(c[b]=!0),f&&c[m]&&t(a,m,!1));L(a,f,b,d)}c[s]&&k(a,y,!0)&&e.find("."+I).css(y,"default");e[v](N||k(a,b)||"");B?e.attr("aria-disabled","true"):e.attr("aria-checked",A?"mixed":"true");e[z](p||k(a,K)||"")}function t(a,b,d){var c=a[0],e=a.parent(),f=b==l,h=b==m,q=b==s,p=h?w:f?E:"enabled",t=k(a,p+x(c[n])),
u=k(a,b+x(c[n]));if(!1!==c[b]){if(h||!d||"force"==d)c[b]=!1;L(a,f,p,d)}!c[s]&&k(a,y,!0)&&e.find("."+I).css(y,"pointer");e[z](u||k(a,b)||"");q?e.attr("aria-disabled","false"):e.attr("aria-checked","false");e[v](t||k(a,p)||"")}function M(a,b){if(a.data(q)){a.parent().html(a.attr("style",a.data(q).s||""));if(b)a[p](b);a.off(".i").unwrap();h(G+'[for="'+a[0].id+'"]').add(a.closest(G)).off(".i")}}function k(a,b,d){if(a.data(q))return a.data(q).o[b+(d?"":"Class")]}function x(a){return a.charAt(0).toUpperCase()+
a.slice(1)}function L(a,b,d,c){if(!c){if(b)a[p]("ifToggled");a[p]("ifChanged")[p]("if"+x(d))}}var q="iCheck",I=q+"-helper",u="radio",l="checked",E="un"+l,s="disabled",w="determinate",m="in"+w,H="update",n="type",v="addClass",z="removeClass",p="trigger",G="label",y="cursor",J=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);h.fn[q]=function(a,b){var d='input[type="checkbox"], input[type="'+u+'"]',c=h(),e=function(a){a.each(function(){var a=h(this);c=a.is(d)?
c.add(a):c.add(a.find(d))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))return a=a.toLowerCase(),e(this),c.each(function(){var c=h(this);"destroy"==a?M(c,"ifDestroyed"):F(c,!0,a);h.isFunction(b)&&b()});if("object"!=typeof a&&a)return this;var f=h.extend({checkedClass:l,disabledClass:s,indeterminateClass:m,labelHover:!0,aria:!1},a),k=f.handle,B=f.hoverClass||"hover",x=f.focusClass||"focus",w=f.activeClass||"active",y=!!f.labelHover,C=f.labelHoverClass||
"hover",r=(""+f.increaseArea).replace("%","")|0;if("checkbox"==k||k==u)d='input[type="'+k+'"]';-50>r&&(r=-50);e(this);return c.each(function(){var a=h(this);M(a);var c=this,b=c.id,e=-r+"%",d=100+2*r+"%",d={position:"absolute",top:e,left:e,display:"block",width:d,height:d,margin:0,padding:0,background:"#fff",border:0,opacity:0},e=J?{position:"absolute",visibility:"hidden"}:r?d:{position:"absolute",opacity:0},k="checkbox"==c[n]?f.checkboxClass||"icheckbox":f.radioClass||"i"+u,m=h(G+'[for="'+b+'"]').add(a.closest(G)),
A=!!f.aria,E=q+"-"+Math.random().toString(36).replace("0.",""),g='<div class="'+k+'" '+(A?'role="'+c[n]+'" ':"");m.length&&A&&m.each(function(){g+='aria-labelledby="';this.id?g+=this.id:(this.id=E,g+=E);g+='"'});g=a.wrap(g+"/>")[p]("ifCreated").parent().append(f.insert);d=h('<ins class="'+I+'"/>').css(d).appendTo(g);a.data(q,{o:f,s:a.attr("style")}).css(e);f.inheritClass&&g[v](c.className||"");f.inheritID&&b&&g.attr("id",q+"-"+b);"static"==g.css("position")&&g.css("position","relative");F(a,!0,H);
if(m.length)m.on("click.i mouseover.i mouseout.i touchbegin.i touchend.i",function(b){var d=b[n],e=h(this);if(!c[s]){if("click"==d){if(h(b.target).is("a"))return;F(a,!1,!0)}else y&&(/ut|nd/.test(d)?(g[z](B),e[z](C)):(g[v](B),e[v](C)));if(J)b.stopPropagation();else return!1}});a.on("click.i focus.i blur.i keyup.i keydown.i keypress.i",function(b){var d=b[n];b=b.keyCode;if("click"==d)return!1;if("keydown"==d&&32==b)return c[n]==u&&c[l]||(c[l]?t(a,l):D(a,l)),!1;if("keyup"==d&&c[n]==u)!c[l]&&D(a,l);else if(/us|ur/.test(d))g["blur"==
d?z:v](x)});d.on("click mousedown mouseup mouseover mouseout touchbegin.i touchend.i",function(b){var d=b[n],e=/wn|up/.test(d)?w:B;if(!c[s]){if("click"==d)F(a,!1,!0);else{if(/wn|er|in/.test(d))g[v](e);else g[z](e+" "+w);if(m.length&&y&&e==B)m[/ut|nd/.test(d)?z:v](C)}if(J)b.stopPropagation();else return!1}})})}})(window.jQuery||window.Zepto);

      </script>
      <script>
        $(function () {
          $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
          });
        });
      </script>
    </body>
  </html>
  `
}