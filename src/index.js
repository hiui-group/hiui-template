import React, { useLayoutEffect, useState, useCallback } from 'react'
import { render } from 'react-dom'
import Axios from 'axios'
import rootRoute from './route'
import { Theme } from '@hi-ui/classic-theme'
import { Button, Icon, Dropdown } from '@hi-ui/hiui'
import Copy from './component/copy'
import DataTip from './component/dataTip'
import './template/content.scss'
import './index.scss'

export const demoGlobalData = {
  userInfo: undefined
}

render(<App />, document.getElementById('app'))

function App() {
  const [userInfo, setUserInfo] = useState({})
  const [themeType, setThemeType] = useState('classic')
  const getUserInfo = useCallback(() => {
    Axios.get('https://mock.be.mi.com/mock/2532/user/info').then(response => {
      const { data: { code = 0, data: userInfo } = {} } = response

      if (code !== 200) {
        return
      }

      // WARNING: 此处应该做的操作是使用redux或者其他方式将用户信息存储在全局
      // 此处为了演示，将会直接将用户数据直接导出
      demoGlobalData.userInfo = userInfo
      setUserInfo(userInfo)
    })
  }, [setUserInfo])

  useLayoutEffect(() => {
    getUserInfo()
  }, [])

  const loginConfig = {
    name: userInfo?.username ?? '',
    icon: 'user',
    children: [
      <div key="1" style={{ textAlign: 'center', margin: 4, width: '100px' }}>
        <a href="#info">个人信息</a>
      </div>,
      <div key="2" style={{ textAlign: 'center', margin: 4, width: 100 }}>
        <a href="#logout">注销</a>
      </div>
    ]
  }

  const logoConfig = {
    url: 'https://hiui-group.github.io/hiui-template/',
    logoUrl: 'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05',
    name: 'HIUI Templates'
  }

  const toolbar = (
    <div className="hiui-toolbar">
      <div className="hiui-toolbar__item">
        <Button type="line" href="#" target="_blank" appearance="link" icon="link">
          帮助
        </Button>
      </div>
      <div className="hiui-toolbar__item">
        <Button className={`hiui-toolbar__item-message`} type="line" href="#" appearance="link" icon="mail">
          消息
        </Button>
      </div>
      <div className="hiui-toolbar__item">
        <Icon style={{ marginRight: '4px' }} name="global" />
        <Dropdown
          data={[
            {
              title: 'genuine',
              id: 'genuine'
            },
            {
              title: 'classic',
              id: 'classic'
            }
          ]}
          title="主题"
          width={100}
          placement="bottom-end"
          onClick={setThemeType}
        />
      </div>
    </div>
  )

  return (
    <>
      <Theme
        type={themeType}
        logo={logoConfig}
        toolbar={toolbar}
        apperance={{ contentBackground: '#f6f6f6' }}
        login={loginConfig}
        routes={rootRoute}
      />
      <Copy />
      <DataTip />
    </>
  )
}
