import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import React, { createContext, useState } from 'react'
const UserContext = createContext()
export const UserContextProvider = (props) => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)

  const [currentData, setCurrentData] = useState(null)
  const app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_STORAGE_BUCKET,
    appId: process.env.REACT_APP_APP_ID
  })

  const db = getFirestore(app)

  const values = {
    db,
    contacts,
    setContacts,
    loading,
    setLoading,
    currentData,
    setCurrentData
  }

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  )
}
export default UserContext
