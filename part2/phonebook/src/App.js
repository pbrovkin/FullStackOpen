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
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName.trim(),
      number: newNumber.trim()
    }
    const contactToUpdate = contacts.find(c => c.name === newName)
    if (contactToUpdate) {
      if (window.confirm(
        `'${newName}' is already added to phonebook, replace the old number with a new one?`)) {
        const updatedContact = { ...contactToUpdate, number: newNumber }
        contactService
          .update(contactToUpdate.id, updatedContact)
          .then(returnedContact => {
            setContacts(contacts.map(c => c.id !== contactToUpdate.id ? c : returnedContact))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => { 
            console.log(`Contact not found. ${error}`)
            setContacts(contacts.filter(c => c.id !== contactToUpdate.id))
          })
      }
    } else {
      contactService
        .create(contactObject)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }


  const deleteContact = id => {
    let contactToDel = contacts.find(c => c.id === id)
    if (window.confirm(`Delete '${contactToDel.name}'?`)) {
      contactService
        .del(id)
        .then(() => {
          setContacts(contacts.filter(c => c.id !== id))
        })
        .catch(error => {
          console.log(`Contact not found. ${error}`)
        })
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

      <Contacts filteredContacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  )
}

export default App
