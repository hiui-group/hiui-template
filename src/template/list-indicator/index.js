import React, { Component } from 'react'
import axios from 'axios'
import { Card, Loading, Notification } from '@hi-ui/hiui'
import ListHeader from './components/ListHeader'

import './index.scss'

export default class ListIndicator extends Component {
  state = {
    highlightValue: '',
    value: '',
    tabList: []
  }

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchIndicatorList()
    } finally {
      Loading.close('lk')
    }
  }

  fetchIndicatorList = async () => {
    return axios
      .get('https://yapi.baidu.com/mock/34633/hiui/list/indicator')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          this.setState({ tabList: data.tabList })
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

  render() {
    const { tabList } = this.state
    const { tabs = [], subTabs = [] } = tabList

    return (
      <div className="page--list-indicator">
        <ListHeader style={{ marginBottom: 0 }} />
        <div className="indicator——type_container">
          {tabs.map((tag, index) => (
            <span key={index} className={"indicator——type_item " + (index === 0 ? "active" : "")}>
              {tag}
            </span>
          ))}
        </div>
        <div className="indicator__container">
          {subTabs.map((category, index) => (
            <div className="indicator——item" key={index}>
              <div className="indicator——item_header">{category.title}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {category.cardTabs?.map((item, index) => (
                  <Card
                    key={index}
                    hoverable
                    type="simple"
                    size="small"
                    style={{
                      marginRight: 24,
                      marginBottom: 20,
                      background: '#FBFBFB'
                    }}
                  >
                    {item}
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
