import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { downloadURL, serverURL } from '../../../URLs/urls'

export const DownloadPage = () => {
  const { storageTitle } = useParams()

  const download = async () => {
    await axios.get(serverURL + downloadURL + storageTitle, { 
      withCredentials: false, 
      responseType: 'blob',
      headers: {
        "Content-Type": "application/json",
      },})
    .then((res) => {
      console.log(res)
      const href = URL.createObjectURL(res.data)
      const link = document.createElement('a')
      const contentDisposition = res.headers['content-disposition']
      const reg = new RegExp('filename="(.*)"')
      const originalTitle = contentDisposition.match(reg)[1]
      link.href = href
      link.setAttribute('download', originalTitle)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(href)
      console.log('Скачивание файла началось')
    })
    .catch((err) => {
      console.error(err)
    })
  }
  useEffect(() => {download()}, [])

  return (
    <div>DownloadPage</div>
  )
}
