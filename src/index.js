import React from 'react'
import { render } from 'react-dom'
import rootRoute from './route'
import { NavLink } from 'react-router-dom'
import { History, Classic as Page, NavGroup, Login, Logo } from '@hi-ui/classic-theme'
import Icon from '@hi-ui/hiui/es/icon'
import Copy from './component/copy'
import './template/content.scss'
import './index.scss'

const login = {
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
const logo = (
  <Logo
    url='https://xiaomi.github.io/hiui/'
    logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
    text='HIUI Template'
    title='HIUI Template Demo'
    alt='HIUI'
  />
)
History.createHashHistory()

const header = (
  <React.Fragment>
    <NavGroup position='left'>
      <NavGroup.Item>
        <NavLink to='/table/common-search' exact activeClassName='header__nav-link--active'>
          表格模板
        </NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/form/form-basic' activeClassName='header__nav-link--active'>
          表单模板
        </NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/home/home-dashboard' activeClassName='header__nav-link--active'>
          首页模板
        </NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/user/user-center' activeClassName='header__nav-link--active'>
          个人页模板
        </NavLink>
      </NavGroup.Item>
      {/*      <NavGroup.Item>
        <NavLink to='/loading/normal-loading' activeClassName='header__nav-link--active'>
          加载页模板
        </NavLink>
</NavGroup.Item> */}
      <NavGroup.Item>
        <NavLink to='/list/list-embeded' activeClassName='header__nav-link--active'>
          列表页模板
        </NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/result/result-server-error' activeClassName='header__nav-link--active'>
          结果页模板
        </NavLink>
      </NavGroup.Item>
      <NavGroup.Item>
        <NavLink to='/detail/detail-basic' activeClassName='header__nav-link--active'>
          详情页模板
        </NavLink>
      </NavGroup.Item>
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

render(
  <React.Fragment>
    <Page
      logo={logo}
      header={header}
      routes={rootRoute}
      config={{
        color: 'blue',
        type: 'card'
      }}
    />
    <Copy />
  </React.Fragment>,
  document.getElementById('app')
)
