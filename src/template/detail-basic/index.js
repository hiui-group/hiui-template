import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import Grid from '@hi-ui/hiui/es/grid'
import Loading from '@hi-ui/hiui/es/loading'
import './index.scss'
import axios from 'axios'

export default class Template extends Component {
  state = {
    title: '小米8屏幕指纹版',
    desc: Array(3).fill({
      key: '状态',
      value: '已借出'
    }),
    detailInfo: {},
    otherInfo: {}
  }

  fetchOtherInfo = () => {
    return axios
      .get('https://easy-mock.com/mock/5cff0b81700fad38e151c566/usual/userinfo')
      .then(({ data: { data: otherInfo } }) => {
        this.setState({ otherInfo })
      })
  }

  fetchDetailInfo = () => {
    return axios
      .get(
        'https://easy-mock.com/mock/5cff0b81700fad38e151c566/usual/detailinfo'
      )
      .then(({ data: { data: detailInfo } }) => {
        this.setState({ detailInfo })
      })
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}

  async componentDidMount () {
    const closure = Loading.open()
    try {
      await this.fetchOtherInfo()
      await this.fetchDetailInfo()
    } finally {
      closure.close()
    }
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, desc, detailInfo, otherInfo } = this.state

    return (
      <React.Fragment>
        <Col className='detail-basic detail-basic__header'>
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
              <h2>{title}</h2>
              <Row className='row row-03'>
                {desc.map(({ key, value }, idx) => (
                  <>
                    <span>
                      {key}：{value}
                    </span>
                    <span className='spacer'>|</span>
                  </>
                ))}
              </Row>
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
        <Col className='detail-basic detail-basic__body page page--gutter'>
          <Row className='title'>详细信息</Row>
          <ul>
            {Object.values(detailInfo).map(({ key, value }, idx) => (
              <li key={idx}>
                <div>{key}</div>
                <div>{value}</div>
              </li>
            ))}
          </ul>
          <Row className='title'>其它信息</Row>
          <ul>
            {Object.values(otherInfo).map(({ key, value }, idx) => (
              <li key={idx}>
                <div>{key}</div>
                <div>{value}</div>
              </li>
            ))}
          </ul>
        </Col>
      </React.Fragment>
    )
  }
}
