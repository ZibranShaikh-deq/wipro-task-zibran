import React from 'react'

import Layout from 'common/Layout'
import SearchBox from 'common/SearchBox'

import './index.css'

//Home component for Rendering the SearchBox with Layout.
const Home = () => {
  return (
    <Layout>
      <SearchBox />
    </Layout>
  )
}

Home.propTypes = {
}

export default Home
