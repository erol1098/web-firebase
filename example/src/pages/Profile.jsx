import React, { useContext } from 'react'
import AuthContext from '../context/auth-context'

const Profile = () => {
  const { userInfo } = useContext(AuthContext)
  console.log(userInfo)
  const { displayName, email, photoURL, phoneNumber } = userInfo
  return (
    <div>
      <div>{displayName}</div>
      <div>{email}</div>
      <div>{photoURL}</div>
      <div>{phoneNumber}</div>
    </div>
  )
}

export default Profile
