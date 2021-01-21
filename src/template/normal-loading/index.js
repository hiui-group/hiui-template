import React from 'react'
import { Loading } from '@hi-ui/hiui'
import './index.scss'

const NormalLoading = () => {
  return (
    <div className="page page--loading">
      <Loading />
      <div className="loading-text">正在努力加载中...</div>
    </div>
  )
}

export default NormalLoading
