import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import labsService from './labsService'
import { extractErrorMessage } from '../utils'


const initialState = {
    labs:  null,
    lab: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register new patient
export const createLabs = createAsyncThunk(
    'labs/create',
    async (patientData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await labsService.createLabs(patientData, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

// Get patients
export const getLabs = createAsyncThunk(
    'labs/getlabs',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().labs.user.token
        return await labsService.getLabs(token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )
  
  // Get Labs
  export const getLab = createAsyncThunk(
    'labs/getlab',
    async (userId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().lab.user.token
        return await labsService.getLab(userId, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

  // delete Patient
export const deleteLabs = createAsyncThunk(
  'labs/delete',
  async (patId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await labsService.deleteLabs(patId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)



export const labsSlice = createSlice({
    name:'lab',
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
        .addCase(createLabs.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(createLabs.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(createLabs.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getLabs.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getLabs.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getLabs.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getLab.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getLab.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getLab.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(deleteLabs.fulfilled, (state, action) => {
          state.lab = action.payload
          state.labs = state.labs.map((lab) =>
            lab._id === action.payload._id ? action.payload : lab
          )
        })
        
    }
})

export const {reset} = labsSlice.actions
export default labsSlice.reducer