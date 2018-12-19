import React from 'react'
import { render } from 'react-dom'
import rootRoute from './route'
import Icon from '@hi-ui/hiui/es/icon'
import { NavGroup, Logo, Genuine as Page } from '@hi-ui/classic-theme'
import './app.scss'
const header = (
  <React.Fragment>
    <NavGroup pos='right'>
      {/* <NavGroup.Item>
        <Icon name="search" className="header__operation-btns"/>
      </NavGroup.Item>
      <NavGroup.Item>
        <Icon name="plus" className="header__operation-btns"/>
      </NavGroup.Item>
      <NavGroup.Item>
        <Icon name="share" className="header__operation-btns"/>
      </NavGroup.Item>
      <NavGroup.Item>
        <Icon name="more" className="header__operation-btns"/>
      </NavGroup.Item>
      <div className='header__btns'>
        <Icon name='search' className='header__operation-btns' />

        <Icon name='plus' className='header__operation-btns' />

        <Icon name='share' className='header__operation-btns' />

        <Icon name='more' className='header__operation-btns' />
      </div> */}

    </NavGroup>
  </React.Fragment>
)
const logo = <Logo
  url='https://xiaomi.github.io/hiui/#/'
  logoUrl='https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
  text='HIUI Demo'
  title='HIUI Classic Theme Demo'
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
        // {
        //   title: '基础表格',
        //   to: '/basic'
        // },
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
    }
  ]
}

render((
  <Page
    header={header}
    // footer={footer}
    logo={logo}
    routes={rootRoute}
    sider={sider}
    config={{
      color: 'black',
      type: 'card'
    }}
  />
), document.getElementById('app'))
