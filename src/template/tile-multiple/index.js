import React, { Component } from 'react'
import Grid from '@hi-ui/hiui/es/grid'
import { Link } from 'react-router-dom'
import Checkbox from '@hi-ui/hiui/es/checkbox'
import Button from '@hi-ui/hiui/es/button'
import { DataFilter } from '../../component/data-filter'
import Icon from '@hi-ui/hiui/es/icon'
import '../content.scss'
import config from '../../config'

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
        render: () => (
          <React.Fragment>
            <Icon name='edit' />
            <Icon name='close' />
            <Icon name='more' />
          </React.Fragment>
        )
      }
    }

    this.state = {
      field1: {
        list: [
          {
            text: '订单A',
            value: '订单A'
          },
          {
            text: '订单B',
            value: '订单B'
          },
          {
            text: '订单C',
            value: '订单C'
          },
          {
            text: '订单D',
            value: '订单D'
          },
          {
            text: '订单E',
            value: '订单E'
          }
        ]

      },
      field2: {
        list: [
          {
            text: '小米商城',
            value: '小米商城'
          },
          {
            text: '小米之家',
            value: '小米之家'
          },
          {
            text: '天猫旗舰店',
            value: '天猫旗舰店'
          },
          {
            text: '京东旗舰店',
            value: '京东旗舰店'
          }
        ]
      },
      field3: {
        list: [
          {
            text: '顺丰',
            value: '顺丰'
          },
          {
            text: 'EMS',
            value: 'EMS'
          },
          {
            text: '自取',
            value: '自取'
          },
          {
            text: '圆通',
            value: '圆通'
          },
          {
            text: '申通',
            value: '申通'
          },
          {
            text: '中通',
            value: '中通'
          }
        ]
      },
      pageSize: 10,
      forms: this.initForms()
    }
  }

  initForms () {
    return Object.assign({}, {
      column1: '全部',
      column2: '全部',
      column3: '全部'
    })
  }

  updateForm (data) {
    const forms = Object.assign({}, this.state.forms, data)

    this.setState({
      forms
    })
  }

  reset () {
    this.updateForm(this.initForms())
  }

  setForm () {
    const forms = {
      column1: this.state.field1.list.filter(item => item.checked).map(item => item.value).join(' '),
      column2: this.state.field2.list.filter(item => item.checked).map(item => item.value).join(' '),
      column3: this.state.field3.list.filter(item => item.checked).map(item => item.value).join(' ')
    }

    this.updateForm(forms)
  }

  handleResetClick () {
    console.log('-------handleResetClick')
    const { field1, field2, field3 } = this.state

    field1.list.forEach(item => item.checked = false)
    field2.list.forEach(item => item.checked = false)
    field3.list.forEach(item => item.checked = false)

    this.setState({
      field1,
      field2,
      field3
    }, () => {
      this.reset()
    })
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col

    const {
      forms,
      pageSize
    } = this.state
    const params = {
      pageSize
    }

    return (
      <div className='page page--gutter'>
        <Row>
          <Col span={24}>

            <DataFilter
              ref={node => this.dataFilter = node}
              url={`${config('host')}/table/get-datas`}
              params={params}
              columnMixins={this.columnMixins}
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type="primary">
                    <Icon name='plus' />
                  </Button>
                </Link>,
                <Button type="line" onClick={() => {
                  console.log('------------click download')
                }}>
                  <Icon name='download' />
                </Button>,
                <Button type="line" onClick={() => {
                  console.log('------------click share')
                }}>
                  <Icon name='mark' />
                </Button>,
                <Button type="line" onClick={() => {
                  console.log('------------click more')
                }}>
                  <Icon name='more' />
                </Button>
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
                <Col span={2}>
                  <div style={{ textAlign: 'right' }}>订单类型</div>
                </Col>
                <Col className="checkboxs-group">
                  <Checkbox all='one' onChange={list => {
                    const fieldList = this.state.field1.list

                    fieldList.forEach(item => {
                      if (list.indexOf(item.value) > -1) {
                        item.checked = true
                      } else {
                        item.checked = false
                      }
                    })
                    this.setForm()
                  }}>全选</Checkbox>
                  <Checkbox list={this.state.field1.list} name='one' />
                </Col>
              </Row>
              <Row gutter>
                <Col span={2}>
                  <div style={{ textAlign: 'right' }}>业务来源</div>
                </Col>
                <Col className="checkboxs-group">
                  <Checkbox all='two' onChange={list => {
                    const fieldList = this.state.field2.list

                    fieldList.forEach(item => {
                      if (list.indexOf(item.value) > -1) {
                        item.checked = true
                      } else {
                        item.checked = false
                      }
                    })
                    this.setForm()
                  }}>全选</Checkbox>
                  <Checkbox list={this.state.field2.list} name='two' />
                </Col>
              </Row>
              <Row gutter>
                <Col span={2}>
                  <div style={{ textAlign: 'right' }}>运输方式</div>
                </Col>
                <Col className="checkboxs-group">
                  <Checkbox all='three' onChange={list => {
                    const fieldList = this.state.field3.list

                    fieldList.forEach(item => {
                      if (list.indexOf(item.value) > -1) {
                        item.checked = true
                      } else {
                        item.checked = false
                      }
                    })
                    this.setForm()
                  }}>全选</Checkbox>
                  <Checkbox list={this.state.field3.list} name='three' />
                </Col>
              </Row>
            </DataFilter>
          </Col>
        </Row>
      </div>
    )
  }
}
