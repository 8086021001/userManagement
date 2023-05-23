// import React from 'react'

import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux'
import {registerUser} from '../features/user/userSlice';
import {registerUserReset} from '../features/user/userSlice';

function Copyright(props) {


    return (<Typography variant="body2" color="text.secondary" align="center" {...props}> {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Your Website
        </Link>
        {' '}
        {
        new Date().getFullYear()
    }
        {'.'} </Typography>);
}


const theme = createTheme();

function Signup() {


    const [formData, setFormData] = useState({name: '', email: '', phone: '', password: ''});
    const [validate, setValidate] = useState("")
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            name: data.get('name'),
            email: data.get('email'),
            phone: data.get('phone'),
            password: data.get('password')
        }
        if (! user.name || ! user.email || ! user.phone || ! user.password) {
            setValidate("Field cannot be empty")
        } else {
            setFormData({name: '', email: '', phone: '', password: ''})
            dispatch(registerUser(user))
        }

    };
    const registerState = useSelector((state) => {
        return state.user
    })
    useEffect(() => {
        if (registerState.success) {
            dispatch(registerUserReset());
            navigate('/user/login')
        }

    }, [registerState.success])

    return (<ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
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
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form"
                    onSubmit={
                        (e) => handleSubmit(e)
                    }
                    noValidate
                    sx={
                        {mt: 1}
                }>
                    <TextField margin="normal" required fullWidth id="Name" label="Name" name="name" autoComplete="name"
                        value={
                            formData.name
                        }
                        onChange={handleChange}
                        autoFocus/>

                    <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"
                        value={
                            formData.email
                        }
                        onChange={handleChange}
                        autoFocus/>
                    <TextField margin="normal" required fullWidth id="phone" label="Phone" name="phone" type='number'
                        value={
                            formData.phone
                        }
                        onChange={
                            (e) => handleChange(e)
                        }
                        autoFocus/>

                    <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password"
                        value={
                            formData.password
                        }
                        onChange={
                            (e) => handleChange(e)
                        }
                        autoComplete="current-password"/>

                    <Button type="submit" fullWidth variant="contained"
                        sx={
                            {
                                mt: 3,
                                mb: 2
                            }
                    }>
                        Sign Up
                    </Button>

                </Box>
            </Box>
            <p color='red'> {validate}</p>
            <Copyright sx={
                {
                    mt: 8,
                    mb: 4
                }
            }/>
        </Container>
    </ThemeProvider>);
}
export default Signup
