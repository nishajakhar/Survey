const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
let Handlebars = require('handlebars');
const moment = require('moment');

const mode = process.env.MODE || 'development';

const path = require('path');
const {connection} = require('./config/dbConnection');
const {APP_URL, port} = require('./config/constants')
// const morgan = require('morgan');
// const helmet = require('helmet');


const indexRouter = require('./routes/v1/index.route');
app.use('/uploads', express.static('uploads'));


var hbs = expressHbs.create({
  extname: 'hbs',
  defaultLayout : 'layout',
  layoutsDir : __dirname +'/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
  // helpers: handleBarHelpers.helperFunction
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs'); 
// app.use(express.static(`${__dirname}/public`));

Handlebars.registerHelper('formatDate', function(date) {
  return moment.unix(date).format('lll');
});
Handlebars.registerHelper('eq', function(arg1, arg2, options) {
  if( options.fn ) {
    if (arg1 == arg2) return options.fn(this);
  } else arg1 == arg2;
});


app.use(bodyParser.json());
app.use(bodyParser({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));


//MySQL Database Connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Mysql!");
});

//MongoDB Database Connection
mongoose.connect('mongodb://localhost/Survey')
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));


// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);
app.use('/', indexRouter);
app.listen(port, () => {
    console.log(`App is running at ${APP_URL} in ${mode} mode`);
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;




