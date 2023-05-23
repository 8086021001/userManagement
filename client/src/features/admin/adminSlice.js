import axios from 'axios'
import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';
axios.defaults.withCredentials = true;


const initialState = {
    loading: false,
    success: false,
    getUsers:false,
    users: {},
    error: ''
}

export const logginAdmin = createAsyncThunk('admin/logginadmin', async (user) => {
    const response = await axios.post('http://localhost:5000/admin/login', user)
    const data = response.data
    return data
})


export const getUsers = createAsyncThunk('admin/getUsers', async () => {
    const response = await axios.get('http://localhost:5000/admin/getUser', {withCredentials: true})
    const data = response.data
    console.log(data)
    return data

})

export const deleteUser = createAsyncThunk('admin/deleteUsers', async (id) => {
    const response = await axios.delete(`http://localhost:5000/admin/deleteUser/${id}`, {withCredentials: true})
    return response.data
})


export const searchUsers = createAsyncThunk('admin/search', async (text) => {
    const response = await axios.post(`http://localhost:5000/admin/search`, {
        search: text
    }, {
        withCredentials: true
    },)
    return response.data
})

export const editUser = createAsyncThunk('admin/editUsers', async ({user, editId}) => {
    const response = await axios.put(`http://localhost:5000/admin/edit/${editId}`, {
        user
    }, {withCredentials: true})
    return response.data
})


const admin = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        adminReset:(state)=>{
            state.loading = false;
            state.success = false;
            state.getUsers = false;
            state.error= ""

        }
    },
    extraReducers: builder => {
        builder.addCase(logginAdmin.pending, state => {
            state.loading = true;
        })
        builder.addCase(logginAdmin.fulfilled, (state, action) => {

            state.loading = false;
            state.success = true;
            state.users = action.payload;
        })
        builder.addCase(logginAdmin.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(getUsers.pending, state => {
            state.loading = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.getUsers= true;
            state.users = action.payload.users;
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(editUser.pending, state => {
            state.loading = true;
            state.success = false
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        })
        builder.addCase(editUser.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.error.message
        })
        builder.addCase(searchUsers.pending, state => {
            state.loading = true;
        })
        builder.addCase(searchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.users = action.payload.users;
        })
        builder.addCase(searchUsers.rejected, (state, action) => {
            state.loading = false
            state.success = false;
            state.error = action.error.message
        })
        builder.addCase(deleteUser.pending, state => {
            state.loading = true;
            state.success = false
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            console.log("delete is fullfilled", action.payload)
            state.loading = false;
            state.success = true;
            state.users = action.payload.users
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.success = false;
            state.error = action.error.message
        })

    }
})

export default admin.reducer
export const {adminReset} = admin.actions
