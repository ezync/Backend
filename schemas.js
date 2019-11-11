const companySchemas = function () {
    this.id = null;
    this.name = '';
    this.logo = '';
    this.background_image='';
    this.founded_on = '';
    this.email = '';
    this.description = '';
    this.industries = '';
    this.activities = [];
    this.individuals = [];
    this.state = 0;
}

const activitySchemas = function () {
    this.id = null;
    this.date = '';
    this.time = '';
    this.text = '';
    this.media = '';
    this.type = 'Other';
    this.companies = [];
}

const userSchemas = function ()  {
    this.id = null;
    this.name = '';
    this.email = '';
    this.picture = '';
    this.status = 'Hi !';
    this.companies = [];
    this.linkedin = '';
    this.position = '';
    this.state = 0;
}

const eventSchemas = function () {
    this.id = null;
    this.name = '';
    this.date = '';
    this.time = '';
    this.place = '';
    this.description = '';
    this.companies = [];
    this.activities = [];
}

module.exports = {
    companySchemas,
    userSchemas,
    activitySchemas,
    eventSchemas,
}