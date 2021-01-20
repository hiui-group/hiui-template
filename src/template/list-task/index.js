import React, { Component } from 'react'
import { Icon, Button, Card, Pagination, Input, Grid } from '@hi-ui/hiui'
import './index.scss'

const { Row, Col } = Grid

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
      36
    ),
    pageNum: 1,
    pageSize: 15
  }

  renderCardList = tasks => {
    const taskRowLength = Math.ceil(tasks.length / 4)
    const content = []
    let i = 0
    while (i < taskRowLength) {
      content.push(this.getCardsRow(tasks, i))
      i++
    }
    return content
  }

  getCardsRow = (tasks, i) => {
    const currentRowData = tasks.slice(i * 4, (i + 1) * 4)
    console.log('currentRowData', currentRowData)
    return currentRowData.map((t, idx) => {
      return (
        <Col span={6} key={idx}>
          <div className='tasks--card-item'>
            <Card hoverable title={t.title} style={{ width: '100%' }}>
              <p>{t.content}</p>
            </Card>
          </div>
        </Col>
      )
    })
  }

  render() {
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
          <Row>
            <div className='tasks--card-container'>
              {this.renderCardList(tasks)}
            </div>
          </Row>
          <div
            style={{
              marginTop: 4
            }}
          >
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
