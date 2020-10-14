import React from 'react'

const Users = ({ users }) => {

  const thStyle = {
    textAlign: 'left'
  }

  const tdStyle = {
    textAlign: 'center'
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td style={tdStyle}>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users