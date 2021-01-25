import React, { Component } from 'react'
import { Table, Button, Grid, Tabs, Input } from '@hi-ui/hiui'
import axios from 'axios'
import './index.scss'

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
        title: '品类',
        dataKey: 'type'
      },
      {
        title: '规格',
        dataKey: 'size'
      },
      {
        title: '单价',
        dataKey: 'price'
      },
      {
        title: '门店',
        dataKey: 'address'
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
      pageSize: 10,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: []
    }
  }

  componentDidMount() {
    this.fetchData(1)
  }

  fetchData(page) {
    axios
      .get(`https://mife-gallery.test.mi.com/hiui/products`, {
        params: { page }
      })
      .then(res => {
        const datas = []
        console.log('res', res)

        if (res && res.data.code === 200) {
          const data = res.data.data
          for (let index = 0; index < 10; index++) {
            datas.push({ ...data[index], key: index })
          }

          this.setState({
            tableDatas: datas.splice(0, 10)
          })
        }
      })
  }

  setTableColumns(columns) {
    const _columns = []

    columns.forEach(column => {
      const key = column.key

      _columns.push({
        ...column,
        ...this.columnMixins[key]
      })
    })

    return _columns
  }

  search() {
    const { s } = this.state

    if (!s) {
      return
    }

    this.setState(
      {
        page: 1
      },
      () => {
        this.fetchData()
      }
    )
  }

  render() {
    const { tableDatas, pageSize, total, page } = this.state
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
                console.log(tab)
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
                            placeholder="请输入"
                            style={{ width: '304px' }}
                            append={
                              <Button
                                type="default"
                                icon="search"
                                onClick={() => {
                                  console.log('search')
                                }}
                              />
                            }
                          />
                        </Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                          <Button type="primary" icon="plus">
                            新建
                          </Button>
                        </Col>
                      </Row>
                      <div style={{ marginTop: '20px' }}>
                        <Table
                          columns={this.columns}
                          data={tableDatas}
                          pagination={{
                            pageSize: pageSize,
                            total: total,
                            current: page,
                            onChange: page => {
                              this.fetchData(page)
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Tabs.Pane>
                )
              })}
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}
