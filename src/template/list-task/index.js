import React, { Component } from 'react'
import { Icon, Button, Card, Pagination, Input } from '@hi-ui/hiui'
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
  render () {
    const { taskList, pageNum, pageSize } = this.state
    const tasks = taskList.slice((pageNum - 1) * 15, pageNum * 15)

    return (
      <div className='page--list-task'>
        <div className='page--list-header'>
          任务清单
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

        <div className='tasks__container'>
          <div className='tasks--card-container'>
            {tasks
              .map(t => (
                <div className='tasks--card-item'>
                  <Card
                    title={t.title}
                    hoverable
                    extra={[<Icon name='delete' key={1} />, <Icon name='more' key={2} />]}
                  >
                    <p>{t.content}</p>
                  </Card>
                </div>
              ))
              .concat(
                <div className='tasks--card-item'>
                  <Card
                    hoverable
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon name='plus' />
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
