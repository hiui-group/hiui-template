import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Form, Input, Button, NavMenu, Cascader, Select } from '@hi-ui/hiui'
import './index.scss'

const FormItem = Form.Item
const menuList = [
  {
    title: '基本资料'
  },
  {
    title: '偏好设置'
  },
  {
    title: '账户安全'
  },
  {
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
  constructor (props) {
    super(props)
    this.state = {
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
    this.list = [
      {
        title: '基本资料'
      },
      {
        title: '偏好设置'
      },
      {
        title: '账户安全'
      },
      {
        title: '账户验证'
      }
    ]
  }

  onValueChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }
  submitData = () => {
    const {
      photo,
      username,
      nickname,
      cardNum,
      group,
      tel,
      country,
      province,
      address
    } = this.state
    console.log(photo, username, nickname, cardNum, group, tel, country, province, address)
    // 请求以上数据
  }
  render () {
    const {
      photo,
      username,
      nickname,
      cardNum,
      group,
      tel,
      country,
      province,
      address
    } = this.state
    return (
      <div className='page--user-center'>
        <Form labelWidth='144'>
          <NavMenu onClick={this.handleClick} data={menuList}>
            <div style={{ width: 592, marginTop: 14, marginLeft: 14 }}>
              <FormItem label='头像'>
                <img
                  alt='头像'
                  src={photo}
                  style={{
                    width: 80,
                    height: 80
                  }}
                />
              </FormItem>
              <FormItem label='用户名'>
                <Input
                  value={username}
                  placeholder={'请输入'}
                  onChange={e => this.onValueChange('username', e.target.value)}
                />
              </FormItem>
              <FormItem label='昵称'>
                <Input
                  value={nickname}
                  placeholder={'请输入'}
                  onChange={e => this.onValueChange('nickname', e.target.value)}
                />
              </FormItem>
              <FormItem label='工卡号'>
                <Input
                  value={cardNum}
                  placeholder={'请输入'}
                  onChange={e => this.onValueChange('cardNum', e.target.value)}
                />
              </FormItem>
              <FormItem label='所在部门'>
                <Cascader
                  value={group}
                  onChange={value => {
                    this.onValueChange('group', value)
                  }}
                  data={groups}
                />
              </FormItem>
              <FormItem label='联系方式'>
                <Input
                  value={tel}
                  placeholder={'请输入'}
                  onChange={e => this.onValueChange('tel', e.target.value)}
                />
              </FormItem>

              <FormItem label='国家'>
                <Select
                  type='single'
                  data={countrys}
                  value={country}
                  onChange={value => {
                    this.onValueChange('country', value)
                  }}
                />
              </FormItem>
              <FormItem label='所在省市'>
                <Cascader
                  value={province}
                  onChange={value => {
                    this.onValueChange('province', value)
                  }}
                  data={provinces}
                />
              </FormItem>
              <FormItem label='详细地址'>
                <Input
                  value={address}
                  placeholder={'请输入'}
                  onChange={e => this.onValueChange('address', e.target.value)}
                />
              </FormItem>
              <Button
                type='primary'
                style={{ marginLeft: '142px', marginTop: '8px' }}
                onClick={this.submitData}
              >
                保存
              </Button>
            </div>
          </NavMenu>
        </Form>
      </div>
    )
  }
}
