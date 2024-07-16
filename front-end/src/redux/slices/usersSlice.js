import { createSlice } from "@reduxjs/toolkit"
import { loginUser,registerUser } from "../../service/userService"

const initialState = {
    currentUser: {},
    isLogged: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logOut: (state) => {
            state.currentUser = {}
            state.isLogged = false
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.fulfilled, (state,{payload}) => {
            if (payload.message == "Login successful") {
                state.currentUser = payload.user
                state.isLogged = true
            }
        })
        builder.addCase(registerUser.fulfilled, (state,{payload}) => {
            state.currentUser = {}
        })
    }
})

export const {logOut} = usersSlice.actions

export default usersSlice.reducer