const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Import Routes
const authRoute = require('./routes/auth');
const teacherRoute = require('./routes/teacher');
const bodyParser = require('body-parser');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to db!'));

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/teachers', teacherRoute);

// start the server
app.listen(3000, () => console.log("Server up and running"));