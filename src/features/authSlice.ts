import { createSlice } from "@reduxjs/toolkit";

type User = {
    [key:string]: any
}

type AuthState = {
    user: User | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        
    }

})


export default authSlice.reducer