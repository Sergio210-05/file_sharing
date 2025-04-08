import './AdminPage.css'

import React, { useEffect, useState } from 'react'
import { getUsersURL, serverURL } from '../../../URLs/urls'
import axios from 'axios'
import { UserItem } from '../../UserItem/UserItem'
import { userSelector } from '../../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { NewUserItem } from '../../NewUserItem/NewUserItem'

Modal.setAppElement('#root');

export const AdminPage = () => {

  const [users, setUsers] = useState([])
  // const dispatch = useDispatch();
  // const isAuth = useSelector(isAuthSelector)
  const selfId = useSelector(userSelector).id
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      // console.log(res.data.users)
      console.log('Получен список пользователей')
      setUsers(res.data.users)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log(newFileName, newComment)
  };

  const modalContent = (
    <NewUserItem
    // id={id} 
    // title={original_title} 
    // comment={comment} 
    // setNewFileName={setNewFileName} 
    // setNewComment={setNewComment}
    // submitHandler={changeFileNameHandler}
    cancel={closeModal}
    />
  );

  return (
    <>
      <button className='new-user' onClick={openModal}>Зарегистрировать нового пользователя</button>
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
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} appElement={document.getElementById('app')}>
        {modalContent}
      </Modal>
    </>
  )
}
