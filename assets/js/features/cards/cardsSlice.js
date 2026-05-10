import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCards, createCard, deleteCard } from "./cardsAPI";

export const getCards = createAsyncThunk(
    "cards/getCards",
    async (listId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            return await fetchCards(token, listId);
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const addCard = createAsyncThunk(
    "cards/addCard",
    async ({ listId, title }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            return await createCard(token, listId, title);
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const removeCard = createAsyncThunk(
    "cards/removeCard",
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;
            return await deleteCard(token, id);
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

const cardsSlice = createSlice({
    name: "cards",
    initialState: {
        cards: [],
        loading: false,
        errors: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                state.cards = action.payload;
            })
            .addCase(addCard.fulfilled, (state, action) => {
                state.cards.push(action.payload);
            })
            .addCase(removeCard.fulfilled, (state, action) => {
                state.cards = state.cards.filter(
                    (c) => c.id !== action.payload,
                );
            });
    },
});

export default cardsSlice.reducer;
