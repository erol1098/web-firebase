import { useState } from 'react'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
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
      setError(err)
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
  const updateUserProfile = async (
    displayName = '',
    // phoneNumber = '',
    photoURL = ''
  ) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName,
        // phoneNumber,
        photoURL
      })
    } catch (err) {
      setError(err)
    }
  }

  const updateUserEmail = async (email) => {
    try {
      await updateEmail(auth.currentUser, email)
    } catch (err) {
      setError(err)
    }
  }
  const changePassword = async (password) => {
    try {
      await updatePassword(auth.currentUser, password)
    } catch (err) {
      setError(err)
    }
  }

  const verifyEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser)
    } catch (err) {
      setError(err)
    }
  }
  const resetPassword = async (mail) => {
    try {
      await sendPasswordResetEmail(auth, mail)
    } catch (err) {
      setError(err)
    }
  }

  const googleAuth = async (navigate = '') => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
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
    updateUserEmail,
    changePassword,
    verifyEmail,
    resetPassword,
    googleAuth,
    error
  }
}
export const useFirestore = (db) => {
  const [error, setError] = useState(null)

  const addNewEntry = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data)
      return docRef.id
    } catch (err) {
      setError(err)
      return null
    }
  }
  const getEntries = async (collectionName) => {
    try {
      if (collectionName) {
        const querySnapshot = await getDocs(collection(db, collectionName))
        return querySnapshot?.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      }
    } catch (err) {
      setError(err)
    }
  }

  const deleteEntry = async (collectionName, id) => {
    try {
      await deleteDoc(doc(db, collectionName, id))
    } catch (err) {
      setError(err)
    }
  }

  const updateEntry = async (collectionName, id, data) => {
    try {
      await updateDoc(doc(db, collectionName, id), {
        ...data
      })
    } catch (err) {
      setError(err)
    }
  }

  return { addNewEntry, getEntries, deleteEntry, updateEntry, error }
}
export const initialize = (config) => {
  const app = initializeApp(config)
  const auth = getAuth(app)
  const db = getFirestore(app)
  return { auth, db }
}
