import React, { Component } from 'react';

import uuid from 'uuid';
import { FaPhone, FaUserCircle, FaSearch } from 'react-icons/fa';
import { FabButton } from '../../components/FabButton/styles.css';
import Card from '../../components/Card';

import {
  Container,
  Header,
  AgendaBody,
  SearchContainer,
  StyledInput,
  SearchButton,
} from './styles.css';

export default class Agenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      contacts: [],
    };
  }

  componentDidMount() {
    const contacts = this.getContactsFromStorage();
    this.setState({
      contacts,
    });
  }

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

  getContactsFromStorage = () => {
    const contactsStorage = localStorage.getItem('contacts');
    if (contactsStorage) {
      return JSON.parse(contactsStorage).sort(this.compare);
    }
    return [];
  };

  filterContacts = () => {
    const { searchText } = this.state;
    const contactsStorage = localStorage.getItem('contacts');
    if (contactsStorage) {
      const contacts = JSON.parse(contactsStorage);
      const filteredList = contacts.filter(
        (item) => item.name.toLowerCase().search(searchText.toLowerCase()) !== -1,
      );
      this.setState({ contacts: filteredList.sort(this.compare) });
    }
  };

  render() {
    const { contacts, searchText } = this.state;
    return (
      <Container>
        <Header>
          <FaPhone />
          <span> React Agenda</span>
        </Header>
        <AgendaBody>
          <SearchContainer>
            <StyledInput
              placeholder="Pesquisar"
              value={searchText}
              onChange={(e) => this.setState({ searchText: e.target.value })}
            />
            <SearchButton onClick={this.filterContacts}>
              <FaSearch />
            </SearchButton>
          </SearchContainer>
          {contacts && contacts.length > 0 ? (
            contacts.map((contact) => (
              <Card
                key={uuid.v4()}
                icon={<FaUserCircle />}
                name={contact.name}
                email={contact.email}
                phone={contact.phone}
              />
            ))
          ) : (
            <h2>Nenhum contato encontrado</h2>
          )}
        </AgendaBody>
        <FabButton>+</FabButton>
      </Container>
    );
  }
}
