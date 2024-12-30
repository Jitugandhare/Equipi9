import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; // Google OAuth import

const Login = () => {
  const [formData, setFormData] = useState({ mobilenumber: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/login', formData);
      console.log(response);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
      }
    } catch (error) {
      setError(error.response.data.message || 'Error logging in user');
    }
  };

  // Google OAuth response handler
  const handleGoogleLogin = async (response) => {
    try {
      const { tokenId } = response;
      const res = await axios.post('http://localhost:8080/user/google', { tokenId });
      console.log(res);
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/');
      }
    } catch (error) {
      setError('Google login failed');
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="mobilenumber"
            placeholder="Mobile Number"
            value={formData.mobilenumber}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit">Login</Button>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <RegisterLink>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </RegisterLink>

        {/* Google OAuth Button */}
        <GoogleLogin 
          onSuccess={handleGoogleLogin} 
          onError={() => setError('Google login failed')}
        />
      </FormContainer>
    </FormWrapper>
  );
};

export default Login;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const RegisterLink = styled.div`
  margin-top: 20px;
  text-align: center;

  a {
    color: #4caf50;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
