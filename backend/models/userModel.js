const mongoose = require('mongoose')

const StaffSchema = new mongoose.Schema({
       name : {
        type : String,
        
    },
    dob : {
        type : String,
        
    },
    age : {
        type : Number,
        
    },
    designature : {
        type : String,
        
    },
    level : {
        type : String,
        
    },
    email : {
        type : String,
        unique: true
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
    nationality : {
        type : String,
        
    },
    state : {
        type : String,

    },
    lga : {
        type : String,

    },
    image : {
        type : String,
    },
    password: {
        type: String,
      },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
      },
},
{
    timestamps: true,
  })

const Staff = mongoose.model('Staff', StaffSchema)

module.exports = Staff