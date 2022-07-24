import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material'
import { useFirestore } from 'web-firebase'
import UserContext from '../context/user-context'
import AuthContext from '../context/auth-context'

const EditModal = () => {
  const { currentData, setCurrentData, setContacts, db } =
    useContext(UserContext)
  const { collectionName } = useContext(AuthContext)
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    currentData && setUserName(currentData.data.userName)
    currentData && setPhoneNumber(currentData.data.phoneNumber)
    currentData && setGender(currentData.data.gender)
    currentData && setId(currentData.id)
  }, [currentData])

  const { getEntries, updateEntry } = useFirestore(db)

  const submitHandler = (e) => {
    e.preventDefault()
    updateEntry(collectionName, id, { userName, phoneNumber, gender })
    getEntries(collectionName).then((res) => setContacts(res))
    handleClose()
    setCurrentData(null)
  }
  //* Modal Functions
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    padding: '2rem',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'
  }
  const [open, setOpen] = useState(false)

  useEffect(() => {
    currentData && setOpen(true)
  }, [currentData])

  const handleClose = () => {
    setCurrentData('')
    setOpen(false)
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Stack sx={style} component='form' onSubmit={submitHandler} spacing={2}>
          <Typography variant='h1' fontSize={24} textAlign={'center'} mb={1}>
            Edit Contact
          </Typography>

          <TextField
            id='outlined-basic'
            type={'text'}
            label='Name'
            variant='outlined'
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
            sx={{ padding: '0.5rem 0', fontSize: '1.3rem' }}
            fullWidth
          >
            Change
          </Button>
        </Stack>
      </Modal>
    </div>
  )
}
export default EditModal
