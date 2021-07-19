import React, { Component } from 'react'
import axios from 'axios'
import List from './components/List'
import { Loading, Notification, Pagination } from '@hi-ui/hiui'

import ListHeader from './components/ListHeader'
import './index.scss'

export default class ListEmbeded extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 0,
      pageSize: 10,
      listData: []
    }
  }

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchEmbededList()
    } finally {
      Loading.close('lk')
    }
  }

  fetchEmbededList = async () => {
    return axios
      .get('https://yapi.smart-xwork.cn/mock/34633/hiui/list/embeded')
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

  renderPage = () => {
    const { pageNum, pageSize, listData } = this.state

    return (
      <div
        style={{
          display: 'flex',
          marginTop: 24,
          justifyContent: 'flex-end'
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
    return (
      <div className="page--list-embeded">
        <ListHeader />
        <List data={this.state.listData} footer={this.renderPage} />
      </div>
    )
  }
}
