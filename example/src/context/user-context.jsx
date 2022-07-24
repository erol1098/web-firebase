import React, { createContext, useState, useEffect, useContext } from 'react'
import { initialize, useFirestore } from 'web-firebase'
import AuthContext from './auth-context'
const UserContext = createContext()
export const UserContextProvider = (props) => {
  const { collectionName } = useContext(AuthContext)
  const [contacts, setContacts] = useState(null)
  const [currentData, setCurrentData] = useState(null)
  const [db, setDb] = useState(null)
  const { getEntries } = useFirestore(db)

  useEffect(() => {
    const { db: result } = initialize({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_STORAGE_BUCKET,
      appId: process.env.REACT_APP_APP_ID
    })
    setDb(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getEntries(collectionName).then((res) => setContacts(res))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName])
  const values = {
    db,
    contacts,
    setContacts,
    currentData,
    setCurrentData
  }
  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  )
}
export default UserContext
