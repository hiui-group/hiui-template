import React from 'react'
import { Button } from '@hi-ui/hiui'
import './index.scss'

const Failed = () => {
  return (
    <div className='page page--result-failed'>
      <div className='result--container'>
        <img src='/hiui-template/static/失败.png' alt='failed' />
        <div className='result--title'>提交失败</div>
        <div className='result-desc'>导致提交失败的可能原因如下：</div>
        <div style={{ textAlign: 'left', marginTop: 10 }}>
          <div className='result-desc'>1.提交的内容不符合要求</div>
          <div className='result-desc'>2.账号异常</div>
          <div className='result-desc'> 3.网络中断</div>
        </div>

        <Button type='line'>返回</Button>
      </div>
    </div>
  )
}

export default Failed
