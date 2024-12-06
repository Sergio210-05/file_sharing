import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';

export const PageMain = ({isAuth, serverURL}) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage isAuth={isAuth} />}/>
        <Route path='api/login/' element={<LoginPage serverURL={serverURL} />}/>
      </Routes>
    </>
  )
}
