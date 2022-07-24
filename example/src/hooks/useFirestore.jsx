import UserContext from '../context/user-context'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import { useCallback, useContext } from 'react'
import AuthContext from '../context/auth-context'

const useFirestore = () => {
  const { db, setContacts, setLoading } = useContext(UserContext)
  const { collectionName } = useContext(AuthContext)
  const addNewEntry = async (data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data)
      console.log('Document written with ID: ', docRef.id)
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }
  const getEntries = useCallback(async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))
      setContacts(
        querySnapshot?.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      )
    } catch (error) {
      console.error('Error reading document: ', error)
    } finally {
      setLoading(false)
    }
  }, [db, setContacts, setLoading, collectionName])

  const deleteEntry = async (collectionName, selectedId) => {
    await deleteDoc(doc(db, collectionName, selectedId))
  }
  const updateEntry = async (
    collectionName,
    { userName, phoneNumber, gender, id }
  ) => {
    await updateDoc(doc(db, collectionName, id), {
      userName,
      phoneNumber,
      gender
    })
  }

  return { addNewEntry, getEntries, deleteEntry, updateEntry }
}

export default useFirestore
