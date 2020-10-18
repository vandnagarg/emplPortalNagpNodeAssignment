const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const server = require('app')
//const io = require('socket.io')(3000);

const auth = require('./middleware/auth')
const session = require('express-session');
const authRouter = require('./routes/auth');
const openingsRouter = require('./routes/opening');
const applyRouter = require('./routes/jobApply');

const db = require('./database/db');

require('./config/passport')

const app = express();

const server = app.listen(3000,function(){
 console.log("server is running on port 3000");
});

var io = require('socket.io').listen(server);

io.on('connection', socket => {
  // either with send()
  // socket.send('Hello!');

  // or with emit() and custom event names
  // socket.emit('greetings', 'Hey!', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on('jobapplied', (data) => {
    console.log(data);
    console.log("job applied by ",data.user ,"for opening : ", data.opening);
  });

  // handle the event sent with socket.emit()
  socket.on('openingClosed', (data) => {
    console.log('Opening : ', data.projName, ' has been closed by : ', user);
  });
});

db.connectToDatabase(process.env.DB_URL);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(
  {
    secret:'secret',
    key:process.env.SECRET_KEY,
    cookie:{
      httponly:false
    },
    resave:true,
    saveUninitialized:true
  }
))
app.use('/', openingsRouter);
app.use('/opening',openingsRouter); 
app.use('/auth', authRouter);
app.use('/jobapply', applyRouter);

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
