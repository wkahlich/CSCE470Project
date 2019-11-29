'use strict';
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/results/', function (req, res) {
    // Solr URL used to send requests to the API.
    var numRows = 10;
    var url = 'http://localhost:8983/solr/moviedb/select?q=genres.name%3A' + req.body['genre'] + '&rows=' + numRows + '&start=0';

    fetch(url)
        .then((response) => {
            response.text().then((solrResponse) => {
                res.render('results', { results: solrResponse });
            });
        });

});

/* Example function on how to access what is passed from the form in index.pug */
function formatData(req) {
    return "You selected " + req.body['genre'];
}

module.exports = router;
