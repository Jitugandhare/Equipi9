import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <HomeWrapper>
      {user ? (
        <>
          <WelcomeMessage>Welcome, {user.firstname}!</WelcomeMessage>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </HomeWrapper>
  );
};

export default Home;


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
