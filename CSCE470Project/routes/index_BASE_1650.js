'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
    console.log(req.body);
    res.send(formatData(req));
});

/* Example function on how to access what is passed from the form in index.pug */
function formatData(req) {
    return "You selected " + req.body['genre'];
}

module.exports = router;
