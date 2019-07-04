import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Link } from 'react-router-dom'
import Input from '@hi-ui/hiui/es/input'
import DatePicker from '@hi-ui/hiui/es/date-picker'
import Select from '@hi-ui/hiui/es/select'
import Button from '@hi-ui/hiui/es/button'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Icon from '@hi-ui/hiui/es/icon'
import Grid from '@hi-ui/hiui/es/grid'
import Loading from '@hi-ui/hiui/es/loading'
import { DataFilter, FieldGroup, Field } from '@hi-ui/component-kit/es/data-filter'
import './index.scss'
import axios from 'axios'

export default class Template extends Component {
  state = {
    title: '小米8屏幕指纹版',
    desc: Array(3).fill({
      key: '状态',
      value: '已借出'
    }),
    baseInfo: {},
    tableInfo: {},
    activeNavMenuIndex: 0
  }

  fetchBaseInfo = () => {
    axios
      .get('https://easy-mock.com/mock/5cff0b81700fad38e151c566/usual/detailinfo')
      .then(({ data: { data: baseInfo } }) => {
        this.setState({ baseInfo })
      })
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}

  async componentDidMount () {
    const closure = Loading.open()
    try {
      await this.fetchBaseInfo()
    } finally {
      closure.close()
    }
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, baseInfo, activeNavMenuIndex } = this.state
    const ani = Number.parseInt(activeNavMenuIndex)
    return (
      <div className='page--detail-relevance'>
        <Col className='detail-relevance'>
          <Col className='detail-relevance__header'>
            <Row className='row row-01' align='center'>
              <span onClick={this.handleBackClick}>
                <Icon name='left' />
                <span>返回</span>
              </span>
              <span className='spacer'>|</span>
              <span>详情</span>
            </Row>
            <Row className='row row-02' justify='space-between'>
              <Col>
                <h3>{title}</h3>
              </Col>
              <Col>
                <Button icon='edit' type='primary' onClick={this.handleEditClick}>
                  编辑
                </Button>
                <Button icon='delete' type='danger' onClick={this.handleDeleteClick}>
                  删除
                </Button>
                <Button icon='more' type='line' onClick={this.handleMoreClick} />
              </Col>
            </Row>
          </Col>
          <Col className='detail-relevance__card page page--gutter'>
            <NavMenu
              data={[{ title: '基础信息' }, { title: '设备清单' }]}
              onClick={(_, idx) => {
                this.setState({
                  activeNavMenuIndex: idx
                })
              }}
            />
            {ani === 0 && <BaseInfo {...{ baseInfo }} />}
            {ani === 1 && <QueryBasic />}
            <ul />
          </Col>
        </Col>
      </div>
    )
  }
}

function BaseInfo ({ baseInfo }) {
  return (
    <ul className='detail-relevance__card--base'>
      {Object.values(baseInfo).map(({ key, value }, idx) => (
        <li key={idx}>
          <div>{key}</div>
          <div>{value}</div>
        </li>
      ))}
    </ul>
  )
}

class QueryBasic extends Component {
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
      forms: this.initForms(),
      _date: new Date()
    }
  }

  updateForm (data, callback = undefined) {
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

  initForms () {
    return Object.assign(
      {},
      {
        column1: '',
        column2: '全部',
        column3: '全部'
      }
    )
  }

  beforeSubmit () {
    return true
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { forms, pageSize } = this.state
    const params = {
      pageSize
    }

    return (
      <div className='page page--gutter'>
        <Row>
          <Col span={24}>
            <DataFilter
              url={`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas`}
              onFetched={ret => {
                console.log('------------fetchDatas', ret)
              }}
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
                  forms,
                  beforeSubmit: this.beforeSubmit.bind(this),
                  onCancel: () => {
                    this.updateForm(this.initForms())
                  }
                }
              ]}
            >
              <FieldGroup main>
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
                  <DatePicker
                    onChange={d => {
                      console.log('选择月份', d)
                      // this.setState({_date: d})
                    }}
                  />
                </Field>
                <Field label='运输方式' width='200'>
                  <Select
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式1' width='200' advanced>
                  <Select
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式2' width='200' advanced>
                  <Select
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式3' width='200' advanced>
                  <Select
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式4' width='200' advanced>
                  <Select
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式5' width='200' advanced>
                  <Select
                    list={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
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
