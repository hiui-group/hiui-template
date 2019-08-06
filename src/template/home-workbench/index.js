import React, { Component } from 'react'
import {
  Icon,
  Grid,
  Dropdown,
  Button,
  Stepper,
  DatePicker,
  Modal,
  Form,
  Radio,
  Input,
  Timeline
} from '@hi-ui/hiui'
import './index.scss'

const { Row, Col } = Grid
const FormItem = Form.Item

class HomeWorkbench extends Component {
  constructor(props) {
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
        groupTitle: '上午',
        children: [
          {
            title: '管理层例会',
            content: '毕加索会议室 B2层 可提前预定',
            timestamp: '9:00'
          },
          {
            dot: 'circle',
            title: '社招面试-设计师',
            content: '总参',
            timestamp: '10:30'
          }
        ]
      },
      {
        groupTitle: '下午',
        children: [
          {
            dot: 'circle',
            title: '管理层例会',
            content: '毕加索会议室 B2层 可提前预定',
            timestamp: '12:00'
          },
          {
            dot: 'circle',
            title: '社招面试-设计师',
            content: '总参',
            timestamp: '11:00'
          }
        ]
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

  handleSwitchStep(isNext) {
    if (isNext) {
      this.setState(prevState => {
        return { approvalStep: prevState.approvalStep + 1 }
      })
    } else {
      this.setState(prevState => {
        return { approvalStep: prevState.approvalStep - 1 }
      })
    }
  }

  renderTodo() {
    let todoList = []
    for (let i = 0; i < 6; i++) {
      todoList.push(
        <div className="todo__item" key={i}>
          <Row justify="space-between">
            <Col>设备采购审批申请</Col>
            <Col>
              <span
                className="approval-btn"
                onClick={() => {
                  this.setState({ showAuditModal: true })
                }}
              >
                审批
              </span>
            </Col>
          </Row>
        </div>
      )
    }
    return <div className="todo">{todoList}</div>
  }

  render() {
    return (
      <div className="page page--workbench">
        <div className="workbench--container">
          <Row>
            <Col span={24}>
              <div className="user">
                <span className="user__icon">Ad</span>
                <span className="user__greet">Admin，上午好！ 美好的一天开始了</span>
              </div>
            </Col>
          </Row>
          <Row gutter>
            <Col span={8}>
              <div className="card">
                <div className="card__header">
                  <span className="card__title">待办</span>
                </div>
                <div className="card__body">
                  {this.renderTodo()}
                  <div className="card__footer">
                    <Button>
                      <Icon name="left" />
                    </Button>
                    <Button>
                      <Icon name="right" />
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={16}>
              <div className="card">
                <div className="card__header">
                  <span className="card__title">日程</span>
                  <span>
                    <Icon name="plus" /> 新建日程
                  </span>
                </div>
                <div className="card__body">
                  <Row gutter>
                    <Col span={12}>
                      <DatePicker
                        value={new Date()}
                        onChange={d => {
                          console.log('value 为 Date 实例', DatePicker.format(d, 'YYYY-MM-DD E'))
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <Timeline list={this.scheduleStepList} />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="card">
                <div className="card__header">
                  <span>项目／审批流程</span>
                  <Dropdown
                    list={this.projectList}
                    title={this.projectList[0].title}
                    onClick={val => console.log(val)}
                  />
                </div>
                <div className="card__body">
                  <Stepper up list={this.approvalStepList} current={this.state.approvalStep} />
                </div>
              </div>
            </Col>
          </Row>
          <Modal
            size="normal"
            title="设备采购申请"
            visible={this.state.showAuditModal}
            onConfirm={() => {
              this.setState({ showAuditModal: false })
            }}
            onCancel={() => {
              this.setState({ showAuditModal: false })
            }}
          >
            <Form labelPosition="left">
              <FormItem label="原因" labelWidth="60">
                <Radio list={['通过', '驳回']} />
              </FormItem>
              <FormItem label="备注" labelWidth="60">
                <Input type="textarea" />
              </FormItem>
            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}

export default HomeWorkbench
