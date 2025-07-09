// src/pages/ResetPassword.js
import React, { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline
} from '@mui/material';
import axios from 'axios';

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    newPassword: ''
  });

  const validate = () => {
    let temp = { ...errors };
    temp.email = /\S+@\S+\.\S+/.test(formData.email) ? '' : 'Invalid email';
    temp.newPassword = formData.newPassword.length >= 6 ? '' : 'Min 6 characters';

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
        'http://localhost:8081/api/v1/reset-password',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Password reset successful!');
    } catch (error) {
      console.error('Error:', error);
      alert(error?.response?.data?.message || 'Reset failed');
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
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
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
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default ResetPassword;
