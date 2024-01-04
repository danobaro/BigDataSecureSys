import axios from 'axios';

const API_URL = '/api/ticket';

const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(API_URL, ticketData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const updateTicket = async (ticketId, ticketData) => {
  try {
    const response = await axios.put(`${API_URL}/${ticketId}`, ticketData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const deleteTicket = async (ticketId) => {
  try {
    await axios.delete(`${API_URL}/${ticketId}`);
    return ticketId;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getAllTickets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getTicketById = async (ticketId) => {
  try {
    const response = await axios.get(`${API_URL}/${ticketId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const ticketService ={
  createTicket,
  updateTicket,
  deleteTicket,
  getAllTickets,
  getTicketById
}

export default ticketService