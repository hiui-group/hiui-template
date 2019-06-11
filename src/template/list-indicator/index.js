import React, { Component } from 'react'
import Icon from '@hi-ui/hiui/es/icon'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import Card from '@hi-ui/hiui/es/card'
import Pagination from '@hi-ui/hiui/es/pagination'
import './index.scss'

const generateTaskData = (sample, num) => {
  let dataList = []
  for (let i = 0; i < num; i++) {
    dataList.push(sample)
  }
  return dataList
}

export default class ListIndicator extends Component {
  state = {
    highlightValue: '',
    value: '',
    taskList: generateTaskData(
      {
        title: '商业智能报表的…',
        content: '使用线上分析处理技术，快速设计各类报表，提高开发率, 提供…'
      },
      80
    ),
    pageNum: 1,
    pageSize: 15
  }
  render() {
    const { value, highlightValue, taskList, pageNum, pageSize } = this.state
    const tasks = taskList.slice((pageNum - 1) * 15, pageNum * 15)
    console.log(tasks)
    return (
      <div className="page--list-indicator">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px 24px',
            alignItems: 'center'
          }}
        >
          <div style={{ flex: '0 0 auto', fontSize: '18px', fontWeight: 600 }}>指标百科</div>
          <div style={{ width: 271 }}>
            <Input
              value={value}
              placeholder="搜索 指标"
              onChange={e => this.setState({ value: e.target.value })}
              append={
                <Button
                  type="line"
                  icon="search"
                  onClick={() => {
                    this.setState({
                      highlightValue: value
                    })
                  }}
                />
              }
            />
          </div>
        </div>

        <div className="indicator__container">
          <div>
            {['部门订单', '个人订单', '历史订单', '消息进度'].map((tag, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  height: '36px',
                  padding: '8px 20px',
                  boxSizing: 'border-box',
                  lineHeight: '20px',
                  border: '1px solid rgba(231, 231, 231, 1)',
                  borderRadius: '18px',
                  marginRight: 40
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {['财务部订单', '人力部订单', '开发部订单', '信息部订单'].map(category => (
            <div>
              <div
                style={{
                  borderLeft: '2px solid #4284F5',
                  paddingLeft: 11,
                  fontSize: '16px',
                  margin: '12px 0'
                }}
              >
                {category}
              </div>
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
                ].map(item => (
                  <Card
                    hoverable
                    type="simple"
                    size="small"
                    style={{ marginRight: 36, marginBottom: 24 }}
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
