import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import Form from '@hi-ui/hiui/es/form'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Cascader from '@hi-ui/hiui/es/cascader'
import Select from '@hi-ui/hiui/es/select'
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
    value: '信息技术部',
    label: '信息技术部',
    children: [
      {
        value: '平台组',
        label: '平台组',
        children: [
          {
            value: '前端组',
            label: '前端组'
          },
          {
            value: '测试组',
            label: '测试组'
          }
        ]
      }
    ]
  },
  {
    value: '云平台',
    label: '云平台',
    children: [
      {
        value: '小爱',
        label: '小爱'
      },
      {
        value: 'AI',
        label: 'AI'
      }
    ]
  }
]
const provinces = [
  {
    value: '湖北',
    label: '湖北',
    children: [
      {
        value: '武汉',
        label: '武汉'
      },
      {
        value: '宜昌',
        label: '宜昌'
      }
    ]
  }
]
const countrys = [
  { name: '中国', id: '3' },
  { name: '美国', id: '2' },
  { name: '日本', id: '4' },
  { name: '韩国', id: '5' },
  { name: '英国', id: '6' }
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
                  options={groups}
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
                  mode='single'
                  list={countrys}
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
                  options={provinces}
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
