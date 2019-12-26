import React, { Component } from 'react';

import { FaPhone } from 'react-icons/fa';
import { Input } from '../../components/Input/styles.css';

import {
  Container, LoginContainer, LoginHeader, LoginBody, StyledButton,
} from './styles.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      password: undefined,
      userRequiredError: false,
      passwordRequiredError: false,
      invalidLoginError: false,
      errorMessage: undefined,
    };
  }

  handleLogin = () => {
    const { user, password } = this.state;
    if (this.isAuthenticationValid(user, password)) {
      console.log('passou');
    } else {
      console.log('nao passou');
    }
  }

  isAuthenticationValid = (user, password) => {
    let obj = {};

    if (user && password) {
      if (user !== 'admin' || password !== 'admin') {
        obj = { ...obj, invalidLoginError: true, errorMessage: 'Usuário ou senha incorretos' };
      }
    } else {
      if (!user) {
        obj = { ...obj, userRequiredError: true };
      }
      if (!password) {
        obj = { ...obj, passwordRequiredError: true };
      }
      obj = { ...obj, errorMessage: 'Preencha os campos obrigatórios' };
    }

    if (Object.keys(obj).length === 0) {
      this.setState({
        userRequiredError: false,
        passwordRequiredError: false,
        invalidLoginError: false,
        errorMessage: undefined,
      });
      return true;
    }
    this.setState({ user, password, ...obj });
    return false;
  }

  render() {
    const {
      user, password, userRequiredError, passwordRequiredError, invalidLoginError, errorMessage,
    } = this.state;
    return (
      <Container>
        <LoginContainer>
          <LoginHeader>
            <FaPhone />
            <span> React Agenda</span>
          </LoginHeader>
          <LoginBody>
            <Input hasError={userRequiredError} onChange={(e) => this.setState({ user: e.target.value })} value={user} placeholder="usuário" />
            <Input hasError={passwordRequiredError} onChange={(e) => this.setState({ password: e.target.value })} value={password} type="password" placeholder="senha" />
            <StyledButton onClick={this.handleLogin}>Entrar</StyledButton>
            <span>{errorMessage}</span>
          </LoginBody>
        </LoginContainer>
      </Container>
    );
  }
}
