import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import Input from '@hi-ui/hiui/es/input'
import DatePicker from '@hi-ui/hiui/es/date-picker'
import Select from '@hi-ui/hiui/es/select'
import Button from '@hi-ui/hiui/es/button'
import Stepper from '@hi-ui/hiui/es/stepper'
import Form from '@hi-ui/hiui/es/form'
import Icon from '@hi-ui/hiui/es/icon'
import Grid from '@hi-ui/hiui/es/grid'
import Loading from '@hi-ui/hiui/es/loading'
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
      .get(
        'https://easy-mock.com/mock/5cff0b81700fad38e151c566/usual/detailinfo'
      )
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
    const { title, baseInfo, stepper } = this.state
    const formTitle = stepper.list[stepper.current].title
    return (
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
              <Button
                icon='delete'
                type='danger'
                onClick={this.handleDeleteClick}
              >
                删除
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
          <Row className='form-title'>{formTitle}</Row>
          <Form labelPosition='left' labelWidth='80'>
            <FormItem label='项目名称'>
              <Input />
            </FormItem>
            <FormItem label='项目类型'>
              <Select />
            </FormItem>
            <FormItem label='项目周期'>
              <DatePicker type='daterange' />
            </FormItem>
            <FormItem label='项目执行人'>
              <Input />
            </FormItem>
            <FormItem label='备注'>
              <Input type='textarea' />
            </FormItem>
            <FormItem>
              <Button onClick={this.handleSaveClick} type='primary'>保存</Button>
            </FormItem>
          </Form>
        </Col>
      </Col>
    )
  }
}
