# web-firebase

> This library makes you to execute some Firebase web authentication processes and Firestore CRUD operations easily.

[![NPM](https://img.shields.io/npm/v/web-firebase.svg)](https://www.npmjs.com/package/web-firebase) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install web-firebase
```

## Usage

```jsx
import { useAuth, useFirestore, initialize } from 'web-firebase'
```

> First, execute 'initialize' method with your web app's Firebase configuration to get 'auth' and 'db' variables.

```jsx
const firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://DATABASE_NAME.firebaseio.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID'
}
const { auth, db } = initialize(firebaseConfig)
```

> And then, you can use 'useAuth' hook with this 'auth' variable and use 'useFirestore' hook with this 'db' variable.

```jsx
const {
  userInfo, // User's authentication info
  createUser,
  signIn,
  userObserver,
  logOut,
  updateUserProfile,
  googleAuth
  error // Error string variable
} = useAuth(auth)

const {
  addNewEntry,
  getEntries,
  deleteEntry,
  updateEntry
  } = useFirestore()
```

> Documentation will be coming!

## License

MIT © [erol1098](https://github.com/erol1098)

## Keywords

Firebase,authentication, Firestore
