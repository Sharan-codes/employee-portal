var bodyParser = require('body-parser');
const { port } = require('./config');
const express = require('express');
var session = require('express-session');
require('./src/db/mongoose');
const employeeRouter = require('./src/routers/employeeRouter');
const managerRouter = require('./src/routers/managerRouter');

const app = express();

app.use(express.json());
app.use(express.static('src/public'));
app.use(bodyParser.urlencoded({ 
  extended: true
}));
app.use(session({
  secret: 'djhxcvxfgshjfgjhgsjhfgakjeauytsdfy',
  resave: false,
  saveUninitialized: true
}));
app.use(employeeRouter);
app.use(managerRouter);

app.set('views', __dirname+'\\src\\views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});