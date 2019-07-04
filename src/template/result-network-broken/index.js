import React from 'react'
import Button from '@hi-ui/hiui/es/button'
import './index.scss'

const NetworkBroken = () => {
  return (
    <div className="page page--result-network-broken">
      <div className="result--container">
        <img src="/static/结果页-网络连接中断.png" />
        <div style={{ fontSize: 18, marginBottom: 24, marginTop: 10 }}>
          抱歉，网络连接中断，请稍后重试！
        </div>
        <Button type="line">刷新</Button>
      </div>
    </div>
  )
}

export default NetworkBroken
