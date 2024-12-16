//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

const cors = require('cors');

var express = require('express');
var app = express();
var pool = require('./mysql-connector');
const routerDispositivo = require('./routes/dispositivos')


const corsOptions = {
    origin: '*',
}

var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

var authenticator = function (res, res, next) {
    next()
    res.send({message: 'Datos incorrectos'}).status(403)
}

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));
// to enable cors
app.use(cors(corsOptions))
app.use(myLogger)

app.use('/dispositivo', routerDispositivo)


app.get('/', function(req, res, next) {
    res.send({'mensaje': 'Hola DAM'}).status(200);
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});