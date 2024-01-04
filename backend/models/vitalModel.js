const mongoose = require('mongoose')

const PatVitalsSchema = new mongoose.Schema({
    patID : {
        type : String,  
    },
    temperature: {
        type : String
    },
    bloodpressurerate: {
        type : String
    }, 
    bloodgroup: {
        type : String
    },
    genenotype: {
        type : String
    }, 
    heartrate: {
        type : String
    },
    respiratoryrate: {
        type : String
    },
    oxygensaturation: {
        type : String
    },
    weight: {
        type : String
    },
    height: {
        type : String
    },
    painscale: {
        type : String
    },
    nursenotes: {
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

const PatVitals = mongoose.model('PatVitals', PatVitalsSchema)

module.exports = PatVitals