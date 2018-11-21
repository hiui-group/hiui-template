import React from 'react'
import { Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
import rootRoute from './route'

render((
  <Router
    history={browserHistory}
    routes={rootRoute}
  />
), document.getElementById('app'))