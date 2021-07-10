import {createSlice} from "@reduxjs/toolkit";
import { RootState } from "../app/store";


const initialState = {
    screenLocation: ""
}


export const pageTransitions = createSlice({
    name: "page",
    initialState,
    reducers: {
        changePage: (state, {payload}) => {
            state.screenLocation = payload;
        }
    }
})


export const {changePage} = pageTransitions.actions;

export const selectPage = (state: RootState) => state.page.screenLocation; 

export default pageTransitions.reducer;