
const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const path = require('path');
const booking = require('booking.js')

var reservations = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//home/reservations page
app.get('/reserve', (req, res) => {
    res.sendFile(path.join(__dirname, 'reserve.html'));
});

//view tables page
app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, 'tabls.html'));
});

app.get('/api/tables', (req, res) => {
    isFull();
})
//posting data from the submitted form
$(document).ready(() => {
    $('submit').on('click', () =>{
        $.ajax({
            url: '/api/tables',
            method: 'POST'
        }).done((response) => {
            reservations.push(response);
            var newBooking = new Booking(response);
            filltable(newBooking);
        })
    })
})

function fillTable(res) {
    if (reservations.length < 5) {
        //add reservation
        let newWell = $('<div>').addClass('well');
        let id = res.id;
        newWell.append(id);
        $('#reservation-panel').append(newWell);
        alert('Your table is booked.');

    } else {
        //add to waitlist
        let newWell = $('<div>').addClass('well');
        let id = res.id;
        newWell.append(id);
        $('#waiting-panel').append(newWell);
        alert('No reservations, you have been added to the waitlist.')
    }
}


function isFull(){
    if 
}

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});