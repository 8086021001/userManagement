import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    AdminauthState: JSON.parse(localStorage.getItem('admin')) ? JSON.parse(localStorage.getItem('admin')) : null
}


const authSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminAuth: (state) => {
            state.AdminauthState = JSON.parse(localStorage.getItem('admin'))
        },
        clearAdminAuth: (state) => {
            state.AdminauthState = null
        }
    }
})


export default authSlice.reducer
export const {setAdminAuth, clearAdminAuth} = authSlice.actions;
