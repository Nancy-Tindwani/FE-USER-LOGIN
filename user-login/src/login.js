// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {

const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  

  const validate = () => {
    let temp = { ...errors };
    temp.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Invalid email';
    temp.password = formData.password ? '' : 'Password is required';

    setErrors(temp);
    return Object.values(temp).every(x => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        'http://localhost:8081/api/v1/login',
        formData,
        {
          withCredentials: true, // Send/receive cookies
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Login success:', response.data);
      // Optional: store token if not using cookies
      // localStorage.setItem('token', response.data.jwtToken);
      navigate('/dashboard'); // redirect after login
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Login failed');
      } else {
        alert('Network or server error');
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#fff'
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          <form  noValidate>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={()=>handleSubmit()}
            >
              Login
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={()=>navigate('/reset-password')}

            >
              FORGOT Password
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Login;
