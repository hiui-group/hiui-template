import React, { Component } from 'react'
import Icon from '@hi-ui/hiui/es/icon'
import Grid from '@hi-ui/hiui/es/grid'
import Dropdown from '@hi-ui/hiui/es/dropdown'
import Button from '@hi-ui/hiui/es/button'
import Stepper from '@hi-ui/hiui/es/stepper'
import DatePicker from '@hi-ui/hiui/es/date-picker'
import './index.scss'

const { Row, Col } = Grid

class HomeWorkbench extends Component {
  constructor (props) {
    super(props)

    this.projectList = [
      { title: '请假申请' },
      { title: '转正申请' },
      { title: '资产申请' }
    ]

    this.stepList = [
      {
        title: '账号信息',
        text: '请输入账号信息'
      },
      {
        title: '邮箱激活',
        text: '请输入邮箱'
      },
      {
        title: '信息登记',
        text: '请输入个人信息'
      }
    ]
  }

  renderTodoList () {
    let todoList = []
    for (let i = 0; i < 6; i++) {
      todoList.push(
        <div className='todo-item' key={i}>
          <Row justify='space-between'>
            <Col>设备采购审批申请</Col>
            <Col>
              <span className='action-button'>审批</span></Col>
          </Row>
        </div>
      )
    }
    return todoList
  }

  render () {
    return (
      <div className='content'>
        <div className='workbench-container'>
          <div className='workbench-header'>
            <span className='user-icon'>头像</span>
            <span className='user-greet'>Admin，上午好！ 美好的一天开始了</span>
          </div>
          <div className='workbench-content'>
            <div className='content-box '>
              <Row>
                <Col span={12}>
                  <div className='todo'>
                    <Row justify='space-between'>
                      <Col>Title</Col>
                    </Row>
                    <div className='todo-content'>
                      {this.renderTodoList()}
                    </div>
                    <Row justify='flex-end'>
                      <Button><Icon name='left' /></Button>
                      <Button><Icon name='right' /></Button>
                    </Row>
                  </div>
                </Col>
                <Col span={12}>
                  <div className='schedule'>
                    <Row justify='space-between'>
                      <Col>Title</Col>
                      <Col>
                        <span className='action-button'><Icon name='plus' /> 新建日程</span>
                      </Col>
                    </Row>
                    <div className='schedule-content'>
                      <Row justify='space-between' style={{ height: '100%' }}>
                        <Col>
                          <DatePicker
                            value={new Date()}
                            onChange={(d) => {
                              console.log('value 为 Date 实例', DatePicker.format(d, 'YYYY-MM-DD E'))
                            }}
                          />
                        </Col>
                        <Col>
                          <Stepper list={this.stepList} current={1} vertical />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className='content-box'>
              <div className='project'>
                <Row justify='space-between'>
                  <Col>项目／审批流程</Col>
                  <Col>
                    <Dropdown list={this.projectList} title='请假申请' onClick={(val) => console.log(val)} />
                  </Col>
                </Row>
                <div className='stepper-container'>
                  <Stepper list={this.stepList.concat(this.stepList)} current={3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeWorkbench
