import React, { Component } from 'react'
import { Button, Breadcrumb, Tabs, Icon, Grid, Loading, Card, Table, Dropdown, Notification } from '@hi-ui/hiui'
import './index.scss'
import axios from 'axios'

const { Row, Col } = Grid

export default class Template extends Component {
  state = {
    activeTabIndex: 0,
    title: '',
    desc: [],
    baseInfo: {},
    expressInfo: [],
    carInfo: {},
    productInfo: {}
  }

  fetchBaseInfo = async () => {
    return axios
      .get('https://yapi.baidu.com/mock/34633/hiui/details')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          this.setState({ baseInfo: data.baseInfo, title: data.title, desc: data.desc })
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

  fetchExpressInfo = async () => {
    return axios
      .get('https://yapi.baidu.com/mock/34633/hiui/details')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          const expressInfo = [
            { ...data.expressInfo, title: '发件人信息' },
            { ...data.expressInfo, title: '收件人信息' }
          ]

          this.setState({ expressInfo })
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

  handleBackClick = () => {
    Notification.open({
      type: 'success',
      title: 'handleBackClick'
    })
  }

  handleSaveClick = () => {
    Notification.open({
      type: 'success',
      title: 'handleSaveClick'
    })
  }

  handleEditClick = () => {
    Notification.open({
      type: 'success',
      title: 'handleEditClick'
    })
  }

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchBaseInfo()
      await this.fetchExpressInfo()
      Loading.close('lk')
    } finally {
      Loading.close('lk')
    }
  }

  render() {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, baseInfo, expressInfo, activeTabIndex } = this.state

    return (
      <div className="page--detail-group">
        <Col className="detail-group">
          <Col className="detail-group__header">
            <Row className="row row-01" align="center">
              <Breadcrumb
                separator="|"
                onClick={this.handleBackClick}
                data={[
                  {
                    content: (
                      <span>
                        <Icon name="left" />
                        <span style={{ color: '#333' }}>返回</span>
                      </span>
                    ),
                    path: '/'
                  },
                  {
                    content: <span style={{ color: '#999' }}>详情</span>,
                    path: '/detail-basic'
                  }
                ]}
              />
            </Row>
            <Row className="row row-02" justify="space-between">
              <Col>
                <h2>{title}</h2>
              </Col>
              <Col>
                <Button icon="edit" type="primary" onClick={this.handleEditClick}>
                  编辑
                </Button>
                <Button icon="collection" type="line" onClick={this.handleSaveClick}>
                  收藏
                </Button>
                <Dropdown
                  className="usual-dropdown-button"
                  data={[
                    {
                      title: '操作1'
                    },
                    {
                      title: '操作2'
                    }
                  ]}
                  trigger="click"
                  type="button"
                  placement="bottom-end"
                  title={<Icon name="more" />}
                />
              </Col>
            </Row>
          </Col>
          <Col className="detail-group__card detail-group__card--base">
            <Row className="detail-basic__row">
              <Card title="基础信息" bordered={false} hoverable>
                <ul>
                  {Object.values(baseInfo).map(({ key, value }, idx) => (
                    <li key={idx}>
                      <div>{key}</div>
                      <div>{value}</div>
                    </li>
                  ))}
                </ul>
              </Card>
            </Row>
          </Col>
          <Col className="detail-group__card detail-group__card--express">
            <Row className="detail-basic__row">
              <Card title="收发信息" bordered={false} hoverable>
                <ul className="card-list">
                  {expressInfo.map(({ title, avatar, ...info }, idx) => (
                    <li className="card-item" key={idx}>
                      <Card title={title} hoverable style={{ backgroundColor: '#fbfbfb' }}>
                        <div className="card-item__content">
                          <img src={avatar.value} alt="" />
                          <ul>
                            {Object.values(info)
                              .filter(item => ['姓名', '地址', '电话'].includes(item.key))
                              .map(({ key, value }, idx) => {
                                return (
                                  <li key={idx}>
                                    <span>{key}</span>
                                    <span>{value}</span>
                                  </li>
                                )
                              })}
                          </ul>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              </Card>
            </Row>
          </Col>
          <Col className="detail-group__card page page--gutter detail-group__table">
            <Tabs
              className="detail-group__table-container"
              type="line"
              activeId={activeTabIndex}
              onTabClick={tabId => {
                this.setState({
                  activeTabIndex: tabId
                })
              }}
            >
              <Tabs.Pane tabTitle="商品信息" tabId={0}>
                <QueryBasic />
              </Tabs.Pane>
              <Tabs.Pane tabTitle="车辆信息" tabId={1}>
                <QueryBasic />
              </Tabs.Pane>
            </Tabs>
          </Col>
        </Col>
      </div>
    )
  }
}

class QueryBasic extends Component {
  columnMixins = {
    columns: [
      {
        title: 'SKU',
        dataKey: 'sku'
      },
      {
        title: '商品ID',
        dataKey: 'id'
      },
      {
        title: '商品名',
        dataKey: 'name'
      },
      {
        title: '电话',
        dataKey: 'phone'
      },
      {
        title: '渠道',
        dataKey: 'channel'
      },
      {
        title: '经销商',
        dataKey: 'dealer'
      },
      {
        title: '分货量',
        dataKey: 'shareCount',
        sorter(pre, next) {
          return pre - next
        }
      },
      {
        title: '激活量',
        dataKey: 'activeCount',
        sorter(pre, next) {
          return pre - next
        }
      },
      {
        title: '操作',
        dataKey: 'id',
        render: (value, item) => {
          return (
            <React.Fragment>
              <Icon name="edit" onClick={() => this.tableUpdateControlor('edit', value)} />
              <Icon name="delete" onClick={() => this.tableUpdateControlor('delete', value)} />
              <Icon name="more" onClick={() => this.tableUpdateControlor('more', value)} />
            </React.Fragment>
          )
        }
      }
    ],
    sorter(pre, next) {
      return pre.column1 - next.column1
    }
  }

  state = {
    total: 0,
    current: 1,
    pageSize: 10,
    tableData: [],
    selectedRowKey: ''
  }

  fetchQueryBasic = async () => {
    return axios
      .get('https://yapi.baidu.com/mock/34633/hiui/table/basic')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          const { tableData, ...rest } = data
          const _tableData = tableData.map(item => ({ ...item, key: item.id }))
          this.setState({ ...rest, tableData: _tableData })
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

  async componentDidMount() {
    await this.fetchQueryBasic()
  }

  tableUpdateControlor = (name, value) => {
    console.log(name, value)
  }

  render() {
    const { columnMixins } = this
    const { total, current, pageSize, tableData, selectedRowKey } = this.state

    return (
      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Table
            columns={columnMixins.columns}
            data={tableData}
            rowSelection={{
              selectedRowKeys: selectedRowKey,
              onChange: selectedRowKey => {
                this.setState({ selectedRowKey })
              }
            }}
            pagination={{
              total,
              current,
              pageSize,
              onChange: current => {
                this.setState({ current: current })
              }
            }}
          />
        </Col>
      </Row>
    )
  }
}
