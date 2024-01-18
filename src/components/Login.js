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

export default function Workout() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginOpacity, setLoginOpacity] = useState('100%');

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginOpacity('20%')
        signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in 
            alert(`Username: ${username}\nPassword: ${password}`);
            const user = userCredential.user;
            setLoginOpacity('100%')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginOpacity('100%')
            alert(errorMessage)
        });
      };

    useEffect(() => {
        console.log(process.env.REACT_APP_API_KEY)
    })

    return (
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
              <TextField value={username} id="standard-basic" label="Username" variant="standard" InputLabelProps={{style: {fontSize: 13}}} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div class="password-field">
              <TextField value={password} id="standard-basic" type="password" label="Password" variant="standard" InputLabelProps={{style: {fontSize: 13}}} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div class="flex justify-content-space-around auth-checkbox-zone">
              <div>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </div>
              <div className='forgot-password-link'>
              <LockIcon>Lock</LockIcon><a href="#">Forgot pwd?</a>
              </div>
            </div>
            <div class="submit-login">
              <Button type="submit" variant="contained">Log In</Button>
            </div>
            <div className='sign-up-zone'>
              <span className='sign-up-main-text'>Don't have an account? <a href="#">Sign Up</a></span>
            </div>
          </Box>
        </div>
      </div>
    )
}