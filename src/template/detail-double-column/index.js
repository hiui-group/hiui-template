import React, { Component } from 'react'
import { Button, Icon, Grid, Loading, Card, Breadcrumb, Notification, Dropdown } from '@hi-ui/hiui'
import './index.scss'
import axios from 'axios'

const { Row, Col } = Grid

export default class Template extends Component {
  state = {
    title: '',
    desc: [],
    detailInfo: {},
    otherInfo: {}
  }

  fetchOtherInfo = async () => {
    return axios
      .get('https://yapi.smart-xwork.cn/mock/34633/hiui/details')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          this.setState({ otherInfo: data.otherInfo })
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

  fetchDetailInfo = async () => {
    return axios
      .get('https://yapi.smart-xwork.cn/mock/34633/hiui/details')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          this.setState({ detailInfo: data.detailInfo, title: data.title, desc: data.desc })
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

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchOtherInfo()
      await this.fetchDetailInfo()
      Loading.close('lk')
    } finally {
      Loading.close('lk')
    }
  }

  handleBackClick = () => {
    Notification.open({
      type: 'success',
      title: 'handleBackClick'
    })
  }

  handleDeleteClick = () => {
    Notification.open({
      type: 'success',
      title: 'handleDeleteClick'
    })
  }

  handleEditClick = () => {
    Notification.open({
      type: 'success',
      title: 'handleEditClick'
    })
  }

  render() {
    const { title, desc, detailInfo, otherInfo } = this.state

    return (
      <div className="page--detail-double-column">
        <Col className="detail-double-column detail-double-column__header">
          <Row className="row row-01" align="center">
            <Breadcrumb
              separator="|"
              onClick={this.handleBackClick}
              data={[
                {
                  content: (
                    <span>
                      <Icon name="left" />
                      <span style={{ color: '#333' }}>返回</span>
                    </span>
                  ),
                  path: '/'
                },
                {
                  content: <span style={{ color: '#999' }}>详情</span>,
                  path: '/detail-basic'
                }
              ]}
            />
          </Row>
          <Row className="row row-02" justify="space-between">
            <Col>
              <h2>{title}</h2>
              <Row className="row row-03">
                {desc.map(({ key, value }, index) => (
                  <div key={index}>
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
        <Col className="detail-double-column detail-double-column__body">
          <Row className="detail-basic__row">
            <Card title="详细信息" bordered={false} hoverable>
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

          <Row className="detail-basic__row">
            <Card title="其它信息" bordered={false} hoverable>
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
