const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const questionGroupRoutes = require('./routes/question-group');
const questionRoutes = require('./routes/question');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(questionGroupRoutes);
app.use(questionRoutes);

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log(err));
