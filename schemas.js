const companySchemas = {
    id : null,
    name : '',
    logo : '',
    background_image:'',
    founded_on : '',
    email : '',
    description : '',
    industries : '',
    activities : [],
    individuals : []
}

const activitySchemas = {
    id : null,
    date : '',
    time : '',
    text : '',
    media : '',
    type : 'Other',
    companies : []
}

const userSchemas = {
    id : null,
    name : '',
    email : '',
    picture : '',
    status : 'Hi !',
    companies : [],
    linkedin : '',
    position : ''
}

const eventSchemas = {
    id : null,
    name : '',
    date : '',
    time : '',
    place : '',
    description : '',
    companies : [],
    activities : []
}

module.exports = {
    companySchemas,
    userSchemas,
    activitySchemas,
    eventSchemas
}