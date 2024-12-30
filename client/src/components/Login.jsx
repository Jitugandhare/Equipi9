import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        mobilenumber: '',
        password: ''
      },
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleChange(e) {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/login', this.state.formData);
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.props.navigate('/home'); 
      }
    } catch (error) {
      this.setState({ error: error.response.data.message || 'Error logging in user' });
    }
  }

  async handleGoogleLogin(response) {
    try {
      const { tokenId } = response;
      const res = await axios.post('http://localhost:8080/user/google', { tokenId });
      console.log(res);
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data));
        this.props.navigate('/home'); 
      }
    } catch (error) {
      this.setState({ error: 'Google login failed' });
    }
  }

  render() {
    const { formData, error } = this.state;
    return (
      <FormWrapper>
        <FormContainer>
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              name="mobilenumber"
              placeholder="Mobile Number"
              value={formData.mobilenumber}
              onChange={this.handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={this.handleChange}
            />
            <Button type="submit">Login</Button>
          </form>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <RegisterLink>
            <p>Don't have an account? <a href="/register">Register</a></p>
          </RegisterLink>

          <GoogleLogin
            onSuccess={this.handleGoogleLogin}
            onError={() => this.setState({ error: 'Google login failed' })}
          />
        </FormContainer>
      </FormWrapper>
    );
  }
}

export default function LoginWithNavigate(props) {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

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
