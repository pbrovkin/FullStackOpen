import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setContacts(response.data)
      })
  }, [])

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addContact = (event) => {
    event.preventDefault()
    if (!contacts.map(contact => contact.name).includes(newName)) {
      const contactObject = {
        name: newName,
        number: newNumber
      }
      contactService
        .create(contactObject)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact))
          setNewName('')
          setNewNumber('')
        })
    } else {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter setNewFilter={setNewFilter} />

      <h2>Add a contact</h2>

      <ContactForm newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addContact={addContact}
      />

      <h2>Numbers</h2>

      <Contacts filteredContacts={filteredContacts} />
    </div>
  )
}

export default App
