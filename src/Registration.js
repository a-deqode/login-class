import React, { Component } from 'react'; 

class Registration extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        role: 'sales',
    };

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
        const { email, username, password, firstName, lastName, gender, role } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange} required />
                <select name="gender" onChange={this.handleChange} required>
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
                <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
                <button type="submit">Register</button>
                <p>
                Already have an account? <a href="/login">Login</a> 
                </p>
            </form>

);
}
}

export default Registration;