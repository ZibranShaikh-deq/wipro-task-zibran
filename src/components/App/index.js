import React, { Fragment } from 'react'

import Layout from 'common/Layout'
import SearchBox from 'common/SearchBox'

//App Component.
const App = () => {
  return (
    <Fragment>
      <Layout>
        <SearchBox />
      </Layout>
    </Fragment>
  )
}

export default App