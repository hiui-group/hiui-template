import React from 'react'
import { Button } from '@hi-ui/hiui'
import './index.scss'

const Success = () => {
  return (
    <div className="page page--result-success">
      <div className="result--container">
        <img src="/hiui-template/static/result/1/成功.png" alt="success" />
        <div className="result--title">提交成功</div>
        <div className="result-desc">您的数据已提交系统管理员，将尽快给予答复。</div>
        <div className="result-desc">感谢您的支持与配合！</div>
        <Button type="line">返回</Button>
      </div>
    </div>
  )
}

export default Success
