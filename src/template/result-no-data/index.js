import React from 'react'
import { Button } from '@hi-ui/hiui'
import './index.scss'

const NoData = () => {
  return (
    <div className='page page--result-no-data'>
      <div className='result--container'>
        <img src='/hiui-template/static/结果页-暂无数据.png' alt='no-data' />
        <div style={{ fontSize: 18, marginBottom: 24, marginTop: 10 }}>抱歉，当前暂无数据！</div>
        <Button type='line'>返回</Button>
      </div>
    </div>
  )
}

export default NoData
