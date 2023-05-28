var createError = require('http-errors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json') 

var app = express();
var options = {
   customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.css',
  customCss: '.swagger-ui .opblock-tag.no-desc span{font-size: 16px;} .swagger-ui .opblock-body pre.microlight .headerline:nth-child(6){display:none},.swagger-ui .opblock-body pre.microlight .headerline:nth-child(8){display:none},.swagger-ui .scheme-container .schemes>label select{padding: 8px;},.swagger-ui .body-param-options label select{padding: 8px}'
};
//swagger 路徑
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile,options))
// to support JSON-encoded bodies
app.use(bodyParser.json())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var productRouter = require('./routes/product');
app.use('/product', productRouter)
//var itemRouter = require('./routes/item');
//app.use('/item', itemRouter)

app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
