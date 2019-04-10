import React from 'react'
import { render } from 'react-dom'
import rootRoute from './route'
import { History, Genuine as Page, NavGroup, Login } from '@hi-ui/classic-theme'
import Icon from '@hi-ui/hiui/es/icon'
import Copy from './component/copy'
import './template/content.scss'
import { inject, observer, Provider } from 'mobx-react'
import store from './model'
const login = {
  name: 'Mi Guest',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, 'width': '100px' }}><a href='#'>个人信息</a></div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}><a href='#'>注销</a></div>
  ]
}
History.createHashHistory()

const header = (
  <React.Fragment>
    <NavGroup position='left'>
      <h4 style={{ paddingLeft: 24 }}>二级菜单</h4>
    </NavGroup>
    <NavGroup position='right'>
      <div style={{ cursor: 'pointer' }}>
        <Icon name='set' />
        <span style={{ marginLeft: 4 }}>设置</span>
      </div>
      <Login {...login} />
    </NavGroup>
  </React.Fragment>
)
window.store = store
render(
  <Provider {...store}>
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

  </Provider>, document.getElementById('app'))
