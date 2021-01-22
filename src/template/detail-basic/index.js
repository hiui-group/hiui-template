import React, { Component } from 'react'
import { Button, Icon, Grid, Loading, Card, Breadcrumb } from '@hi-ui/hiui'
import './index.scss'
import axios from 'axios'

const data = {
  title: '小米8屏幕指纹版',
  desc: Array(3).fill({
    key: '状态',
    value: '已借出'
  }),
  detailInfo: {

    '设备名称': {
      key: '设备名称',
      value: '全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作，手持超级夜景全球首款压感屏幕指纹，快速解锁，骁龙845处理器，全面提升游戏性能表现 ，四曲面渐变镜面机身，轻薄圆润 ，960帧超慢动作 ，手持超级夜景，全球首款压感屏幕指纹，快速解锁 ，骁龙845处理器，全面提升游戏性能表现 ，四曲面…'
    },
    '容量颜色': {
      key: '容量颜色',
      value: '64+64G 白色'
    },
    '是否新品': {
      key: '是否新品',
      value: '否'
    },
    '分辨率': {
      key: '分辨率',
      value: '1136*640'
    },
    '设备挂靠人': {
      key: '设备挂靠人',
      value: 'GuoQiang Wang 王国强'
    },
    '操作系统': {
      key: '操作系统',
      value: '9.5'
    },
    '是否ROOT': {
      key: '是否ROOT',
      value: '否'
    },
    '设备识别码': {
      key: '设备识别码',
      value: '86814403004345686814403004345686814403004345686814403004345686814403004345686814403004345681440300434568681440300434568144030043456868144030043456'
    }
  },
  otherInfo: {
    '创建人': {
      key: '创建人',
      value: '王国强'
    },
    '修改人': {
      key: '修改人',
      value: '张鑫'
    },
    '创建时间': {
      key: '创建时间',
      value: '2019-01-11 12:12'
    },
    '修改时间': {
      key: '修改时间',
      value: '2019-01-14 13:12'
    },
    '设备挂靠组': {
      key: '设备挂靠组',
      value: '测试组'
    },
    '经销商': {
      key: '经销商',
      value: '线下KA'
    },
    '经销国家': {
      key: '经销国家',
      value: '中国'
    }
  }
}
const delay = (timeout = 3000) => new Promise((resolve) => setTimeout(() => resolve(), timeout))

export default class Template extends Component {
  state = {
    title: '小米8屏幕指纹版',
    desc: Array(3).fill({
      key: '状态',
      value: '已借出'
    }),
    detailInfo: {},
    otherInfo: {}
  }

  fetchOtherInfo = async () => {
    await delay()
    this.setState({ otherInfo: data.otherInfo })
    // return axios
    //   .get('http://yapi.demo.qunar.com/mock/26534/hiui/user/info')
    //   .then(({ data: { data: otherInfo } }) => {
    //     this.setState({ otherInfo })
    //   })
  }

  fetchDetailInfo = async () => {
    await delay()
    this.setState({ detailInfo: data.detailInfo })
    // return axios
    //   .get('http://yapi.demo.qunar.com/mock/26534/hiui/user/detail')
    //   .then(({ data: { data: detailInfo } }) => {
    //     this.setState({ detailInfo })
    //   })
  }

  handleBackClick = () => {}
  handleDeleteClick = () => {}
  handleEditClick = () => {}
  handleMoreClick = () => {}

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await Promise.all([this.fetchOtherInfo(), this.fetchDetailInfo()])
    } finally {
      Loading.close('lk')
    }
  }

  render() {
    const Row = Grid.Row
    const Col = Grid.Col
    const { title, desc, detailInfo, otherInfo } = this.state

    return (
      <div className='page--detail-basic'>
        <Col className='detail-basic detail-basic__header'>
          <Row className='row row-01' align='center'>
            <Breadcrumb
              separator="|"
              onClick={this.handleBackClick}
              data={[{
                content: (
                  <span >
                    <Icon name='left' />
                    <span>返回</span>
                  </span>
                ),
                path: '/'
              }, {
                content: <span>详情</span>,
                path: '/detail-basic'
              }]}
            />
          </Row>
          <Row className="row row-02" justify="space-between">
            <Col>
              <h2>{title}</h2>
              <Row className="row row-03">
                {desc.map(({ key, value }, idx) => (
                  <div key={idx}>
                    <span>
                      {key}：{value}
                    </span>
                    <span className="spacer">|</span>
                  </div>
                ))}
              </Row>
            </Col>
            <Col>
              <Button icon="edit" type="primary" onClick={this.handleEditClick}>
                编辑
              </Button>
              <Button icon="delete" type="danger" onClick={this.handleDeleteClick}>
                删除
              </Button>
              <Button icon="more" type="line" onClick={this.handleMoreClick} />
            </Col>
          </Row>
        </Col>
        <Col className='detail-basic detail-basic__body'>
          <Row className='detail-basic__row'>
            <Card title='详细信息' bordered={false} hoverable>
              <ul>
                {Object.values(detailInfo).map(({ key, value }, idx) => (
                  <li key={idx}>
                    <div>{key}</div>
                    <div>{value}</div>
                  </li>
                ))}
              </ul>
            </Card>
          </Row>

          <Row className='detail-basic__row'>
            <Card title='其它信息' bordered={false} hoverable>
              <ul>
                {Object.values(otherInfo).map(({ key, value }, idx) => (
                  <li key={idx}>
                    <div>{key}</div>
                    <div>{value}</div>
                  </li>
                ))}
              </ul>
            </Card>
          </Row>
        </Col>
      </div>
    )
  }
}
