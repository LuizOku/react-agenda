import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';

import { Input } from '../../components/Input/styles.css';
import {
  Container,
  LoginContainer,
  LoginHeader,
  LoginBody,
  StyledButton,
  ButtonContainer
} from './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      userRequiredError: false,
      passwordRequiredError: false,
      errorMessage: ''
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
        password
      };
      // Adiciona o usuario e senha do storage.
      localStorage.setItem('auth', JSON.stringify(auth));
      // Direciona para a tela da agenda.
      history.push(`/agenda/${user}`);
    }
  };

  /**
   * Redireciona para a tela de contatos públicos.
   */
  goToPublicContacts = () => {
    const { history } = this.props;
    history.push(`/agenda`);
  }

  /**
   * Recupera os usuários do storage.
   */
  getUsersFromStorage = () => {
    const usersStorage = localStorage.getItem('users');
    if (usersStorage) {
      return JSON.parse(usersStorage);
    }
    return [];
  };

  /**
   * Valida os campos do formulário.
   */
  isAuthenticationValid = (user, password) => {
    this.setState({
      userRequiredError: false,
      passwordRequiredError: false,
      errorMessage: undefined
    });
    const users = this.getUsersFromStorage();
    const confirmUser = users.find(u => u.user === user && u.password === password);
    let obj = {};
    // Valida se usuário e senha foram preenchidos.
    if (user && password) {
      // Valida se usuário e senha estão corretos.
      if (!confirmUser && (user !== 'admin' || password !== 'admin')) {
        obj = {
          ...obj,
          errorMessage: 'Usuário ou senha incorretos'
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
        errorMessage: undefined
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
      errorMessage
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
              onChange={e => this.setState({ user: e.target.value })}
              value={user}
              placeholder="usuário"
              onKeyDown={e => e.key === 'Enter' && this.handleLogin()}
            />
            <Input
              haserror={passwordRequiredError}
              onChange={e => this.setState({ password: e.target.value })}
              value={password}
              type="password"
              placeholder="senha"
              onKeyDown={e => e.key === 'Enter' && this.handleLogin()}
            />
            <ButtonContainer>
              <StyledButton onClick={this.handleLogin}>Entrar</StyledButton>
              <StyledButton onClick={this.goToPublicContacts}>Contatos Públicos</StyledButton>
            </ButtonContainer>
            <Link to="/users">Cadastrar usuário</Link>
            <span>{errorMessage}</span>
          </LoginBody>
        </LoginContainer>
      </Container>
    );
  }
}

export default withRouter(Login);
