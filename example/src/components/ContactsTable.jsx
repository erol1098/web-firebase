import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import UserContext from '../context/user-context'
import { useFirestore } from 'web-firebase'
import AuthContext from '../context/auth-context'
// import { Skeleton } from '@mui/material'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
    fontSize: 18
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center'
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const ContactsTable = () => {
  const { contacts, setContacts, setCurrentData, db } = useContext(UserContext)
  const { collectionName } = useContext(AuthContext)
  const { deleteEntry, getEntries } = useFirestore(db)

  const deleteHandler = (id) => {
    deleteEntry(collectionName, id)
    getEntries(collectionName).then((res) => setContacts(res))
  }
  const editHandler = (contact, id) => {
    setCurrentData({ id: id, data: contact })
    // updateEntry(collectionName, id, contact)
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ padding: '1rem 0' }}>
        <Table
          sx={{
            minWidth: 300,
            maxWidth: 600,
            margin: '0 auto',
            border: '1px solid black'
          }}
          aria-label='customized table'
        >
          {/* {!contacts && (
            <TableBody>
              <Skeleton
                variant='rectangle'
                sx={{ width: '100%' }}
                height={50}
              />
              <Skeleton
                variant='text'
                sx={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <Skeleton
                variant='text'
                sx={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <Skeleton
                variant='text'
                sx={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <Skeleton
                variant='text'
                sx={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <Skeleton
                variant='text'
                sx={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <Skeleton
                variant='text'
                sx={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <Skeleton
                variant='text'
                sx={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <Skeleton
                variant='text'
                sx={{ width: '100%', marginBottom: '0.5rem' }}
              />{' '}
            </TableBody>
          )} */}
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>User Name</StyledTableCell>
              <StyledTableCell align='center'>Phone Number</StyledTableCell>
              <StyledTableCell align='center'>Gender</StyledTableCell>
              <StyledTableCell align='center'>Edit</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts?.map((contact) => (
              <StyledTableRow key={contact.id}>
                <StyledTableCell component='th' scope='row'>
                  {contact.data.userName}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {contact.data.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {contact.data.gender}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Edit
                    sx={{ cursor: 'pointer' }}
                    onClick={(e) => editHandler(contact.data, contact.id)}
                  />
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Delete
                    sx={{ cursor: 'pointer' }}
                    onClick={() => deleteHandler(contact.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default ContactsTable
