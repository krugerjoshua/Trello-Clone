import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {fetchBoards, createBoard} from "./boardsAPI"

export const getBoards = createAsyncThunk("boards/getBoards", async (_, {rejectWithValue, getState}) => {
  try {
    const token = getState().auth.token
    return await fetchBoards(token)
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const addBoard = createAsyncThunk("boards/addBoard", async (title, {rejectWithValue, getState}) => {
  try {
    const token = getState().auth.token
    return await createBoard(token, title)
  } catch (err) {
    return rejectWithValue(err)
  }
})

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.loading = true
        state.errors = null
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.loading = false
        state.boards = action.payload
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.loading = false
        state.errors = action.payload
      })
      .addCase(addBoard.pending, (state) => {
        state.loading = true
        state.errors = null
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.loading = false
        state.boards.push(action.payload)
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.loading = false
        state.errors = action.payload
      })
  },
})

export default boardsSlice.reducer