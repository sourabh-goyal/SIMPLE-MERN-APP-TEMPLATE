/**
 * Express configuration
 */

 'use strict';

 import morgan from 'morgan';
 import compression from 'compression';
 import bodyParser from 'body-parser';
 import errorHandler from 'errorhandler';
 import cors from 'cors';

 
 module.exports = function(app) {
   app.use(compression());
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());
   app.use(cors());
   app.use(morgan('dev'));
   app.use(errorHandler()); // Error handler - has to be last
 };