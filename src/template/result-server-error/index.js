import React from 'react'
import { Button } from '@hi-ui/hiui'
import './index.scss'

const SeverError = () => {
  return (
    <div className="page page--result-server-error">
      <div className="result--container">
        <img width="480" src="/hiui/templates-preview/static/result/1/服务器异常.png" alt="server-error" />
        <div style={{ fontSize: 18, marginBottom: 24, marginTop: 10 }}>抱歉服务器开小差了！</div>
        <Button type="line">联系管理员</Button>
      </div>
    </div>
  )
}

export default SeverError
