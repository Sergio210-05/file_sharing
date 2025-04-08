import './UploadItem.css'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { serverURL, storageURL } from '../../URLs/urls'
import { getCSRF } from '../../utils'

export const UploadItem = ({ memberId=0 }) => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [isCsrf, setIsCsrf] = useState(null)
  let comment = ''

  useEffect(() => {
    getCSRF(setIsCsrf)
  }, [])

  const onFileChange = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0])
    }
  }

  const onCommentChange = (e) => {
    comment = e.target.value
    // console.log(comment)
  }

  const onFileUpload = async () => {
    if (selectedFile) {
      const FileFormData = new FormData()
      FileFormData.append("file", selectedFile)
      FileFormData.append("original_title", selectedFile.name)
      FileFormData.append("comment", comment)
      if (memberId) {
        FileFormData.append("member_id", memberId)
      }
      console.log(FileFormData)
  
      await axios.post(serverURL + storageURL, FileFormData, { 
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": isCsrf,
        }
      })
      .then(res => {
        console.log(res.data)
        window.location.reload();
        console.log('Файл загружен в хранилище')
      })
      .catch(err => {
        console.error(err)
        console.error(FileFormData)
      })
    }
    setSelectedFile(null)
    comment = ''
  }


  return (
    <>
      <h4>Загрузить новый файл</h4>
      <div>
        <div>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>Загрузить</button>
          
        </div>
        <textarea 
        name="file__discription" 
        className={selectedFile ? 'file__discription' : 'hide file__discription'}
        placeholder='Введите комментарий'
        onChange={onCommentChange}></textarea>
      </div>
    </>
  )
}
