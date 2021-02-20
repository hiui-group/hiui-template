import React, { Component } from 'react'
import axios from 'axios'
import { Loading, Notification, Icon, Card, Pagination, Grid } from '@hi-ui/hiui'
import ListHeader from './components/ListHeader/index.jsx'

import './index.scss'

const { Row, Col } = Grid

export default class ListTask extends Component {
  state = {
    highlightValue: '',
    value: '',
    taskList: [],
    pageNum: 1,
    pageSize: 15
  }

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchInfoFlowList()
    } finally {
      Loading.close('lk')
    }
  }

  fetchInfoFlowList = async () => {
    return axios
      .get('https://yapi.baidu.com/mock/34633/hiui/list/task')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          this.setState({ taskList: data.taskList })
        } else {
          throw new Error('未知错误')
        }
      })
      .catch(error => {
        Notification.open({
          type: 'error',
          title: error.message
        })
      })
  }

  renderCardList = tasks => {
    const taskRowLength = Math.ceil(tasks.length / 4)
    const content = []
    let i = 0
    while (i < taskRowLength) {
      content.push(this.getCardsRow(tasks, i))
      i++
    }
    content.push(
      <Col span={6} key={content.length}>
        <div className="tasks--card-item" key="btn">
          <Card
            hoverable
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <Icon name="plus" />
          </Card>
        </div>
      </Col>
    )
    return content
  }

  getCardsRow = (tasks, i) => {
    const currentRowData = tasks.slice(i * 4, (i + 1) * 4)
    return currentRowData.map((t, idx) => {
      return (
        <Col span={6} key={idx}>
          <div className="tasks--card-item">
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
    const tasks = taskList.slice((pageNum - 1) * pageSize, pageNum * pageSize)

    return (
      <div className="page--list-task">
        <ListHeader />
        <div className="tasks__container">
          <Row>
            <div className="tasks--card-container">{this.renderCardList(tasks)}</div>
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
