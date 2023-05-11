import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    // console.log('data', data);

    const { name, number } = data;
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();

    if (
      contacts.some(el => el.name.toLowerCase() === normalizedName) ||
      contacts.some(el => el.number.toLowerCase() === normalizedNumber)
    ) {
      // console.log(`${data.name} is already in contacts`);
      Notiflix.Notify.failure(`${data.name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getFiltered = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== contactId),
    }));
  };

  render() {
    // console.log(this.state.contacts);
    // console.log(this.state.filter);

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmitData={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChangeFilter={this.changeFilter} />
        <ContactList
          contacts={this.getFiltered()}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
