import { useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
export const useAuth = (auth) => {
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)
  // Create User with email-password and display name
  const createUser = async (displayName, email, password, navigate = '') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await updateProfile(auth.currentUser, {
        displayName
      })
      setUserInfo(userCredential)
      navigate && navigate('/')
    } catch (err) {
      setError(err)
    }
  }
  // Sign In with Email-Password
  const signIn = async (email, password, navigate = '') => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUserInfo(userCredential)
      navigate && navigate('/')
    } catch (err) {
      // console.log(err)
      setError(err.message)
    }
  }
  // For each of your app's pages that need information about the signed-in user, attach an observer to the global authentication object. This observer gets called whenever the user's sign-in state changes.
  // When a user successfully signs in, you can get information about the user in the observer.
  const userObserver = (authTemp) => {
    onAuthStateChanged(authTemp, (user) => {
      if (user) {
        setUserInfo(user)
      } else {
        setUserInfo('')
      }
    })
  }
  // Sign Out
  const logOut = () => {
    signOut(auth)
  }
  // Update User Profile Display Name and Photo URL
  const updateUserProfile = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL
      })
    } catch (err) {
      setError(err)
    }
  }

  const googleAuth = async (navigate = '') => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      setUserInfo(result.user)
      navigate && navigate('/')
    } catch (err) {
      setError(err)
    }
  }

  return {
    userInfo,
    createUser,
    signIn,
    userObserver,
    logOut,
    updateUserProfile,
    googleAuth,
    error
  }
}
export const initialize = (config) => {
  const app = initializeApp(config)
  const auth = getAuth(app)
  return auth
}
