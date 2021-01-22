import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, DatePicker, Select, Button, Breadcrumb, Tabs, Icon, Grid, Loading, Card } from '@hi-ui/hiui'
import { DataFilter, FieldGroup, Field } from '@hi-ui/component-kit/es/data-filter'
import './index.scss'
// import axios from 'axios'

const data = {
  title: '小米8屏幕指纹版',
  desc: Array(3).fill({
    key: '状态',
    value: '已借出'
  }),
  baseInfo: {
    '设备名称': {
      key: '设备名称',
      value: '全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作，手持超级夜景全球首款压感屏幕指纹，快速解锁，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作 ，手持超级夜景，全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面…'
    },
    '容量颜色': {
      key: '容量颜色',
      value: '64+64G 白色'
    },
    '系统版本': {
      key: '系统版本',
      value: '2.0'
    },
    '设备别名': {
      key: '设备别名',
      value: 'Mix2S'
    },
    '操作系统': {
      key: '操作系统',
      value: '9.5'
    },
    '设备挂靠人': {
      key: '设备挂靠人',
      value: '测试组'
    },
    '设备识别码': {
      key: '设备识别码',
      value: '86814403004345686814403004345686814403004345686814403004345686814403004345686814403004345681440300434568681440300434568144030043456868144030043456'
    },
    '分辨率': {
      key: '分辨率',
      value: '1136*640'
    },
    '当前责任人': {
      key: '当前责任人',
      value: 'QuoqiangW 王国强'
    },
  },
  expressInfo: {
    avatar: {
      key: '头像',
      value: 'https://images.unsplash.com/photo-1580901066059-159ccd258d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    },
    name: {
      key: '姓名',
      value: '王贝'
    },
    phone: {
      key: '电话',
      value: '13545360987'
    },
    adress: {
      key: '地址',
      value: '武汉市江夏区江夏大道普洛斯物流园B6区小米仓库'
    }
  }
}
const delay = (timeout = 1000) => new Promise((resolve) => setTimeout(() => resolve(), timeout))

export default class Template extends Component {
  state = {
    activeTabIndex: 0,
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

  fetchBaseInfo = async () => {
    await delay()
    this.setState({ baseInfo: data.baseInfo })
    // return axios.get('http://yapi.demo.qunar.com/mock/26534/hiui/user/detail').then(({ data: { data: baseInfo } }) => {
    //   this.setState({ baseInfo })
    // })
  }

  fetchExpressInfo = async () => {
    await delay()
    this.setState({
      expressInfo: [
        { ...data.expressInfo, title: '发件人信息' },
        { ...data.expressInfo, title: '收件人信息' }
      ]
    })

    // return Promise.all([
    //   axios.get('http://mock.be.mi.com/mock/2532/user/info'),
    //   axios.get('http://mock.be.mi.com/mock/2532/user/info')
    // ]).then(
    //   ([
    //     {
    //       data: { data: data1 }
    //     },
    //     {
    //       data: { data: data2 }
    //     }
    //   ]) => {
    //     this.setState({
    //       expressInfo: [
    //         { ...data1, title: '发件人信息' },
    //         { ...data2, title: '收件人信息' }
    //       ]
    //     })
    //   }
    // )
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}

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
      <div className='page--detail-group'>
        <Col className='detail-group'>
          <Col className='detail-group__header'>
            <Row className='row row-01' align='center'>
              <Breadcrumb
                separator="|"
                onClick={this.handleBackClick}
                data={[{
                  content: (
                    <span >
                      <Icon name='left' />
                      <span>返回</span>
                    </span>
                  ),
                  path: '/'
                }, {
                  content: <span>详情</span>,
                  path: '/detail-group'
                }]}
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
                <Button icon="collection" type="line" onClick={this.handleDeleteClick}>
                  收藏
                </Button>
                <Button icon="more" type="line" onClick={this.handleMoreClick} />
              </Col>
            </Row>
          </Col>
          <Col className='detail-group__card detail-group__card--base'>
            <Row className='detail-basic__row'>
              <Card title='基础信息' bordered={false} hoverable>
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
          <Col className='detail-group__card detail-group__card--express'>
            <Row className='detail-basic__row'>
              <Card title='收发信息' bordered={false} hoverable>
                <ul className='card-list'>
                  {expressInfo.map(({ title, avatar, ...info }, idx) => (
                    <li className='card-item' key={idx}>
                      <Card title={title} hoverable style={{ backgroundColor: '#fbfbfb' }}>
                        <div className="card-item__content">
                          <img src={avatar.value} alt='' />
                          <ul>
                            {Object.values(info).filter(item => ['姓名', '地址', '电话'].includes(item.key)).map(({ key, value }, idx) => {
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
          <Col className='detail-group__card page page--gutter detail-group__table'>
            <Tabs
              className="detail-group__table-container"
              type="line"
              activeId={activeTabIndex}
              onTabClick={(tabId) => {
                this.setState({
                  activeTabIndex: tabId
                })
              }}
            >
              <Tabs.Pane tabTitle='商品信息' tabId={0}><QueryBasic /></Tabs.Pane>
              <Tabs.Pane tabTitle='车辆信息' tabId={1}><QueryBasic /></Tabs.Pane>
            </Tabs>
          </Col>
        </Col>
      </div>
    )
  }
}

class QueryBasic extends Component {
  constructor(props) {
    super(props)

    this.transportOptions = [
      { title: '全部', id: '全部' },
      { title: '顺丰', id: '顺丰' },
      { title: 'EMS', id: 'EMS' },
      { title: '自取', id: '自取' }
    ]

    this.columnMixins = {
      column1: {
        sorter(pre, next) {
          return pre.column1 - next.column1
        }
      },
      column2: {
        options: this.transportOptions
      },
      action: {
        render: () => (
          <React.Fragment>
            <Icon name="edit" />
            <Icon name="close" />
            <Icon name="more" />
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

  updateForm(data, callback = undefined) {
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

  initForms() {
    return Object.assign(
      {},
      {
        column1: '',
        column2: '全部',
        column3: '全部'
      }
    )
  }

  beforeSubmit() {
    return true
  }

  render() {
    const Row = Grid.Row
    const Col = Grid.Col
    const { forms, pageSize } = this.state
    const params = {
      pageSize
    }

    return (
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
    )
  }
}
