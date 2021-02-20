import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import {
  Breadcrumb,
  Input,
  DatePicker,
  Select,
  Button,
  Stepper,
  Form,
  Icon,
  Grid,
  Loading,
  Card,
  Dropdown,
  Notification
} from '@hi-ui/hiui'
import './index.scss'
import axios from 'axios'

const { Row, Col } = Grid
const FormItem = Form.Item

export default class Template extends Component {
  state = {
    title: '',
    desc: [],
    baseInfo: {},
    stepper: {
      data: Array(5).fill({
        title: '账号信息',
        content: '请输入账号信息'
      }),
      current: Math.round(Math.random() * 4)
    }
  }

  fetchBaseInfo = async () => {
    return axios
      .get('https://yapi.baidu.com/mock/34633/hiui/details')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          this.setState({ baseInfo: data.baseInfo, title: data.title, desc: data.desc })
        } else {
          throw new Error('未知错误')
        }
      })
      .catch(error => {
        Notification.open({
          type: 'error',
          title: error.message
        })
      })
  }

  handleBackClick = () => {
    Notification.open({
      type: 'success',
      title: 'handleBackClick'
    })
  }

  handleSaveClick = () => {
    Notification.open({
      type: 'success',
      title: 'handleSaveClick'
    })
  }

  handleEditClick = () => {
    Notification.open({
      type: 'success',
      title: 'handleEditClick'
    })
  }

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchBaseInfo()
    } finally {
      Loading.close('lk')
    }
  }

  render() {
    const { title, baseInfo, stepper } = this.state
    const formTitle = stepper.data[stepper.current].title

    return (
      <div className="page--detail-stepper">
        <Col className="detail-stepper">
          <Col className="detail-stepper__header">
            <Row className="row row-01" align="center">
              <Breadcrumb
                separator="|"
                onClick={this.handleBackClick}
                data={[
                  {
                    content: (
                      <span>
                        <Icon name="left" />
                        <span>返回</span>
                      </span>
                    ),
                    path: '/'
                  },
                  {
                    content: <span>详情</span>,
                    path: '/detail-stepper'
                  }
                ]}
              />
            </Row>
            <Row className="row row-02" justify="space-between">
              <Col>
                <h2>{title}</h2>
              </Col>
              <Col>
                <Button icon="edit" type="primary" onClick={this.handleEditClick}>
                  编辑
                </Button>
                <Button icon="collection" type="line" onClick={this.handleSaveClick}>
                  收藏
                </Button>
                <Dropdown
                  className="usual-dropdown-button"
                  data={[
                    {
                      title: '操作1'
                    },
                    {
                      title: '操作2'
                    }
                  ]}
                  trigger="click"
                  type="button"
                  placement="bottom-end"
                  title={<Icon name="more" />}
                />
              </Col>
            </Row>
          </Col>
          <Col className="detail-stepper__card detail-stepper__card--base">
            <Row className="detail-basic__row">
              <Card title="基础信息" bordered={false} hoverable>
                <ul>
                  {Object.values(baseInfo).map(({ key, value }, idx) => (
                    <li key={idx}>
                      <div>{key}</div>
                      <div>{value}</div>
                    </li>
                  ))}
                </ul>
              </Card>
            </Row>
          </Col>
          <Col className="detail-stepper__card detail-stepper__card--stepper">
            <Card title="项目流程" bordered={false} hoverable>
              <Stepper {...{ ...stepper, itemLayout: 'vertical' }} />
              <div className="form-title">
                <span>{formTitle}</span>
                <Button onClick={this.handleSaveClick} type="line">
                  保存
                </Button>
              </div>
              <Form labelPlacement="left" labelWidth="96">
                <Row>
                  <Col span={12}>
                    <FormItem label="项目名称">
                      <Input style={{ width: '320px' }} />
                    </FormItem>
                    <FormItem label="项目类型">
                      <Select style={{ width: '320px' }} />
                    </FormItem>
                    <FormItem label="项目周期">
                      <DatePicker type="daterange" style={{ width: '320px' }} />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="项目执行人">
                      <Input style={{ width: '320px' }} />
                    </FormItem>
                    <FormItem label="备注">
                      <Input type="textarea" style={{ width: '320px', resize: 'none' }} />
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Col>
      </div>
    )
  }
}
