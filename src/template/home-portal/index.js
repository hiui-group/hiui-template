import React, { Component } from 'react'
import Grid from '@hi-ui/hiui/es/grid'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import Badge from '@hi-ui/hiui/es/badge'
import Popover from '@hi-ui/hiui/es/popover'
import Modal from '@hi-ui/hiui/es/modal'
import './index.scss'

const { Row, Col } = Grid

class HomePortal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showShortcutModal: false,
      showBusinessModal: false
    }
  }

  renderShortcut () {
    let shortcutList = []
    for (let i = 0; i < 3; i++) {
      shortcutList.push(
        <Col key={i} span={8}>
          <div className='shortcut'>
            <h4>AppTitle</h4>
            <p>Application discription inscribed user，Scene and usage…</p>
            <Button
              size='small'
              onClick={() => { this.setState({ showShortcutModal: true }) }}
            >
              use <Icon name='right' />
            </Button>
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
        <div className='business--item' key={i}>
          <Row justify='space-between'>
            <Col>
              <span className={(i % 2) ? 'business--item__title success' : ' business--item__title error'}>事务标题</span>
            </Col>
            <Col>
              <span className='business--item__time'>2018-10-21</span>
            </Col>
          </Row>
          <Row justify='space-between'>
            <Col>
              <div className='business--item__detail'>事务具体内容</div>
            </Col>
            <Col>
              <Button
                type='line'
                size='small'
                onClick={() => { this.setState({ showBusinessModal: true }) }}
              >
                查看详情
              </Button>
            </Col>
          </Row>
        </div>
      )
    }
    return businessList
  }

  render () {
    return (
      <div className='page page--portal'>
        <div className='portal--container'>
          <Row justify='space-between'>
            <Col>
              <Input
                style={{ width: '250px' }}
                append={<Button type='primary'><Icon name='search' /></Button>}
                placeholder='Search'
              />
            </Col>
            <Col>
              <Badge dot>
                <Icon name='prompt' style={{ fontSize: '20px' }} />
              </Badge>
              <Popover content={'你有99条新消息'} placement='bottom' trigger='hover' style={{ margin: '10px 10px' }}>
                <span> 消息中心</span>
              </Popover>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='portal--item__header'>
                <Icon name='menu' style={{ fontSize: '28px', marginRight: '12px' }} />
                <span>快捷访问</span>
              </div>
              <Row gutter justify='space-between'>
                {this.renderShortcut()}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='portal--item__header'>
                <Icon name='time' style={{ fontSize: '28px', marginRight: '12px' }} />
                <span className='title'>待办事务</span>
              </div>
              <Row>
                <Col span={24}>
                  <div className='business'>{this.renderBusiness()}</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal
            size='small'
            title='AppTitle'
            show={this.state.showShortcutModal}
            backDrop
            onConfirm={() => { this.setState({ showShortcutModal: false }) }}
            onCancel={() => { this.setState({ showShortcutModal: false }) }}
          >
            <p>Application discription inscribed user，Scene and usage…</p>
          </Modal>
          <Modal
            size='small'
            title='待办事务标题'
            show={this.state.showBusinessModal}
            backDrop
            onConfirm={() => { this.setState({ showBusinessModal: false }) }}
            onCancel={() => { this.setState({ showBusinessModal: false }) }}
          >
            <p>待办事务具体内容</p>
          </Modal>
        </div>
      </div>
    )
  }
}

export default HomePortal
