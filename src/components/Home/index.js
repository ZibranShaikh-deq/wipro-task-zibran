import React from 'react'

import Layout from 'common/Layout'
import SearchBox from 'common/SearchBox'

import './index.css'

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
