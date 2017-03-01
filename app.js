
const express = require('express');
const app = express();
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const PORT = 3000;


app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', routes);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, function () {
    console.log('Server listening on port 3000');
});
module.exports = routes;
