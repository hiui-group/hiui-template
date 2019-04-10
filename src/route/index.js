import React from 'react'
import { Logo, SiderLayout } from '@hi-ui/classic-theme'
import Icon from '@hi-ui/hiui/es/icon'

const logo = <Logo
  url='https://hiui-group.github.io/hiui-template/'
  logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
  text='HIUI Template'
  title='HIUI Template'
  alt='Project Logo'
/>
export const sider = {
  items: [
    {
      title: '表格模板',
      icon: <Icon name='list' />,
      children: [
        {
          title: '查询-标准',
          to: '/query'
        },
      ]
    },
    {
      title: '表单模板',
      icon: <Icon name='approve' />,
      children: [
        {
          title: '单列',
          to: '/form-basic'
        }
      ]
    },
    {
      title: '首页模板',
      icon: <Icon name='home' />,
      children: [
        {
          title: '仪表盘',
          to: '/home-dashboard'
        }
      ]
    }
  ]
}

export default [
  {
    path: '/',
    render: props => {
      return (
        <SiderLayout
          sider={sider.items}
          logo={logo}
          routes={
            [
              {
                path: '/query',
                component: require('../template/query').default
              },
              {
                path: '/form-basic',
                component: require('../template/form-basic').default
              },
              {
                path: '/home-dashboard',
                component: require('../template/home-dashboard').default
              }
            ]
          }
          {...props}
        />
      )
    }
  }
]
