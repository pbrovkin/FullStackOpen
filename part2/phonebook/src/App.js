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
            setNotification(
              {
                message: `Phone number of '${returnedContact.name}' updated`,
                type: 'success'
              }
            )
            setTimeout(() => {
              setNotification({ message: null, type: null })
            }, 5000)
          })
          .catch(error => {
            setContacts(contacts.filter(c => c.id !== contactToUpdate.id))
            setNotification(
              {
                message: `Contact information of '${contactToUpdate.name}' has already been removed. ${error}`,
                type: 'error'
              }
            )
            setTimeout(() => {
              setNotification({ message: null, type: null })
            }, 5000)
          })
      }
    } else {
      contactService
        .create(contactObject)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact))
          setNewName('')
          setNewNumber('')
          setNotification(
            {
              message: `'${returnedContact.name}' added`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 5000)
        })
        .catch(error => {
          setNotification(
            {
              message: `Contact information is not added. ${error}`,
              type: 'error'
            }
          )
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 5000)
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
          setNotification(
            {
              message: `'${contactToDel.name}' deleted`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 5000)
        })
        .catch(error => {
          setNotification(
            {
              message: `Contact not found. ${error}`,
              type: 'error'
            }
          )
          setTimeout(() => {
            setNotification({ message: null, type: null })
          }, 5000)
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
