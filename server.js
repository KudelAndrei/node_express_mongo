import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';

import config from './config';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
  if (err) throw err;
  console.log('Mongo connected!');
});

app.listen(config.port, err => {
  if (err) throw err;
  console.log(`Server listening on port ${config.port}`);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret
}));

app.use('/api', routes);
app.use(errorHandler);