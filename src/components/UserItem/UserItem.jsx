import './UserItem.css'
import axios from 'axios'
import { adminUserStorageURL, changeAdminStatusURL, removeUserURL, serverURL, storageURL } from '../../URLs/urls'
import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { getCSRF } from '../../utils'
import { FileNameChangeItem } from '../FileNameChangeItem/FileNameChangeItem';
import { NavLink, replace, useNavigate } from 'react-router-dom';


export const UserItem = ({adminId, userData}) => {
  
  const { id, login, fullName, email, amountOfFiles, sizeOfFiles, isAdmin } = userData
  const navigate = useNavigate();

  const [isCsrf, setIsCsrf] = useState(null)
  // const [newFileName, setNewFileName] = useState('')
  // const [newComment, setNewComment] = useState('')
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getCSRF(setIsCsrf)
  }, [])

  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   console.log(newFileName, newComment)
  // };
  
  const deleteUserHandler = async () => {
    const isConfirm = confirm(`Вы действительно хотите удалить пользователя ${login}?`)
    if (isConfirm) {
      await axios.delete(serverURL + removeUserURL + `${id}/`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": isCsrf,
        }
      })
      .then((res) => {
        console.log(res.data.detail)
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.detail);
      });
    }
  }

  const changeAdminStatusHandler = async () => {
    const question = isAdmin 
    ? `Вы действительно хотите ИСКЛЮЧИТЬ пользователя ${login}? из списка АДМИНИСТРАТОРОВ?`
    : `Вы действительно хотите ДОБАВИТЬ пользователя ${login}? в список АДМИНИСТРАТОРОВ?`
    const isConfirm = confirm(question)
    if (isConfirm) {
      const Data = new FormData()
      Data.append("is_superuser", isAdmin)
      await axios.patch(serverURL + changeAdminStatusURL + `${id}/`, Data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": isCsrf,
        }
      })
      .then((res) => {
        console.log(res.data.detail)
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.detail);
      });
    }
  }

  const userStorageHandler = () => {
    // console.log('userStorageHandler')
    navigate(adminUserStorageURL + id)
  }

  // const downloadFileHandler = async () => {
  //   // await axios.get(serverURL + storageURL + `?storage_title=${storage_title}`, {
  //     await axios.get(serverURL + storageURL + `${id}/`, {
  //     withCredentials: true,
  //     responseType: 'blob',
  //     headers: {
  //       "Content-Type": "application/json",
  //       // "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res)
  //     const href = URL.createObjectURL(res.data)
  //     const link = document.createElement('a')
  //     link.href = href
  //     link.setAttribute('download', original_title)
  //     document.body.appendChild(link)
  //     link.click()

  //     document.body.removeChild(link)
  //     URL.revokeObjectURL(href)
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
  // }

  // const changeFileNameHandler = async (newFileName, newComment) => {

  //   const Data = new FormData()
  //   Data.append("original_title", newFileName)
  //   Data.append("comment", newComment)
  //   await axios.patch(serverURL + storageURL + `${id}/`, Data, {
  //     withCredentials: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": isCsrf,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
  // }

  const testHandler = () => {
    console.log('Тестовая отправка')
    console.log(newFileName)
    console.log(newComment)
  }

  // const modalContent = (
  //   <FileNameChangeItem 
  //   id={id} 
  //   title={original_title} 
  //   comment={comment} 
  //   setNewFileName={setNewFileName} 
  //   setNewComment={setNewComment}
  //   submitHandler={changeFileNameHandler}
  //   cancel={closeModal}
  //   />
  // );

  return (
    <>
      <div className='table-tr'>
        {/* <input type='checkbox' /> */}
        <div className='table-th'>{id}</div>
        <div className='table-th'>{login}</div>
        <div className='table-th'>{fullName}</div>
        <div className='table-th'>{email}</div>
        <div className='table-th'>{amountOfFiles}</div>
        <div className='table-th'>{sizeOfFiles}</div>
        <div className='table-th'>{isAdmin ? 'Да' : ''}</div>
        <div className='table-th'>
          <button className='file__item__button' 
                  disabled={adminId===id ? true : false}
                  onClick={changeAdminStatusHandler}>
                    {isAdmin ? 'Удалить из администраторов' : 'Назначить администратором'}
          </button>
          <button className='file__item__button'
                  disabled={adminId===id ? true : false}
                  onClick={deleteUserHandler}>
                    Удалить пользователя
          </button>
          <button className='file__item__button'
                  onClick={userStorageHandler}>
                    Перейти к файлам пользователя
          </button>
        </div>
      </div>
    </>
  )
}
