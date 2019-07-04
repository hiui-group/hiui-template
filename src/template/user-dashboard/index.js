import React, { Component } from 'react'
import Icon from '@hi-ui/hiui/es/icon'
import Grid from '@hi-ui/hiui/es/grid'
import Button from '@hi-ui/hiui/es/button'
import Stepper from '@hi-ui/hiui/es/stepper'
import DatePicker from '@hi-ui/hiui/es/date-picker'
import './index.scss'

const { Row, Col } = Grid
const asideInfo = [
  {
    title: '基本信息',
    content: [
      { label: '英文名', value: 'Jame' },
      { label: '昵称', value: '天天' },
      { label: '工卡号', value: 10098 },
      { label: '所在部门', value: '信息部' }
    ]
  },
  {
    title: '联系方式',
    content: [
      { label: '联系方式', value: 18318793208 },
      { label: '国家', value: '中国' },
      { label: '省/市/区', value: '北京市海淀区' },
      { label: '详细地址', value: '毛纺路58号院' }
    ]
  }
]
const myAsset = [
  { title: '苹果iMac A1419 27寸一体机苹果iMac A1419 27寸一体机一体…', desc: '数量：1' },
  { title: '小米插线板（5位国际组合插孔）', desc: '数量：1' },
  { title: '小米移动电源3 20000mAh高配版 ', desc: '数量：1' },
  { title: '小米USB充电器36W快充版（2口）', desc: '数量：1' }
]
const myApply = [
  {
    title: '小米8 屏幕指纹版 项目需求申请一个',
    desc: '测试机使用',
    status: '审批中',
    statusCode: 'approving',
    time: '2019-02-08'
  },
  {
    title: '苹果iMac A1419 27寸一体机显示屏的维修申…',
    desc: '设备驱动故障：1',
    status: '已通过',
    statusCode: 'pass',
    time: '2019-02-01'
  },
  {
    title: '小米8 屏幕指纹版 项目需求申请一个 ',
    desc: '测试机使用',
    status: '审批中',
    statusCode: 'approving',
    time: '2019-01-28'
  },
  {
    title: '苹果iMac A1419 27寸一体机显示屏的维修申请',
    desc: '设备驱动故障',
    status: '未通过',
    statusCode: 'no-pass',
    time: '2019-01-20'
  }
]
const myCollect = [
  {
    title: '北京地区2018年米8销量排行榜',
    time: '2019-03-05',
    operation: '取消收藏'
  },
  {
    title: '北京地区2018年米8销量排行榜',
    time: '2019-03-05',
    operation: '取消收藏'
  },
  {
    title: '北京地区2018年小米8屏幕指纹版销量排行榜…',
    time: '2019-03-05',
    operation: '取消收藏'
  },
  {
    title: '年会Banner 宣传',
    time: '2019-03-05',
    operation: '取消收藏',
    image: 'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
  }
]
const mySubscribe = [
  {
    title: '每月销量第一的手机',
    operation: '取消订阅'
  },
  {
    title: '内购 | 2018第二期我米第二期行政资产内购会就…',
    operation: '取消订阅'
  },
  {
    title: '小米融合云技术分享月',
    operation: '取消订阅'
  },
  {
    title: '信息部考勤数据排行榜',
    operation: '取消订阅'
  },
  {
    title: '每月销量第一的手机',
    operation: '取消订阅'
  },
  {
    title: '信息部考勤数据排行榜',
    operation: '取消订阅'
  }
]
class UserDashboard extends Component {
  render () {
    return (
      <div className='page page--user-dashboard'>
        <div className='user-dashboard__aside'>
          <div className='aside__avator'>
            <img
              src={
                'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05'
              }
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                marginBottom: 8
              }}
            />
            <div>王成</div>
          </div>
          {asideInfo.map(info => (
            <div className='aside__section'>
              <div className='title'>{info.title}</div>
              {info.content.map(c => (
                <div className='content-item'>
                  <div className='content-item--left'>{c.label}</div>
                  <div className='content-item--right'>{c.value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <Row gutter>
            <Col span={12}>
              <div className='card'>
                <div className='card__header'>我的资产</div>
                <div className='card__content'>
                  <div style={{ flex: 1 }}>
                    {myAsset.map(assert => (
                      <div style={{ marginBottom: 8 }}>
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
                  </div>

                  <div style={{ marginTop: 24 }}>
                    <Button icon='left' />
                    <Button icon='right' />
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className='card'>
                <div className='card__header'>我提交的申请</div>
                <div className='card__content'>
                  <div style={{ flex: 1 }}>
                    {myApply.map(apply => (
                      <div style={{ marginBottom: 8 }}>
                        <div
                          style={{
                            marginBottom: 2,
                            display: 'flex',
                            justifyContent: 'space-between '
                          }}
                        >
                          <div>{apply.title}</div>
                          <div className={`tag tag--${apply.statusCode}`}>{apply.status}</div>
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            lineHeight: '20px',
                            color: '#999',
                            display: 'flex',
                            justifyContent: 'space-between '
                          }}
                        >
                          <div>{apply.desc}</div>
                          <div>{apply.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 24 }}>
                    <Button icon='left' />
                    <Button icon='right' />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter>
            <Col span={12}>
              <div className='card'>
                <div className='card__header'>我的收藏</div>
                <div className='card__content'>
                  <div style={{ flex: 1 }}>
                    {myCollect.map(collect => (
                      <div style={{ marginBottom: 8, display: 'flex' }}>
                        {collect.image && (
                          <img
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
                            <a>{collect.operation}</a>
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
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className='card'>
                <div className='card__header'>我的资产</div>
                <div className='card__content'>
                  <div style={{ flex: 1 }}>
                    {mySubscribe.map(subscribe => (
                      <div
                        style={{
                          marginBottom: 18,
                          display: 'flex',
                          justifyContent: 'space-between '
                        }}
                      >
                        <div>{subscribe.title}</div>
                        <a>{subscribe.operation}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default UserDashboard
