// require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
app.use(bodyParser.json());

// GLOBAL CONF
app.use(require('./routes/index'));

// Habilitar public
// app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/', express.static(__dirname + '/public'));
// app.get('/', function(req, res, next) {
//   res.status(200).sendFile(path.join(__dirname+'/public/index.html')); 
// });
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}`);
});