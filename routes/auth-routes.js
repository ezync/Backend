
const { type ,positions,industries} = require('../constants.js')

const {companySchemas, userSchemas,
    activitySchemas, eventSchemas} = require('../schemas.js')
const dbHandler = require('../dbHandler.js');

const db = new dbHandler();

db.start()

const router = require('express').Router();

router.post("/api/v1/sign-up-user", async (req, res, next) => {
    console.log(req.body)
    var password = req.body.pw;
    var user = new userSchemas();
    user.name = req.body.name;
    user.email= req.body.email;
    user.linkedin= req.body.linkedin;
    await db.addUserDB(user, password);
});

router.post("/api/v1/sign-up-company", async (req, res, next) => {
    console.log(req.body)
    var password = req.body.pw;
    var company = new companySchemas();
    company.name = req.body.name;
    company.founded_on = req.body.founded_on;
    company.email = req.body.email;
    company.description = req.body.description;
    company.industries = req.body.industry;
    await db.addCompanyDB(company, password);
});

router.post("/api/v1/sign-in-user", (req, res, next) => {
    var password = req.body.pw;
    var username = req.body.name;
    db.verifyUser(username, password, (result) => {
        console.log(result);
        if (result){
            res.send('you are logged in');
        }
    })
});

router.post("/api/v1/sign-in-company", (req, res, next) => {
    var password = req.body.pw;
    var username = req.body.name;
    db.verifyCompany(username, password, (result) => {
        console.log(result);
        if (result){
            res.send('you are logged in as company');
        }
    })
});

router.get('/logout', (req, res) =>{
    //handle with passport
    res.send('logging out')
})
router.get('/google', (req, res)=>{
    //handle with passport
    res.send('logging in with google')
})

module.exports = router;