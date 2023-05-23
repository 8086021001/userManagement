import {Route, Routes} from 'react-router-dom';
import './App.css';
import Headers from './components/Headers';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import PublicRoutes from './utils/PublicRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Profile from './components/Profile';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';
import AdminLogin from './components/AdminLogin';
import AdminPublicRoutes from './utils/AdminPublicRoutes';
import AdminDashboard from './components/AdminDashboard';
import EditUser from './components/EditUser';

function App() {
    return (
        <div>

            <Routes>

                <Route path="/"
                    element={<PublicRoutes/>}>
                    <Route exact path="/"
                        element={
                            <Headers></Headers>
                        }/>
                    <Route path="/user/login"
                        element={<Login/>}/>
                    <Route path="/user/signup"
                        element={<Signup/>}/>
                </Route>


                <Route path="/"
                    element={<ProtectedRoutes/>}>
                    <Route path="/home"
                        element={<Home/>}/>
                    <Route path='/profile'
                        element={<Profile/>}/>
                </Route>
                <Route path='/admin/*'
                    element={<AdminPublicRoutes/>}>
                    <Route path='login'
                        element={<AdminLogin/>}/>

                </Route>
                <Route path="/adminIn/*"
                    element={<AdminProtectedRoutes/>}>
                    <Route path="dashboard"
                        element={<AdminDashboard/>}/>
                    <Route path='editUser/:id' element={<EditUser/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
