const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');

const {companySchemas, userSchemas,
    activitySchemas, eventSchemas} = require('./schemas.js')
const dbHandler = require('./dbHandler.js');

const db = new dbHandler();

db.start()

/*
var gateway = express();

//Here we are configuring express to use body-parser as middle-ware.
gateway.use(bodyParser.urlencoded({ extended: false }));
gateway.use(bodyParser.json());

gateway.listen(3031, () => {
    console.log("Database running on port 3031");
});

gateway.post("/api/v1/signup", async (req, res, next) => {
    var newCompany = req.body.new;
    var companyName = null;
    if (newCompany){
        var company = new companySchemas();
        company.name = req.body.name_company;
        company.logo = req.body.logo_company;
        company.founded_on = req.body.founded_on_company;
        company.email = req.body.email_company;
        company.description = req.body.description_company;
        company.industries = req.body.industry_company;
        await db.addCompanyDB(company);
        companyName = req.body.name_company;
    }else{
        companyName = req.body.company;
    }
    //var password = req.body.pw;
    var user = new userSchemas();
    user.name = req.body.name;
    user.email= req.body.email;
    user.linkedin= req.body.linkedin;
    var comp = await db.getXbyY('company', 'name', companyName);
    user.companies = user.companies.concat(comp.id);
    await db.addUserDB(user);
});
*/