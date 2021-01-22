import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Link } from 'react-router-dom'
import { Input, DatePicker, Select, Button, Tabs, Icon, Grid, Loading } from '@hi-ui/hiui'
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
    axios.get('http://yapi.demo.qunar.com/mock/26534/hiui/user/detail').then(({ data: { data: baseInfo } }) => {
      this.setState({ baseInfo })
    })
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchBaseInfo()
    } finally {
      Loading.close('lk')
    }
  }

  render() {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, baseInfo, activeNavMenuIndex, desc } = this.state
    const ani = Number.parseInt(activeNavMenuIndex)
    return (
      <div className="page--detail-relevance">
        <Col className="detail-relevance">
          <Col className="detail-relevance__header">
            <Row className="row row-01" align="center">
              <span onClick={this.handleBackClick}>
                <Icon name="left" />
                <span>返回</span>
              </span>
              <span className="spacer">|</span>
              <span>详情</span>
            </Row>
            <Row className="row row-02" justify="space-between">
              <Col>
                <h3>{title}</h3>
                <Row className="row row-03">
                  {desc.map(({ key, value }, idx) => (
                    <div key={idx}>
                      <span>
                        {key}：{value}
                      </span>
                      <span className="spacer">|</span>
                    </div>
                  ))}
                </Row>
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
          <Col className='detail-relevance__card page page--gutter'>
            <Tabs
              className="detail-group__table-container"
              type="line"
              onTabClick={(_, idx) => {
                this.setState({
                  activeNavMenuIndex: idx
                })
              }}
            >
              <Tabs.Pane tabTitle='基础信息' tabId={0}><BaseInfo {...{ baseInfo }} /></Tabs.Pane>
              <Tabs.Pane tabTitle='设备清单' tabId={1}><QueryBasic /></Tabs.Pane>
            </Tabs>
          </Col>
        </Col>
      </div>
    )
  }
}

function BaseInfo({ baseInfo }) {
  return (
    <ul className="detail-relevance__card--base">
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
      <div className="page page--gutter">
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
                  forms,
                  beforeSubmit: this.beforeSubmit.bind(this),
                  onCancel: () => {
                    this.updateForm(this.initForms())
                  }
                }
              ]}
            >
              <FieldGroup main>
                <Field label="订单号" width="220">
                  <Input
                    placeholder="请输入"
                    value={forms.column1}
                    onChange={(e, value) => {
                      this.updateForm({ column1: value })
                    }}
                  />
                </Field>
                <Field label="业务来源" width="200">
                  <DatePicker
                    onChange={d => {
                      console.log('选择月份', d)
                      // this.setState({_date: d})
                    }}
                  />
                </Field>
                <Field label="运输方式" width="200">
                  <Select
                    data={this.transportOptions}
                    placeholder="请选择运输方式"
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label="运输方式1" width="200" advanced>
                  <Select
                    data={this.transportOptions}
                    placeholder="请选择运输方式"
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label="运输方式2" width="200" advanced>
                  <Select
                    data={this.transportOptions}
                    placeholder="请选择运输方式"
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label="运输方式3" width="200" advanced>
                  <Select
                    data={this.transportOptions}
                    placeholder="请选择运输方式"
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label="运输方式4" width="200" advanced>
                  <Select
                    data={this.transportOptions}
                    placeholder="请选择运输方式"
                    value={forms.column3}
                    onChange={value => this.updateForm({ column3: (value[0] && value[0].id) || '全部' })}
                  />
                </Field>
                <Field label="运输方式5" width="200" advanced>
                  <Select
                    data={this.transportOptions}
                    placeholder="请选择运输方式"
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
