import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserProps } from './components/cash';

const initialState: UserProps = {
    user_name: "",
    balance: 0
}

export const cashSlice = createSlice({
    name: 'cash',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.user_name = action.payload
        },
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload
        },
        resetState: (state) => {
            state.user_name = initialState.user_name;
            state.balance = initialState.balance;
        }
    }
});

export const { setUserName, setBalance, resetState } = cashSlice.actions;
export const cashReducer = cashSlice.reducer;
