import React from 'react'

const Notification = ({ notification }) => {

    const notifStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    if (notification.type === 'error') {
        notifStyle.color = 'red'
    }

    if (notification.message === null || notification.type === null) {
        return null
    }

    return (
        <div style={notifStyle}>
            {notification.message}
        </div>
    )
}

export default Notification