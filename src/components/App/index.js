import React, { Fragment } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import HomeContainer from '../Home'
import { APP_ROUTES } from "utils/enum"

//App Component For Routing.
const App = () => {
  return (
    <Fragment>
      <Switch>
        <Redirect exact from={APP_ROUTES.ROOT} to={APP_ROUTES.HOME} />
        <Route exact path={APP_ROUTES.HOME} component={HomeContainer} />
      </Switch>
    </Fragment>
  )
}

export default App