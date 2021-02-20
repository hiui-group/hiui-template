import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Form, Input, Button, Tabs, Cascader, Select, Loading, Notification } from '@hi-ui/hiui'
import './index.scss'
import axios from 'axios'

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

export default class UserCenter extends Component {
  state = {
    activeTabIndex: 0,
    photo: '',
    username: '',
    nickname: '',
    cardNum: 0,
    group: [],
    tel: '',
    country: '',
    address: '',
    province: '',
    groups: [],
    provinces: [],
    countrys: []
  }

  onValueChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  fetchUserSelectList = async () => {
    return axios
      .get('https://yapi.baidu.com/mock/34633/hiui/user/select')
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

  fetchUserInfo = async () => {
    return axios
      .get('https://yapi.baidu.com/mock/34633/hiui/user/info')
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
      await Promise.all([this.fetchUserSelectList(), this.fetchUserInfo()])
    } finally {
      Loading.close('lk')
    }
  }

  submitData = () => {
    const { photo, username, nickname, cardNum, group, tel, country, province, address } = this.state
    console.log(photo, username, nickname, cardNum, group, tel, country, province, address)
    // 请求以上数据
  }

  render() {
    const { activeTabIndex, groups, provinces, countrys, ...restState } = this.state

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
                <BasicUserSettings
                  groups={groups}
                  provinces={provinces}
                  countrys={countrys}
                  formData={restState}
                  submitData={this.submitData}
                  onChange={this.onValueChange}
                />
              </Tabs.Pane>
            )
          })}
        </Tabs>
      </div>
    )
  }
}

function BasicUserSettings({ groups, provinces, countrys, formData, submitData, onChange }) {
  const { photo, username, nickname, cardNum, group, tel, country, province, address } = formData
  console.log(formData)

  return (
    <Form labelWidth="144" initialValues={formData} model={formData} style={{ width: 592, marginTop: 24 }}>
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
