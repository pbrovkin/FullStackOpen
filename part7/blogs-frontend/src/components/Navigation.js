import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navi = styled.div`
  background: lightgray;
  padding: 1em;`

const Navigation = ({ user, handleLogout }) => {
  const padding = {
    padding: 5
  }
  const paddingLeft = {
    paddingLeft: 0
  }

  return (
    <Navi style={paddingLeft}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </Navi>
  )
}

export default Navigation