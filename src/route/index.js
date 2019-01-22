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
const sider = {
  items: [
    {
      title: '表格模板',
      icon: <Icon name='list' />,
      children: [
        {
          title: '通用-搜索',
          to: '/common-search'
        },
        {
          title: '通用-基础',
          to: '/common-basic'
        },
        {
          title: '查询-标准',
          to: '/query'
        },
        {
          title: '查询-基础',
          to: '/query-basic'
        },
        {
          title: '工具条-标准',
          to: '/toolbar'
        },
        {
          title: '工具条-固定',
          to: '/toolbar-alter'
        },
        {
          title: '平铺-单选',
          to: '/tile-single'
        },
        {
          title: '平铺-多选',
          to: '/tile-multiple'
        },
        {
          title: '分组-横向',
          to: '/group-horizontal'
        },
        {
          title: '分组-纵向',
          to: '/group-vertical'
        },
        {
          title: '树形-单选',
          to: '/tree-single'
        },
        {
          title: '树形-单选-查询',
          to: '/tree-single-query'
        },
        {
          title: '树形-多选',
          to: '/tree-multiple'
        },
        {
          title: '树形-多选-查询',
          to: '/tree-multiple-query'
        }
      ]
    },
    {
      title: '表单模板',
      icon: <Icon name='approve' />,
      children: [
        {
          title: '单列',
          to: '/form-basic'
        },
        {
          title: '双列',
          to: '/form-double-column'
        },
        {
          title: '分组-标签',
          to: '/form-vertical-group'
        },
        {
          title: '分组-区块',
          to: '/form-group'
        },
        {
          title: '分组-组合',
          to: '/form-unfold-group'
        },
        {
          title: '分步骤',
          to: '/form-with-stepper'
        },
        {
          title: '弹窗表格',
          to: '/form-modal'
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
        },
        {
          title: '工作台',
          to: '/home-workbench'
        },
        {
          title: '门户',
          to: '/home-portal'
        },
        {
          title: '搜索',
          to: '/home-search'
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
                path: '/common-search',
                component: require('../template/common-search').default
              },
              {
                path: '/common-basic',
                component: require('../template/common-basic').default
              },
              {
                path: '/query',
                component: require('../template/query').default
              },
              {
                path: '/query-basic',
                component: require('../template/query-basic').default
              },
              {
                path: '/toolbar',
                component: require('../template/toolbar').default
              },
              {
                path: '/toolbar-alter',
                component: require('../template/toolbar-alter').default
              },
              {
                path: '/basic',
                component: require('../template/basic').default
              },
              {
                path: '/group-horizontal',
                component: require('../template/group-horizontal').default
              },
              {
                path: '/group-vertical',
                component: require('../template/group-vertical').default
              },
              {
                path: '/tree-single-query',
                component: require('../template/tree-single-query').default
              },
              {
                path: '/tree-single',
                component: require('../template/tree-single').default
              },
              {
                path: '/tree-multiple-query',
                component: require('../template/tree-multiple-query').default
              },
              {
                path: '/tree-multiple',
                component: require('../template/tree-multiple').default
              },
              {
                path: '/tile-single',
                component: require('../template/tile-single').default
              },
              {
                path: '/tile-multiple',
                component: require('../template/tile-multiple').default
              },
              {
                path: '/form-group',
                component: require('../template/form-group').default
              },
              {
                path: '/form-with-stepper',
                component: require('../template/form-with-stepper').default
              },
              {
                path: '/form-unfold-group',
                component: require('../template/form-unfold-group').default
              },
              {
                path: '/form-vertical-group',
                component: require('../template/form-vertical-group').default
              },
              {
                path: '/form-double-column',
                component: require('../template/form-double-column').default
              },
              {
                path: '/form-basic',
                component: require('../template/form-basic').default
              },
              {
                path: '/form-modal',
                component: require('../template/form-modal').default
              },
              {
                path: '/home-dashboard',
                component: require('../template/home-dashboard').default
              },
              {
                path: '/home-workbench',
                component: require('../template/home-workbench').default
              },
              {
                path: '/home-portal',
                component: require('../template/home-portal').default
              },
              {
                path: '/home-search',
                component: require('../template/home-search').default
              },
              {
                path: '/',
                component: require('../template/common-search').default
              }
            ]
          }
          {...props}
        />
      )
    }
  }
]
