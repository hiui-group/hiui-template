import React, { Component } from 'react'
import Icon from '@hi-ui/hiui/es/icon'
import Grid from '@hi-ui/hiui/es/grid'
import Dropdown from '@hi-ui/hiui/es/dropdown'
import Button from '@hi-ui/hiui/es/button'
import Stepper from '@hi-ui/hiui/es/stepper'
import DatePicker from '@hi-ui/hiui/es/date-picker'
import Modal from '@hi-ui/hiui/es/modal'
import Form from '@hi-ui/hiui/es/form'
import Radio from '@hi-ui/hiui/es/radio'
import Input from '@hi-ui/hiui/es/input'
import './index.scss'

const { Row, Col } = Grid
const FormItem = Form.Item

class HomeWorkbench extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showAuditModal: false,
      approvalStep: 2
    }

    this.nowDate = new Date().toLocaleDateString()

    this.projectList = [
      { title: '开店申请' },
      { title: '请假申请' },
      { title: '转正申请' },
      { title: '资产申请' }
    ]

    this.scheduleStepList = [
      {
        title: '账号信息',
        text: '请输入账号信息',
        icon: <Icon name='user' />
      },
      {
        title: '邮箱激活',
        text: '请输入邮箱',
        icon: <Icon name='time' />
      },
      {
        title: '信息登记',
        text: '请输入个人信息',
        icon: <Icon name='list' />
      }
    ]

    this.approvalStepList = [
      {
        title: '创建工单',
        text: this.nowDate
      },
      {
        title: '工单审核',
        text: this.nowDate
      },
      {
        title: '提交材料',
        text: this.nowDate
      },
      {
        title: '完成申请',
        text: this.nowDate
      },
      {
        title: '成为店主',
        text: this.nowDate
      }
    ]

    this.handleSwitchStep = this.handleSwitchStep.bind(this)
  }

  handleSwitchStep (isNext) {
    if (isNext) {
      this.setState((prevState) => {
        return { approvalStep: prevState.approvalStep + 1 }
      })
    } else {
      this.setState((prevState) => {
        return { approvalStep: prevState.approvalStep - 1 }
      })
    }
  }

  renderTodo () {
    let todoList = []
    for (let i = 0; i < 6; i++) {
      todoList.push(
        <div className='todo__item' key={i}>
          <Row justify='space-between'>
            <Col>设备采购审批申请</Col>
            <Col>
              <Button
                type='line'
                size='small'
                onClick={() => { this.setState({ showAuditModal: true }) }}
              >
                审批
              </Button>
            </Col>
          </Row>
        </div>
      )
    }
    return (
      <div className='todo'>{todoList}</div>
    )
  }

  render () {
    return (
      <div className='page page--workbench'>
        <div className='workbench--container'>
          <Row>
            <Col span={24}>
              <div className='user'>
                <span className='user__icon'>头像</span>
                <span className='user__greet'>Admin，上午好！ 美好的一天开始了</span>
              </div>
            </Col>
          </Row>
          <Row gutter>
            <Col span={12}>
              <div className='card'>
                <Row>
                  <span className='card__title'>待办</span>
                </Row>
                <Row>
                  <Col span={24}>
                    {this.renderTodo()}
                  </Col>
                </Row>
                <Row justify='flex-end'>
                  <Button><Icon name='left' /></Button>
                  <Button><Icon name='right' /></Button>
                </Row>
              </div>
            </Col>
            <Col span={12}>
              <div className='card'>
                <Row justify='space-between'>
                  <span className='card__title'>日程</span>
                  <Button size='small'><Icon name='plus' /> 新建日程</Button>
                </Row>
                <Row>
                  <Col span={24}>
                    <div className='schedule'>
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
                          <Stepper list={this.scheduleStepList} current={1} vertical />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='card'>
                <Row justify='space-between'>
                  <span>项目／审批流程</span>
                  <Dropdown list={this.projectList} title={this.projectList[0].title} onClick={(val) => console.log(val)} />
                </Row>
                <Row>
                  <Col span={24}>
                    <div className='approval'>
                      <Row gutter justify='center'>
                        <Stepper up list={this.approvalStepList} current={this.state.approvalStep} />
                      </Row>
                      <Row gutter justify='center'>
                        <Button
                          type='danger'
                          onClick={() => { this.handleSwitchStep(false) }}
                          disabled={this.state.approvalStep < 0}
                        >
                          <Icon name='close-circle-o' /> 撤销
                        </Button>
                        <Button
                          type='success'
                          onClick={() => { this.handleSwitchStep(true) }}
                          disabled={this.state.approvalStep === (this.approvalStepList.length - 1)}
                        >
                          <Icon name='check-circle-o' /> 通过
                        </Button>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Modal
            size='small'
            title='设备采购申请'
            show={this.state.showAuditModal}
            backDrop
            onConfirm={() => { this.setState({ showAuditModal: false }) }}
            onCancel={() => { this.setState({ showAuditModal: false }) }}
          >
            <Form labelPosition='left'>
              <FormItem label='原因' labelWidth='60'>
                <Radio list={['通过', '驳回']} />
              </FormItem>
              <FormItem label='备注' labelWidth='60'>
                <Input type='textarea' />
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}

export default HomeWorkbench
