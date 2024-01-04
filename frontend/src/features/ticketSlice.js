import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService'
import { extractErrorMessage } from '../utils';

const initialState = {
  tickets: [],
  ticket: null,
  isLoading: false,
  isError: false,
  errorMessage: ''
};

export const createTicket = createAsyncThunk(
  'tickets/createTicket',
  async (ticketData, thunkAPI) => {
    try {
      const newTicket = await ticketService.createTicket(ticketData);
      return newTicket;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updateTicket = createAsyncThunk(
  'tickets/updateTicket',
  async ({ ticketId, ticketData }, thunkAPI) => {
    try {
      const updatedTicket = await ticketService.updateTicket(ticketId, ticketData);
      return updatedTicket;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteTicket = createAsyncThunk(
  'tickets/deleteTicket',
  async (ticketId, thunkAPI) => {
    try {
      await ticketService.deleteTicket(ticketId);
      return ticketId;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const fetchAllTickets = createAsyncThunk(
  'tickets/fetchAllTickets',
  async (_, thunkAPI) => {
    try {
      const tickets = await ticketService.getAllTickets();
      return tickets;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const fetchTicketById = createAsyncThunk(
  'tickets/fetchTicketById',
  async (ticketId, thunkAPI) => {
    try {
      const ticket = await ticketService.getTicketById(ticketId);
      return ticket;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.push(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        );
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(deleteTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = state.tickets.filter((ticket) => ticket._id !== action.payload);
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchAllTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchTicketById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  }
});

export const { resetState } = ticketSlice.actions;
export default ticketSlice.reducer;
