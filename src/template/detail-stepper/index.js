import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Input, DatePicker, Select, Button, Stepper, Form, Icon, Grid, Loading } from '@hi-ui/hiui'
import './index.scss'
import axios from 'axios'

const FormItem = Form.Item

export default class Template extends Component {
  state = {
    title: '小米8屏幕指纹版',
    desc: Array(3).fill({
      key: '状态',
      value: '已借出'
    }),
    baseInfo: {},
    stepper: {
      list: Array(5).fill({
        title: '账号信息',
        text: '请输入账号信息'
      }),
      current: Math.round(Math.random() * 4)
    }
  }

  fetchBaseInfo = () => {
    return axios
      .get('https://easy-mock.com/mock/5cff0b81700fad38e151c566/usual/detailinfo')
      .then(({ data: { data: baseInfo } }) => {
        this.setState({ baseInfo })
      })
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}
  handleSaveClick = () => {}

  async componentDidMount () {
    Loading.open(null, {key: 'lk'})
    try {
      await this.fetchBaseInfo()
    } finally {
      Loading.close('lk')
    }
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, baseInfo, stepper } = this.state
    const formTitle = stepper.list[stepper.current].title
    return (
      <div className='page--detail-stepper'>
        <Col className='detail-stepper'>
          <Col className='detail-stepper__header'>
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
          <Col className='detail-stepper__card detail-stepper__card--base page page--gutter'>
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
          <Col className='detail-stepper__card detail-stepper__card--stepper page page--gutter'>
            <Row className='title'>项目流程</Row>
            <Row className='stepper'>
              <Stepper {...{ ...stepper, up: true }} />
            </Row>
            <Row className='form-title'>
              {formTitle}
              <Button onClick={this.handleSaveClick} type='line'>
                保存
              </Button>
            </Row>
            <Form labelPosition='left' labelWidth='96'>
              <Row>
                <Col span={12}>
                  <FormItem label='项目名称'>
                    <Input style={{ width: '320px' }} />
                  </FormItem>
                  <FormItem label='项目类型'>
                    <Select style={{ width: '320px' }} />
                  </FormItem>
                  <FormItem label='项目周期'>
                    <DatePicker type='daterange' style={{ width: '320px' }} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label='项目执行人'>
                    <Input style={{ width: '320px' }} />
                  </FormItem>
                  <FormItem label='备注'>
                    <Input type='textarea' style={{ width: '320px', resize: 'none' }} />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Col>
        </Col>
      </div>
    )
  }
}
