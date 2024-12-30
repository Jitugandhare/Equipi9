import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.props.navigate('/login'); 
    } else {
      const parsedUser = JSON.parse(userData);
      this.setState({ user: parsedUser }); 
    }
  }

  handleLogout = () => {
    localStorage.removeItem('user');
    this.props.navigate('/login'); 
  };

  render() {
    const { user } = this.state;
    return (
      <HomeWrapper>
        {user ? (
          <>
            <WelcomeMessage>Welcome, {user.firstname || 'User'}!</WelcomeMessage>
            <LogoutButton onClick={this.handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </HomeWrapper>
    );
  }
}

const HomeWithNavigate = (props) => {
  const navigate = useNavigate();
  return <Home {...props} navigate={navigate} />;
};

export default HomeWithNavigate;

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
  text-align: center;
`;

const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4e50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1rem;
  border-radius: 5px;

  &:hover {
    background-color: #e04c48;
  }
`;
