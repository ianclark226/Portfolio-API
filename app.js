const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//const sendGrid = require('@sendGrid/mail');
var nodemailer = require('nodemailer');

require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  }
});



const app = express();


app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.get('/api', (req, res, next) => {
    res.send('API Status: Running')
});


app.post('/api/email', (req, res, next) => {

  var mailOptions = {
    to: 'ianclark226@gmail.com',
        from: req.body.email,
        subject: 'Website Contact',
        text: req.body.message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    

    

   
       
});


app.listen(3030, '0.0.0.0');

