import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import kinsService from './nKinService'
import { extractErrorMessage } from '../utils'


const initialState = {
    kins:  null,
    kin: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register new patient
export const createKins = createAsyncThunk(
    'kins/create',
    async (patientData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await kinsService.createKin(patientData, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

// Get patients
export const getKins = createAsyncThunk(
    'kins/getkins',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().Kins.user.token
        return await kinsService.getKins(token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )
  
  // Get patient
  export const getKin = createAsyncThunk(
    'kins/getvkin',
    async (userId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().Kin.user.token
        return await kinsService.getKin(userId, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

   // update patient
   export const updateKin = createAsyncThunk(
    'kins/updatekin',
    async (userId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().Kin.user.token
        return await kinsService.updateKin(userId, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

  // delete Patient
export const deleteKins = createAsyncThunk(
  'kins/delete',
  async (patId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await kinsService.deleteKins(patId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)



export const kinsSlice = createSlice({
    name:'kin',
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
        .addCase(createKins.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(createKins.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(createKins.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getKins.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getKins.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getKins.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getKin.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getKin.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getKin.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(deleteKins.fulfilled, (state, action) => {
          state.kin = action.payload
          state.kins = state.kins.map((kin) =>
            kin._id === action.payload._id ? action.payload : kin
          )
        })
        
    }
})

export const {reset} = kinsSlice.actions
export default kinsSlice.reducer