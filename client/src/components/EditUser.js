import React,{useEffect,useState,useRef} from 'react'
import {Button,Grid,TextField,Box,IconButton,Avatar, CardActionArea} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {AccountCircle,PhotoCamera} from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
const EditUser = () => {
    const {id}=useParams()
    const [name,setName]=useState('')
    const [email,SetEmail]=useState('')
    const [image,setImage]=useState('')
    const navigate=useNavigate()

     useEffect(()=>{
      axios({
        method: 'get',
        url:`http://localhost:5000/admin/editUser/${id}`,
        withCredentials: true
      })
        .then((response) => {
          console.log(response)
          setName(response.data.name)
          SetEmail(response.data.email)
          setImage(response.data?.image)
        })
        .catch((error) => {
          console.error(error);
        });

    },[])

     const submitHandler=()=>{
        const data={
            name,
            email
        }
        console.log(data);
        navigate('/adminIn/dashboard')
        axios({
          method: 'put',
          url:`http://localhost:5000/admin/editUser/${id}`,
          data:data,
          withCredentials: true
        })
          .then((response) => {
            setName(response.data.name)
            SetEmail(response.data.email)
            setImage(response.data?.image)
          })
          .catch((error) => {
            console.error(error);
          });
    }
  return (
    <div>
        <AdminNavBar/>
    <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
  >
            <Card sx={{   minWidth: 500,mt:'14rem '}}>
      <CardContent>
        <Box sx={{position:'relative'}}>
             <Avatar sx={{width: 150, height: 150,mx:'auto',backgroundColor:'black'}} src={image} >
             </Avatar>  
        </Box>
  
      
       <Box sx={{ display: 'flex',justifyContent:'center', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField  id="input-with-sx" fullWidth margin='dense' value={name} onChange={(e)=>{setName(e.target.value)}}  variant="standard" />
      </Box>
     
      <Box sx={{ display: 'flex',justifyContent:'center', alignItems: 'flex-end' }}>
        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField    id="filled-size-normal" fullWidth margin='dense' value={email} onChange={(e)=>{SetEmail(e.target.value)}} type="email"  variant="standard" />
      </Box>
    
      </CardContent>
 
  <Button sx={{my:2,mr:2}} variant="outlined" color="error" onClick={()=>navigate('/adminIn/dashboard')}  >Cancel</Button>
  <Button sx={{my:2}} variant="outlined" color="success" onClick={submitHandler} >Submit Changes</Button>
 
    </Card>
   </Grid>
    </div>
  )
}

export default EditUser