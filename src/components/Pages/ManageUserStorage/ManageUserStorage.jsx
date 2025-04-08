import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserInfo } from '../../../utils'
import { StoragePage } from '../StoragePage/StoragePage'

export const ManageUserStorage = () => {
  const params = useParams()
  const id = params.id
  const [memberInfo, setMemberInfo] = useState({})

  useEffect(() => {
    getUserInfo(id, setMemberInfo)
  }, [])

  // console.log(memberInfo)


  return (
    <>
      <div>Файлы пользователя {memberInfo.login}</div>
      <StoragePage memberId={memberInfo.id}/>
    </>

  )
}
