// ... Import statements
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../utils'
import vitalsService from './vitalsService'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}
export const createVitals = createAsyncThunk(
  'vitals/create',
  async (patientData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vitalsService.createVitals(patientData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getVitals = createAsyncThunk(
  'vitals/getvitals',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vitalsService.getVitals(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getVital = createAsyncThunk(
  'vitals/getvital',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vitalsService.getVital(userId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteVitals = createAsyncThunk(
  'vitals/delete',
  async (patId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vitalsService.deleteVitals(patId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const vitalsSlice = createSlice({
  name: 'vital',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVitals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVitals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vitals = action.payload;
      })
      .addCase(createVitals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.vitals = null;
      })
      .addCase(getVitals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVitals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vitals = action.payload;
      })
      .addCase(getVitals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.vitals = null;
      })
      .addCase(getVital.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVital.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vital = action.payload;
      })
      .addCase(getVital.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.vital = null;
      })
      .addCase(deleteVitals.fulfilled, (state, action) => {
        state.vital = action.payload;
        state.vitals = state.vitals.map((vital) =>
          vital._id === action.payload._id ? action.payload : vital
        );
      });
  },
});

export const { reset } = vitalsSlice.actions;
export default vitalsSlice.reducer;
