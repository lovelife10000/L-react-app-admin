const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const debug = require('debug')('express-app');
const serverRender = require('../dist/server');
const bodyParser = require('body-parser');

const app = express()
let isDev = process.env.NODE_ENV === 'development'
let defaultPort = isDev ? 3001 : 3001
let port = process.env.PORT || defaultPort

app.use(express.static(path.join(__dirname, '..', 'dist')))

if (isDev) {
  const config = require('../webpack/webpack.config.dev.client.js')
  const compiler = require('webpack')(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    hot: true,
    inline: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }))
  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use(favicon(path.join(__dirname,'..', 'dist', 'favicon.ico')))
  app.set('views', path.join(__dirname, '..', 'dist'))
  app.set('view engine', 'ejs')
}
app.use(express.static(path.join(__dirname, '..', 'dist')))
// app.use(favicon(path.join(__dirname,'..', 'dist', 'favicon.ico')))
app.set('views', path.join(__dirname, '..', 'dist'))
app.set('view engine', 'ejs')
app.use(bodyParser.json({limit: '50mb'}));

app.get('*', function (req, res, next) {
  debug('what is default', serverRender.default);
  serverRender.default(req, res)
})

app.listen(port, function (err) {
  if (err) {
    console.error(err)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})

// mongoose.connect('mongodb://admin:admin@120.27.7.163:27017/blog', function (err) {
//   if (err) {
//     console.log('数据库连接失败');
//   } else {
//     console.log('数据库连接成功');
//     console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
//     app.listen(port);
//   }
// });


