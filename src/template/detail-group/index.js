import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import Button from '@hi-ui/hiui/es/button'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Icon from '@hi-ui/hiui/es/icon'
import Table from '@hi-ui/hiui/es/table'
import Grid from '@hi-ui/hiui/es/grid'
import './index.scss'
// import axios from 'axios'

export default class Template extends Component {
  static defaultProps = {
    title: '小米8屏幕指纹版',
    desc: Array(3).fill({
      key: '状态',
      value: '已借出'
    }),
    baseInfo: Array(20).fill({
      key: '设备名称',
      value:
        '全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作，手持超级夜景全球首款压感屏幕指纹，快速解锁，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作 ，手持超级夜景，全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面…'
    }),
    expressInfo: Array(2).fill({
      title: '发货人信息',
      avatar:
        'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05',
      info: [
        {
          key: '姓名',
          value: '萧雨'
        },
        {
          key: '电话',
          value: '18325673345'
        },
        {
          key: '地址',
          value: '北京市海淀区清河中街毛纺路58号小米总参'
        }
      ]
    }),
    carInfo: {
      columns: Array(10).fill().map((_, idx) => ({
        title: `Column ${idx}`,
        dataIndex: 'address',
        key: idx,
        width: 200
      })),
      data: Array(50).fill().map((_, idx) => ({
        key: idx,
        name: `John Brown ${idx}`,
        age: 20 + idx,
        address: `New York Park No.${idx}`
      }))
    },
    productInfo: {
      columns: Array(10).fill().map((_, idx) => ({
        title: `Column ${idx}`,
        dataIndex: 'address',
        key: idx,
        width: 200
      })),
      data: Array(50).fill().map((_, idx) => ({
        key: idx,
        name: `John ${idx}`,
        age: 20 + idx,
        address: `New York No.${idx}`
      }))
    }
  }

  state = {
    activeNavMenuIndex: 0
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, baseInfo, expressInfo, carInfo, productInfo } = this.props
    const { activeNavMenuIndex } = this.state
    const ani = Number.parseInt(activeNavMenuIndex)
    return (
      <div className='detail-group'>
        <div className='detail-group__header'>
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
        </div>
        <div className='detail-group__card detail-group__card--base page page--gutter'>
          <div className='title'>基础信息</div>
          <ul>
            {baseInfo.map(({ key, value }, idx) => (
              <li key={idx}>
                <div>{key}</div>
                <div>{value}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className='detail-group__card detail-group__card--express page page--gutter'>
          <div className='title'>收发信息</div>
          <ul className='card-list'>
            {expressInfo.map(({ title, avatar, info }, idx) => (
              <li className='card-item' key={idx}>
                <Row className='row row-01'>{title}</Row>
                <Row className='row row-02'>
                  <img src={avatar} />
                  <ul>
                    {info.map(({ key, value }, idx) => (
                      <li key={idx}>
                        <div>{key}</div>
                        <div>{value}</div>
                      </li>
                    ))}
                  </ul>
                </Row>
              </li>
            ))}
          </ul>
        </div>
        <div className='detail-group__card page page--gutter'>
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
        </div>
      </div>
    )
  }
}
