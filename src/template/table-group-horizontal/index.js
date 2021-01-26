import React, { Component } from 'react'
import { Table, Button, Grid, Tabs, Input, Loading, Modal } from '@hi-ui/hiui'
import axios from 'axios'
import './index.scss'
const TabPaneContent = props => {
  const { tabTitle, tabId } = props
  return (
    <div style={{ marginTop: '20px' }}>
      {tabTitle} - {tabId}
      <p>建议大家根据tabId封装成不同的组件</p>
    </div>
  )
}
export default class Template extends Component {
  constructor(props) {
    super(props)
    this.panes = [
      {
        tabTitle: '我的订单',
        tabId: '1'
      },
      {
        tabTitle: '团购订单',
        tabId: '2'
      },
      {
        tabTitle: '依旧换新',
        tabId: '3'
      },
      {
        tabTitle: '消息通知',
        tabId: '4'
      },
      {
        tabTitle: '购买资格',
        tabId: '5'
      }
    ]
    this.columns = [
      {
        title: '商品名',
        dataKey: 'name'
      },
      {
        title: 'sku',
        dataKey: 'sku'
      },
      {
        title: '库存量（个）',
        dataKey: 'stock'
      },
      {
        title: '单价（元）',
        dataKey: 'price'
      },
      {
        title: '上市时间',
        dataKey: 'updateTime'
      },
      {
        title: '操作',
        dataKey: 'stock',
        render: () => (
          <React.Fragment>
            <Button icon="edit" />
            <Button icon="close" />
            <Button icon="more" />
          </React.Fragment>
        )
      }
    ]
    this.state = {
      pageSize: 10, // 每页条数
      total: 0, // 总条数，分页使用
      currentPage: 1, // 当前页数
      tableDatas: [], // 表格数据
      keyWord: '',
      visible: false,
      modalVisiable: false
    }
  }

  componentDidMount() {
    this.fetchData({ page: 1 })
  }

  // 获取商品信息
  fetchData(params = { id: '' }) {
    this.setState({
      visible: true
    })
    axios
      .get(`https://mife-gallery.test.mi.com/hiui/products`, {
        params
      })
      .then(res => {
        const datas = []
        if (res && res.data.code === 200) {
          const data = res.data.data
          const len = data.length % 10
          for (let index = 0; index < len; index++) {
            datas.push({ ...data[index], key: index })
          }

          this.setState({
            tableDatas: datas,
            total: data.length,
            currentPage: params.currentPage || 1,
            visible: false
          })
        }
      })
  }

  // 添加一条新的商品
  addNewProduct = () => {
    this.setState({
      modalVisiable: true
    })
  }

  render() {
    const { tableDatas, pageSize, total, currentPage, visible } = this.state
    const Row = Grid.Row
    const Col = Grid.Col
    return (
      <div className="table-group-horizontal">
        <Row>
          <Col span={18}>
            <h2 className="table-group-horizontal_head-title">商品管理</h2>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button type="line" icon="download" />
            <Button type="line" icon="document" />
            <Button type="line" icon="ellipsis" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Tabs
              type="line"
              onTabClick={tab => {
                this.setState({
                  activeId: tab
                })
              }}
            >
              {this.panes.map((pane, index) => {
                return (
                  <Tabs.Pane
                    tabTitle={pane.tabTitle}
                    tabId={pane.tabId}
                    closeable={pane.closeable}
                    key={index}
                    disabled={pane.disabled}
                  >
                    <div className="table-group-horizontal_pane-content">
                      <Row>
                        <Col span={18}>
                          <Input
                            placeholder="请输入商品ID"
                            style={{ width: '304px' }}
                            onChange={e => {
                              this.setState({
                                keyWord: e.target.value
                              })
                            }}
                            append={
                              <Button
                                type="default"
                                icon="search"
                                onClick={() => {
                                  this.fetchData({ id: this.state.keyWord })
                                }}
                              />
                            }
                          />
                        </Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                          <Button type="primary" icon="plus" onClick={this.addNewProduct.bind(this)}>
                            新建
                          </Button>
                        </Col>
                      </Row>
                      {pane.tabId === '1' ? (
                        <div style={{ marginTop: '20px' }}>
                          <Loading visible={visible}>
                            <Table
                              columns={this.columns}
                              data={tableDatas}
                              pagination={{
                                pageSize: pageSize,
                                total: total,
                                current: currentPage,
                                onChange: (currentPage, pre, size) => {
                                  console.log(currentPage, pre, size)
                                  this.fetchData({ page: currentPage })
                                }
                              }}
                            />
                          </Loading>
                        </div>
                      ) : (
                        <TabPaneContent {...pane} />
                      )}
                    </div>
                  </Tabs.Pane>
                )
              })}
            </Tabs>
          </Col>
        </Row>
        <Modal
          title="新增"
          visible={this.state.visible}
          onConfirm={this.cancelEvent.bind(this)}
          onCancel={this.cancelEvent.bind(this)}
        >
          <span>一些消息....</span>
          <br />
          <span>一些消息...</span>
          <br />
          <span>一些消息...</span>
        </Modal>
      </div>
    )
  }
}
