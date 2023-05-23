import axios from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


axios.defaults.withCredentials = true;


const initialState = {
    loading: false,
    success: false,
    user: {},
    editSuccess: false,
    msg: "",
    error: ''

}

// Generates pending, fulfilled and rejected action types
export const registerUser = createAsyncThunk('user/registerUser', async (user) => {
    const response = await axios.post('http://localhost:5000/user/signUp', user)
    const data = response.data
    return data
})

export const logginUser = createAsyncThunk('user/logginUser', async (user) => {
    const response = await axios.post('http://localhost:5000/user/logIn', user)
    const data = response.data
    return data
})

export const logoutUser = createAsyncThunk('user/logoutUser', async (user) => { // console.log(user);
    return await axios.get('http://localhost:5000/user/logOut', user).then(response => response.data)
})

export const getUser = createAsyncThunk('user/getUser', async () => {
    const response = await axios.get('http://localhost:5000/user/home', {withCredentials: true})
    const data = response.data
    return data
})

export const uploadProfile = createAsyncThunk('user/postProfile', async ({formData, id}) => {
    const response = await axios.put(`http://localhost:5000/user/update/${id}`, formData, {withCredentials: true})
    const data = response.data
    return data
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUserReset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = '';
        },
        logginUserReset: (state) => {
            state.loading = false;
            state.success = false;
            state.editSuccess = false
            state.user = {};
            state.error = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log(action.payload.message)
            state.loading = false;
            state.success = true;
            state.error = '';
            state.msg = action.payload.message
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.code
        })
        builder.addCase(logginUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(logginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload
        })
        builder.addCase(logginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.code
        })
        builder.addCase(logoutUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.success = false;
            state.user = {};
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(uploadProfile.pending, state => {
            state.loading = true;
            state.editSuccess = false;
        })
        builder.addCase(uploadProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.editSuccess = true;
            state.user = action.payload;
        })
        builder.addCase(uploadProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

    }
})

export default userSlice.reducer
export const {registerUserReset, logginUserReset} = userSlice.actions;
