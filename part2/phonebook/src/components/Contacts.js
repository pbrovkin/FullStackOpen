import React from 'react'

const Contacts = ({ filteredContacts, deleteContact }) => (
    <div>
        {filteredContacts.map(contact =>
            <div key={contact.name}>
                {contact.name} {contact.number}
                <button style={{ marginLeft: 5 }} onClick={() => deleteContact(contact.id)}>delete</button>
            </div>
        )}
    </div>
)

export default Contacts