import React, { useContext, useState } from 'react'
import { Grid, TextField, Button, Typography } from '@mui/material'
import { useFirebase } from 'web-firebase'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth-context'
const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()
  const { createUser } = useFirebase(auth)

  const submitHandler = (e) => {
    e.preventDefault()
    const displayName = `${firstName} ${lastName}`
    createUser(displayName, email, password, navigate)
  }

  return (
    <Grid
      container
      component={'form'}
      justifyContent={'center'}
      spacing={2}
      sx={{
        padding: '2rem 0'
      }}
      onSubmit={submitHandler}
    >
      <Grid item xs={12} sm={8}>
        <Typography variant='h1' fontSize={48} textAlign={'center'} mb={3}>
          Register
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        <TextField
          id='outlined-basic'
          label='First Name'
          variant='outlined'
          type={'text'}
          placeholder='Enter your first name'
          error={false}
          required
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          id='outlined-basic'
          label='Last Name'
          variant='outlined'
          type={'text'}
          placeholder='Enter your last name'
          error={false}
          required
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          id='outlined-basic'
          label='Email'
          variant='outlined'
          type={'email'}
          placeholder='Enter your email'
          error={false}
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          id='outlined-basic'
          label='Password'
          type={'password'}
          variant='outlined'
          placeholder='Enter your password'
          error={false}
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Button
          variant='contained'
          type='submit'
          sx={{ padding: '0.5rem 0', fontSize: '1.3rem' }}
          fullWidth
        >
          Login
        </Button>
      </Grid>
    </Grid>
  )
}

export default Register
