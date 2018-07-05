const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use('/api', apiRouter);

// error handling
app.use('/*', (req, res, next) => {
    next({ status: 404, msg: 'Page not found' });
});

app.use((err, req, res, next) => {
    console.log(err)

    err.status
        ? res.status(err.status).send(err.msg)
        : res.status(500).send('Internal server error');
})

module.exports = app;