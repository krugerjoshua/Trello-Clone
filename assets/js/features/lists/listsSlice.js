import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {fetchLists, createList} from "./listsAPI"

export const getLists = createAsyncThunk("lists/getLists", async (boardId, {rejectWithValue, getState}) => {
  try {
    const token = getState().auth.token
    return await fetchLists(token, boardId)
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const addList = createAsyncThunk("lists/addList", async ({boardId, title}, {rejectWithValue, getState}) => {
  try {
    const token = getState().auth.token
    return await createList(token, boardId, title)
  } catch (err) {
    return rejectWithValue(err)
  }
})

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLists.pending, (state) => {
        state.loading = true
        state.errors = null
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.loading = false
        state.lists = action.payload
      })
      .addCase(getLists.rejected, (state, action) => {
        state.loading = false
        state.errors = action.payload
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload)
      })
  },
})

export default listsSlice.reducer