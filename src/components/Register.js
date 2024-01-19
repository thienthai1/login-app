import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import auth from '../firebase/config';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";


export default function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (event) => {
        // event.preventDefault();
        // await createUserWithEmailAndPassword(auth, username, password)
        // .then((userCredential) => {
        //     alert('sucess')
        //     props.handleCloseSignUp()
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     alert(errorMessage)
        //     props.handleCloseSignUp()
        // });

        // await auth.signOut()

        try {
            // Create user account
            const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        
            // Sign out the user immediately
            await signOut(auth);
        
            // Now, onAuthStateChanged will not be triggered automatically
          } catch (error) {
            console.error('Error signing up:', error.message);
          }
    }

    return (
        <div className='auth-box'>
        <div className="auth-content">
          <div className="closeIcon"><CloseIcon onClick={props.handleCloseSignUp} /></div> 
          <div class="auth-box-header">
            <h3>Register</h3>
          </div>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSignup}
          >
            <div class="username-field">
              <TextField value={username} id="standard-basic" label="Username" variant="standard" InputLabelProps={{style: {fontSize: 13}}} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div class="password-field">
              <TextField value={password} id="standard-basic" type="password" label="Password" variant="standard" InputLabelProps={{style: {fontSize: 13}}} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div class="submit-login">
              <Button type="submit" variant="contained">Register</Button>
            </div>
          </Box>
        </div>
      </div>
    )
}