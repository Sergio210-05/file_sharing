import React, { useEffect, useState } from 'react'
import { getUsersURL, serverURL } from '../../../URLs/urls'
import axios from 'axios'
import { UserItem } from '../../UserItem/UserItem'
import { userSelector } from '../../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'

export const AdminPage = () => {

  const [users, setUsers] = useState([])
  // const dispatch = useDispatch();
  // const isAuth = useSelector(isAuthSelector)
  const selfId = useSelector(userSelector).id
  // console.log(selfId)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    await axios.get(serverURL + getUsersURL, { 
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res.data.users)
      setUsers(res.data.users)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  // if (Object.keys(users).length === 0) {
  //   console.log('Запрос на получение списка пользователей')
  //   getUsers()
  // }  

  return (
    <>
      <div className='table'>
        <div className='table-thead'>    
          <div className='table-tr'>
            <div className='table-th'>ID пользователя</div>
            <div className='table-th'>Имя (логин)</div>
            <div className='table-th'>Полное имя</div>
            <div className='table-th'>Email</div>
            <div className='table-th'>Количество файлов</div>
            <div className='table-th'>Объём файлов</div>
            <div className='table-th'>Права администратора</div>
            <div className='table-th'>Управление</div>
          </div>
        </div>
        <div className='table-tbody'>
          {users.map((userData, index) => {
            // console.log(userData)
            return(<UserItem key={index} adminId={selfId} userData={userData}/>)
          })}
        </div>

      </div>
      {/* <UploadItem /> */}
    </>
  )
}
