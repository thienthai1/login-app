import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import '../App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockIcon from '@mui/icons-material/Lock';
import auth from '../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [loginOpacity, setLoginOpacity] = useState('100%');
    const [isOpenLoginFailed, setIsOpenLoginFailed] = useState(false)
    const [validateCheck, setValidateCheck] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidateCheck(true)
        setLoginOpacity('20%')
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in 
            alert(`Username: ${username}\nPassword: ${password}`);
            props.onLoginTrigger(userCredential)
            setLoginOpacity('100%')
            if(isRememberMe){
              localStorage.setItem('rememberUsername', username);
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginOpacity('100%')
            setIsOpenLoginFailed(true)
            setTimeout(() => {
              setIsOpenLoginFailed(false)
            },5000)
        });
      };

    const handleSignUp = () => {
      props.onSignupTrigger()
    }

    useEffect(() => {
      if(localStorage.getItem('rememberUsername') != null){
        setUsername(localStorage.getItem('rememberUsername'))
      }
    }, [])

    return (
        <>
        { isOpenLoginFailed &&
          <Alert severity="error">Login Failed</Alert>
        }
        <div className='auth-box'>
            {   loginOpacity == '20%' &&
                <CircularProgress style={{ position: 'absolute', top: '35%', left: '48%' }}/>  
            }
        <div className="auth-content" style={{ opacity: loginOpacity }}>
          <div class="auth-box-header">
            <h3>Sign In</h3>
          </div>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div class="username-field">
              <TextField  error={username === "" && validateCheck} value={username} id="standard-basic" label="Username" variant="standard" InputLabelProps={{style: {fontSize: 13}}} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div class="password-field">
              <TextField error={password === "" && validateCheck} value={password} id="standard-basic" type="password" label="Password" variant="standard" InputLabelProps={{style: {fontSize: 13}}} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div class="flex justify-content-space-around auth-checkbox-zone">
              <div>
                <FormControlLabel onChange={(e) => setIsRememberMe(e.target.value)} value={isRememberMe} control={<Checkbox />} label="Remember me" />
              </div>
              <div className='forgot-password-link'>
              <LockIcon>Lock</LockIcon><a href="#">Forgot pwd?</a>
              </div>
            </div>
            <div class="validation-text">
                {   ((username === "") || (password === "")) && validateCheck &&
                    <p>* Please type in username and password</p>
                }
            </div>
            <div class="submit-login">
              <Button type="submit" variant="contained">Log In</Button>
            </div>
            <div className='sign-up-zone'>
              <span className='sign-up-main-text'>Don't have an account? <a onClick={handleSignUp} href="javascript:void(0)">Sign Up</a></span>
            </div>
          </Box>
        </div>
      </div>
      </>
    )
}