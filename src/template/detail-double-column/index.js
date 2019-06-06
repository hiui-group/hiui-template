import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
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
    detailInfo: Array(20).fill({
      key: '设备名称',
      value:
        '全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作，手持超级夜景全球首款压感屏幕指纹，快速解锁，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作 ，手持超级夜景，全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面…'
    }),
    otherInfo: Array(20).fill({
      key: '创建人',
      value: '王国强'
    })
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, desc, detailInfo, otherInfo } = this.props

    return (
      <React.Fragment>
        <div className='detail-double-column detail-double-column__header'>
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
                {desc.map(({ key, value }) => (
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
        </div>
        <div className='detail-double-column detail-double-column__body page page--gutter'>
          <div className='title'>详细信息</div>
          <ul>
            {detailInfo.map(({ key, value }, idx) => (
              <li key={idx}>
                <div>{key}</div>
                <div>{value}</div>
              </li>
            ))}
          </ul>
          <div className='title'>其它信息</div>
          <ul>
            {otherInfo.map(({ key, value }, idx) => (
              <li key={idx}>
                <div>{key}</div>
                <div>{value}</div>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}
