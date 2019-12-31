import React, { Component } from 'react';

import uuid from 'uuid';
import { FaPhone, FaUserCircle, FaSearch } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

import { checkEmail, checkPhone } from '../../utils/validations';
import { PHONE_MASK } from '../../utils/masks';
import { FabButton } from '../../components/FabButton/styles.css';
import Card from '../../components/Card';
import BaloonModal from '../../components/BaloonModal';
import CheckBox from '../../components/CheckBox';
import { Input, StyledMaskedInput } from '../../components/Input/styles.css';
import {
  Container,
  Header,
  AgendaBody,
  SearchContainer,
  StyledInput,
  SearchButton
} from './styles.css';

class Agenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      contacts: [],
      isAddModalVisible: false,
      name: '',
      nameRequiredError: false,
      phone: '',
      phoneRequiredError: false,
      email: '',
      emailRequiredError: false,
      errorMessage: '',
      isPublic: false,
      isAnUpdate: false,
      contactToEdit: undefined
    };
  }

  componentDidMount() {
    const { history } = this.props;
    // Verifica se o usuário da URL é o mesmo guardado no storage.
    if (this.getUserFromPath() && this.getUserFromPath() !== this.getUserFromStorage()) {
      history.push('/');
    }
    // Recupera os dados de contatos do storage.
    const contacts = this.getContactsFromStorage();
    this.setState({
      contacts
    });
  }

  /**
   * Recupera o usuário que está na url.
   */
  getUserFromPath = () => this.props.match.params.user;

  /**
   * Recupera o usuario do storage.
   */
  getUserFromStorage = () => {
    const userStorage = localStorage.getItem('auth');
    if (userStorage) {
      return JSON.parse(userStorage).user;
    }
    return undefined;
  };

  /**
   * Compara os contatos para ordenar alfabéticamente.
   */
  compare = (a, b) => {
    const contactA = a.name.toLowerCase();
    const contactB = b.name.toLowerCase();

    let comparison = 0;
    if (contactA > contactB) {
      comparison = 1;
    } else if (contactA < contactB) {
      comparison = -1;
    }
    return comparison;
  };

  /**
   * Recupera os contatos do storage.
   */
  getContactsFromStorage = (publicContact) => {
    const user = this.getUserFromPath();
    const contactsStorage = localStorage.getItem('contacts');
    if (contactsStorage) {
      const contacts = JSON.parse(contactsStorage);
      if (user && !publicContact) {
        return contacts[user] ? contacts[user].sort(this.compare) : [];
      }
      return contacts['public'] ? contacts['public'].sort(this.compare) : [];
    }
    return [];
  };

  /**
   * Recupera todos os contatos do storage.
   */
  getAllContactsObject = () => {
    const contactsStorage = localStorage.getItem('contacts');
    if (contactsStorage) {
      return JSON.parse(contactsStorage);
    }
    return {};
  };

  /**
   * Filtra os contatos de acordo com o filtro de texto.
   */
  filterContacts = () => {
    const { searchText } = this.state;
    const contacts = this.getContactsFromStorage();
    const filteredList = contacts.filter(
      item => item.name.toLowerCase().search(searchText.toLowerCase()) !== -1
    );
    this.setState({ contacts: filteredList.sort(this.compare) });
  };

  /**
   * Limpa os campos da modal.
   */
  handleCloseAddModal = () => {
    this.setState({
      isAddModalVisible: false,
      name: undefined,
      nameRequiredError: false,
      phone: undefined,
      phoneRequiredError: false,
      email: undefined,
      emailRequiredError: false,
      isPublic: false,
      errorMessage: undefined,
      isAnUpdate: false,
      contactToEdit: undefined
    });
  };

  /**
   *  Preenche os campos do formulário para editar o contato.
   */
  handleUpdateContact = contact => {
    this.setState({
      name: contact.name,
      phone: `(${contact.phone.substring(0, 2)})${contact.phone.substring(2, 7)}-${contact.phone.substring(7, 11)}`,
      email: contact.email,
      isPublic: contact.isPublic,
      isAddModalVisible: true,
      isAnUpdate: true,
      contactToEdit: contact.email
    });
  };

  /**
   *  Deleta o contato.
   */
  handleRemoveContact = email => {
    const contacts = this.getContactsFromStorage();
    const newContacts = contacts.filter(contact => contact.email !== email);
    let objToSave;
    if (this.getUserFromPath()) {
      objToSave = { ...this.getAllContactsObject(), [this.getUserFromPath()]: newContacts };
    } else {
      objToSave = { ...this.getAllContactsObject(), public: newContacts };
    }
    localStorage.setItem('contacts', JSON.stringify(objToSave));
    this.setState({
      contacts: this.getContactsFromStorage()
    });
    this.handleCloseAddModal();
  };

  /**
   * Salva um novo contato.
   */
  handleSaveContact = () => {
    const { name, phone, email, isPublic, isAnUpdate, contactToEdit } = this.state;
    let contacts;
    if (!isPublic) {
      contacts = this.getContactsFromStorage();
    } else {
      contacts = this.getContactsFromStorage(true);
    }
    // Realiza a verificação dos campos.
    if (this.isContactValid(name, phone, email, contacts)) {
      const contact = {
        name,
        phone: phone.replace(/[-+()\s]/g, ''),
        email,
        isPublic
      };
      let newContacts = [];
      if (isAnUpdate) {
        const contactWithouEdit = contacts.filter(
          contact => contact.email !== contactToEdit
        );
        newContacts = [...contactWithouEdit, contact];
      } else {
        newContacts = [...contacts, contact];
      }
      let objToSave;
      if (!isPublic) {
        objToSave = { ...this.getAllContactsObject(), [this.getUserFromPath()]: newContacts }
      } else {
        objToSave = { ...this.getAllContactsObject(), public: newContacts }
      }
      // Adiciona o contato do storage.
      localStorage.setItem('contacts', JSON.stringify(objToSave));
      this.setState({
        contacts: this.getContactsFromStorage()
      });
      this.handleCloseAddModal();
    }
  };

  /**
   * Valida os campos do formulário.
   */
  isContactValid = (name, phone, email, contacts) => {
    this.setState({
      nameRequiredError: false,
      phoneRequiredError: false,
      emailRequiredError: false,
      errorMessage: undefined
    });
    const { isAnUpdate } = this.state;
    let obj = {};
    if (!name || !phone || !email) {
      // Valida se nome não foi preenchido.
      if (!name) {
        obj = { ...obj, nameRequiredError: true };
      }
      // Valida se telefone não foi preenchido.
      if (!phone) {
        obj = { ...obj, phoneRequiredError: true };
      }
      // Valida se email não foi preenchido.
      if (!email) {
        obj = { ...obj, emailRequiredError: true };
      }
      obj = { ...obj, errorMessage: 'Preencha os campos obrigatórios' };
    } else {
      // Valida se email é válido.
      if (!checkEmail(email)) {
        obj = {
          ...obj,
          emailRequiredError: true,
          errorMessage: 'Dados inválidos'
        };
      }
      // Valida se telefone é válido.
      if (!checkPhone(phone)) {
        obj = {
          ...obj,
          phoneRequiredError: true,
          errorMessage: 'Dados inválidos'
        };
      }
      if (!obj.phoneRequiredError && !isAnUpdate) {
        // Valida se telefone está repetido.
        const findPhone = contacts.find(contact => contact.phone === phone.replace(/[-+()\s]/g, ''));
        if (findPhone) {
          obj = {
            ...obj,
            phoneRequiredError: true,
            errorMessage: 'Telefone já cadastrado'
          };
        }
      }
    }
    // Retorna `true` caso tudo esteja correto.
    if (Object.keys(obj).length === 0) {
      this.setState({
        nameRequiredError: false,
        phoneRequiredError: false,
        emailRequiredError: false,
        errorMessage: undefined
      });
      return true;
    }
    // Retorna `false` caso algo esteja errado.
    this.setState({ name, phone, email, ...obj });
    return false;
  };

  /**
   * Renderiza a modal de adicionar contatos
   */
  renderAddModal = () => {
    const {
      isAddModalVisible,
      name,
      nameRequiredError,
      phone,
      phoneRequiredError,
      email,
      emailRequiredError,
      isPublic,
      errorMessage,
      isAnUpdate
    } = this.state;
    return (
      <BaloonModal
        cancelAction={this.handleCloseAddModal}
        saveAction={this.handleSaveContact}
        deleteAction={() => this.handleRemoveContact(email)}
        isVisible={isAddModalVisible}
        showDeleteButton={isAnUpdate}
        title="Adicionar Contato"
      >
        <span>{errorMessage}</span>
        <Input
          haserror={nameRequiredError}
          onChange={e => this.setState({ name: e.target.value })}
          value={name}
          placeholder="nome"
          onKeyDown={e => e.key === 'Enter' && this.handleSaveContact()}
        />
        <Input
          haserror={emailRequiredError}
          onChange={e => this.setState({ email: e.target.value })}
          value={email}
          placeholder="email"
          onKeyDown={e => e.key === 'Enter' && this.handleSaveContact()}
        />
        <StyledMaskedInput
          mask={PHONE_MASK}
          haserror={phoneRequiredError}
          onChange={e => this.setState({ phone: e.target.value })}
          value={phone}
          placeholder="telefone"
          onKeyDown={e => e.key === 'Enter' && this.handleSaveContact()}
        />
        <CheckBox
          label="Contato público"
          checked={!this.getUserFromPath() ? true : isPublic}
          disabled={this.getUserFromPath() ? false : true}
          onChange={() => this.setState({ isPublic: !isPublic })}
        />
      </BaloonModal>
    );
  };

  render() {
    const { contacts, searchText } = this.state;
    return (
      <Container>
        {this.renderAddModal()}
        <Header>
          <FaPhone />
          <span> React Agenda</span>
        </Header>
        <AgendaBody>
          <SearchContainer>
            <StyledInput
              placeholder="Pesquisar"
              value={searchText}
              onChange={e => this.setState({ searchText: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && this.filterContacts()}
            />
            <SearchButton onClick={this.filterContacts}>
              <FaSearch />
            </SearchButton>
          </SearchContainer>
          {contacts && contacts.length > 0 ? (
            contacts.map(contact => (
              <Card
                onCardClick={() => this.handleUpdateContact(contact)}
                key={uuid.v4()}
                icon={<FaUserCircle />}
                name={contact.name}
                email={contact.email}
                phone={`(${contact.phone.substring(0, 2)})${contact.phone.substring(2, 7)}-${contact.phone.substring(7, 11)}`}
              />
            ))
          ) : (
              <h2>Nenhum contato encontrado</h2>
            )}
        </AgendaBody>
        <FabButton onClick={() => this.setState({ isAddModalVisible: true })}>
          +
        </FabButton>
      </Container>
    );
  }
}

export default withRouter(Agenda);
