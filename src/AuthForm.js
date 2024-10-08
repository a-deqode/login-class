import React, { Component } from 'react';


const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => password.length >= 6;

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true, 
      loginEmail: '',
      loginPassword: '',
      registerEmail: '',
      registerPassword: '',
      registerConfirmPassword: '',
      errors: {
        loginEmail: '',
        loginPassword: '',
        registerEmail: '',
        registerPassword: '',
        registerConfirmPassword: '',
      },
    };
  }

  toggleForm = () => {
    this.setState((prevState) => ({ isLogin: !prevState.isLogin }));
  };

  handleLoginChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegisterChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateLogin = () => {
    const { loginEmail, loginPassword } = this.state;
    const errors = {};
    if (!validateEmail(loginEmail)) errors.loginEmail = 'Invalid email';
    if (!validatePassword(loginPassword)) errors.loginPassword = 'Password must be at least 6 characters';
    return errors;
  };

  validateRegister = () => {
    const { registerEmail, registerPassword, registerConfirmPassword } = this.state;
    const errors = {};
    if (!validateEmail(registerEmail)) errors.registerEmail = 'Invalid email';
    if (!validatePassword(registerPassword)) errors.registerPassword = 'Password must be at least 6 characters';
    if (registerPassword !== registerConfirmPassword) errors.registerConfirmPassword = 'Passwords do not match';
    return errors;
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateLogin();
    if (Object.keys(errors).length === 0) {

      alert('Login successful');
    } else {
      this.setState({ errors });
    }
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateRegister();
    if (Object.keys(errors).length === 0) {
     
      alert('Registration successful');
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { isLogin, loginEmail, loginPassword, registerEmail, registerPassword, registerConfirmPassword, errors } = this.state;

    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
          <h2>Login</h2>
          <form onSubmit={this.handleLoginSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="loginEmail"
                value={loginEmail}
                onChange={this.handleLoginChange}
              />
              {errors.loginEmail && <span style={{ color: 'red' }}>{errors.loginEmail}</span>}
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="loginPassword"
                value={loginPassword}
                onChange={this.handleLoginChange}
              />
              {errors.loginPassword && <span style={{ color: 'red' }}>{errors.loginPassword}</span>}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        <div style={{ flex: 1, padding: '20px' }}>
          <h2>Register</h2>
          <form onSubmit={this.handleRegisterSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="registerEmail"
                value={registerEmail}
                onChange={this.handleRegisterChange}
              />
              {errors.registerEmail && <span style={{ color: 'red' }}>{errors.registerEmail}</span>}
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="registerPassword"
                value={registerPassword}
                onChange={this.handleRegisterChange}
              />
              {errors.registerPassword && <span style={{ color: 'red' }}>{errors.registerPassword}</span>}
            </div>
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                name="registerConfirmPassword"
                value={registerConfirmPassword}
                onChange={this.handleRegisterChange}
              />
              {errors.registerConfirmPassword && <span style={{ color: 'red' }}>{errors.registerConfirmPassword}</span>}
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthForm;

