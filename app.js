var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session') ;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var apiRouter = require('./routes/api');
var spRouter = require('./routes/product');
var staffRouter = require('./routes/staff');
var customerRouter = require('./routes/customer');
var invoiceRouter = require('./routes/invoice');
var statisticRouter = require('./routes/statistic');
var homeRouter = require('./routes/home');
// var tkRouter = require('./routes/taikhoan');
var loginRouter = require('./routes/login');

var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'nhvhi3432j492j35nfdshfúydfy2h3nksjdfh9',
  resave:true,
  saveUninitialized:true
 }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/api', apiRouter );
app.use('/',spRouter);
app.use('/',staffRouter);
app.use('/',customerRouter);
app.use('/',invoiceRouter);
app.use('/',statisticRouter);
app.use('/',homeRouter);
// app.use('/',tkRouter);
app.use('/',loginRouter);

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
  if (req.originalUrl.indexOf('/api')==0) {
    // link bat dau bang api la truy cap vao trang API => thong bao loi kieu api
    res.json( {
      status: 0,
      msg: err.message

    } )
  } else{
    // render the error page
  
    res.render('error');
  }

});

module.exports = app;
