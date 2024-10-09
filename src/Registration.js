import React, { Component } from 'react';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password) => password.length >= 6;
const validateString = (input) => /^[a-zA-Z]+$/.test(input);
const validateUsername = (username) => /^[a-zA-Z0-9_]+$/.test(username);

class Registration extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    role: 'sales',
    errors: {},
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  };

  validateForm = () => {
    const { email, username, password, firstName, lastName } = this.state;
    const errors = {};

    if (!validateEmail(email)) errors.email = 'Invalid email format';
    if (!validateUsername(username)) errors.username = 'Invalid username';
    if (!validatePassword(password)) errors.password = 'Password must be at least 6 characters';
    if (!validateString(firstName)) errors.firstName = 'First name can only contain letters';
    if (!validateString(lastName)) errors.lastName = 'Last name can only contain letters';

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();

    if (Object.keys(errors).length === 0) {
      const { registerUser } = this.props;
      registerUser(this.state);
      alert('Registration successful');
      this.setState({ email: '', username: '', password: '', firstName: '', lastName: '', gender: '', role: 'sales' });
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { email, username, password, firstName, lastName, gender, role, errors } = this.state;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="flex">
          <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={this.handleChange} required />
          {errors.firstName && <span className="error">{errors.firstName}</span>}

          <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={this.handleChange} required />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <select name="gender" value={gender} onChange={this.handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select name="role" onChange={this.handleChange} value={role}>
          <option value="sales">Sales</option>
          <option value="operations">Operations</option>
          <option value="admin">Admin</option>
        </select>
        <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} required />
        {errors.email && <span className="error">{errors.email}</span>}

        <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} required />
        {errors.username && <span className="error">{errors.username}</span>}

        <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
        {errors.password && <span className="error">{errors.password}</span>}

        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    );
  }
}

export default Registration;
