import logo from './logo.svg';
import Box from '@mui/material/Box';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import LockIcon from '@mui/icons-material/Lock';

function App() {
  return (
    <div className="App">
      <div className='auth-box'>
        <div className="auth-content">
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
          >
            <div class="username-field">
              <TextField id="standard-basic" label="Username" variant="standard" InputLabelProps={{style: {fontSize: 13}}} />
            </div>
            <div class="password-field">
              <TextField id="standard-basic" label="Password" variant="standard" InputLabelProps={{style: {fontSize: 13}}} />
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
              <Button variant="contained">Log In</Button>
            </div>
            <div className='sign-up-zone'>
              <span className='sign-up-main-text'>Don't have an account? <a href="#">Sign Up</a></span>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default App;
