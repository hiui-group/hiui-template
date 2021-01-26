import React from 'react'
import { Loading } from '@hi-ui/hiui'
import './index.scss'

const NormalLoading = () => {
  return (
    <div className='page page--loading'>
      <Loading content="正在努力加载中..." />
    </div>
  )
}

export default NormalLoading
