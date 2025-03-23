import React from 'react'
import { useParams } from 'react-router-dom'

export const ManageUserStorage = () => {
  const params = useParams()
  const id = params.id
  return (
    <div>{id}</div>
  )
}
