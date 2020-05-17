const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rp = require('request-promise');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

//--------------------------------- HANDLERS ---------------------------------

const roomHandler = (req, res) => {
    let room = req.params.roomID
    console.log('room: ', room);
    res.send({room})
}

//----------------------------------------------------------------------------

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/room/:roomID', roomHandler)

app.listen(process.env.PORT || 8080);