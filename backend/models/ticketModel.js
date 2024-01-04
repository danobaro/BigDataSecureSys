const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  patID: {
    type: String,
  },
  ticketNumber: {
    type: String,
    unique: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  department: {
    type: String,
  },
  doctor: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  status: {
    type: String,
    enum: ['new', 'open', 'closed'],
    default: 'new',
  },
  description: {
    type: String,
  },
  notes: {
    type: String
  }
});

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;
