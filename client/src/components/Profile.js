import React, { useEffect, useState, useRef } from 'react'
import {
    Button,
    Grid,
    TextField,
    Box,
    IconButton,
    Avatar
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AccountCircle, PhotoCamera } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import Home from './Home'
import { logginUserReset, uploadProfile } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const Profile = () => {
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [imgStat, setImageStat] = useState(false)


    const dispatch = useDispatch()

    const registerState = useSelector((state) => {
        return state.auth
    })
    const userUpdatedState = useSelector((state) => {
        return state.user
    })

    const changeImage = (e) => {
        imageUrl = URL.createObjectURL(e.target.files[0])
        console.log("image url", imageUrl)
        setImageStat(true)
        setImage(imageUrl)
    }
    useEffect(() => {
        if (registerState.authState.user?.image && !userUpdatedState.editSuccess, !imgStat) {
            console.log("directly befr update")
            setImage(registerState.authState.user?.image ?? "")
        }

        if (userUpdatedState.editSuccess) {
            console.log("after update")
            const itemString = localStorage.getItem('user');
            const item = JSON.parse(itemString);
            console.log("item from loc stg", item)
            item.user.image = userUpdatedState.user.user?.image
            const updatedItemString = JSON.stringify(item);
            localStorage.setItem('user', updatedItemString);
            // setImage(registerState.authState.user?.image)
            console.log("mt image settt", image)
            dispatch(logginUserReset())
        }
    }, [image, userUpdatedState.editSuccess])

    const fileRef = useRef()

    let imageUrl
    const handleSubmit = (e) => {
        e.preventDefault()
        const file = fileRef.current.files[0]
        const formData = new FormData()
        if (!file) {
            let message = "please select your image"
            setMessage(message)
        } else {
            formData.append("image", file, file?.name)
            let id = registerState.authState.user.userId

            dispatch(uploadProfile({ formData, id })).then(() => { setImageStat(false); })
                .then(() => { console.log("imahe atlast", image) })

        }
    }



    return (<div>
        <Home />
        <div>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Card sx={
                    {
                        minWidth: 500,
                        mt: '14rem '
                    }
                }>
                    <CardContent>
                        <Box sx={
                            { position: 'relative' }
                        }>
                            <Avatar sx={
                                {
                                    width: 150,
                                    height: 150,
                                    mx: 'auto',
                                    backgroundColor: 'black'
                                }
                            } src={image} key={new Date().getTime()}></Avatar>
                            <Avatar sx={
                                {
                                    position: 'absolute',
                                    zIndex: 100,
                                    bottom: 10,
                                    right: 155
                                }
                            }>
                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input ref={fileRef}
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={
                                            (e) => {
                                                changeImage(e)
                                            }
                                        } />
                                    <PhotoCamera sx={
                                        { color: 'black' }
                                    } />

                                </IconButton>
                            </Avatar>

                        </Box>


                        <Box sx={
                            {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }
                        }>
                            <AccountCircle sx={
                                {
                                    color: 'action.active',
                                    mr: 1,
                                    my: 0.5
                                }
                            } />
                            <TextField disabled id="input-with-sx" fullWidth

                                label={
                                    registerState.authState.user.name
                                }
                                variant="standard" />
                        </Box>

                        <Box sx={
                            {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }
                        }>
                            <EmailIcon sx={
                                {
                                    color: 'action.active',
                                    mr: 1,
                                    my: 0.5
                                }
                            } />
                            <TextField disabled id="filled-size-normal" fullWidth type="email"
                                label={
                                    registerState.authState.user.email
                                }
                                variant="standard" />
                        </Box>

                    </CardContent>
                    <Button sx={
                        { my: 2 }
                    }
                        variant="outlined"
                        onClick={handleSubmit}
                        color="error">Submit Changes</Button>
                    <div>{message}</div>
                </Card>
            </Grid>

        </div>

    </div>)
}

export default Profile
