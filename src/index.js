import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

import App from 'components/App'
import * as serviceWorker from './serviceWorker'
import browserHistory from 'utils/history'; 

import './index.css'

ReactDOM.render((
  <Router history={browserHistory}>
    <Suspense fallback={'Loading...'}>
      <App />
    </Suspense>
  </Router>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

