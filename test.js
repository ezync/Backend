var mysql = require('mysql');
var conf = require('./config.js');

var con = mysql.createConnection(conf);

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS zyngk", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
    con.query("use zyngk", function (err, result){
        if (err) throw err;
        console.log("Using 'zyngk' database")
    });

    var createCompanyTable = `
    CREATE TABLE IF NOT EXISTS company (
        id int(11) NOT NULL auto_increment,
        name varchar(100) NOT NULL,
        logo varchar(100) NOT NULL,
        founded_on varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        description varchar(100) NOT NULL,
        industries varchar(100) NOT NULL,
        activities varchar(100) NOT NULL,
        individuals varchar(100) NOT NULL,
        PRIMARY KEY (id)
    )`;

    var createActivityTable = `
    CREATE TABLE IF NOT EXISTS activity (
        id int(11) NOT NULL auto_increment,
        date varchar(100) NOT NULL,
        text varchar(100) NOT NULL,
        media varchar(100) NOT NULL,
        company varchar(100) NOT NULL,
        PRIMARY KEY (id)
    )`;

    var createUserTable = `
    CREATE TABLE IF NOT EXISTS user (
        id int(11) NOT NULL auto_increment,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        status varchar(100) NOT NULL,
        companies varchar(100) NOT NULL,
        linkedin varchar(100) NOT NULL,
        PRIMARY KEY (id)
    )`;

    var createEventTable = `
    CREATE TABLE IF NOT EXISTS event (
        id int(11) NOT NULL auto_increment,
        name varchar(100) NOT NULL,
        date varchar(100) NOT NULL,
        time varchar(100) NOT NULL,
        place varchar(100) NOT NULL,
        description varchar(100) NOT NULL,
        companies varchar(100) NOT NULL,
        activities varchar(100) NOT NULL,
        PRIMARY KEY (id)
    )`;
  });