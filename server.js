const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Route functions
const usersRouter = require('./routes/users');
const imagesRouter = require('./routes/images')
const examsRouter = require('./routes/exams');
const attemptsRouter = require('./routes/attempts');
const reportRouter = require('./routes/reports');
const adminsRouter = require('./routes/admins')

// Route directions
app.use('/users', usersRouter);
app.use('/images', imagesRouter);
app.use('/exams', examsRouter);
app.use('/attempts', attemptsRouter);
app.use('/reports', reportRouter );
app.use('/admins', adminsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});