var createCompanyTable = `
    CREATE TABLE IF NOT EXISTS company (
        id int(11) NOT NULL PRIMARY KEY auto_increment UNIQUE,
        name varchar(100) NOT NULL UNIQUE,
        logo varchar(100) NOT NULL,
        background_image varchar(100) NOT NULL,
        founded_on varchar(100) NOT NULL,
        email varchar(100) NOT NULL UNIQUE,
        description varchar(100) NOT NULL,
        industries varchar(100) NOT NULL,
        activities varchar(100) NOT NULL,
        individuals varchar(100) NOT NULL,
        state tinyint(1) NOT NULL
    )`;

var createActivityTable = `
    CREATE TABLE IF NOT EXISTS activity (
        id int(11) NOT NULL PRIMARY KEY auto_increment UNIQUE,
        date varchar(100) NOT NULL,
        time varchar(100) NOT NULL,
        text varchar(100) NOT NULL,
        media varchar(100) NOT NULL,
        type varchar(100) NOT NULL,
        company varchar(100) NOT NULL
    )`;

var createUserTable = `
    CREATE TABLE IF NOT EXISTS user (
        id int(11) NOT NULL PRIMARY KEY auto_increment UNIQUE,
        name varchar(100) NOT NULL UNIQUE,
        email varchar(100) NOT NULL UNIQUE,
        picture varchar(100) NOT NULL,
        status varchar(100) NOT NULL,
        companies varchar(100) NOT NULL,
        linkedin varchar(100) NOT NULL UNIQUE,
        position varchar(100) NOT NULL,
        state tinyint(1) NOT NULL
    )`;

var createUserPwTable = `
    CREATE TABLE IF NOT EXISTS userpw (
        id int(11) NOT NULL PRIMARY KEY auto_increment UNIQUE,
        name varchar(100) NOT NULL UNIQUE,
        password varchar(100) NOT NULL
    )`;

var createCompanyPwTable = `
    CREATE TABLE IF NOT EXISTS companypw (
        id int(11) NOT NULL PRIMARY KEY auto_increment UNIQUE,
        name varchar(100) NOT NULL UNIQUE,
        password varchar(100) NOT NULL
    )`;

var createEventTable = `
    CREATE TABLE IF NOT EXISTS event (
        id int(11) NOT NULL PRIMARY KEY auto_increment UNIQUE,
        name varchar(100) NOT NULL,
        date varchar(100) NOT NULL,
        time varchar(100) NOT NULL,
        place varchar(100) NOT NULL,
        description varchar(100) NOT NULL,
        companies varchar(100) NOT NULL,
        activities varchar(100) NOT NULL
    )`;

module.exports = {
    createUserTable,
    createActivityTable,
    createCompanyTable,
    createUserPwTable,
    createCompanyPwTable,
    createEventTable
}

