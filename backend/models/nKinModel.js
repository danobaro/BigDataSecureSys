const mongoose = require('mongoose')

const PatNOKSchema = new mongoose.Schema({
    patID : {
        type : String,  
    },
    NName: {
        type : String
    },
    NAddress: {
        type : String
    },
    NSex: {
        type : String
    },
    NPhone: {
        type : String
    },
    NEmail: {
        type : String
    },
    NRelationship: {
        type : String
    },
    },
{
    timestamps: true,
  })

const PatNOK = mongoose.model('PatNOK', PatNOKSchema)

module.exports = PatNOK