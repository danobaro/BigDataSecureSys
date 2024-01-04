const mongoose = require('mongoose')

const PatientsSchema = new mongoose.Schema({
    patId : {
        type : String,
    },
    name : {
        type : String,
    },
    dob : {
        type : String,
    },
    age : {
        type : Number,
    },
    email : {
        type : String,
    },
    address : {
        type : String,
    },
    sex : {
        type : String,
    },
    phone : {
        type : String,
    },
    marital : {
        type : String,
    },
    image : {
        type : String,
    },
},
{
    timestamps: true,
  })

const Patient = mongoose.model('Patient', PatientsSchema)

module.exports = Patient