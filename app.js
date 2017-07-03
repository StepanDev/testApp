const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const passport = require('passport');

const index = require('./server/routes/index');
const users = require('./server/routes/Users');
const auth = require('./server/services/auth');
const permission = require('./server/routes/Permission');
const refBook = require('./server/routes/RefBook');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(config.root, 'server/views'));
app.use(express.static(path.join(config.root, 'static')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


app.use('/', index);
app.use('/users', users);
app.use('/permission', permission);
app.use('/refBook', refBook);

// app.use('/index', index);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.trace(err);

  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(config.db, {
  // user: config.user,
  // pass: config.pass
});
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

module.exports = app;
