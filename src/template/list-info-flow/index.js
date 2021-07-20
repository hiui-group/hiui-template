import React, { Component } from 'react'
import axios from 'axios'
import { Loading, Notification, Pagination } from '@hi-ui/hiui'
import ListItem from './components/ListItem'
import ListHeader from './components/ListHeader'

import './index.scss'

export default class ListInfoFlow extends Component {
  state = {
    value: '下单',
    listData: []
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
      .get('https://yapi.smart-xwork.cn/mock/34633/hiui/list/info-flow')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          this.setState({ listData: data.listData })
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

  handleChange = value => {
    this.setState({
      value
    })
  }

  renderPage = () => {
    const { pageNum, pageSize, listData } = this.state
    return (
      <div
        style={{
          marginTop: 20
        }}
      >
        <Pagination
          defaultCurrent={pageNum}
          total={listData.length * 4}
          pageSize={pageSize}
          onChange={(page, prevPage, pageSize) => {
            this.setState({
              pageNum: page,
              pageSize
            })
          }}
        />
      </div>
    )
  }

  render() {
    const { value, listData } = this.state
    return (
      <div className="page--list-flow">
        <ListHeader value={value} onChange={this.handleChange} />
        <div className="page--list-container">
          {listData.map((item, index) => (
            <ListItem item={item} key={index} highlightValue={value} />
          ))}
          {this.renderPage()}
        </div>
      </div>
    )
  }
}
