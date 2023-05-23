// import React from 'react'

import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'

import { logginUser, logginUserReset } from '../features/user/userSlice';
import { setAuth } from '../features/Auth/auth';


function Copyright(props) { // const dispatch = useDispatch();

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>
            {' '}
            {
                new Date().getFullYear()
            }
            {'.'} </Typography>
    );
}

const theme = createTheme();

function Login() {
    const [user, setUser] = useState({ email: '', password: '' })
    const [msg, setmsg] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logginState = useSelector((state) => {
        return state.user;
    })
    let message = logginState.message?.message

    if (message) {
        setmsg(message)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email')
        let password = data.get('password')
        const user = {
            email: email,
            password: password
        }
        if (!email || !password) {
            alert("Provide your credentials")
        } else {
            dispatch(logginUser(user))
        }
    };

    useEffect(() => {
        if (logginState.success) {
            const token = logginState.user.token
            if (!token) {
                setmsg(logginState.user.message)
            } else {
                localStorage.setItem('user', JSON.stringify(logginState.user))
                dispatch(setAuth());
                dispatch(logginUserReset());
                navigate('/home')
            }

        }
    }, [logginState.success, dispatch, logginState.user])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={
                    {
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }
                }>
                    <Avatar sx={
                        {
                            m: 1,
                            bgcolor: 'secondary.main'
                        }
                    }>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={
                            { mt: 1 }
                        }>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"
                            value={
                                user.name
                            }
                            onChange={handleChange}
                            autoFocus />
                        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password"
                            value={
                                user.name
                            }
                            onChange={handleChange}
                            autoComplete="current-password" />
                        <Button type="submit" fullWidth variant="contained"
                            sx={
                                {
                                    mt: 3,
                                    mb: 2
                                }
                            }>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/user/signup" variant="body2">
                                    {"Don't have an account? Sign Up"} </Link>
                            </Grid>
                        </Grid>
                        <p>{
                            msg ? msg : null
                        }</p>
                    </Box>
                </Box>
                <Copyright sx={
                    {
                        mt: 8,
                        mb: 4
                    }
                } />
            </Container>
        </ThemeProvider>
    );
}
export default Login
