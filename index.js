// Backend JS

const express = require('express');
const cors = require('cors');
const goodreads = require('goodreads-api-node');
const bodyParser = require('body-parser')
const app = express();
const port = 8080;


app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


const credentials = {
  key:'RDfV4oPehM6jNhxfNQzzQ',
  secret:'fu8fQ5oGQEDlwiICw45dGSuxiu13STyIrxY0Rb6ibI'
};

const gr = goodreads(credentials);


// Search Route
app.get('/search', function (req, res) {
    const page = req.query.page || 1;
    const query = req.query.query || "";

    gr.searchBooks({
        q: query,
        page: page
    }).then(function (results) {
      return res.json(results);
    }).catch(function (e) {
        console.log("Goodreads Search Books Rejected", e.message);
    });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

