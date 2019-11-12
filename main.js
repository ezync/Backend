const express = require('express');
const _ = require('lodash');

const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-routes.js');
const { type ,positions,industries} = require('./constants.js')

const {companySchemas, userSchemas,
    activitySchemas, eventSchemas} = require('./schemas.js')

var app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);


app.use(function(req, res, next) {  // Enable cross origin resource sharing (for app frontend)
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next(); 
    }
});

app.listen(3031, () => {
    console.log("Database running on port 3031");
});

app.get("/api/v1/accepted-industry", (req, res, next) => {
    res.send({data:industries});
});


