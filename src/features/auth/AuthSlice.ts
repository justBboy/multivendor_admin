import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface stateInterface{
    user : {
        id: string;
        displayName: string,
        email: string;
        phoneNumber: string;
        photoUrl: string;
    } | null
}

const initialState: stateInterface = {
  user : null
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, {payload}) => {
            state.user = payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})


export const {login, logout} = AuthSlice.actions;

export const selectUser = (state:RootState) => state.auth.user;

export default AuthSlice.reducer
