# web-firebase

> This library makes you to execute some Firebase web authentication processes easily.

[![NPM](https://img.shields.io/npm/v/web-firebase.svg)](https://www.npmjs.com/package/web-firebase) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install web-firebase
```

## Usage

```jsx
import { useFirebase, initialize } from 'web-firebase'
```

> First, execute 'initialize' method with your web app's Firebase configuration to get 'auth' variable.

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
const auth = initialize(firebaseConfig)
```

> And then, you can use useFirebase hook with this "auth" variable.

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
} = useFirebase(auth)
```

## License

MIT © [erol1098](https://github.com/erol1098)

## Keywords

Firebase, authentication
