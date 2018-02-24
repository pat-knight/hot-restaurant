const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const booking = require('./reservation.js')

var tables = [];
var waitlist = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//home/reservations page
app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, 'reserve.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'reserve.html'));
});

//view tables page
app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, 'tables.html'));
});

app.get('/api/tables', (req, res) => {
    res.send({
        tables: tables,
        waitlist: waitlist    
    });
});

app.post('/api/reserve', (req, res) => {
    if (tables.length < 6) {
        tables.push(req.body);
        res.send('Table succesfully booked');
    } else {
        waitlist.push(req.body);
        res.send('No tables. You have been added to the waitlist');
    }
    res.send(res.body);
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});