var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter=require('./routes/upload')

var vertoken=require('./token/token')
var expressJwt=require('express-jwt')
var app = express();

var log=require('./logs/log')
log.use(app)

//设置跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Headers", "content-type,Authorization,X-Requested-With");
    next();
});

//解析token获取用户信息
app.use(function(req, res, next) {
    var token = req.headers['authorization'];
    if(token === undefined){
        return next();
    }else{
        vertoken.getToken(token).then((data)=> {
            req.data = data;
            return next();
        }).catch((error)=>{
            return next();
        })
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//设置托管静态目录; 项目根目录+ public.可直接访问public文件下的文件eg:http://localhost:3000/images/url.jpg
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', uploadRouter);

//验证token是否过期并规定那些路由不需要验证
app.use(expressJwt({
    secret:'zgs_first_token',
    algorithms:['HS256']
}).unless({
    path:['/login','/register']
}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//token失效返回信息
app.use(function(err,req,res,next){
    // console.log('app.js')
    if(err.status==401){
        return res.json({
            code:1,
            message:'token失效',
            status:401
        })
    }
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//上线后取消注释
module.exports = app;
