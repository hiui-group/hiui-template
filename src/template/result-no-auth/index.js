import React from 'react'
import { Button } from '@hi-ui/hiui'
import './index.scss'

const NoAuth = () => {
  return (
    <div className='page page--result-no-auth'>
      <div className='result--container'>
        <img src='/hiui-template/static/result/1/暂无访问权限.png' alt='no-auth' />
        <div style={{ fontSize: 18, marginBottom: 24, marginTop: 10 }}>抱歉，您暂无访问权限！</div>
        <Button type='line'>申请权限</Button>
      </div>
    </div>
  )
}

export default NoAuth
