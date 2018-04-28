const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')


const bodyParser = require('body-parser');
const appConfig = require('../app/config/app.config');

const app = express()

let isDev = process.env.NODE_ENV === 'development'
let port = isDev ? appConfig.devPort : appConfig.prodPort

app.use(express.static(path.join(__dirname, '..', 'dist')))

if (isDev) {
    const config = require('../webpack/dev-client.js')
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
}


app.set('view engine', 'ejs')//开发模式时，采用ejs模版引擎的文件作为响应
app.set('views', path.join(__dirname, '..', 'dist'))
app.use(favicon(path.join(__dirname, '..', 'app', 'assets/img/favicon.ico')))
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(bodyParser.json({limit: '50mb'}));


app.get('*', function (req, res, next) {
    if (isDev) {
        res.render('../app/assets/index.ejs');
    } else {
        var serverRender = require('../dist/serverRender')
        serverRender.default(req, res)
    }

})

app.listen(port, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    }
})




