import React, { createContext, useState, useEffect } from 'react'
import { useAuth, initialize } from 'web-firebase'
const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(null)
  const [collectionName, setCollectionName] = useState(null)
  const { userObserver, userInfo, error } = useAuth(auth) //! example

  useEffect(() => {
    setCollectionName(userInfo?.uid)
  }, [userInfo, error])

  useEffect(() => {
    const { auth: result } = initialize({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_STORAGE_BUCKET,
      appId: process.env.REACT_APP_APP_ID
    })
    userObserver(result)
    setAuth(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(userInfo)
  const values = { userInfo, auth, collectionName }

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  )
}

export default AuthContext
