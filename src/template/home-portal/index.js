import React, { Component } from 'react'
import { Grid, Input, Button, Icon, Card, Modal } from '@hi-ui/hiui'
import { Link } from 'react-router-dom'
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
    let shortcutList = [
      {
        title: '福利介绍',
        desc: '福利介绍',
        color: '#529DFD'
      },
      {
        title: '职场介绍',
        desc: '职场介绍',
        color: '#FF7C4E'
      },
      {
        title: 'HR系统',
        desc: 'HR系统',
        color: '#31CCAC'
      },
      {
        title: '会议室预定',
        desc: '会议室预定',
        color: '#00E0FF'
      },
      {
        title: '培训平台',
        desc: '培训平台',
        color: '#D26AEB'
      },
      {
        title: '海外派驻',
        desc: '海外派驻',
        color: '#FFE200'
      }
    ]

    // shortcutList
    shortcutList = shortcutList.map((item, i) => {
      return (
        <Col key={i} span={8}>
          <Card
            hoverable
            style={{
              borderLeft: `2px solid ${item.color}`
            }}
          >
            <p className='short--cut__title'>{item.title}</p>
            <p>{item.desc}</p>
          </Card>
        </Col>
      )
    })

    return shortcutList
  }

  renderBusiness () {
    let businessList = [
      {
        title: '项目评审',
        desc: '项目评审'
      },
      {
        title: '项目评审',
        desc: '项目评审'
      },
      {
        title: '项目评审',
        desc: '项目评审'
      },
      {
        title: '项目评审',
        desc: '项目评审'
      },
      {
        title: '项目评审',
        desc: '项目评审'
      }
    ]
    businessList = businessList.map((item, index) => {
      return (
        <Row justify='space-between' className='business--item'>
          <Col>
            <div className='business--item__title'>{item.title}</div>
            <div className='business--item__detail'>{item.desc}</div>
          </Col>

          <Col>
            <div
              onClick={() => {
                this.setState({ showBusinessModal: true })
              }}
              className='business--item__action'
            >
              办理
            </div>
            <div className='business--item__time'>{new Date().toLocaleDateString()}</div>
          </Col>
        </Row>
      )
    })
    return businessList
  }

  render () {
    return (
      <div className='page page--portal'>
        <div className='portal--container'>
          <Row justify='space-between'>
            <Col>
              <Input
                style={{ width: '259px' }}
                append={
                  <Button className='search-btn'>
                    <Icon name='search' />
                  </Button>
                }
                placeholder='关键词搜索'
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='portal--item__header'>
                <span>快捷访问</span>
              </div>
              <Row gutter justify='space-between' className='short--cut__container'>
                {this.renderShortcut()}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='portal--item__header'>
                <span className='title'>待办事务</span>
              </div>
              <Row className='business'>
                <Col span={24}>
                  <div>{this.renderBusiness()}</div>
                  <Row justify='flex-end'>
                    <Link to='/list/list-task'>
                      <span className='look--all__btn'>
                        查看全部 <Icon name='right' />
                      </span>
                    </Link>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Modal
            size='small'
            title='AppTitle'
            visible={this.state.showShortcutModal}
            onConfirm={() => {
              this.setState({ showShortcutModal: false })
            }}
            onCancel={() => {
              this.setState({ showShortcutModal: false })
            }}
          >
            <p>Application discription inscribed user，Scene and usage…</p>
          </Modal>
          <Modal
            size='small'
            title='待办事务标题'
            visible={this.state.showBusinessModal}
            onConfirm={() => {
              this.setState({ showBusinessModal: false })
            }}
            onCancel={() => {
              this.setState({ showBusinessModal: false })
            }}
          >
            <p>待办事务具体内容</p>
          </Modal>
        </div>
      </div>
    )
  }
}

export default HomePortal
