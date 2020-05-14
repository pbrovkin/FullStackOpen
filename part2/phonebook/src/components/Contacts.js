import React from 'react'

const Contacts = ({ filteredContacts }) => (
    <div>
        {filteredContacts.map(contact =>
            <div key={contact.name}>
                {contact.name} {contact.number}
            </div>
        )}
    </div>
)

export default Contacts