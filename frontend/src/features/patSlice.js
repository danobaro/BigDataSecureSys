import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import patService from './patService'
import { extractErrorMessage } from '../utils'


const initialState = {
    patients:  null,
    patient: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register new patient
export const regPatient = createAsyncThunk(
    'patients/create',
    async (patientData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await patService.regPatient(patientData, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

// Get patients
export const getPatients = createAsyncThunk(
    'patients/getpatients',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().patient.user.token
        return await patService.getPatients(token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )
  
  // Get patient
  export const getPatient = createAsyncThunk(
    'patients/getpatient',
    async (userId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().patient.user.token
        return await patService.getPatient(userId, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

  // delete Patient
export const deletePatient = createAsyncThunk(
  'patients/delete',
  async (patientId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await patService.deletePatient(patientId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)



export const patSlice = createSlice({
    name:'patient',
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
        .addCase(regPatient.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(regPatient.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(regPatient.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getPatients.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getPatients.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getPatients.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getPatient.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getPatient.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getPatient.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(deletePatient.fulfilled, (state, action) => {
          state.patient = action.payload
          state.patients = state.patients.map((patient) =>
            patient._id === action.payload._id ? action.payload : patient
          )
        })
        
    }
})

export const {reset} = patSlice.actions
export default patSlice.reducer