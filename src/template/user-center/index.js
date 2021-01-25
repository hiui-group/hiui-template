import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Form, Input, Button, Tabs, Cascader, Select } from '@hi-ui/hiui'
import './index.scss'

const FormItem = Form.Item
const menuList = [
  {
    id: 1,
    title: '基本资料'
  },
  {
    id: 2,
    title: '偏好设置'
  },
  {
    id: 3,
    title: '账户安全'
  },
  {
    id: 4,
    title: '账户验证'
  }
]
const groups = [
  {
    id: '信息技术部',
    content: '信息技术部',
    children: [
      {
        id: '平台组',
        content: '平台组',
        children: [
          {
            id: '前端组',
            content: '前端组'
          },
          {
            id: '测试组',
            content: '测试组'
          }
        ]
      }
    ]
  },
  {
    id: '云平台',
    content: '云平台',
    children: [
      {
        id: '小爱',
        content: '小爱'
      },
      {
        id: 'AI',
        content: 'AI'
      }
    ]
  }
]
const provinces = [
  {
    id: '湖北',
    content: '湖北',
    children: [
      {
        id: '武汉',
        content: '武汉'
      },
      {
        id: '宜昌',
        content: '宜昌'
      }
    ]
  }
]
const countrys = [
  { title: '中国', id: '3' },
  { title: '美国', id: '2' },
  { title: '日本', id: '4' },
  { title: '韩国', id: '5' },
  { title: '英国', id: '6' }
]
export default class UserCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0,
      photo: 'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05',
      username: 'Mark',
      nickname: '天天',
      cardNum: 10098,
      group: [],
      tel: 18321768907,
      country: '',
      province: [],
      address: ''
    }
  }

  onValueChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  submitData = () => {
    const { photo, username, nickname, cardNum, group, tel, country, province, address } = this.state
    console.log(photo, username, nickname, cardNum, group, tel, country, province, address)
    // 请求以上数据
  }

  render() {
    const { activeTabIndex, ...restState } = this.state

    return (
      <div className="page--user-center">
        <h2 className="page--user-center_title">账号中心</h2>
        <Tabs
          className="page--user-center_tabs"
          type="line"
          activeId={activeTabIndex}
          onTabClick={tabId => {
            this.setState({
              activeTabIndex: tabId
            })
          }}
        >
          {menuList.map(item => {
            return (
              <Tabs.Pane key={item.id} tabTitle={item.title} tabId={item.id}>
                <BasicUserSettings formData={restState} submitData={this.submitData} onChange={this.onValueChange} />
              </Tabs.Pane>
            )
          })}
        </Tabs>
      </div>
    )
  }
}

function BasicUserSettings({ formData, submitData, onChange }) {
  const { photo, username, nickname, cardNum, group, tel, country, province, address } = formData

  console.log(username)

  return (
    <Form labelWidth="144" initialValues={formData} style={{ width: 592, marginTop: 24 }}>
      <FormItem label="头像">
        <img
          alt="头像"
          src={photo}
          style={{
            width: 80,
            height: 80
          }}
        />
      </FormItem>
      <FormItem label="用户名" field="username">
        <Input value={username} placeholder={'请输入'} onChange={e => onChange('username', e.target.value)} />
      </FormItem>
      <FormItem label="昵称" field="nickname">
        <Input value={nickname} placeholder={'请输入'} onChange={e => onChange('nickname', e.target.value)} />
      </FormItem>
      <FormItem label="工卡号" field="cardNum">
        <Input value={cardNum} placeholder={'请输入'} onChange={e => onChange('cardNum', e.target.value)} />
      </FormItem>
      <FormItem label="所在部门" field="group">
        <Cascader
          value={group}
          onChange={value => {
            onChange('group', value)
          }}
          data={groups}
        />
      </FormItem>
      <FormItem label="联系方式" field="tel">
        <Input value={tel} placeholder={'请输入'} onChange={e => onChange('tel', e.target.value)} />
      </FormItem>

      <FormItem label="国家" field="country">
        <Select
          type="single"
          data={countrys}
          value={country}
          onChange={value => {
            onChange('country', value)
          }}
        />
      </FormItem>
      <FormItem label="所在省市" field="province">
        <Cascader
          value={province}
          onChange={value => {
            onChange('province', value)
          }}
          data={provinces}
        />
      </FormItem>
      <FormItem label="详细地址" field="address">
        <Input value={address} placeholder={'请输入'} onChange={e => onChange('address', e.target.value)} />
      </FormItem>
      <Button type="primary" style={{ marginLeft: '142px', marginTop: '8px' }} onClick={submitData}>
        保存
      </Button>
    </Form>
  )
}
