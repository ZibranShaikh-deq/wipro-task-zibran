import React from 'react'
import { Navbar } from 'react-bootstrap'

import './header.css'

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand href="/home">Search is in our DNA</Navbar.Brand>
    </Navbar>
  )
}

Header.propTypes = {
}

export default Header
