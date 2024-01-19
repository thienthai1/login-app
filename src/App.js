import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import auth from './firebase/config';

function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [isLogin, setIsLogin] = useState('false')

  const LoginTrigger = (data) => {
      setCurrentUser(data.user.email)
      console.log(data.user.email);
      setIsLogin('true')
  }

  const LogoutTrigger = () => {
    auth.signOut().then((response) => {
      setCurrentUser('')
      setIsLogin('false')
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.email)
        // this.setState({
        //   currentUser: user
        // })
        setCurrentUser(user.email)
        setIsLogin('true')
      }
    })
  })

  return (
    <div className="App">
        {isLogin == 'false' ? (
          <Login onLoginTrigger={LoginTrigger} />
        ) : (
          <>
            {currentUser} <button onClick={LogoutTrigger}>Logout</button>
          </>
        )}
    </div>
  );
}

export default App;
