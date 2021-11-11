const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Job = require('./models/jobs');
const User = require('./models/users');

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const connectDatabase = require('./config/database');
const errorMiddleware = require('./middlewares/errors');
const ErrorHandler = require('./utils/errorHandler');


//Setting up config.env file variables
dotenv.config({path: './config/config.env'});

// Handling Uncaught Exception
process.on('uncaughtException', err =>{
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});

//Connecting to database
connectDatabase();


//Setup body parser
app.use(express.json());

// Set cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

// Prevent parameter pollution
app.use(hpp());

// Setup CORS - Accessible by other domains
app.use(cors());


//Importing all routes 
const jobs = require('./routes/jobs');
const auth = require('./routes/auth');
const user = require('./routes/user');
const { Mongoose } = require('mongoose');

// Using the api routes
app.use('/api/v1', jobs);
app.use('/api/v1', auth);
app.use('/api/v1', user);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.
    NODE_ENV} mode.`);
});

// Handling Unhandled Promise Rejections
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to handled promise rejection.')
  server.close( () => {
      process.exit(1);
  });
});

