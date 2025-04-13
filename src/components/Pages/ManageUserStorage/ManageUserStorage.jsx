import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserInfo } from '../../../utils'
import { StoragePage } from '../StoragePage/StoragePage'

export const ManageUserStorage = () => {
  const params = useParams()
  // const id = params.id
  // const [id, setId] = useState(params.id)
  const [memberInfo, setMemberInfo] = useState({})

  useEffect(() => {
    getUserInfo(params.id, setMemberInfo)
  }, [])


  return (
    <>
      <div>Файлы пользователя {memberInfo.login}</div>
      <StoragePage memberId={params.id}/>
    </>

  )
}
