import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from "./Form";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { PageMain } from "./components/PageMain/PageMain";
import { PageNav } from "./components/PageNav/PageNav";
import { useSelector, useDispatch } from 'react-redux';
import { stateSelector } from './redux/selectors';

function App() {
  const { isAuth, user } = useSelector(stateSelector)  

  return (
    <div className="App">
        <header className="App-header">
          <PageHeader user={user} isAuth={isAuth} />
        </header>
        <div className='App__content'>
          <nav className="App-nav nav-left">
            <PageNav />
          </nav>
          <main className="App-main">
            <PageMain user={user} isAuth={isAuth}/>
          </main>
        </div>

    </div>
  );
}

export default App;