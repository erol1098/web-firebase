import React, { useContext, useState } from 'react'
import { Stack, Box, Typography, TextField, Button } from '@mui/material'
import { useAuth } from 'web-firebase'
import AuthContext from '../context/auth-context'
const Settings = () => {
  const style = {
    width: 400,
    bgcolor: 'background.paper',
    padding: '2rem',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'
  }
  const { auth } = useContext(AuthContext)
  const {
    updateUserProfile,
    updateUserEmail,
    changePassword,
    verifyEmail,
    resetPassword
  } = useAuth(auth)

  //? Change User Info
  const [displayName, setDisplayName] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const nameHandler = (e) => setDisplayName(e.target.value)
  // const phoneHandler = (e) => setPhoneNumber(e.target.value)
  const photoHandler = (e) => setPhotoURL(e.target.value)

  const updateUserInfoHandler = (e) => {
    e.preventDefault()
    updateUserProfile(displayName, photoURL)
  }

  //? Change Email
  const [email, setEmail] = useState('')
  const emailHandler = (e) => setEmail(e.target.value)
  const editEmailHandler = (e) => {
    updateUserEmail(email)
  }

  //? Change Password
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const changePasswordHandler = (e) => {
    if (newPassword === confirmNewPassword) changePassword(newPassword)
    else alert('Passwords did not match.')
  }

  //? Send Verification Email
  const verMailHandler = (e) => {
    verifyEmail()
  }
  //? Reset Password Mail
  const [resetMail, setResetMail] = useState('')
  const resetMailHandler = (e) => {
    resetPassword(resetMail)
  }
  return (
    <Box
      display={'flex'}
      justifyContent='center'
      alignItems={'flex-start'}
      gap={3}
    >
      <Stack
        sx={style}
        component='form'
        spacing={2}
        onSubmit={updateUserInfoHandler}
      >
        <Typography variant='h1' fontSize={24} textAlign={'center'} mb={1}>
          Update User Info
        </Typography>

        <TextField
          id='displayName'
          type={'text'}
          label='Name'
          variant='outlined'
          value={displayName}
          onChange={nameHandler}
          error={false}
          required
          fullWidth
        />
        {/* 
        <TextField
          id='phoneNumber'
          type={'tel'}
          label='Phone'
          variant='outlined'
          // value={phoneNumber}
          // onChange={phoneHandler}
          error={false}
          required
          fullWidth
        /> */}
        <TextField
          id='photoURL'
          type={'text'}
          label='Photo URL'
          variant='outlined'
          value={photoURL}
          onChange={photoHandler}
          error={false}
          required
          fullWidth
        />
        <Button
          variant='contained'
          type='submit'
          sx={{ padding: '0.5rem 0', fontSize: '1.3rem' }}
          fullWidth
        >
          Update
        </Button>
      </Stack>
      <Stack sx={style} component='form' spacing={2}>
        <Typography variant='h1' fontSize={24} textAlign={'center'} mb={1}>
          Edit Contact
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={2}>
          <TextField
            id='email'
            type={'email'}
            label='New Email'
            variant='outlined'
            value={email}
            onChange={emailHandler}
            error={false}
            fullWidth
          />
          <Button onClick={editEmailHandler} variant='contained' type='button'>
            Update Email
          </Button>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={2}>
          <TextField
            id='newPassword'
            type={'password'}
            label='New Password'
            variant='outlined'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={false}
            required
            fullWidth
          />
          <TextField
            id='confirmNewPassword'
            type={'password'}
            label='New Password Again'
            variant='outlined'
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            error={false}
            required
            fullWidth
          />
          <Button
            variant='contained'
            type='button'
            onClick={changePasswordHandler}
            fullWidth
          >
            Set New Password
          </Button>
        </Box>

        <Button
          variant='contained'
          type='button'
          onClick={verMailHandler}
          fullWidth
        >
          Send Verification Email
        </Button>

        <Box display={'flex'} flexDirection={'column'} gap={2}>
          <TextField
            id='resetMail'
            type={'email'}
            label='Email'
            variant='outlined'
            value={resetMail}
            onChange={(e) => setResetMail(e.target.value)}
            error={false}
            fullWidth
          />
          <Button
            variant='contained'
            type='button'
            onClick={resetMailHandler}
            fullWidth
          >
            Send Password Reset Email
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default Settings
