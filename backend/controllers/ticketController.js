const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel');

// Create a new ticket
exports.createTicket = asyncHandler (async (req, res) => {
     const { patID, ticketNumber, department, doctor, priority, description, notes } = req.body;
    
        if (!patID) {
            res.status(400)
            throw new Error('Ensure the patient Id is entered')
          }
        const ticket = await Ticket.create({
          patID,
          ticketNumber,
          department,
          doctor,
          status: 'new',
          priority: 'low',
          description,
          notes
        })
    
        res.status(201).json(newTicket);
    })
  

// Update a ticket
exports.updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { department, doctor, priority, description } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        department,
        doctor,
        priority,
        description
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the ticket.' });
  }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findByIdAndDelete(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }

    res.json({ message: 'Ticket deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the ticket.' });
  }
};

// View all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the tickets.' });
  }
};

// View a single ticket
exports.getTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the ticket.' });
  }
};
