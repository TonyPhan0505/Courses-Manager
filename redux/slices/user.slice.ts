import { createSlice } from "@reduxjs/toolkit";

type UserObject = {
    username: string | undefined;
    password: string | undefined;
};

const initialCurrentUser: UserObject = {
    username: undefined,
    password: undefined
};
const initialUsers: UserObject[] = [];

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: initialCurrentUser,
        users: initialUsers,
        isSignedIn: 2 // 0 = failed login, 1 = successful login, 2 = waiting for inputs
    },
    reducers: {
        loginUser: (state, action) => {
            const user = action.payload;
            state.currentUser = user;
            state.isSignedIn = 1;
        },
        fetchUsers: (state, action) => {
            const users = action.payload;
            state.users = users;
        },
        logoutUser: (state) => {
            state.currentUser = initialCurrentUser;
            state.isSignedIn = 2;
        },
        failedLogin: (state) => {
            state.isSignedIn = 0;
        }
    }
});

export const { 
    loginUser,
    fetchUsers,
    logoutUser,
    failedLogin
} = userSlice.actions;

export default userSlice.reducer;