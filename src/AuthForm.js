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

  handleChange = (e) => {
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
        {isLogin ? (
          <LoginForm
            email={loginEmail}
            password={loginPassword}
            errors={errors}
            onChange={this.handleChange}
            onSubmit={this.handleLoginSubmit}
          />
        ) : (
          <RegisterForm
            email={registerEmail}
            password={registerPassword}
            confirmPassword={registerConfirmPassword}
            errors={errors}
            onChange={this.handleChange}
            onSubmit={this.handleRegisterSubmit}
          />
        )}
        <button onClick={this.toggleForm}>
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>
      </div>
    );
  }
}

export default AuthForm;