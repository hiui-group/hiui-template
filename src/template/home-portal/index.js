import React, { Component } from 'react'
import Grid from '@hi-ui/hiui/es/grid'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import Badge from '@hi-ui/hiui/es/badge'
import './index.scss'

const { Row, Col } = Grid

class HomePortal extends Component {
  renderShortcut () {
    let shortcutList = []
    for (let i = 0; i < 3; i++) {
      shortcutList.push(
        <Col key={i}>
          <div className='shortcut-item'>
            <div className='title'>AppTitle</div>
            <p className='detail'>Application discription inscribed user，Scene and usage…</p>
            <span>use <Icon name='right' /></span>
          </div>
        </Col>
      )
    }
    return shortcutList
  }

  renderBusiness () {
    let businessList = []
    for (let i = 0; i < 6; i++) {
      businessList.push(
        <div className='business-item' key={i}>
          <Row justify='space-between'>
            <Col>
              <span className={(i % 2) ? 'title success' : ' title error'}>事务标题</span>
            </Col>
            <Col>
              <span className='time'>2018-10-21</span>
            </Col>
          </Row>
          <Row justify='space-between'>
            <Col>
              <div className='detail'>事务具体内容</div>
            </Col>
            <Col>
              <span className='action-button'>action</span>
            </Col>
          </Row>
        </div>
      )
    }
    return businessList
  }

  render () {
    return (
      <div className='content'>
        <div className='portal-container'>
          <div className='portal-header'>
            <Row justify='space-between'>
              <Col>
                <Input placeholder='Search' style={{ width: '250px' }} />
                <Button><Icon name='search' style={{ color: '#4284F5' }} /></Button>
              </Col>
              <Col>
                <Badge dot>
                  <Icon name='prompt' style={{ fontSize: '20px' }} />
                </Badge>
                <span> 消息中心（1）</span>
              </Col>
            </Row>
          </div>
          <div className='portal-content'>
            <div className='portal-content-box shortcut'>
              <div className='shortcut-header'>
                <Icon name='menu' style={{ fontSize: '28px' }} />
                <span className='title'>快捷访问</span>
              </div>
              <div className='shortcut-content'>
                <Row justify='space-between'>{this.renderShortcut()}</Row>
              </div>
            </div>
            <div className='portal-content-box business'>
              <div className='business-header'>
                <Icon name='time' style={{ fontSize: '28px' }} />
                <span className='title'>代办事务</span>
              </div>
              <div className='business-content'>{this.renderBusiness()}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePortal
