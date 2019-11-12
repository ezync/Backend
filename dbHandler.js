var mysql = require('mysql');
var crypto = require('crypto');
var conf = require('./config.js');
var {createUserTable,createUserPwTable, createActivityTable,
    createCompanyPwTable, createCompanyTable, createEventTable} = require('./queries.js');
var {companySchemas, userSchemas,
    activitySchemas, eventSchemas} = require('./schemas.js')
var {type, positions, industries} = require('./constants.js')

class databaseHandler {
	/**
	 * @constructor
	 */
	constructor() {
        this.Description = 'Database Handler for Ezync interface';
        this.con = null;
    }
    
    async start() {
        this.con = mysql.createConnection(conf);

        this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });
        this.con.query("CREATE DATABASE IF NOT EXISTS Ezynctest", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
        this.con.query("use Ezynctest", function (err, result){
            if (err) throw err;
            console.log("Using 'Ezynctest' database");
        });
        
        this.createTable(createUserTable, "User");
        this.createTable(createUserPwTable, "Password - User");
        this.createTable(createCompanyPwTable, "Password - Company");
        this.createTable(createActivityTable, "Activity");
        this.createTable(createCompanyTable, "Company");
        this.createTable(createEventTable, "Events");
    }

    /**
     * Helper function to run query
     * 
     * @param {String} query 
     * @param {String} table
     */
    async createTable(query, table = ""){
        this.con.query(query, function (err, result){
            if (err) throw err;
            console.log(`${table} table created`);
        });
    }

    /**
     * a filtering function for mysql to make process easier
     * 
     * @param {String} X 
     * @param {String} Y 
     * @param {Value} value 
     */
    async getXbyY(X, Y, value){
        const query = `SELECT * FROM ${X} WHERE ${Y} = '${value}'`;
        this.con.query(query, function (err, result){
            if (err) throw err;
            return result;
        });
    }

    /**
     * ADD USER TO DATABASE
     * 
     * @param {Object} user - User schemas
     */
    async addUserDB(user, password){

        let query = `INSERT INTO user(name, email, picture,
                status, companies, linkedin, position, state)`;
        query += `VALUES('${user.name}', '${user.email}', '${user.picture}', 
                '${user.status}', '${user.companies.join()}',
                '${user.linkedin}','${user.position}', '${user.state}')`;
        this.con.query(query,  function (err, result){
            if (err) throw err;
            console.log(`[USER] ${user.name} succesully added`);
        });

        var hash = crypto.createHash('md5').update(password).digest('hex');
        query = `INSERT INTO userpw(name, password)`;
        query += `VALUES('${user.name}', '${hash}')`;

        this.con.query(query,  function (err, result){
            if (err) throw err;
            console.log(`[PASSWORDUSER] ${user.name} succesully added`);
        });
    }

    /**
     * ADD COMPANY TO DATABASE
     * 
     * @param {Object} company - Company schemas
     */
    async addCompanyDB(company, password){
        let query = `INSERT INTO company(name, logo, background_image,
                founded_on,email, description, industries, 
                activities, individuals, state)`;
        query += `VALUES('${company.name}', '${company.logo}', '${company.background_image}',
                '${company.founded_on}', '${company.email}', 
                '${company.description}', '${company.industries}',
                '${company.activities.join()}','${company.individuals.join()}', '${company.state}')`;
        this.con.query(query,  function (err, result){
            if (err) throw err;
            console.log(`[COMPANY] ${company.name} succesully added`);
        });

        var hash = crypto.createHash('md5').update(password).digest('hex');

        query = `INSERT INTO companypw(name, password)`;
        query += `VALUES('${company.name}', '${hash}')`;

        this.con.query(query,  function (err, result){
            if (err) throw err;
            console.log(`[PASSWORDCOMPANY] ${company.name} succesully added`);
        });
    }

    /**
     * ADD ACTIVITY TO DATABASE
     * 
     * @param {Object} activity - Activity schemas
     */
    async addActivityDB(activity){
        let query = `INSERT INTO activity(date, time, text,
                media, type, company)`;
        query += `VALUES('${activity.date}', '${activity.time}', 
                '${activity.text}', '${activity.media}', 
                '${activity.type}', '${activity.company}')`;
        this.con.query(query,  function (err, result){
            if (err) throw err;
            console.log(`[ACTIVITY] ${activity.text.slice(0,10)}... succesully added`);
        });
    }

    /**
     * ADD EVENT TO DATABASE
     * 
     * @param {Object} event - Event schemas
     */
    async addEventDB(event){
        let query = `INSERT INTO event(name, date, time, 
                place, description, companies, activities)`;
        query += `VALUES('${event.name}','${event.date}', 
                '${event.time}', '${event.place}', '${event.description}', 
                '${event.companies.join()}', '${event.activities.join()}')`;
        this.con.query(query,  function (err, result){
            if (err) throw err;
            console.log(`[EVENT] ${event.name}... succesully added`);
        });
    }

    /**
     * VERIFY THE EXISTENCE OF A USER
     * 
     * @param {String} name - username
     * @param {String} password - password
     */
    async verifyUser(name, password, callback){
        var hash = crypto.createHash('md5').update(password).digest('hex');
        console.log(name, hash)
        let query = `SELECT EXISTS(SELECT * FROM userpw WHERE `;
        query += `(name = '${name}' AND password = '${hash}'))`;
        this.con.query(query,  function (err, result){
            if (err) throw err;
            var rows = JSON.parse(JSON.stringify(result[0]));
            let out = false;
            for (var i  in rows){
                if (rows[i] === 1){
                    out = true;
                }
            }
            
            return callback(out);
        });
    }
    /**
     * VERIFY THE EXISTENCE OF A Company
     * 
     * @param {String} name - username
     * @param {String} password - password
     */
    async verifyCompany(name, password, callback){
        var hash = crypto.createHash('md5').update(password).digest('hex');
        let query = `SELECT EXISTS(SELECT * FROM companypw WHERE `;
        query += `(name = '${name}' AND password = '${hash}'))`;
        this.con.query(query,  function (err, result){
            if (err) throw err;
            var rows = JSON.parse(JSON.stringify(result[0]));
            let out = false;
            for (var i  in rows){
                if (rows[i] === 1){
                    out = true;
                }
            }
            return callback(out);
        });
    }
}

module.exports = databaseHandler;