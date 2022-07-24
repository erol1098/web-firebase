import { Container, ThemeProvider, useTheme } from '@mui/material'
import React from 'react'
import AppRouter from './router/AppRouter'

const App = () => {
  return (
    <ThemeProvider theme={useTheme()}>
      <Container maxWidth='lg'>
        <AppRouter />
      </Container>
    </ThemeProvider>
  )
}

export default App
