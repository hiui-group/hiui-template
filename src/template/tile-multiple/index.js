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
  constructor (props) {
    super(props)

    this.columnMixins = {
      column1: {
        sorter (pre, next) {
          return pre.column1 - next.column1
        }
      },
      action: {
        render: (key, row) => (
          <React.Fragment>
            <Link to='/form/form-basic' className='hi-tpl__add'>
              <Icon name='edit' />
            </Link>
            <span onClick={this.showDelModal.bind(this, row)} className='action-del'>
              <Icon name='close' />
            </span>
            <span className='action-more'>
              <Dropdown
                list={[{ title: '打印小票' }]}
                title='更多'
                onClick={val => console.log(val)}
              />
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
      pageSize: 10,
      forms: this.initForms()
    }
  }

  componentDidMount () {
    let orderPlatformState = orderPlatformList.map(item => ({
      text: item,
      value: item
    }))
    let orderDeliveryState = orderDeliveryList.map(item => ({
      text: item,
      value: item
    }))
    let orderPaymentState = orderPaymentList.map(item => ({
      text: item,
      value: item
    }))
    let orderStatusState = orderStatusList.map(item => ({
      text: item,
      value: item
    }))
    this.setState({
      field1: orderPlatformState,
      field2: orderDeliveryState,
      field3: orderPaymentState,
      field4: orderStatusState
    })
  }

  initForms () {
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

  showDelModal (row) {
    this.setState({
      delModal: row
    })
  }

  cancelEvent () {
    this.setState({
      delModal: false
    })
  }

  delEvent () {
    Notification.open({
      type: 'success',
      title: '订单号为' + this.state.delModal.order_id + '已删除'
    })
    this.setState({
      delModal: false
    })
  }

  updateForm (data, callback) {
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

  reset (callback) {
    this.updateForm(this.initForms(), callback)
  }

  getParam (list) {
    return list
      .filter(item => item.checked)
      .map(item => item.value)
      .join(',')
  }

  setForm () {
    const forms = {
      order_platform: this.getParam(this.state.field1),
      order_delivery: this.getParam(this.state.field2),
      order_payment: this.getParam(this.state.field3),
      order_status: this.getParam(this.state.field4)
    }

    this.updateForm(forms)
  }

  handleResetClick () {
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
  render () {
    const Row = Grid.Row
    const Col = Grid.Col

    const { forms, pageSize } = this.state
    const params = {
      pageSize
    }

    return (
      <div className='page page--tile-multiple'>
        <Row>
          <Col span={24}>
            <DataFilter
              ref={node => (this.dataFilter = node)}
              url={`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/tile`}
              params={params}
              columnMixins={this.columnMixins}
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type='primary' icon='plus' />
                </Link>,
                <Button
                  type='line'
                  icon='download'
                  onClick={() => {
                    console.log('------------click download')
                  }}
                />,
                <Button
                  type='line'
                  icon='mark'
                  onClick={() => {
                    console.log('------------click share')
                  }}
                />,
                <Button
                  type='line'
                  icon='more'
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
                <div className='block-filter__label block-filter__label--checkbox'>订单状态</div>
                <Col className='checkboxs-group'>
                  <Checkbox
                    all='one'
                    onChange={list => {
                      const fieldList = this.state.field1

                      fieldList.forEach(item => {
                        if (list.indexOf(item.value) > -1) {
                          item.checked = true
                        } else {
                          item.checked = false
                        }
                      })
                      this.setForm()
                    }}
                  >
                    全选
                  </Checkbox>
                  <Checkbox list={this.state.field1} name='one' />
                </Col>
              </Row>
              <Row gutter>
                <div className='block-filter__label block-filter__label--checkbox'>业务来源</div>
                <Col className='checkboxs-group'>
                  <Checkbox
                    all='two'
                    onChange={list => {
                      const fieldList = this.state.field2

                      fieldList.forEach(item => {
                        if (list.indexOf(item.value) > -1) {
                          item.checked = true
                        } else {
                          item.checked = false
                        }
                      })
                      this.setForm()
                    }}
                  >
                    全选
                  </Checkbox>
                  <Checkbox list={this.state.field2} name='two' />
                </Col>
              </Row>
              <Row gutter>
                <div className='block-filter__label block-filter__label--checkbox'>运输方式</div>
                <Col className='checkboxs-group'>
                  <Checkbox
                    all='three'
                    onChange={list => {
                      const fieldList = this.state.field3

                      fieldList.forEach(item => {
                        if (list.indexOf(item.value) > -1) {
                          item.checked = true
                        } else {
                          item.checked = false
                        }
                      })
                      this.setForm()
                    }}
                  >
                    全选
                  </Checkbox>
                  <Checkbox list={this.state.field3} name='three' />
                </Col>
              </Row>

              <Row gutter>
                <div className='block-filter__label block-filter__label--checkbox'>支付方式</div>
                <Col className='checkboxs-group'>
                  <Checkbox
                    all='four'
                    onChange={list => {
                      const fieldList = this.state.field4

                      fieldList.forEach(item => {
                        if (list.indexOf(item.value) > -1) {
                          item.checked = true
                        } else {
                          item.checked = false
                        }
                      })
                      this.setForm()
                    }}
                  >
                    全选
                  </Checkbox>
                  <Checkbox list={this.state.field4} name='four' />
                </Col>
              </Row>
            </DataFilter>
          </Col>
        </Row>

        <Modal
          title='确认'
          size='small'
          show={!!this.state.delModal}
          onCancel={this.cancelEvent.bind(this)}
          footers={[
            <Button type='default' key={'cancel'} onClick={this.cancelEvent.bind(this)}>
              取消
            </Button>,
            <Button type='danger' key={'sure'} onClick={this.delEvent.bind(this)}>
              确认
            </Button>
          ]}
        >
          <span>
            确认要删除订单号为{this.state.delModal && this.state.delModal.order_id}的订单么？
          </span>
        </Modal>
      </div>
    )
  }
}
