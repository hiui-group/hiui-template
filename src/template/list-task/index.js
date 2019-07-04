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

export default class ListTask extends Component {
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
      <div className="page--list-task">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px 24px',
            alignItems: 'center',
            marginBottom: 16
          }}
        >
          <div style={{ flex: '0 0 auto', fontSize: '18px', fontWeight: 600 }}>任务清单</div>
          <div style={{ width: 271 }}>
            <Input
              value={value}
              placeholder="搜索任务"
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
        <div className="tasks__container">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tasks
              .map(t => (
                <div
                  style={{ height: '144px', width: '25%', padding: 10, boxSizing: 'border-box' }}
                >
                  <Card title={t.title} style={{ height: '100%' }} hoverable>
                    <p>{t.content}</p>
                  </Card>
                </div>
              ))
              .concat(
                <div
                  style={{ height: '144px', width: '25%', padding: 10, boxSizing: 'border-box' }}
                >
                  <Card
                    hoverable
                    style={{
                      height: '100%',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon name="plus" style={{ fontSize: 40 }} />
                  </Card>
                </div>
              )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
            <Pagination
              defaultCurrent={pageNum}
              total={taskList.length}
              pageSize={pageSize}
              onChange={(page, prevPage, pageSize) => {
                this.setState({ pageNum: page })
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}
