import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Link } from 'react-router-dom'
import { Input, DatePicker, Select, Button, NavMenu, Icon, Grid, Loading } from '@hi-ui/hiui'
import { DataFilter, FieldGroup, Field } from '@hi-ui/component-kit/es/data-filter'
import './index.scss'
import axios from 'axios'

export default class Template extends Component {
  state = {
    activeNavMenuIndex: 0,
    title: '小米8屏幕指纹版',
    desc: Array(3).fill({
      key: '状态',
      value: '已借出'
    }),
    baseInfo: {},
    expressInfo: [],
    carInfo: {},
    productInfo: {}
  }

  fetchBaseInfo = () => {
    return axios
      .get('http://yapi.demo.qunar.com/mock/26534/hiui/user/detail')
      .then(({ data: { data: baseInfo } }) => {
        this.setState({ baseInfo })
      })
  }

  fetchExpressInfo = () => {
    return Promise.all([
      axios.get('http://yapi.demo.qunar.com/mock/26534/hiui/user/info'),
      axios.get('http://yapi.demo.qunar.com/mock/26534/hiui/user/info')
    ]).then(([{ data: { data: data1 } }, { data: { data: data2 } }]) => {
      this.setState({
        expressInfo: [{ ...data1, title: '发件人信息' }, { ...data2, title: '收件人信息' }]
      })
    })
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}

  async componentDidMount () {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchBaseInfo()
      await this.fetchExpressInfo()
      Loading.close('lk')
    } finally {
      Loading.close('lk')
    }
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, baseInfo, expressInfo } = this.state
    const { activeNavMenuIndex } = this.state
    const ani = Number.parseInt(activeNavMenuIndex)
    return (
      <div className='page--detail-group'>
        <Col className='detail-group'>
          <Col className='detail-group__header'>
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
                <Button icon='collection' type='line' onClick={this.handleDeleteClick}>
                  收藏
                </Button>
                <Button icon='more' type='line' onClick={this.handleMoreClick} />
              </Col>
            </Row>
          </Col>
          <Col className='detail-group__card detail-group__card--base page page--gutter'>
            <Row className='title'>基础信息</Row>
            <ul>
              {Object.values(baseInfo).map(({ key, value }, idx) => (
                <li key={idx}>
                  <div>{key}</div>
                  <div>{value}</div>
                </li>
              ))}
            </ul>
          </Col>
          <Col className='detail-group__card detail-group__card--express page page--gutter'>
            <Row className='title'>收发信息</Row>
            <ul className='card-list'>
              {expressInfo.map(({ title, avatar, ...info }, idx) => (
                <li className='card-item' key={idx}>
                  <Row className='row row-01'>{title}</Row>
                  <Row className='row row-02'>
                    <img src={avatar.value} alt='' />
                    <ul>
                      {Object.values(info).filter(item => ['姓名', '地址', '性别'].includes(item.key)).map(({ key, value }, idx) => {
                        return (
                          <li key={idx}>
                            <div>{key}</div>
                            <div>{value}</div>
                          </li>
                        )
                      })}
                    </ul>
                  </Row>
                </li>
              ))}
            </ul>
          </Col>
          <Col className='detail-group__card page page--gutter detail-group__table'>
            <NavMenu
              data={[{ title: '车辆信息' }, { title: '商品信息' }]}
              onClick={(_, idx) => {
                this.setState({
                  activeNavMenuIndex: idx
                })
              }}
            />
            <div className='detail-group__table-container'>
              {ani === 0 && <QueryBasic />}
              {ani === 1 && <QueryBasic />}
            </div>
          </Col>
        </Col>
      </div>
    )
  }
}

class QueryBasic extends Component {
  constructor (props) {
    super(props)

    this.transportOptions = [
      { title: '全部', id: '全部' },
      { title: '顺丰', id: '顺丰' },
      { title: 'EMS', id: 'EMS' },
      { title: '自取', id: '自取' }
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
      <div>
        <Row>
          <Col span={24}>
            <DataFilter
              url={`http://yapi.demo.qunar.com/mock/26534/hiui/get-datas`}
              onFetched={ret => {
                console.log('------------fetchData', ret)
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
                    data={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式1' width='200' advanced>
                  <Select
                    data={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式2' width='200' advanced>
                  <Select
                    data={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式3' width='200' advanced>
                  <Select
                    data={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式4' width='200' advanced>
                  <Select
                    data={this.transportOptions}
                    placeholder='请选择运输方式'
                    value={forms.column3}
                    onChange={value =>
                      this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                    }
                  />
                </Field>
                <Field label='运输方式5' width='200' advanced>
                  <Select
                    data={this.transportOptions}
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
