import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import auth from './firebase/config';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [isLogin, setIsLogin] = useState('false');
  const [isOpenRegister, setIsOpenRegister] = useState(false)
  const [isOpenLoginSuccess, setIsOpenLoginSuccess] = useState(false)

  const LoginTrigger = (data) => {
      setCurrentUser(data.user.email)
      setIsLogin('true')
      setIsOpenLoginSuccess(true)
      setTimeout(() => {
        setIsOpenLoginSuccess(false)
      },5000)
  }

  const LogoutTrigger = () => {
    auth.signOut().then((response) => {
      setCurrentUser('')
      setIsLogin('false')
    });
  }

  const handleSignUp = () => {
    setIsOpenRegister(true)
  }

  const handleCloseSignUp = () => {
    setIsOpenRegister(false)
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.email)
        setCurrentUser(user.email)
        setIsLogin('true')
      }else{
        console.log('run app')
      }
    })
  }, [])

  return (
    <div className="App">
      { isOpenLoginSuccess &&
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Login Successful
        </Alert>
      }
        {isLogin == 'false' ? (

          isOpenRegister == false ? (
            <Login onLoginTrigger={LoginTrigger} onSignupTrigger={handleSignUp} />
          ) : (
            <>
              <Register handleCloseSignUp={handleCloseSignUp} />
            </>
          )

        ) : (
          <>
            {currentUser} <button onClick={LogoutTrigger}>Logout</button>
          </>
        )}
    </div>
  );
}

export default App;
