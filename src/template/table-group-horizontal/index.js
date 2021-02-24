import React, { Component } from 'react'
import {
  Table,
  Button,
  Grid,
  Tabs,
  Input,
  Loading,
  Modal,
  Form,
  DatePicker,
  Counter,
  Message,
  Dropdown,
  Icon
} from '@hi-ui/hiui'
import axios from 'axios'
import './index.scss'

const FormItem = Form.Item

const TabPaneContent = props => {
  const { tabTitle, tabId } = props
  return (
    <div style={{ marginTop: '20px' }}>
      {tabTitle} - {tabId}
      <p>建议大家根据tabId封装成不同的组件</p>
    </div>
  )
}
const TableHandler = ({ text, row, index, scope }) => {
  return (
    <React.Fragment>
      <Icon
        name="edit"
        style={{ marginRight: 16 }}
        onClick={() => {
          console.log(text, row, index, scope)
          const { name, sku, stock, updateTime } = row
          scope.setState({
            modalVisiable: true,
            modalTitle: '编辑'
          })
          scope.form.current.setFieldsValue({
            projectName: name,
            sku,
            num: stock,
            date: updateTime
          })
        }}
      />
      <Icon
        name="delete"
        style={{ marginRight: 16 }}
        onClick={() => {
          Modal.confirm({
            onConfirm: () => {
              scope.setState({
                modalVisiable: false
              })
              scope.delTableRow(row.id)
            },
            onCancel: () => {
              scope.setState({
                modalVisiable: false
              })
            },
            title: '删除',
            content: '确定要删除本行数据吗',
            type: 'warning'
          })
        }}
      />
      <Dropdown
        className="table-group-horizontal-morehandle"
        data={[
          {
            title: '操作1'
          },
          {
            title: '操作2'
          }
        ]}
        placement="bottom-end"
        title={<Icon name="more" onClick={() => {}} />}
      />
    </React.Fragment>
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
        dataKey: 'sku',
        align: 'right'
      },
      {
        title: '库存量（个）',
        dataKey: 'stock',
        align: 'right'
      },
      {
        title: '单价（元）',
        dataKey: 'price',
        align: 'right'
      },
      {
        title: '上市时间',
        dataKey: 'updateTime'
      },
      {
        title: '操作',
        dataKey: 'stock',
        render: (text, row, index) => {
          const scope = this
          return <TableHandler text={text} row={row} index={index} scope={scope} />
        }
      }
    ]

    this.form = React.createRef()
    this.state = {
      pageSize: 10, // 每页条数
      total: 0, // 总条数，分页使用
      currentPage: 1, // 当前页数
      tableDatas: [], // 表格数据
      modalTitle: '新增',
      keyWord: '',
      visibleLoading: false,
      modalVisiable: false,
      rules: {
        projectName: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'onBlur,onChange'
          }
        ]
      }
    }
  }

  componentDidMount() {
    this.getTableData({ page: 1 })
  }

  // 获取商品信息
  getTableData(params = { id: '' }) {
    this.setState({
      visibleLoading: true
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
            visibleLoading: false
          })
        }
      })
  }

  // 添加商品
  putTanleRow = data => {
    this.setState({
      visibleLoading: true
    })
    // 请自行替换自己的url和请求函数
    axios
      .post(`https://mife-gallery.test.mi.com/hiui/upload`, {
        data
      })
      .then(res => {
        if (res && res.data.code === 0) {
          this.setState({
            modalVisiable: false
          })
          this.getTableData({ page: 1 })
        } else {
          Message.open({ type: 'error', title: '数据校验异常', duration: 2000 })
        }
      })
  }

  // 添加一条新的商品
  addNewProduct = () => {
    this.setState({
      modalVisiable: true,
      modalTitle: '新增'
    })
  }

  // 删除数据
  delTableRow = id => {
    this.setState({
      visibleLoading: true
    })
    // 请自行替换自己的url和请求函数
    axios
      .post(`https://mife-gallery.test.mi.com/hiui/upload`, {
        data: { id }
      })
      .then(res => {
        if (res && res.data.code === 0) {
          this.setState({
            modalVisiable: false
          })
          this.getTableData({ page: 1 })
        } else {
          Message.open({ type: 'error', title: '删除失败', duration: 2000 })
        }
      })
  }

  // modal确定
  confirmEvent = () => {
    this.form.current.validate((values, error) => {
      console.log(values, error)
      if (!error) {
        this.putTanleRow(values)
      }
    })
  }

  // modal 取消
  cancelEvent = () => {
    this.form.current.resetValidates()
    this.setState({ modalVisiable: false })
  }

  render() {
    const { tableDatas, pageSize, total, currentPage, visibleLoading, rules, modalVisiable, modalTitle } = this.state
    const Row = Grid.Row
    const Col = Grid.Col
    return (
      <div className="table-group-horizontal">
        <Row>
          <Col span={18}>
            <h2 className="table-group-horizontal_head-title">商品管理</h2>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button
              type="line"
              icon="download"
              style={{ fontSize: 16 }}
              onClick={() => {
                Message.open({ type: 'success', title: '导出成功', duration: 2000 })
              }}
            />
            <Button
              type="line"
              icon="document"
              style={{ fontSize: 16 }}
              onClick={() => {
                this.props.history.push('/detail-basic')
              }}
            />
            <Dropdown
              className="table-group-horizontal-morehandle"
              data={[
                {
                  title: '操作1'
                },
                {
                  title: '操作2'
                }
              ]}
              type="button"
              placement="bottom-end"
              title={<Icon name="ellipsis" style={{ fontSize: 16 }} />}
            />
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
                                style={{ color: '#4284F5' }}
                                onClick={() => {
                                  this.getTableData({ id: this.state.keyWord })
                                }}
                              />
                            }
                          />
                        </Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                          <Button type="primary" icon="plus" onClick={this.addNewProduct}>
                            新建
                          </Button>
                        </Col>
                      </Row>
                      {pane.tabId === '1' ? (
                        <div style={{ marginTop: '20px' }}>
                          <Loading visible={visibleLoading}>
                            <Table
                              columns={this.columns}
                              data={tableDatas}
                              pagination={{
                                pageSize: pageSize,
                                total: total,
                                current: currentPage,
                                onChange: (currentPage, pre, size) => {
                                  console.log(currentPage, pre, size)
                                  this.getTableData({ page: currentPage })
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
        <Modal title={modalTitle} visible={modalVisiable} onConfirm={this.confirmEvent} onCancel={this.cancelEvent}>
          <Form ref={this.form} className="page--form-basic-form" rules={rules} labelWidth="90" labelPlacement="right">
            <FormItem label="商品名称" field="projectName">
              <Input placeholder={'请输入'} style={{ width: '320px' }} />
            </FormItem>
            <FormItem label="sku" field="sku">
              <Input placeholder={'请输入'} style={{ width: '320px' }} />
            </FormItem>
            <FormItem label="数量" field="num">
              <Counter min={0} max={8} onChange={(e, val) => console.log('变化后的值：', val)} />
            </FormItem>
            <FormItem label="上市时间" field="date">
              <DatePicker width={320} placeholder={['选择开始日期', '选择结束日期']} />
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
