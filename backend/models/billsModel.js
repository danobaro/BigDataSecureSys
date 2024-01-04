const mongoose = require('mongoose')

const PatBillsSchema = new mongoose.Schema({
    patID : {
        type : String, 
    },
    TypeOfPatient: {
        type : String
    },
    ListOfItems: {
        type : String
    },
    TotalBill: {
        type : String
    },
    Discount: {
        type : String
    },
    AccNote: {
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

const PatBills = mongoose.model('PatBills', PatBillsSchema)

module.exports = PatBills