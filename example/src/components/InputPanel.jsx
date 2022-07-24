import React, { useContext, useState } from 'react'
import {
  Typography,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Stack
} from '@mui/material'
import { useFirestore } from 'web-firebase'
import UserContext from '../context/user-context'
import AuthContext from '../context/auth-context'
const InputPanel = () => {
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('')
  const { db, setContacts } = useContext(UserContext)
  const { collectionName } = useContext(AuthContext)
  const { addNewEntry, getEntries } = useFirestore(db)
  const submitHandler = (e) => {
    e.preventDefault()
    addNewEntry(collectionName, { userName, phoneNumber, gender })
    getEntries(collectionName).then((res) => setContacts(res))
    setUserName('')
    setPhoneNumber('')
    setGender('')
  }
  return (
    <Stack
      component='form'
      spacing={3}
      padding={3}
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        background: '#e0f2f1'
      }}
      onSubmit={submitHandler}
    >
      <Typography
        variant='h1'
        fontSize={24}
        textAlign={'center'}
        mb={1}
        fontWeight='bold'
      >
        Add Contact
      </Typography>
      <TextField
        id='outlined-basic'
        type={'text'}
        label='Name'
        variant='outlined'
        placeholder='Enter name'
        error={false}
        required
        fullWidth
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        id='outlined-basic'
        type={'tel'}
        label='Phone'
        variant='outlined'
        placeholder='Enter phone number'
        error={false}
        required
        fullWidth
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={gender}
          label='Gender'
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Male'}>Male</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant='contained'
        type='submit'
        color='success'
        sx={{
          padding: '0.5rem 0',
          fontSize: '1.3rem'
        }}
        fullWidth
      >
        Add
      </Button>
    </Stack>
  )
}

export default InputPanel
