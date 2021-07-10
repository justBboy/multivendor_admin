import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { adminType } from "../../constants/types";

interface StateInterface{
    selectedAdmin: adminType  | null;
}

const initialState: StateInterface= {
    selectedAdmin: null
}

export const adminsSlice = createSlice({
    name: "admins",
    initialState,
    reducers: {
        setSelectedAdmin: (state, {payload}) => {
            state.selectedAdmin= payload;
        }
    }
})

export const { setSelectedAdmin} = adminsSlice.actions;

export const selectSelectedAdmin = (state:RootState) => state.admins.selectedAdmin;

export default adminsSlice.reducer;