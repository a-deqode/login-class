import React, { Component } from 'react';


class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;

    onLogin(email, password);
    this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className='move'>
        <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
        <button type="submit">Login</button></div>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </form>
    );
  }
}

export default Login;
