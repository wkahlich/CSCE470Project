'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
    console.log(req.body);
    res.render('output', { title: req.body['genre'], message: "howdy" });
});

/* Example function on how to access what is passed from the form in index.pug */
function redirectToOutput(req, res) {
    res.render('output', { genre: req.body });
}

router.get('/output', function (req, res) {
    res.render('output', { title: 'Hello', message: 'Hello there!' });
});

module.exports = router;
