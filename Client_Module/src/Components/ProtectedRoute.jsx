import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {login}=useSelector((state)=>state.user)

  return (
    <div>
        {
            login?<div>{children}</div>: < Navigate to= '/login'/>
        }
    </div>
  )
}

export default ProtectedRoute