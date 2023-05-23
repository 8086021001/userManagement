import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

// import MenuIcon from '@mui/icons-material/Menu';

const Headers = () => {

    return (<div>
        <Box sx={
            {flexGrow: 1}
        }>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu"
                        sx={
                            {mr: 2}
                    }>  </IconButton>
                    <Typography variant="h6" component="div"
                        sx={
                            {flexGrow: 1}
                    }>
                        Welcome
                    </Typography>
                    <Link to="/user/login"
                        style={
                            {textDecoration: 'none'}
                    }>
                        <Button style={
                            {color: 'white'}
                        }>Login</Button>
                    </Link>
                    <Link to="/user/signup"
                        style={
                            {textDecoration: 'none'}
                    }>
                        <Button style={
                            {color: 'white'}
                        }>Sign Up</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>

    </div>)
}

export default Headers
