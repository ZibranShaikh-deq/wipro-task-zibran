import React from 'react'
import { Navbar } from 'react-bootstrap'

import './header.css'

//Component for Common Header
const Header = () => {
  //Return JSX for Header
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Navbar.Brand>Search is in our DNA</Navbar.Brand>
    </Navbar>
  )
}

Header.propTypes = {
}

export default Header
