import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getCSRF, getUserInfo } from '../../../utils'
import { serverURL, storageURL, userInfoURL } from '../../../URLs/urls'
import axios from 'axios'
import { FileItem } from '../../FileItem/FileItem'
import { UploadItem } from '../../UploadItem/UploadItem'
import { useNavigate } from 'react-router-dom'

export const StoragePage = ({ memberId=0 }) => {
  // console.log(memberId)
  const [files, setFiles] = useState([])
  const [isCsrf, setIsCsrf] = useState(null)
  const navigate = useNavigate()

  const getData = async (iserId) => {
    await axios.get(serverURL + storageURL, { 
      withCredentials: true,
      params: {
        'memberId': iserId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      // console.log(res.data.data)
      if (res.data && res.data.length != 0) {
        console.log('Получен список файлов')
        setFiles(res.data.data)
      }
      if (res.data.length === 0) {
        navigate(storageURL)
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    getCSRF(setIsCsrf)
    getData(memberId)
  }, [memberId])

  return (
    <>
      <div className="table">
        <div className="table-thead">    
          <div className="table-tr">
            <div className="table-th">Имя файла</div>
            <div className="table-th">Размер</div>
            <div className="table-th">Дата загрузки</div>
            <div className="table-th">Последнее скачивание</div>
            <div className="table-th">Путь к файлу</div>
            <div className="table-th">Примечание</div>
            <div className="table-th">Удалить файл</div>
          </div>
        </div>
        <div className="table-tbody">
          {files.length !== 0 ?
            files.map((fileData, index) => {
              return(<FileItem 
                key={index} 
                fileData={fileData} 
                csrfToken={isCsrf}
                resetFiles={() => getData(memberId)}
                />)
            })
          : 'У Вас ещё нет загруженных файлов'}
        </div>

      </div>
      <UploadItem memberId={memberId}/>
    </>
  )
}
