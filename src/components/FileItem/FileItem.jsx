import axios from 'axios'
import './FileItem.css'
import { baseURL, downloadURL, serverURL, storageURL } from '../../URLs/urls'
import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { getCSRF, getCookie } from '../../utils'
import { FileNameChangeItem } from '../FileNameChangeItem/FileNameChangeItem';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

export const FileItem = ({fileData, csrfToken, resetFiles}) => {
  
  const { id, original_title, storage_title, size, upload_date, last_download, owner, link, file, comment } = fileData

  const [newFileName, setNewFileName] = useState('')
  const [newComment, setNewComment] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const navigate = useNavigate()

  // const csrfToken = getCookie('csrftoken')
  // console.log(csrfToken)

  // useEffect(() => {
  //   getCSRF(setIsCsrf)
  // }, [])

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log(newFileName, newComment)
  };
  
  const deleteFileHandler = async () => {
    const isConfirm = confirm('Вы действительно хотите удалить этот файл?')
    if (isConfirm) {
      await axios.delete(serverURL + storageURL + `${id}/`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        }
      })
      .then((res) => {
        console.log('Файл удалён')
        // console.log(res)
        resetFiles()
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.detail);
      });
    }
  }

  const downloadFileHandler = async () => {
      await axios.get(serverURL + storageURL + `${id}/`, {
      withCredentials: true,
      responseType: 'blob',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res)
      const href = URL.createObjectURL(res.data)
      const link = document.createElement('a')
      link.href = href
      link.setAttribute('download', original_title)
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      URL.revokeObjectURL(href)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const changeFileNameHandler = async (newFileName, newComment) => {

    const Data = new FormData()
    Data.append("original_title", newFileName)
    Data.append("comment", newComment)
    await axios.patch(serverURL + storageURL + `${id}/`, Data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    })
    .then((res) => {
      console.log('Параметры файла изменены')
      // console.log(res.data)
      resetFiles()
      navigate(storageURL)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(baseURL + downloadURL + storage_title)
    alert('Ссылка скопирована')
  }

  const copyLinkHandlerHTTP = async () => {
    const downloadLink = baseURL + downloadURL + storage_title
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(downloadLink);
      alert('Ссылка скопирована')
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = downloadLink;
  
      textarea.style.position = 'absolute';
      textarea.style.left = '-99999999px';
      document.body.prepend(textarea);
      textarea.select();
  
      document.execCommand('copy');
      textarea.remove();
      alert('Ссылка скопирована')
    }
  }

  const testHandler = () => {
    console.log('Тестовая отправка')
    console.log(newFileName)
    console.log(newComment)
  }

  const modalContent = (
    <FileNameChangeItem 
    id={id} 
    title={original_title} 
    comment={comment} 
    setNewFileName={setNewFileName} 
    setNewComment={setNewComment}
    submitHandler={changeFileNameHandler}
    cancel={closeModal}
    />
  );

  return (
    <>
      <div className='table-tr'>
        <div className='table-th'>{original_title}</div>
        <div className='table-th'>{size}</div>
        <div className='table-th'>{upload_date}</div>
        <div className='table-th'>{last_download}</div>
        <div className='table-th'>{link}</div>
        <div className='table-th'>{comment}</div>
        <div className='table-th'>
          <button className='file__item__button' onClick={downloadFileHandler}>Скачать</button>
          <button className='file__item__button' onClick={openModal}>Переименовать</button>
          <button className='file__item__button' onClick={copyLinkHandlerHTTP}>Сформировать ссылку</button>
          <button className='file__item__button' onClick={deleteFileHandler}>Удалить</button>
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} appElement={document.getElementById('app')}>
          {modalContent}
        </Modal>
      </div>
    </>
  )
}
