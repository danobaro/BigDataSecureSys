import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
import { extractErrorMessage } from '../utils'

//Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register new user
export const register = createAsyncThunk (
    'auth/register', async (user, thunkAPI) =>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (
            error.response && 
            error.response.data && 
            error.response.data.message
            ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get users
export const getUsers = createAsyncThunk(
    'auth/getusers',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getUsers(token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )
  
  // Get user
  export const getUser = createAsyncThunk(
    'auths/getuser',
    async (userId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getUser(userId, token)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )

// Login user
export const login = createAsyncThunk (
    'auth/login', async (user, thunkAPI) =>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (
            error.response && 
            error.response.data && 
            error.response.data.message
            ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Logout user

export const logout = createAsyncThunk(
    'auth/logout', async () =>{
    await authService.logout()
})


export const authSlice = createSlice({
    name:'auth',
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
        .addCase(register.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getUsers.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getUsers.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getUsers.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        .addCase(getUser.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getUser.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(getUser.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        
        .addCase(login.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) =>{
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer