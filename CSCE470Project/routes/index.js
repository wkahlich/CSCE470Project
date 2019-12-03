'use strict';
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
router.post('/results/', function (req, res) {
    console.log(JSON.stringify(req.body));
    // Solr URL used to send requests to the API.


    var numRows = 10;
    //var url = 'http://localhost:8983/solr/moviedb/select?q=genres.name%3A' + req.body['genre'] + '&rows=' + numRows + '&start=0';
    var url = getURL("\"" + req.body['genre'] + "\"", req.body["Q2"], req.body["Q3"], req.body["Q4"], req.body["Q5"], req.body["Q6"], req.body["Q7"], numRows);
    console.log('URL: ' + url);

    fetch(url)
        .then((response) => {
            response.text().then((solrResponse) => {
                res.render('results', { results: solrResponse });
            });
        });

});

function getURL(q1, q2, q3, q4, q5, q6, q7, numRows) {
    // 1) What is your favorite genre?
    var url = 'http://localhost:8983/solr/moviedb/select?q=genres.name%3A' + q1;

    // 2) Do ratings of movies impact your choise of movie?
    if (q2 === 'Yes') {
        url += ' AND popularity%3A[5 TO 10]';
    }

    // 3) Do you prefer recent releases or old movies?
    if (q3 === 'Recent') {
        url += ' AND release_date%3A[2000-01-01T00%3A00%3A00Z TO 2020-01-01T00%3A00%3A00Z]';
    }
    else if (q3 === 'Old') {
        url += ' AND release_date%3A[1900-01-01T00%3A00%3A00Z TO 2000-01-01T00%3A00%3A00Z]';
    }

    // 4) Do you prefer English speaking movies or International?
    if (q4 === 'English Speaking') {
        url += ' AND original_language%3Aen';
    }
    else if (q4 === 'International') {
        url += ' AND NOT original_language%3Aen';
    }

    // 5) Do you watch animated movies?
    if (q5 === 'No') {
        url += ' AND NOT genres.name%3AAnimation';
    }

    // 6) Do you watch family/kids movies?
    if (q6 === 'No') {
        url += ' AND NOT genres.name%3AFamily';
    }

    // 7) Do you/Would you watch/enjoy TV movies?
    if (q7 === 'No') {
        url += ' AND NOT genres.name%3A"TV Movie"';
    }

    url += '&rows=' + numRows + '&start=0';
    return url;
}

/* Example function on how to access what is passed from the form in index.pug */
function redirectToOutput(req, res) {
    res.render('output', { genre: req.body });
}

router.get('/output', function (req, res) {
    res.render('output', { title: 'Hello', message: 'Hello there!' });
});

module.exports = router;
