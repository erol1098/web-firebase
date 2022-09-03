# web-firebase

> This library makes you to execute some Firebase web authentication processes and Firestore CRUD operations easily.

[![NPM](https://img.shields.io/npm/v/web-firebase.svg)](https://www.npmjs.com/package/web-firebase) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install web-firebase
```

## Usage

### Add a custom hook named "useFirebase" to your project

### Paste this entire code in this custom hook.

### Arrange .env file according to this custom hook.

```jsx
import { useState, useEffect } from 'react'
import { useAuth, useFirestore, initialize } from 'web-firebase'

const useFirebase = () => {
  const [auth, setAuth] = useState(null)
  const [db, setDb] = useState(null)

  const { userObserver, userInfo } = useAuth(auth)

  useEffect(() => {
    const { auth: authRes, db: dbRes } = initialize({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_STORAGE_BUCKET,
      appId: process.env.REACT_APP_APP_ID
    })
    userObserver(authRes)
    setAuth(authRes)
    setDb(dbRes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  //? For Authentication Processes
  const {
    createUser,
    signIn,
    googleAuth,
    updateUserProfile,
    updateUserEmail,
    changePassword,
    verifyEmail,
    resetPassword,
    logOut,
    error: errorAuth
  } = useAuth(auth)

  //? For Firestore Database CRUD Operations
  const {
    addNewEntry,
    getEntries,
    updateEntries,
    deleteEntry,
    error: errorDb
  } = useFirestore(db)

  return {
    //? Authentication
    createUser,
    signIn,
    googleAuth,
    updateUserProfile,
    updateUserEmail,
    changePassword,
    verifyEmail,
    resetPassword,
    logOut,
    errorAuth,
    userInfo,

    //? Firestore
    addNewEntry,
    getEntries,
    updateEntries,
    deleteEntry,
    errorDb
  }
}
export default useFirebase
```

## License

MIT © [erol1098](https://github.com/erol1098)

## Keywords

Firebase, Authentication, Firestore, CRUD Operations
