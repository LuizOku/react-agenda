import React, { Component } from 'react';

import uuid from 'uuid';
import { FaPhone, FaUserCircle, FaSearch } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

import { FabButton } from '../../components/FabButton/styles.css';
import Card from '../../components/Card';
import BaloonModal from '../../components/BaloonModal';
import { Input } from '../../components/Input/styles.css';
import {
  Container,
  Header,
  UsersBody,
  SearchContainer,
  StyledInput,
  SearchButton
} from './styles.css';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      users: [],
      isAddModalVisible: false,
      user: '',
      userRequiredError: false,
      password: '',
      passwordRequiredError: false,
      passwordConfirm: '',
      passwordConfirmRequiredError: false,
      errorMessage: '',
      isAnUpdate: false,
      userToEdit: undefined
    };
  }

  componentDidMount() {
    // Recupera os dados de usuários do storage.
    const users = this.getUsersFromStorage();
    this.setState({
      users
    });
  }

  /**
   * Compara os usuários para ordenar alfabéticamente.
   */
  compare = (a, b) => {
    const userA = a.user.toLowerCase();
    const userB = b.user.toLowerCase();

    let comparison = 0;
    if (userA > userB) {
      comparison = 1;
    } else if (userA < userB) {
      comparison = -1;
    }
    return comparison;
  };

  /**
   * Recupera os usuários do storage.
   */
  getUsersFromStorage = () => {
    const usersStorage = localStorage.getItem('users');
    if (usersStorage) {
      return JSON.parse(usersStorage).sort(this.compare);
    }
    return [];
  };

  /**
   * Filtra os usuários de acordo com o filtro de texto.
   */
  filterUsers = () => {
    const { searchText } = this.state;
    const users = this.getUsersFromStorage();
    const filteredList = users.filter(
      item => item.user.toLowerCase().search(searchText.toLowerCase()) !== -1
    );
    this.setState({ users: filteredList.sort(this.compare) });
  };

  /**
   * Limpa os campos da modal.
   */
  handleCloseAddModal = () => {
    this.setState({
      isAddModalVisible: false,
      user: undefined,
      userRequiredError: false,
      password: undefined,
      passwordRequiredError: false,
      passwordConfirm: undefined,
      passwordConfirmRequiredError: false,
      errorMessage: undefined,
      isAnUpdate: false,
      userToEdit: undefined
    });
  };

  /**
   *  Preenche os campos do formulário para editar o usuário.
   */
  handleUpdateUser = user => {
    this.setState({
      user: user.user,
      password: user.password,
      passwordConfirm: user.password,
      isAddModalVisible: true,
      isAnUpdate: true,
      userToEdit: user.user
    });
  };

  /**
   *  Deleta o usuário.
   */
  handleRemoveUser = userName => {
    const users = this.getUsersFromStorage();
    const newUsers = users.filter(user => user.user !== userName);
    localStorage.setItem('users', JSON.stringify(newUsers));
    this.setState({
      users: this.getUsersFromStorage()
    });
    this.handleCloseAddModal();
  };

  /**
   * Salva um novo usuário.
   */
  handleSaveUser = () => {
    const { user, password, passwordConfirm, isAnUpdate, userToEdit } = this.state;
    let users = this.getUsersFromStorage();
    // Realiza a verificação dos campos.
    if (this.isUserValid(user, password, passwordConfirm, users)) {
      const userToSave = {
        user,
        password,
      };
      let newUsers = [];
      if (isAnUpdate) {
        const userWithouEdit = users.filter(
          u => u.user !== userToEdit
        );
        newUsers = [...userWithouEdit, userToSave];
      } else {
        newUsers = [...users, userToSave];
      }
      // Adiciona o usuário do storage.
      localStorage.setItem('users', JSON.stringify(newUsers));
      this.setState({
        users: this.getUsersFromStorage()
      });
      this.handleCloseAddModal();
    }
  };

  /**
   * Valida os campos do formulário.
   */
  isUserValid = (user, password, passwordConfirm, users) => {
    this.setState({
      userRequiredError: false,
      passwordRequiredError: false,
      passwordConfirmRequiredError: false,
      errorMessage: undefined
    });
    const { isAnUpdate } = this.state;
    let obj = {};
    if (!user || !password || !passwordConfirm) {
      // Valida se usuário não foi preenchido.
      if (!user) {
        obj = { ...obj, userRequiredError: true };
      }
      // Valida se senha não foi preenchida.
      if (!password) {
        obj = { ...obj, passwordRequiredError: true };
      }
      // Valida se confirmação de senha não foi preenchida.
      if (!passwordConfirm) {
        obj = { ...obj, passwordConfirmRequiredError: true };
      }
      obj = { ...obj, errorMessage: 'Preencha os campos obrigatórios' };
    } else {
      // Valida se senhas são iguais.
      if (password !== passwordConfirm) {
        obj = {
          ...obj,
          passwordRequiredError: true,
          passwordConfirmRequiredError: true,
          errorMessage: 'Senhas não idênticas'
        };
      }
      if (!obj.userRequiredError && !isAnUpdate) {
        // Valida se usuário está repetido.
        const findUser = users.find(u => u.user === user);
        if (findUser) {
          obj = {
            ...obj,
            userRequiredError: true,
            errorMessage: 'Usuário já cadastrado'
          };
        }
      }
    }
    // Retorna `true` caso tudo esteja correto.
    if (Object.keys(obj).length === 0) {
      this.setState({
        userRequiredError: false,
        passwordRequiredError: false,
        passwordConfirmRequiredError: false,
        errorMessage: undefined
      });
      return true;
    }
    // Retorna `false` caso algo esteja errado.
    this.setState({ user, password, passwordConfirm, ...obj });
    return false;
  };

  /**
   * Renderiza a modal de adicionar usuários
   */
  renderAddModal = () => {
    const {
      isAddModalVisible,
      user,
      userRequiredError,
      password,
      passwordRequiredError,
      passwordConfirm,
      passwordConfirmRequiredError,
      errorMessage,
      isAnUpdate
    } = this.state;
    return (
      <BaloonModal
        cancelAction={this.handleCloseAddModal}
        saveAction={this.handleSaveUser}
        deleteAction={() => this.handleRemoveUser(user)}
        isVisible={isAddModalVisible}
        showDeleteButton={isAnUpdate}
        title="Adicionar Usuário"
      >
        <span>{errorMessage}</span>
        <Input
          haserror={userRequiredError}
          onChange={e => this.setState({ user: e.target.value })}
          value={user}
          placeholder="usuário"
          onKeyDown={e => e.key === 'Enter' && this.handleSaveUser()}
        />
        <Input
          haserror={passwordRequiredError}
          onChange={e => this.setState({ password: e.target.value })}
          value={password}
          type="password"
          placeholder="senha"
          onKeyDown={e => e.key === 'Enter' && this.handleSaveUser()}
        />
        <Input
          haserror={passwordConfirmRequiredError}
          onChange={e => this.setState({ passwordConfirm: e.target.value })}
          value={passwordConfirm}
          type="password"
          placeholder="confirme a senha"
          onKeyDown={e => e.key === 'Enter' && this.handleSaveUser()}
        />
      </BaloonModal>
    );
  };

  render() {
    const { users, searchText } = this.state;
    return (
      <Container>
        {this.renderAddModal()}
        <Header>
          <FaPhone />
          <span> React Agenda</span>
        </Header>
        <UsersBody>
          <SearchContainer>
            <StyledInput
              placeholder="Pesquisar"
              value={searchText}
              onChange={e => this.setState({ searchText: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && this.filterUsers()}
            />
            <SearchButton onClick={this.filterUsers}>
              <FaSearch />
            </SearchButton>
          </SearchContainer>
          {users && users.length > 0 ? (
            users.map(u => (
              <Card
                onCardClick={() => this.handleUpdateUser(u)}
                key={uuid.v4()}
                icon={<FaUserCircle />}
                name={u.user}
              />
            ))
          ) : (
              <h2>Nenhum usuário encontrado</h2>
            )}
        </UsersBody>
        <FabButton onClick={() => this.setState({ isAddModalVisible: true })}>
          +
        </FabButton>
      </Container>
    );
  }
}

export default withRouter(Users);
