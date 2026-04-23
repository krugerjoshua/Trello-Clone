import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {registerUser, loginUser} from "./authAPI"

export const register = createAsyncThunk("auth/register", async (credentials, {rejectWithValue}) => {
  try {
    return await registerUser(credentials)
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const login = createAsyncThunk("auth/login", async (credentials, {rejectWithValue}) => {
  try {
    return await loginUser(credentials)
  } catch (err) {
    return rejectWithValue(err)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    errors: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
        state.errors = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.errors = action.payload
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.errors = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.errors = action.payload
      })
  },
})

export const {logout} = authSlice.actions
export default authSlice.reducer