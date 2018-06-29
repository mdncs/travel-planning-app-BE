const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');

const comments = (req, res, next) => {
    return axios.get('https://jsonplaceholder.typicode.com/comments')
    .then(({ data }) => {
        res.send({ data })
    })
    .catch(err => next(err));
}

const users = (req, res, next) => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(({ data }) => {
        res.send({ data })
    })
    .catch(err => next(err));
}

const posts = (req, res, next) => {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(({ data }) => {
            res.send({ data })
        })
        .catch(err => next(err));
}

app.get('/', (req, res) => res.send('Hello!'));
app.get('/comments', comments);
app.get('/posts', posts);
app.get('/users', users);

app.listen(3000, () => console.log('Example app listening on port 3000!'))