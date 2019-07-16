var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db=require('./db')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var branchRouter=require('./routes/branch');
var fileRouter=require('./routes/file');
var patientRouter=require('./routes/patient_route');


var cors=require('cors')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist/App')));
app.use(cors())


app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, multipart/form-data');
    next();
})


app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/branch', branchRouter);
app.use('/api/file',fileRouter);
app.use('/api/pat',patientRouter);


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
 
});

module.exports = app;
