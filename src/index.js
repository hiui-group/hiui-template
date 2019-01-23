import React from 'react'
import { render } from 'react-dom'
import rootRoute from './route'
import { History, Genuine as Page } from '@hi-ui/classic-theme'
import Copy from './component/copy'
import './template/content.scss'

History.createHashHistory()

const header = (
  <React.Fragment />
)

render((
  <React.Fragment>
    <Page
      header={header}
      routes={rootRoute}
      config={{
        color: 'black',
        type: 'card'
      }}
    />
    <Copy />
  </React.Fragment>
), document.getElementById('app'))
