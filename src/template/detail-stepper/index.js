import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Breadcrumb, Input, DatePicker, Select, Button, Stepper, Form, Icon, Grid, Loading, Card } from '@hi-ui/hiui'
import './index.scss'
// import axios from 'axios'

const FormItem = Form.Item

const data = {
  title: '小米8屏幕指纹版',
  desc: Array(3).fill({
    key: '状态',
    value: '已借出'
  }),
  baseInfo: {
    设备名称: {
      key: '设备名称',
      value:
        '全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作，手持超级夜景全球首款压感屏幕指纹，快速解锁，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作 ，手持超级夜景，全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面…'
    },
    容量颜色: {
      key: '容量颜色',
      value: '64+64G 白色'
    },
    系统版本: {
      key: '系统版本',
      value: '2.0'
    },
    设备别名: {
      key: '设备别名',
      value: 'Mix2S'
    },
    操作系统: {
      key: '操作系统',
      value: '9.5'
    },
    设备挂靠人: {
      key: '设备挂靠人',
      value: '测试组'
    },
    设备识别码: {
      key: '设备识别码',
      value:
        '86814403004345686814403004345686814403004345686814403004345686814403004345686814403004345681440300434568681440300434568144030043456868144030043456'
    },
    分辨率: {
      key: '分辨率',
      value: '1136*640'
    },
    当前责任人: {
      key: '当前责任人',
      value: 'QuoqiangW 王国强'
    }
  },
  expressInfo: {
    avatar: {
      key: '头像',
      value:
        'https://images.unsplash.com/photo-1580901066059-159ccd258d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
    },
    name: {
      key: '姓名',
      value: '王贝'
    },
    phone: {
      key: '电话',
      value: '13545360987'
    },
    adress: {
      key: '地址',
      value: '武汉市江夏区江夏大道普洛斯物流园B6区小米仓库'
    }
  }
}
const delay = (timeout = 1000) => new Promise(resolve => setTimeout(() => resolve(), timeout))

export default class Template extends Component {
  state = {
    title: '小米8屏幕指纹版',
    desc: Array(3).fill({
      key: '状态',
      value: '已借出'
    }),
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
    await delay()
    this.setState({ baseInfo: data.baseInfo })
    // return axios.get('http://yapi.demo.qunar.com/mock/26534/hiui/user/detail').then(({ data: { data: baseInfo } }) => {
    //   this.setState({ baseInfo })
    // })
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}
  handleSaveClick = () => {}

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchBaseInfo()
    } finally {
      Loading.close('lk')
    }
  }

  render() {
    const Row = Grid.Row
    const Col = Grid.Col
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
                <Button icon="collection" type="line" onClick={this.handleDeleteClick}>
                  收藏
                </Button>
                <Button icon="more" type="line" onClick={this.handleMoreClick} />
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
