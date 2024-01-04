import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import billService from './billService'
import { extractErrorMessage } from '../utils'


const initialState = {
    bills:  null,
    bill: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register new patient
export const createBill = createAsyncThunk(
    'bills/create',
    async (patientData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await billService.createBill(patientData, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

// Get patients
export const getBills = createAsyncThunk(
    'bills/getbills',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().bill.user.token
        return await billService.getBills(token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )
  
  // Get patient
  export const getBill = createAsyncThunk(
    'bills/getbill',
    async (userId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().bill.user.token
        return await billService.getBill(userId, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

  // delete Patient
export const deleteBill = createAsyncThunk(
  'bills/delete',
  async (patId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await billService.deleteBill(patId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)



export const billSlice = createSlice({
    name:'bill',
    initialState,
    reducers: {
        reset: (state) =>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(createBill.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(createBill.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(createBill.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getBills.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getBills.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getBills.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getBill.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getBill.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getBill.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(deleteBill.fulfilled, (state, action) => {
          state.bill = action.payload
          state.bills = state.bills.map((bill) =>
            bill._id === action.payload._id ? action.payload : bill
          )
        })
        
    }
})

export const {reset} = billSlice.actions
export default billSlice.reducer