import React from 'react'
import { render } from 'react-dom'
import rootRoute from './route'
import { Theme } from '@hi-ui/classic-theme'
import Copy from './component/copy'
import './template/content.scss'
import './index.scss'

const loginConfig = {
  name: '叶舟',
  icon: 'user',
  children: [
    <div key='1' style={{ textAlign: 'center', margin: 4, width: '100px' }}>
      <a href='#info'>个人信息</a>
    </div>,
    <div key='2' style={{ textAlign: 'center', margin: 4, width: 100 }}>
      <a href='#logout'>注销</a>
    </div>
  ]
}

const logoConfig = {
  url: 'https://hiui-group.github.io/hiui-template/',
  logoUrl: 'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05',
  name: 'HIUI Templates'
}

render(
  <React.Fragment>
    <Theme logo={logoConfig} login={loginConfig} routes={rootRoute} />
    <Copy />
  </React.Fragment>,
  document.getElementById('app')
)
