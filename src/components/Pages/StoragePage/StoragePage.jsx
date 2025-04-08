import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getUserInfo } from '../../../utils'
import { serverURL, storageURL, userInfoURL } from '../../../URLs/urls'
import axios from 'axios'
import { FileItem } from '../../FileItem/FileItem'
import { UploadItem } from '../../UploadItem/UploadItem'

export const StoragePage = ({ memberId=0 }) => {
  console.log(memberId)
  const [files, setFiles] = useState([])
  // const [userId, setUserId] = useState(memberId > 0 ? memberId : userId)
  // const [filesGet, setFilesGet] = useState(0)
  // const calledOnce = useRef(false)

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
      // console.log(res.data)
      // console.log(files)
      console.log('Получен список файлов')
      setFiles(res.data)
      
      // setFilesGet(res.data.length)
    })
    .catch((err) => {
      console.error(err)
    })
  }

  useEffect(() => {
    getData(memberId)
  }, [memberId])

  // useEffect(() => {
  //   if (!calledOnce.current) {
  //     getData(memberId)
  //     calledOnce.current = true
  //   }
  // }, [memberId])

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
          {files.length === 0 ?
            files.map((fileData, index) => {
              return(<FileItem key={index} fileData={fileData}/>)
            })
          // 'Список файлов получен'
          : 'У Вас ещё нет загруженных файлов'}
        </div>

      </div>
      <UploadItem memberId={memberId}/>
    </>
  )
}
