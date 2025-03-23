import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../../../utils'
import { serverURL, storageURL, userInfoURL } from '../../../URLs/urls'
import axios from 'axios'
import { FileItem } from '../../FileItem/FileItem'
import { UploadItem } from '../../UploadItem/UploadItem'

export const StoragePage = () => {

  const [files, setFiles] = useState(null)

  const getData = async () => {
    await axios.get(serverURL + storageURL, { 
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((res) => {
      // console.log(res.data)
      if (files === null) {
        setFiles(res.data)
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  // getUserInfo(userInfoURL)
  useEffect(() => {
    getData()
  }, [])
  // getData()

  // console.log(files)

  return (
    <>
      <div className="table">
        {/* <div className="table-colgroup">
          <div className="table-col" style={{width: '20%'}}></div>
          <div className="table-col" style={{width: '10%'}}></div>
          <div className="table-col" style={{width: '15%'}}></div>
          <div className="table-col" style={{width: '15%'}}></div>
          <div className="table-col" style={{width: '20%'}}></div>
          <div className="table-col" style={{width: '20%'}}></div>
        </div> */}
        <div className="table-thead">    
          <div className="table-tr">
            <div className="table-th">Имя файла</div>
            <div className="table-th">Размер</div>
            <div className="table-th">Дата загрузки</div>
            <div className="table-th">Последнее скачивание</div>
            <div className="table-th">Ссылка</div>
            <div className="table-th">Примечание</div>
            <div className="table-th">Удалить файл</div>
          </div>
        </div>
        <div className="table-tbody">
          {files ?
            files.map((fileData, index) => {
              return(<FileItem key={index} fileData={fileData}/>)
            })
          // 'Список файлов получен'
          : 'У Вас ещё нет загруженных файлов'}
        </div>

      </div>
      <UploadItem />
    </>
  )
}
