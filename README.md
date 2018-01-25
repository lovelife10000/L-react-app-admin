# L-react-app-admin


### 开发

```
$ git clone git@github.com/lovelife10000/L-react-app-admin.git
$ cd L-react-app-admin
$ npm install
$ npm run dev
```
在浏览中打开http://localhost:3001


### 调试
- redux-logger 默认开启, 关闭方法

```
webpack-> webpack.config.dev.client.js -> __DEVLOGGER__ : false
```

- redux-devtools 默认使用chrome扩展, [Redux DevTools Chrome Extension](https://github.com/zalmoxisus/redux-devtools-extension) , 网页方式默认关闭, 开启方法:

```
webpack-> webpack.config.dev.client.js -> __DEVTOOLS__ : true
```

### 目录结构
```
.
├── README.md           
├── dist                     // 项目build目录
├── logs                     // 生产环境日志目录
├── app                      // 生产目录
│   ├── actions              // redux action目录
│   ├── api                  // API 请求
│   ├── assets               // css 和图片资源
│   ├── components           // 组件
│   ├── reducers             // redux reducer目录
│   ├── store                // store配置
│   ├── util                 // 工具函数
│   └── client               // 客户端入口
│   └── config               // api url, cookie domain等配置文件
│   └── routes               // 路由配置
│   └── server               // 服务端渲染文件
├── server                   // 项目server入口文件
├── webpack                  // Webpack配置目录
│   ├── webpack.config.dev.client.js        // 开发的客户端Webpack配置文件
│   ├── webpack.config.dev.server.js        // 开发的服务端渲染Webpack 配置文件
│   ├── webpack-config-prod.js              // 生产的Webpack 配置文件
├── History.md               // 更新日志
├── nodemon.json             // nodemon配置文件
├── process.json             // pm2配置文件
.
```

### 生产环境构建  
 
```
$ npm run build
```

### 线上布署
```
$ pm2 start process.json
```

### License
MIT