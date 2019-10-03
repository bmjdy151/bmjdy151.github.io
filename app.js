var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const Spacebrew = require('spacebrew');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const risoRouter = require('./routes/riso');
const vacuRouter = require('./routes/vacu');
const glassRouter = require('./routes/glass');
const postRouter = require('./routes/post');
const registerRouter = require('./routes/register');
const fbRouter = require('./routes/fb');
var app = express();

require("dotenv").config();

//Connect Mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(connection => {
    console.log("successfully connected");
  })
  .catch(err => {
    console.log(err);
  });

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

//Spacebrew setup
// const server = "sandbox.spacebrew.cc";
const server = "localhost";
const name = "testclient";
const description = "test Tick tock";
const sb = new Spacebrew.Client( server, name, description );

//Spacebrew Publisher
sb.addPublish("button_pressed", "string", "The tick of a clock!");  // create the publication feed

//Spacevrew Subscriber 
sb.addSubscribe("testsubscriber", "boolean", false);

sb.onBooleanMessage = function onBooleanMessage( name, value){
  console.log("Message from boolean server: "+value);
};

// connect to spacbrew
sb.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/riso', risoRouter);
app.use('/vacu', vacuRouter);
app.use('/glass', glassRouter);
app.use('/post', postRouter);
app.use('/register', registerRouter);
app.use('/fb', fbRouter);

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
  res.render('error');
});

module.exports = app;
