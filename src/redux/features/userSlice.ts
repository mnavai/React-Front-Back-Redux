import { PayloadAction,createSlice } from "@reduxjs/toolkit";
import { IUser } from "../api/types";


interface IUserState{
    user:IUser | null;
}

const initialState : IUserState = {
    user: null
}


// this returened object name userSlice is having the reducres and actions that can be used
// for inhection with other middlewares
export const userSlice = createSlice({
    initialState,
    name: "userSlice",
    reducers :{
        logout:()=>initialState,
        setUser: (state, action: PayloadAction<IUser>)=>{
            state.user=action.payload;
        },
    }
});

export default userSlice.reducer;
export const {logout, setUser}= userSlice.actions