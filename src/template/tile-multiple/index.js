import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DataFilter } from '@hi-ui/component-kit/es/data-filter'
import { Icon, Modal, Dropdown, Notification, Checkbox, Button, Grid } from '@hi-ui/hiui'
import './index.scss'

const orderPlatformList = ['小米商城', '小米之家', '天猫旗舰店', '京东旗舰店']
const orderDeliveryList = ['顺丰', 'EMS', '如风达', '百世汇通', '自取']
const orderPaymentList = ['微信支付', '支付宝', '银联', '信用卡', '现金']
const orderStatusList = ['待支付', '已支付', '配货中', '配送中', '已收货', '已取消', '已关闭']
export default class Template extends Component {
  constructor(props) {
    super(props)

    this.columnMixins = {
      column1: {
        sorter(pre, next) {
          return pre.column1 - next.column1
        }
      },
      action: {
        render: (key, row) => (
          <React.Fragment>
            <Link to="/form/form-basic" className="hi-tpl__add">
              <Icon name="edit" />
            </Link>
            <span onClick={this.showDelModal.bind(this, row)} className="action-del">
              <Icon name="close" />
            </span>
            <span className="action-more">
              <Dropdown data={[{ title: '打印小票' }]} title="更多" onClick={val => console.log(val)} />
            </span>
          </React.Fragment>
        )
      }
    }

    this.state = {
      field1: [],
      field2: [],
      field3: [],
      field4: [],
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      value: [],
      pageSize: 10,
      forms: this.initForms()
    }
  }

  componentDidMount() {
    const orderPlatformState = orderPlatformList.map(item => ({
      id: item,
      content: item
    }))
    const orderDeliveryState = orderDeliveryList.map(item => ({
      id: item,
      content: item
    }))
    const orderPaymentState = orderPaymentList.map(item => ({
      id: item,
      content: item
    }))
    const orderStatusState = orderStatusList.map(item => ({
      id: item,
      content: item
    }))
    this.setState({
      field1: orderPlatformState,
      field2: orderDeliveryState,
      field3: orderPaymentState,
      field4: orderStatusState
    })
  }

  initForms() {
    return Object.assign(
      {},
      {
        order_platform: '全部',
        order_delivery: '全部',
        order_payment: '全部',
        order_status: '全部'
      }
    )
  }

  showDelModal(row) {
    this.setState({
      delModal: row
    })
  }

  cancelEvent() {
    this.setState({
      delModal: false
    })
  }

  delEvent() {
    Notification.open({
      type: 'success',
      title: '订单号为' + this.state.delModal.order_id + '已删除'
    })
    this.setState({
      delModal: false
    })
  }

  updateForm(data, callback) {
    const forms = Object.assign({}, this.state.forms, data)

    this.setState(
      {
        forms
      },
      () => {
        callback && callback()
      }
    )
  }

  reset(callback) {
    this.updateForm(this.initForms(), callback)
  }

  getParam(list) {
    return list
      .filter(item => item.checked)
      .map(item => item.value)
      .join(',')
  }

  setForm() {
    const forms = {
      order_platform: this.getParam(this.state.field1),
      order_delivery: this.getParam(this.state.field2),
      order_payment: this.getParam(this.state.field3),
      order_status: this.getParam(this.state.field4)
    }

    this.updateForm(forms)
  }

  handleResetClick() {
    console.log('-------handleResetClick')
    const { field1, field2, field3, field4 } = this.state

    field1.forEach(item => (item.checked = false))
    field2.forEach(item => (item.checked = false))
    field3.forEach(item => (item.checked = false))
    field4.forEach(item => (item.checked = false))

    this.setState(
      {
        field1,
        field2,
        field3,
        field4
      },
      () => {
        this.reset(this.dataFilter.submit(this.initForms()))
      }
    )
  }

  dataFilter = null
  getIndeterminate1() {
    return this.state.value1.length > 0 && this.state.value1.length < 4
  }

  handleCheckAllClick1 = () => {
    this.setState(({ value1, field1 }) => {
      return {
        value1: value1.length < 4 ? field1.map(({ id }) => id) : []
      }
    })
  }

  getIndeterminate2() {
    return this.state.value2.length > 0 && this.state.value2.length < 4
  }

  handleCheckAllClick2 = () => {
    this.setState(({ value2, field2 }) => {
      return {
        value2: value2.length < 4 ? field2.map(({ id }) => id) : []
      }
    })
  }

  getIndeterminate3() {
    return this.state.value3.length > 0 && this.state.value3.length < 4
  }

  handleCheckAllClick3 = () => {
    this.setState(({ value3, field3 }) => {
      return {
        value3: value3.length < 4 ? field3.map(({ id }) => id) : []
      }
    })
  }

  getIndeterminate4() {
    return this.state.value4.length > 0 && this.state.value4.length < 4
  }

  handleCheckAllClick4 = () => {
    this.setState(({ value4, field4 }) => {
      return {
        value4: value4.length < 4 ? field4.map(({ id }) => id) : []
      }
    })
  }

  render() {
    const Row = Grid.Row
    const Col = Grid.Col

    const { forms, pageSize } = this.state
    const params = {
      pageSize
    }
    console.log(1, this.state.value1)
    return (
      <div className="page page--tile-multiple">
        <Row>
          <Col span={24}>
            <DataFilter
              ref={node => (this.dataFilter = node)}
              url={`http://yapi.demo.qunar.com/mock/26534/hiui/tile-table`}
              params={params}
              columnMixins={this.columnMixins}
              actions={[
                'search',
                <Link to="/form-unfold-group" className="hi-tpl__add">
                  <Button type="primary" icon="plus" />
                </Link>,
                <Button
                  type="line"
                  icon="download"
                  onClick={() => {
                    console.log('------------click download')
                  }}
                />,
                <Button
                  type="line"
                  icon="mark"
                  onClick={() => {
                    console.log('------------click share')
                  }}
                />,
                <Button
                  type="line"
                  icon="more"
                  onClick={() => {
                    console.log('------------click more')
                  }}
                />
              ]}
              activeTools={['query']}
              tools={[
                {
                  type: 'query',
                  title: '查询',
                  forms,
                  onCancel: () => {
                    this.handleResetClick()
                  }
                }
              ]}
            >
              <Row gutter>
                <div className="block-filter__label block-filter__label--checkbox">业务来源</div>
                <Col className="checkboxs-group">
                  <Checkbox
                    indeterminate={this.getIndeterminate1()}
                    checked={this.state.value1.length === this.state.field1.length}
                    onChange={this.handleCheckAllClick1}
                  >
                    全选
                  </Checkbox>
                  <Checkbox.Group
                    value={this.state.value1}
                    data={this.state.field1}
                    onChange={value1 => {
                      this.setState({ value1 })
                    }}
                  />
                </Col>
              </Row>
              <Row gutter>
                <div className="block-filter__label block-filter__label--checkbox">运输方式</div>
                <Col className="checkboxs-group">
                  <Checkbox
                    indeterminate={this.getIndeterminate2()}
                    checked={this.state.value2.length === this.state.field2.length}
                    onChange={this.handleCheckAllClick2}
                  >
                    全选
                  </Checkbox>
                  <Checkbox.Group
                    value={this.state.value2}
                    data={this.state.field2}
                    onChange={value2 => {
                      this.setState({ value2 })
                    }}
                  />
                </Col>
              </Row>
              <Row gutter>
                <div className="block-filter__label block-filter__label--checkbox">支付方式</div>
                <Col className="checkboxs-group">
                  <Checkbox
                    indeterminate={this.getIndeterminate3()}
                    checked={this.state.value3.length === this.state.field3.length}
                    onChange={this.handleCheckAllClick3}
                  >
                    全选
                  </Checkbox>
                  <Checkbox.Group
                    value={this.state.value3}
                    data={this.state.field3}
                    onChange={value3 => {
                      this.setState({ value3 })
                    }}
                  />
                </Col>
              </Row>

              <Row gutter>
                <div className="block-filter__label block-filter__label--checkbox">订单状态</div>
                <Col className="checkboxs-group">
                  <Checkbox
                    indeterminate={this.getIndeterminate4()}
                    checked={this.state.value4.length === this.state.field4.length}
                    onChange={this.handleCheckAllClick4}
                  >
                    全选
                  </Checkbox>
                  <Checkbox.Group
                    value={this.state.value4}
                    data={this.state.field4}
                    onChange={value4 => {
                      this.setState({ value4 })
                    }}
                  />
                </Col>
              </Row>
            </DataFilter>
          </Col>
        </Row>

        <Modal
          title="确认"
          size="small"
          visible={!!this.state.delModal}
          onCancel={this.cancelEvent.bind(this)}
          footer={[
            <Button type="default" key={'cancel'} onClick={this.cancelEvent.bind(this)}>
              取消
            </Button>,
            <Button type="danger" key={'sure'} onClick={this.delEvent.bind(this)}>
              确认
            </Button>
          ]}
        >
          <span>确认要删除订单号为{this.state.delModal && this.state.delModal.order_id}的订单么？</span>
        </Modal>
      </div>
    )
  }
}
