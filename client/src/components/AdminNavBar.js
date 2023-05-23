import React from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { clearAdminAuth } from '../features/Auth/adminAuth';

const AdminNavBar = () => {
 const dispatch = useDispatch()
    const navigate=useNavigate()
    const logoutHandle=()=>{
        localStorage.removeItem('admin') 
        dispatch(clearAdminAuth())
        navigate('/admin/login')
    }
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:'InactiveBorder'}}>
          <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
             User Management
            </Typography>
      
            <Button variant="outlined" color='primary' onClick={logoutHandle}><LogoutIcon/>Logout</Button>
          </Toolbar>
        </AppBar>
      
      </Box>
  )
}

export default AdminNavBar