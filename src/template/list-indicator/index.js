import React, { Component } from 'react'
import { Icon, Input, Button, Card } from '@hi-ui/hiui'
import './index.scss'

export default class ListIndicator extends Component {
  state = {
    highlightValue: '',
    value: '',
    taskList: Array(80).fill({
      title: '商业智能报表的…',
      content: '使用线上分析处理技术，快速设计各类报表，提高开发率, 提供…'
    }),
    pageNum: 1,
    pageSize: 15
  }
  render () {
    const { taskList, pageNum } = this.state
    const tasks = taskList.slice((pageNum - 1) * 15, pageNum * 15)
    console.log(tasks)
    return (
      <div className='page--list-indicator'>
        <div className='page--list-header'>
          指标百科
          <div>
            <Input
              style={{ width: '259px' }}
              append={
                <Button className='search-btn'>
                  <Icon name='search' />
                </Button>
              }
              placeholder='搜索'
            />
          </div>
        </div>

        <div className='indicator__container'>
          <div className='indicator——type_container'>
            {['部门订单', '个人订单', '历史订单', '消息进度'].map((tag, index) => (
              <span key={index} className='indicator——type_item'>
                {tag}
              </span>
            ))}
          </div>
          {['财务部订单', '人力部订单', '开发部订单', '信息部订单'].map((category, index) => (
            <div key={index}>
              <div className='indicator——item_header'>{category}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {[
                  '笔记本出库数量',
                  '彩虹七号电池',
                  '四色圆珠笔',
                  '中性笔',
                  '文件保护套',
                  '手写标签',
                  '橡皮擦',
                  '印台',
                  '圆形笔筒',
                  '透明胶带',
                  '铅笔',
                  '订书钉',
                  '计算器',
                  '修正液'
                ].map((item, index) => (
                  <Card
                    key={index}
                    hoverable
                    type='simple'
                    size='small'
                    style={{ marginRight: 36, marginBottom: 24, background: '#fff' }}
                  >
                    简易卡片
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
