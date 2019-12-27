import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';

import { Input } from '../../components/Input/styles.css';
import {
  Container,
  LoginContainer,
  LoginHeader,
  LoginBody,
  StyledButton,
} from './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      password: undefined,
      userRequiredError: false,
      passwordRequiredError: false,
      errorMessage: undefined,
    };
  }

  /**
   * Realiza o login.
   */
  handleLogin = () => {
    const { user, password } = this.state;
    const { history } = this.props;
    // Realiza a verificação dos campos.
    if (this.isAuthenticationValid(user, password)) {
      const auth = {
        user,
        password,
      };
      // Adiciona o usuario e senha do storage.
      localStorage.setItem('auth', JSON.stringify(auth));
      // Direciona para a tela da agenda.
      history.push('/agenda');
    }
  };

  /**
   * Valida os campos do formulário.
   */
  isAuthenticationValid = (user, password) => {
    this.setState({
      userRequiredError: false,
      passwordRequiredError: false,
      errorMessage: undefined,
    });
    let obj = {};
    // Valida se usuário e senha foram preenchidos.
    if (user && password) {
      // Valida se usuário e senha estão corretos.
      if (user !== 'admin' || password !== 'admin') {
        obj = {
          ...obj,
          errorMessage: 'Usuário ou senha incorretos',
        };
      }
    } else {
      // Valida se usuário não foi preenchido.
      if (!user) {
        obj = { ...obj, userRequiredError: true };
      }
      // Valida se senha não foi preenchida.
      if (!password) {
        obj = { ...obj, passwordRequiredError: true };
      }
      obj = { ...obj, errorMessage: 'Preencha os campos obrigatórios' };
    }
    // Retorna `true` caso tudo esteja correto.
    if (Object.keys(obj).length === 0) {
      this.setState({
        userRequiredError: false,
        passwordRequiredError: false,
        errorMessage: undefined,
      });
      return true;
    }
    // Retorna `false` caso algo esteja errado.
    this.setState({ user, password, ...obj });
    return false;
  };

  render() {
    const {
      user,
      password,
      userRequiredError,
      passwordRequiredError,
      errorMessage,
    } = this.state;
    return (
      <Container>
        <LoginContainer>
          <LoginHeader>
            <FaPhone />
            <span> React Agenda</span>
          </LoginHeader>
          <LoginBody>
            <Input
              haserror={userRequiredError}
              onChange={(e) => this.setState({ user: e.target.value })}
              value={user}
              placeholder="usuário"
              onKeyDown={(e) => e.key === 'Enter' && this.handleLogin()}
            />
            <Input
              haserror={passwordRequiredError}
              onChange={(e) => this.setState({ password: e.target.value })}
              value={password}
              type="password"
              placeholder="senha"
              onKeyDown={(e) => e.key === 'Enter' && this.handleLogin()}
            />
            <StyledButton onClick={this.handleLogin}>Entrar</StyledButton>
            <span>{errorMessage}</span>
          </LoginBody>
        </LoginContainer>
      </Container>
    );
  }
}

export default withRouter(Login);
