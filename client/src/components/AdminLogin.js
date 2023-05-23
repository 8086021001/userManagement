import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Avatar
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useDispatch, useSelector} from 'react-redux';
import {adminReset, logginAdmin} from '../features/admin/adminSlice';
import {setAdminAuth} from '../features/Auth/adminAuth';

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const adminState = useSelector((state) => {
        return(state.admin)
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const admin = {
            email,
            password
        };
        if(admin.email===""&&admin.password==""){
            alert("please provide credentials")
        }else{
            dispatch(logginAdmin(admin));
        }
        
    };

    useEffect(() => {
        if (adminState.success) {
            const token = adminState.users.token;
            if (! token) {
                setError(adminState.users.message);
            } else {
                localStorage.setItem('admin', JSON.stringify(adminState.users));
                dispatch(setAdminAuth());
                navigate('/adminIn/dashboard');
            }
        }
    }, [adminState]);

    return (
        <div className="">
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Card sx={
                    {
                        maxWidth: 345,
                        marginTop: '10rem'
                    }
                }>
                    <Avatar sx={
                        {
                            m: 2,
                            width: 100,
                            height: 100,
                            bgcolor: 'error.main',
                            marginX: 'auto'
                        }
                    }/>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    {
                    error && <p style={
                        {color: 'red'}
                    }>
                        {error}</p>
                }
                    <CardContent>
                        <Box component="form"
                            sx={
                                {
                                    '& .MuiTextField-root': {
                                        m: 1,
                                        width: '35ch'
                                    }
                                }
                            }
                            noValidate
                            autoComplete="off"

                            onSubmit={submitHandler}>
                            <TextField id="outlined-email-input" label="Email" type="email" margin="dense"
                                value={email}
                                onChange={
                                    (e) => setEmail(e.target.value)
                                }/>
                            <TextField id="outlined-password-input" label="Password" type="password" margin="dense" autoComplete="current-password"
                                value={password}
                                onChange={
                                    (e) => setPassword(e.target.value)
                                }/>
                            <Button variant="outlined" color="error" type="submit">Submit</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    );
};;

export default AdminLogin;
