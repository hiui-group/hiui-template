import React, { Component } from 'react'
import { Grid, Button, Icon, Tag, Card, Loading, Notification } from '@hi-ui/hiui'
import './index.scss'
import axios from 'axios'

const { Row, Col } = Grid

class UserDashboard extends Component {
  state = {
    userInfo: {},
    asideInfo: [],
    myAsset: [],
    myApply: [],
    myCollect: [],
    mySubscribe: []
  }

  fetchUserDashboard = async () => {
    return axios
      .get('https://yapi.baidu.com/mock/34633/hiui/user/dashboard')
      .then(res => {
        const resData = res?.data
        if (resData && resData.code === 200) {
          const data = resData.data
          this.setState({ ...data })
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
      await this.fetchUserDashboard()
    } finally {
      Loading.close('lk')
    }
  }

  render() {
    const { userInfo, asideInfo, myAsset, myApply, myCollect, mySubscribe } = this.state

    return (
      <div className="page--user-dashboard">
        <UserdashBoardAside userInfo={userInfo} asideInfo={asideInfo} />
        <div style={{ flex: 1 }}>
          <Row gutter>
            <Col span={12}>
              <Card
                title="我的资产"
                bordered={false}
                hoverable
                extra={
                  <Button type="default" appearance="link" style={{ padding: 0 }}>
                    更多
                  </Button>
                }
              >
                <ul>
                  {myAsset.map((assert, index) => (
                    <div style={{ marginBottom: 8 }} key={index}>
                      <div style={{ marginBottom: 2 }}>{assert.title}</div>
                      <div
                        style={{
                          fontSize: '12px',
                          lineHeight: '20px',
                          color: '#999'
                        }}
                      >
                        {assert.desc}
                      </div>
                    </div>
                  ))}
                </ul>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="我提交的申请" bordered={false} hoverable>
                {myApply.map((apply, index) => (
                  <div style={{ marginBottom: 8 }} key={index}>
                    <div
                      style={{
                        marginBottom: 2,
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>{apply.title}</div>
                      <Tag type={apply.status || 'primary'} appearance="line">
                        {apply.statusDesc}
                      </Tag>
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        lineHeight: '20px',
                        color: '#999',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>{apply.desc}</div>
                      <div>{apply.time}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 24 }}>
                  <Button icon="left" />
                  <Button icon="right" />
                </div>
              </Card>
            </Col>
          </Row>
          <Row gutter>
            <Col span={12}>
              <Card title="我的收藏" bordered={false} hoverable>
                {myCollect.map((collect, index) => (
                  <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center' }}>
                    <div key={index} style={{ marginBottom: 8, display: 'flex', flex: 1 }}>
                      {collect.image && (
                        <img
                          alt=""
                          src={collect.image}
                          style={{
                            width: 80,
                            height: 80,
                            marginRight: 8
                          }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            marginBottom: 2,
                            display: 'flex',
                            justifyContent: 'space-between '
                          }}
                        >
                          <div>{collect.title}</div>
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            lineHeight: '20px',
                            color: '#999',
                            display: 'flex'
                          }}
                        >
                          <div>{collect.desc}</div>
                          <div>{collect.time}</div>
                        </div>
                      </div>
                    </div>
                    <a href="/">{collect.operation}</a>
                  </div>
                ))}
              </Card>
            </Col>
            <Col span={12}>
              <Card title="我的资产" bordered={false} hoverable>
                {mySubscribe.map((subscribe, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: 18,
                      display: 'flex',
                      justifyContent: 'space-between '
                    }}
                  >
                    <div>{subscribe.title}</div>
                    <a href="/">{subscribe.operation}</a>
                  </div>
                ))}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default UserDashboard

function UserdashBoardAside({ userInfo, asideInfo }) {
  return (
    <div className="user-dashboard__aside">
      <div className="aside__avator">
        <img
          alt="avator"
          src={userInfo.avatar}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            marginBottom: 8
          }}
        />
        <div>{userInfo.username}</div>
        <Icon name="edit" />
      </div>
      {asideInfo.map((info, index) => (
        <div className="aside__section" key={index}>
          <div className="title">{info.title}</div>
          {info.content.map((c, index) => (
            <div className="content-item" key={index}>
              <div className="content-item--left">{c.label}</div>
              <div className="content-item--right">{c.value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
