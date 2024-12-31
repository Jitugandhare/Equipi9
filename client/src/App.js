import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
