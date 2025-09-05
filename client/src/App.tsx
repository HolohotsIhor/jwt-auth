import { useContext, useEffect } from 'react';
import './App.css'
import { LoginForm } from './components/LoginForm/LoginForm'
import { Context } from './main';
import { TOKEN_KEY } from './helpres/constants';
import { observer } from 'mobx-react-lite';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem(TOKEN_KEY)) {
      store.checkAuth();
    }
  }, []);


  if (!store.isAuth) {
    return <LoginForm />
  }

  return (
    <>
      <h1>{store.isAuth ? `Hello ${store.user.email}` : 'Log in, please'}</h1>
      <button onClick={() => store.logout()}>Log out</button>
    </>
  )
}

export default observer(App);
