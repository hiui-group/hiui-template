import React, { Component } from 'react'
import { Grid, Input, Button, Icon, Card, Modal } from '@hi-ui/hiui'
import { Link } from 'react-router-dom'
import './index.scss'

const { Row, Col } = Grid

class HomePortal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showTodoModal: false
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
        <Col key={i} span={8} className='portal__shortcut-item'>
          <Card
            hoverable
            style={{
              borderLeft: `2px solid ${item.color}`
            }}
          >
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </Card>
        </Col>
      )
    })

    return shortcutList
  }

  renderTodo () {
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
        <Row className='portal__todo-item portal-todo-item' key={index}>
          <Col>
            <h4 className='portal-todo-item__title'>{item.title}</h4>
            <div className='portal-todo-item__desc'>{item.desc}</div>
          </Col>

          <Col style={{ textAlign: 'right' }}>
            <span
              className='portal-todo-item__action'
              onClick={() => {
                this.setState({ showTodoModal: true })
              }}
            >办理</span>
            <div className='portal-todo-item__date'>{new Date().toLocaleDateString()}</div>
          </Col>
        </Row>
      )
    })
    return businessList
  }

  render () {
    return (
      <div className='page page--portal portal'>
        <div className='portal__container'>
          <Row justify='space-between'>
            <Col span={8}>
              <Input
                style={{ width: '304px' }}
                append={
                  <Button icon='search' />
                }
                placeholder='关键词搜索'
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div className='portal__header'>
                <h3>快捷访问</h3>
              </div>

              <Row gutter className='portal__shortcut-list'>
                {this.renderShortcut()}
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div className='portal__header'>
                <h3>待办事务</h3>
              </div>

              <Card>
                <div className='portal__todo-list'>
                  {this.renderTodo()}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Link to='/list-task'>查看全部 <Icon name='right' /></Link>
                </div>
              </Card>

            </Col>
          </Row>

          <Modal
            size='small'
            title='待办事务标题'
            visible={this.state.showTodoModal}
            onConfirm={() => {
              this.setState({ showTodoModal: false })
            }}
            onCancel={() => {
              this.setState({ showTodoModal: false })
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
