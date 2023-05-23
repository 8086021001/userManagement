import {configureStore} from '@reduxjs/toolkit';
// import adminReducer from './features/Admin/adminSlice';
import authReducer from '../features/Auth/auth'
import userReducer from '../features/user/userSlice'
import AdminAuthReducer from '../features/Auth/adminAuth'
import adminReducer from '../features/admin/adminSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        adminauth: AdminAuthReducer,
        admin: adminReducer
    }
})


export default store
