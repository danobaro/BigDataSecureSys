const mongoose = require('mongoose')

const PatLabSchema = new mongoose.Schema({
    patID : {
        type : String,
    },
    TypeOfTest: {
        type : String
    },
    SampleType: {
        type : String
    },
    TestResult: {
        type : String
    },
    LabNote: {
        type : String
    },
    TestImage: {
        type : String
    },
},
{
    timestamps: true,
  })

const PatLab = mongoose.model('PatLab', PatLabSchema)

module.exports = PatLab