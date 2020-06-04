import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(newFilter.toLowerCase()))

  const showAndClearNotification = (message, type) => {
    setNotification(
      {
        message: message,
        type: type
      }
    )
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

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
        if (newNumber.length > 7) {
          const updatedContact = { ...contactToUpdate, number: newNumber }
          contactService
            .update(contactToUpdate.id, updatedContact)
            .then(returnedContact => {
              setContacts(contacts.map(c => c.id !== contactToUpdate.id ? c : returnedContact))
              setNewName('')
              setNewNumber('')
              showAndClearNotification(`${returnedContact.name}'s phone number updated`,
                'success')
            })
            .catch(error => {
              setContacts(contacts.filter(c => c.id !== contactToUpdate.id))
              showAndClearNotification(`Contact information of '${contactToUpdate.name}' 
            has already been removed from server. ${error}`, 'error')
            })
        } else {
          showAndClearNotification(`Validation failed. ${newName}'s phone number 
          must be at least 8 characters in length.`, 'error')
        }
      }
    } else if (contactObject.name.length > 2 && contactObject.number.length > 7) {
        contactService
          .create(contactObject)
          .then(returnedContact => {
            setContacts(contacts.concat(returnedContact))
            setNewName('')
            setNewNumber('')
            showAndClearNotification(`'${returnedContact.name}' added`, 'success')
          })
          .catch(error => {
            showAndClearNotification(`Contact information is not added. ${error}`, 'error')
            console.log(error.response.data)
          })
      } else if (contactObject.name.length < 3) {
        showAndClearNotification(`Validation failed. Contact name must be 
        at least 3 characters in length.`, 'error')
      } else if (contactObject.name.length > 2 && contactObject.number.length < 8) {
        showAndClearNotification(`Validation failed. ${contactObject.name}'s phone number 
        must be at least 8 characters in length.`, 'error')
      }
  }


  const deleteContact = id => {
    let contactToDel = contacts.find(c => c.id === id)
    if (window.confirm(`Delete '${contactToDel.name}'?`)) {
      contactService
        .del(id)
        .then(() => {
          setContacts(contacts.filter(c => c.id !== id))
          showAndClearNotification(`'${contactToDel.name}' deleted`, 'success')
        })
        .catch(error => {
          setContacts(contacts.filter(c => c.id !== contactToDel.id))
          showAndClearNotification(`Contact not found. ${error}`, 'error')
        })
    }
  }


  return (
    <div>
      <Notification notification={notification} />

      <h2>Phonebook</h2>

      <Filter setNewFilter={setNewFilter} />

      <h2>Add a contact</h2>

      <ContactForm newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addContact={addContact}
      />

      <h2>Contacts</h2>

      <Contacts filteredContacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  )
}

export default App
