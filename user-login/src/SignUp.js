import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
} from '@mui/material';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validate = () => {
    let temp = { ...errors };
    temp.name = formData.name ? '' : 'Name is required';
    temp.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Invalid email';
    temp.password = formData.password.length >= 6 ? '' : 'Minimum 6 characters required';

    setErrors({ ...temp });
    return Object.values(temp).every(x => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          'http://localhost:8081/api/v1/register',
          formData,
          { withCredentials: true } // for cookies/JWT if used
        );
        console.log('Registration successful:', response.data);
        alert("Registration successful");
        navigate('/login');
        // Redirect or clear form
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        alert("Registration failed");
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
            backgroundColor: 'white'
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
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
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;
