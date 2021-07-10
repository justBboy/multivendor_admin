import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {vendorType} from "../../constants/types";

interface StateInterface{
    selectedVendor: vendorType | null;
}

const initialState: StateInterface= {
    selectedVendor: null
}

export const vendorSlice = createSlice({
    name: "vendors",
    initialState,
    reducers: {
        setSelectedVendor: (state, {payload}) => {
            state.selectedVendor = payload;
        }
    }
})

export const { setSelectedVendor } = vendorSlice.actions;

export const selectSelectedVendor = (state:RootState) => state.vendors.selectedVendor;

export default vendorSlice.reducer;