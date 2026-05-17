import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLists, createList, deleteList, updateList } from "./listsAPI";

export const getLists = createAsyncThunk(
    "lists/getLists",
    async (boardId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            return await fetchLists(token, boardId);
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const addList = createAsyncThunk(
    "lists/addList",
    async ({ boardId, title }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            return await createList(token, boardId, title);
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const removeList = createAsyncThunk(
    "lists/removeList",
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            return await deleteList(token, id);
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const moveList = createAsyncThunk(
    "lists/moveList",
    async ({ listId, position }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            return await updateList(token, listId, { position });
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

const listsSlice = createSlice({
    name: "lists",
    initialState: {
        lists: [],
        loading: false,
        errors: null,
    },
    reducers: {
        reorderLists(state, action) {
            const { sourceIndex, destIndex } = action.payload;
            const list = state.lists.splice(sourceIndex, 1)[0];
            state.lists.splice(destIndex, 0, list);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLists.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(getLists.fulfilled, (state, action) => {
                state.loading = false;
                state.lists = action.payload;
            })
            .addCase(getLists.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(addList.fulfilled, (state, action) => {
                state.lists.push(action.payload);
            })
            .addCase(removeList.fulfilled, (state, action) => {
                state.lists = state.lists.filter((l) => l.id !== action.payload);
            });
    },
});

export const { reorderLists } = listsSlice.actions;
export default listsSlice.reducer;