import { configureStore } from '@reduxjs/toolkit'
import { cashReducer } from './cashSlice';

export const store = configureStore({
  reducer: { 
    cashReducer: cashReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
