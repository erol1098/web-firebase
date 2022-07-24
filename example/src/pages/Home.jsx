import { Grid } from '@mui/material'

import React from 'react'
import ContactsTable from '../components/ContactsTable'
import InputPanel from '../components/InputPanel'

const Home = () => {
  return (
    <Grid container justifyContent={'center'} alignItems={'flex-start'} gap={3}>
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <InputPanel />
      </Grid>
      <Grid item xs={12} sm={8} md={6} lg={7}>
        <ContactsTable />
      </Grid>
    </Grid>
  )
}

export default Home
