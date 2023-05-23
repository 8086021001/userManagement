import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import "./component.css"

const variants = ['Hello', 'Welcome'];
let userData
function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          {loading ? <Skeleton /> : variant}
        </Typography>
      ))}
      <h1 style={{ color: 'red' }}>{userData}</h1>
    </div>
  );
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

export default function UserHomeContent() {
  const [userdat, setUser] = useState('')
  const userState = useSelector((state) => {
    return state.auth
  }
  )
  useEffect(() => {
    if (userState.authState) {
      const userName = userState.authState?.user.name
      let user = userName
      setUser(user)
    }
  }, [userState.authState])


  return (
    <div className='homie'>
      <h1>{userdat}</h1>
      <Grid container spacing={8}>
        <Grid item xs>
          <TypographyDemo loading />
        </Grid>
        <Grid item xs>
          <TypographyDemo />
        </Grid>

      </Grid>

    </div>
  );
}
