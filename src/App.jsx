import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from "./Form";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { PageMain } from "./components/PageMain/PageMain";
import { PageNav } from "./components/PageNav/PageNav";
import { useSelector, useDispatch } from 'react-redux';
import { stateSelector } from './redux/selectors';

function App() {
  // const serverURL = 'http://localhost:8000';

  // const user = {
  //   username: 'yasha',
  //   fullName: 'Yarik Petrov',
  //   isAdmin: true,
  // }
  // const isAuth = false
  // const [isAuth, setIsAuth] = useState(false)
  // const [isAdmin, setIsAdmin] = useState(false)
  const { isAuth, user } = useSelector(stateSelector)
  // console.log(isAuth, user)
  

  return (
    <div className="App">
        <header className="App-header">
          <PageHeader user={user} isAuth={isAuth} />
        </header>
        {/* <div className="App-main"> */}
        <nav>
          <PageNav />
        </nav>
        <main>
          <PageMain user={user} isAuth={isAuth}/>
        </main>

        {/* </div> */}
    </div>
  );
}

export default App;