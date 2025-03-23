import axios from 'axios'
import './FileItem.css'
import { serverURL, storageURL } from '../../URLs/urls'
import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { getCSRF } from '../../utils'
import { FileNameChangeItem } from '../FileNameChangeItem/FileNameChangeItem';

Modal.setAppElement('#root');

export const FileItem = ({fileData}) => {
  
  const { id, original_title, storage_title, size, upload_date, last_download, owner, link, file, comment } = fileData

  const [isCsrf, setIsCsrf] = useState(null)
  const [newFileName, setNewFileName] = useState('')
  const [newComment, setNewComment] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getCSRF(setIsCsrf)
  }, [])

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
          "X-CSRFToken": isCsrf,
        }
      })
      .then((res) => {
        console.log(res.data.detail)
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.detail);
      });
    }
  }

  const downloadFileHandler = async () => {
    // await axios.get(serverURL + storageURL + `?storage_title=${storage_title}`, {
      await axios.get(serverURL + storageURL + `${id}/`, {
      withCredentials: true,
      responseType: 'blob',
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
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
        "X-CSRFToken": isCsrf,
      },
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.error(err)
    })
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
        <div className='table-th'>
          <a href={link}>{link}</a>
        </div>
        <div className='table-th'>{comment}</div>
        <div className='table-th'>
          <button className='file__item__button' onClick={downloadFileHandler}>Скачать</button>
          <button className='file__item__button' onClick={openModal}>Переименовать</button>
          <button className='file__item__button' onClick={deleteFileHandler}>Удалить</button>
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} appElement={document.getElementById('app')}>
          {modalContent}
        </Modal>
      </div>
    </>
  )
}
