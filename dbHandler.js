var mysql = require('mysql');

var conf = require('./config.js');
var {createUserTable, createActivityTable,
    createCompanyTable, createEventTable} = require('./queries.js');
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
    async getXbyYString(X, Y, value){
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
    async addUserDB(user){
        if (!positions.includes(user.position)){
            console.error('Unknown Position');
            return;
        }

        if (user.status.length>40){
            console.error('Status is too long (max 40)');
            return;
        }
        let query = `INSERT INTO user(name, email, picture,
                status, companies, linkedin, position)`;
        query += `VALUES('${user.name}', '${user.email}', '${user.picture}', 
                '${user.status}', '${user.companies.join()}',
                '${user.linkedin}','${user.position}')`;
        this.con.query(query,  function (err, result){
            if (err) throw err;
            console.log(`[USER] ${user.name} succesully added`);
        });
    }

    /**
     * ADD COMPANY TO DATABASE
     * 
     * @param {Object} company - Company schemas
     */
    async addCompanyDB(company){
        if (!industries.includes(company.industries)){
            console.error('Unknown Industry');
            return;
        }

        if (company.description.length>40){
            console.error('Description is too long (max 40)');
            return;
        }

        let query = `INSERT INTO company(name, logo, background_image,
                founded_on,email, description, industries, 
                activities, individuals)`;
        query += `VALUES('${company.name}', '${company.logo}', '${company.background_image}',
                '${company.founded_on}', '${company.email}', 
                '${company.description}', '${company.industries}',
                '${company.activities.join()}','${company.individuals.join()}')`;
        this.con.query(query,  function (err, result){
            if (err) throw err;
            console.log(`[COMPANY] ${company.name} succesully added`);
        });
    }

    /**
     * ADD ACTIVITY TO DATABASE
     * 
     * @param {Object} activity - Activity schemas
     */
    async addActivityDB(activity){
        if (!type.includes(activity.type)){
            console.error('Unknown activity type');
            return;
        }
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

        if (event.description.length>40){
            console.error('Description is too long (max 40)');
            return;
        }

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
}

module.exports = databaseHandler;