import React, { Component } from 'react';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault(); 
        const { registerUser } = this.props; 
        registerUser(this.state); 
        alert('Registration successful'); 
      };
    render() {
        const { email, password } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        );
    }
}

export default Login;