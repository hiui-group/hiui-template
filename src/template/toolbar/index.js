import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@hi-ui/hiui/es/button'
import Input from '@hi-ui/hiui/es/input'
import Seclet from '@hi-ui/hiui/es/select'
import Icon from '@hi-ui/hiui/es/icon'
import Grid from '@hi-ui/hiui/es/grid'
import { DataFilter, FieldGroup, Field } from '../../component/data-filter'
import '../content.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)

    this.businessOptions = [
      { name: '全部', id: '全部' },
      { name: '小米商城', id: '小米商城' },
      { name: '小米之家', id: '小米之家' },
      { name: '天猫旗舰店', id: '天猫旗舰店' },
      { name: '京东旗舰店', id: '京东旗舰店' }
    ]
    this.transportOptions = [
      { name: '全部', id: '全部' },
      { name: '顺丰', id: '顺丰' },
      { name: 'EMS', id: 'EMS' },
      { name: '自取', id: '自取' }
    ]
    this.menus = [
      { title: '全部' },
      { title: '异常' },
      { title: '调拨管理' },
      { title: '超期监控' }
    ]
    this.columnMixins = {
      column1: {
        sorter (pre, next) {
          return pre.column1 - next.column1
        }
      },
      column2: {
        options: this.transportOptions
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
      pageSize: 10,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: [],
      forms: this.initForms()
    }
  }

  updateForm (data, callback = undefined) {
    const forms = Object.assign({}, this.state.forms, data)

    this.setState({
      forms
    }, () => {
      callback && callback()
    })
  }

  initForms () {
    return Object.assign({}, {
      column1: '',
      column2: '全部',
      column3: '全部'
    })
  }

  beforeSubmit () {
    return true
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
              url={`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas`}
              params={params}
              columnMixins={this.columnMixins}
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type='primary'>
                    <Icon name='plus' />
                  </Button>
                </Link>,
                <Button type='line' onClick={() => {
                  console.log('------------click download')
                }}>
                  <Icon name='download' />
                </Button>,
                <Button type='line' onClick={() => {
                  console.log('------------click share')
                }}>
                  <Icon name='mark' />
                </Button>,
                <Button type='line' onClick={() => {
                  console.log('------------click more')
                }}>
                  <Icon name='more' />
                </Button>
              ]}
              activeTools={['query']}
              tools={[
                {
                  type: 'query',
                  forms,
                  beforeSubmit: this.beforeSubmit.bind(this),
                  onCancel: () => {
                    this.updateForm(this.initForms())
                  }
                },
                'filter',
                {
                  type: 'row-height',
                  rowHeight: 'small'
                },
                'column',
                'statistics'
              ]}
            >
              <FieldGroup main onCancel={() => this.updateForm(this.initForms())}>
                <Field label='订单号' width='220'>
                  <Input
                    placeholder='请输入'
                    value={forms.column1}
                    onChange={(e, value) => {
                      this.updateForm({ column1: value })
                    }}
                  />
                </Field>
                <Field label='业务来源' width='200'>
                  <Seclet
                    list={this.businessOptions}
                    placeholder='请选择业务来源'
                    value={forms.column2}
                    onChange={value => this.updateForm({ column2: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label='运输方式' width='200'>
                  <Seclet
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label='运输方式1' width='200' advanced>
                  <Seclet
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label='运输方式2' width='200' advanced>
                  <Seclet
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label='运输方式3' width='200' advanced>
                  <Seclet
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label='运输方式4' width='200' advanced>
                  <Seclet
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label='运输方式5' width='200' advanced>
                  <Seclet
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
              </FieldGroup>
            </DataFilter>

          </Col>
        </Row>
      </div>
    )
  }
}
