import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      mobilenumber: '',
      password: '',
      error: '',
      success: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, mobilenumber, password } = this.state;

    try {
      const response = await axios.post('http://localhost:8080/user/register', {
        firstname,
        lastname,
        mobilenumber,
        password
      });

      if (response.status === 200 && response.data) {
        
        this.setState({
          error: '', 
          success: 'Registration successful! Redirecting to login...'
        });
        setTimeout(() => {
          this.props.history.push('/login');
        }, 2000); 
      } else {
        this.setState({ error: 'Unexpected response format' });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : 'Error registering user';
      this.setState({ error: errorMessage });
    }
  };

  render() {
    const { firstname, lastname, mobilenumber, password, error, success } = this.state;

    return (
      <FormWrapper>
        <FormContainer>
          <h2>Register</h2>
          <form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              name="mobilenumber"
              placeholder="Mobile Number"
              value={mobilenumber}
              onChange={this.handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <Button type="submit">Register</Button>
          </form>
          {success && <SuccessMessage>{success}</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormContainer>
      </FormWrapper>
    );
  }
}

export default Register;

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

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;
