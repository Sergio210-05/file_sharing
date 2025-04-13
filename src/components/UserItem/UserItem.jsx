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

  useEffect(() => {
    getCSRF(setIsCsrf)
  }, [])
  
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
        // console.log(res.data.detail)
        window.location.reload();
        console.log(`Пользователь ${login} удалён`)
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
        // console.log(res.data.detail)
        window.location.reload();
        console.log(`Статус администратора ${isAdmin ? 'снят' : 'назначен'}`)
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.detail);
      });
    }
  }

  const userStorageHandler = () => {
    navigate(adminUserStorageURL + id)
  }

  const testHandler = () => {
    console.log('Тестовая отправка')
    console.log(newFileName)
    console.log(newComment)
  }

  return (
    <>
      <div className='table-tr'>
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
