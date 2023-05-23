import React,{useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper,Button,Box,Typography,Modal} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {  Link, useNavigate } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {TextField,Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { display } from '@mui/system';
import { getUsers,deleteUser,searchUsers, adminReset } from '../features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function AdminData() {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[phone,setPhone]=useState('')
    const navigate=useNavigate()
    const [users,setUsers]=useState([])
    const [search,setSearch]=useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()


    const adminState = useSelector((state) => {
      console.log("state of admin",state.admin)
        return(state.admin)

    }); 

    const submitHandler=(e)=>{
      e.preventDefault()
  const user={
    name,
    email,
    password,
    phone
  }
  console.log(user);
  axios({
    method: 'post',
    data:user,
    url: 'http://localhost:5000/user/signUp',
  })
    .then(() => {
      handleClose()
      navigate('/adminIn/dashboard')
    })
    .catch((error) => {
      console.error(error);
    });
  
  
    }
    
    

     useEffect(()=>{
      axios({
        method: 'get',
        url: 'http://localhost:5000/admin/getUser',
        withCredentials: true
      })
        .then((response) => {
          let userList = response.data.users
          setUsers(userList)
        })
        .catch((error) => {
          console.error(error);
        });

    },[])



let searchHandler=()=>{
  if(search!=""){
    dispatch(searchUsers(search)).then(()=>{
      setUsers(adminState.users)
    }).catch((error)=>{
      console.log(error)
    })
  }else{
    dispatch(getUsers()).then(()=>{
      setUsers(adminState.users)
    }).catch((error)=>{
      console.log(error)
    })
  }
  }




const deleteUserHandler=(id)=>{
console.log(id);
dispatch(deleteUser(id))
setUsers(prevState=>{
    return prevState.filter(user=>{console.log("each user",user);
      return user._id!=id})
})
}
  return (
   <React.Fragment>
    <Box sx={{display:'flex'}}>

    
       <Paper
      component="form"
      sx={{ p: '2px 4px',mx:'auto',my:3, display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search...."
        inputProps={{ 'aria-label': 'search google maps' }}
       onChange={(e)=>setSearch(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search"  onClick={searchHandler}>
        <SearchIcon />
      </IconButton>
    </Paper>

     <Button  sx={{marginRight:5}} onClick={handleOpen}>Add User</Button>

   
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}>
      <Avatar sx={{ m: 2, width: 100, height: 100, bgcolor: 'primary.main',marginX:'auto' }}> 
          </Avatar>
      <Typography sx={{textAlign:'center'}} component="h1" variant="h5">
          Add
          </Typography>
        <CardContent>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
        
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
        <TextField
          label="Name"
          id="outlined-size-small"
          margin="dense"
          onChange={(e)=>setName(e.target.value)}
        />
    <TextField
          id="outlined-password-input"
          label="Email"
          type="email"
          margin="dense"
          onChange={(e)=>setEmail(e.target.value)}
        />
  
   <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          margin="dense"
          autoComplete="current-password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Phone"
          type="phone" 
          margin="dense"
          autoComplete="current-password"
          onChange={(e)=>setPhone(e.target.value)}
        />
            <Button sx={{mx:'auto',display:'flex'}} variant="outlined" color="primary" type='submit'>
  Submit
</Button> 
       </Box>
        </CardContent>
    </Box>
</Modal>
</Box>
    {users[0]?<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="right">UserName</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user,index) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell sx={{display:'flex',alignItems:'center',flexDirection:'revert'}}><Avatar sx={{marginRight:2}} src={user?.image} />{user.name}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right"><Button color='success' variant="text" onClick={()=>{navigate(`/adminIn/editUser/${user._id}`)}}>Edit</Button>
              <Button color='error' variant="text" onClick={()=>deleteUserHandler(user._id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>:<h1>No Users Found</h1>}
   </React.Fragment>
  )
}

export default AdminData