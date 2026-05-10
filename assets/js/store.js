import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice.js"
import boardsReducer from "./features/boards/boardsSlice"
import listsReducer from "./features/lists/listsSlice"
import cardsReducer from "./features/cards/cardsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
  },
})