const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Cors
const cors = require('cors');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// end of declarations

const mongoose = require('mongoose');

mongoose.connect('mongodb://database:27017/martians')
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });

const spaceshipRouter = require('./routes/spaceships');
const mothershipRouter = require('./routes/motherships');
const passengerRouter = require('./routes/passengers');
const inspectionRouter = require('./routes/inspections');

const apiBaseUrl = '/api';

app.use(`${apiBaseUrl}/spaceships`, spaceshipRouter);
app.use(`${apiBaseUrl}/motherships`, mothershipRouter);
app.use(`${apiBaseUrl}/passengers`, passengerRouter);
app.use(`${apiBaseUrl}/inspections`, inspectionRouter);

app.use('**', (req, res, next) => {
    res.sendStatus(404);
});

app.use((req, res, next) => {
    next(createError(404))
});


app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
