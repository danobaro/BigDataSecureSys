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
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    },
},
{
    timestamps: true,
  })

const PatLab = mongoose.model('PatMed', PatLabSchema)

module.exports = PatLab