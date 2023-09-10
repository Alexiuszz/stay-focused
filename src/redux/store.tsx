import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from "./slices/settings-slice"
import dataReducer from "./slices/data-slice"


// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    settings: settingsReducer,
    data: dataReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch