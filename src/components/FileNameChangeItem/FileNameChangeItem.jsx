import { useEffect } from 'react';
import './FileNameChangeItem.css'

export const FileNameChangeItem = ({id, title, comment, setNewFileName, setNewComment, submitHandler, cancel}) => {

  let newFileName = title
  let newComment = comment

  useEffect(() => {
    return () => {
      console.log('Компонент удален');
    };
  }, []);

  const onChangeFileName = (e) => {
    newFileName = e.target.value
    // console.log(variable)
  }

  const onChangeComment = (e) => {
    newComment = e.target.value
    // console.log(variable)
  }

  const submitNewData = () => {
    console.log(newFileName)
    submitHandler(newFileName, newComment)
  }

  const testSubmit = () => {
    console.log('Данные отправлены')
  }

  return (
    <div className="dark-overlay">
      <form className="form-file-name-change">
        <div className="form-change-field">
          <label htmlFor="title">Введите новое имя для файла: </label>
          <input type="text" name="title" defaultValue={title} onChange={(e) => onChangeFileName(e)}/>
        </div>
        <div className="form-change-field">
          <label htmlFor="comment">Введите новый комментарий: </label>
          <input type="text" name="comment" defaultValue={comment} onChange={(e) => onChangeComment(e)} />
        </div>
        <div className="form-change-field">
          <button onClick={submitNewData}>Сохранить изменения</button>
          <button onClick={cancel}>Отмена</button>
        </div>
      </form>
    </div>
  )
}
