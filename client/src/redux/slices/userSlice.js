import { createSlice } from "@reduxjs/toolkit";

/*
    userSlice:
        * Store user data in redux store for authentication
        * Provide actions to change store
*/
const initialState ={
    isLoggedIn:false,
    id:null,
    email:null,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInUser:(state,action)=>{
                state.isLoggedIn=true
                state.id = action.payload.id
                state.email=action.payload.email
        },
        signOutUser:(state,action)=>{
            state.isLoggedIn=false;
            state.id=null;
            state.email=null;
        }

    }
});

export const {signInUser , signOutUser} = userSlice.actions
export default userSlice.reducer;