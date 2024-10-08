import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import UserList from './UserList';

const userDatabase = [];

class App extends Component {
  state = {
    isAuthenticated: false,
    users: [],
    token: null,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ isAuthenticated: true, token });
    }
  }

  registerUser = (newUser) => {
    const userExists = userDatabase.some(user => user.email === newUser.email);
    if (userExists) {
      alert('User already exists');
      return;
    }
    userDatabase.push(newUser);
    this.setState({ users: userDatabase });
  };

  handleLogin = (email, password) => {
    const user = userDatabase.find(user => user.email === email && user.password === password);
    if (user) {
      const token = `token-${user.username}`;
      localStorage.setItem('token', token);
      this.setState({ token, isAuthenticated: true });
      alert('Login successful');
    } else {
      alert('Invalid email or password');
    }
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ isAuthenticated: false, token: null });
  };

  render() {
    const { isAuthenticated, token } = this.state;

    return (
      <Router>
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/register" element={<Registration registerUser={this.registerUser} />} />
            <Route path="/login" element={<Login onLogin={this.handleLogin} />} />
            <Route path="/users" element={
              isAuthenticated ? (
                <UserList users={userDatabase} token={token} onLogout={this.handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/" element={
              <>
                <h2>Welcome to User Management</h2>
                {isAuthenticated ? <Navigate to="/users" /> : <Navigate to="/login" />}
              </>
            } />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
