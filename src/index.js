import React from 'react'
import { render } from 'react-dom'
import rootRoute from './route'
import { NavLink } from 'react-router-dom'
import { History, Theme, Login, Logo } from '@hi-ui/classic-theme'
import Icon from '@hi-ui/hiui/es/icon'
import Copy from './component/copy'
import './template/content.scss'
import './index.scss'

const loginConfig = {
  name: 'Mi Guest',
  icon: <span className='hi-icon icon-user' />,
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, width: '100px' }}>
      <a href='#info'>个人信息</a>
    </div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}>
      <a href='#logout'>注销</a>
    </div>
  ]
}
const login = <Login {...loginConfig} />
const logo = (
  <Logo
    url='https://hiui-group.github.io/hiui-template/ '
    logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
    text='HIUI Template'
    title='HIUI Template Demo'
    alt='HIUI'
  />
)

render(
  <React.Fragment>
    <Theme logo={logo} login={login} routes={rootRoute} />
    <Copy />
  </React.Fragment>,
  document.getElementById('app')
)
