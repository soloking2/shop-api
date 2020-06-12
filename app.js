const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const thingsRouter = require('./routes/thingsRoutes');
const usersRouter = require('./routes/userRoutes');

mongoose.connect('mongodb://localhost/thingsAPI')
.then(() => {
  debug(chalk.yellow('Successfully connected to MongoDB'))
}).catch(err => debug(chalk.red(err)));



const app = express();
const port = process.env.PORT || 8000;


app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', usersRouter);
app.use('/api', thingsRouter);
app.use('/', (req, res) => {
  res.send('A fullstack API');
});

app.listen(port, () => {
  debug(chalk.green(`connecting to port ${port}`));
})