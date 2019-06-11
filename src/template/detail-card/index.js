import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import Button from '@hi-ui/hiui/es/button'
import Stepper from '@hi-ui/hiui/es/stepper'
import Table from '@hi-ui/hiui/es/table'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Icon from '@hi-ui/hiui/es/icon'
import Grid from '@hi-ui/hiui/es/grid'
import Loading from '@hi-ui/hiui/es/loading'
import Timeline from '@hi-ui/hiui/es/timeline'
import './index.scss'
import axios from 'axios'

export default class Template extends Component {
  state = {
    title: '小米8屏幕指纹版',
    activeNavMenuIndex: 0,
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
    },
    timelineList: [{
      groupTitle: '2月',
      children: [{
        title: 'Title - 1',
        description: 'Here are some descriptions',
        timestamp: '10:00',
        extraTime: '02-23'
      }, {
        dot: 'circle',
        title: 'Title 2',
        description: 'Here are some descriptions',
        timestamp: '10:00',
        extraTime: '02-27'
      }]
    }, {
      groupTitle: '3月',
      children: [{
        dot: 'circle',
        title: 'Title 3',
        description: 'Here are some descriptions',
        timestamp: '12:00',
        extraTime: '03-02'
      }, {
        dot: 'circle',
        title: 'Title 4',
        description: 'Here are some descriptions',
        timestamp: '11:00',
        extraTime: '03-10'
      }]
    }]
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

  fetchCarInfo = () => {
    return axios
      .get(
        'https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas'
      )
      .then(({ data: { data: carInfo } }) => {
        this.setState({ carInfo })
      })
  }

  fetchProductInfo = () => {
    return axios
      .get(
        'https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas'
      )
      .then(({ data: { data: productInfo } }) => {
        this.setState({ productInfo })
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
      await this.fetchCarInfo()
      await this.fetchProductInfo()
    } finally {
      closure.close()
    }
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, baseInfo, stepper, timelineList, activeNavMenuIndex, productInfo, carInfo } = this.state
    const ani = Number.parseInt(activeNavMenuIndex)
    return (
      <Col className='detail-card'>
        <Col className='detail-card__header'>
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
        <Row>
          <Col className='detail-card__card detail-card__card--base page page--gutter'>
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
          <Col className='detail-card__card detail-card__card--record page page--gutter'>
            <Row className='title'>修改记录</Row>
            <Timeline list={timelineList} />
          </Col>
        </Row>

        <Col className='detail-card__card detail-card__card--stepper page page--gutter'>
          <Row className='title'>项目流程</Row>
          <Row className='stepper'>
            <Stepper {...{ ...stepper, up: true }} />
          </Row>
        </Col>

        <Col className='detail-group__card page page--gutter'>
          <NavMenu
            data={[{ title: '车辆信息' }, { title: '商品信息' }]}
            onClick={(_, idx) => {
              this.setState({
                activeNavMenuIndex: idx
              })
            }}
          />
          {ani === 0 && <Table {...carInfo} />}
          {ani === 1 && <Table {...productInfo} />}
          <ul />
        </Col>
      </Col>
    )
  }
}
