import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import Footer from '../Footer'

//Component for return the reusable Layout.
const Layout = (props) => {
  const [isScrolled, setScroll] = useState(window.scrollY > 30)
  //Hooks for adding the Scroll event.
  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  //Function for Scroll.
  const handleScroll = () => {
    const Y = window.scrollY
    setScroll(Y > 30)
  }

  //Return the JSX for Layout.
  return (
    <Fragment>
      <Header class="pt-10" showBackground={isScrolled} />
      <Fragment>
        {props.children}
      </Fragment>
      <Footer />
    </Fragment>
  )
}

//Proptypes of Layout component.
Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.object])
}

export default Layout
