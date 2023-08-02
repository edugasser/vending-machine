import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserProps } from './components/cash';

const initialState: UserProps = {
    full_name: "",
    username: "",
    balance: 0
}

export const cashSlice = createSlice({
    name: 'cash',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setFullName: (state, action: PayloadAction<string>) => {
            state.full_name = action.payload
        },
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload
        },
        resetState: (state) => {
            state.full_name = initialState.full_name;
            state.username = initialState.username;
            state.balance = initialState.balance;
        }
    }
});

export const { setUserName, setFullName, setBalance, resetState } = cashSlice.actions;
export const cashReducer = cashSlice.reducer;
