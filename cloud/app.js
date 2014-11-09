// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var intel = require('intel');

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

intel.config({
  formatters: {
    'simple': {
      'format': '[[%(date)s] %(levelname)s-%(name)s:: %(message)s',
      'colorize': true
    },
    'details': {
      'format': '[%(date)s] %(name)s.%(levelname)s: %(message)s',
      'strip': true
    }
  },
  handlers: {
    'terminal': {
      'class': intel.handlers.Console,
      'formatter': 'simple',
      'level': intel.VERBOSE
    }
  },
  loggers: {
    'app': {
      'handlers': ['terminal'],
      'level': 'DEBUG',
      'handleExceptions': true,
      'exitOnError': false,
      'propagate': false
    }
  }
});

var logger = intel.getLogger('app');
logger.debug('some debug info');
logger.warn('some warn info');
logger.info('some info');
logger.error(new Error('this is an error!'));


// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();