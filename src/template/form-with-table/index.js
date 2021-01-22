import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Form, Input, Select, Button, DatePicker, Counter, Radio, Message, Table } from '@hi-ui/hiui'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor(props) {
    super(props)
    this.form = React.createRef()
    this.state = {
      forms: {
        name: '',
        orderNumber: '',
        date: { start: new Date(), end: new Date() },
        select: [],
        num: 0,
        radio: '选项一',
        longText: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'onBlur,onChange'
          }
        ]
      }
    }
    this.singleList = [
      { title: '较长的一段描述文本', id: '2' },
      { title: '手机', id: '3' },
      { title: '笔记本', id: '4', disabled: true },
      { title: '生活周边', id: '5' },
      { title: '生态链', id: '6' }
    ]
    this.columns = [
      {
        title: '商品名',
        dataKey: 'name'
      },
      {
        title: '品类',
        dataKey: 'type'
      },
      {
        title: '规格',
        dataKey: 'size'
      },
      {
        title: '单价',
        dataKey: 'price'
      },
      {
        title: '门店',
        dataKey: 'address'
      },
      {
        title: '库存',
        dataKey: 'stock'
      }
    ]

    this.data = [
      {
        name: '小米9',
        type: '手机',
        size: '6G+64G 全息幻彩蓝',
        price: '3299.00',
        address: '华润五彩城店',
        stock: '29,000',
        key: 1
      },
      {
        name: '小米9 SE',
        type: '手机',
        size: '6G+64G 全息幻彩蓝',
        price: '1999.00',
        address: '清河店',
        stock: '10,000',
        key: 2
      },
      {
        name: '小米8',
        type: '手机',
        size: '6G+64G 全息幻彩蓝',
        price: '2599.00',
        address: '双安店',
        stock: '12,000',
        key: 3
      },
      {
        name: 'Redmi Note7',
        type: '手机',
        size: '6G+64G 全息幻彩蓝',
        price: '999.00',
        address: '华润五彩城店',
        stock: '140,000',
        key: 4
      },
      {
        name: '小米8 SE',
        type: '手机',
        size: '6G+64G 全息幻彩蓝',
        price: '699.00',
        address: '双安店',
        stock: '12,000',
        key: 5
      }
    ]
  }

  inputPrepend = () => {
    return (
      <Select
        type="single"
        clearable={false}
        style={{ width: 80 }}
        data={[
          { title: '+86', id: '86' },
          { title: '+1', id: '1' },
          { title: '+33', id: '33' },
          { title: '+91', id: '91' }
        ]}
        defaultValue="86"
      />
    )
  }

  inputAppend = () => {
    return (
      <Button
        type="default"
        icon="search"
        onClick={() => {
          Message.open({ type: 'success', title: '查询成功', duration: 2000 })
        }}
      />
    )
  }

  handleSubmit() {
    this.form.current.validate((valid, error) => {
      console.log(valid, error)
      if (!error) {
        console.log(valid)
        Message.open({ type: 'success', title: '提交成功', duration: 2000 })
      } else {
        console.log('error', error)
        Message.open({ type: 'error', title: '数据校验异常', duration: 2000 })
      }
    })
  }

  cancelSubmit() {
    this.form.current.resetValidates()
  }

  render() {
    const { forms, rules } = this.state
    return (
      <div className="form-with-table">
        <div className="form-with-table-content">
          <Form ref={this.form} rules={rules} labelWidth="70" initialValues={forms} labelPlacement="left">
            <h2 className="form-with-table__title">基本信息</h2>
            <FormItem label="姓名" field="name">
              <Input placeholder={'请输入'} style={{ width: '320px' }} />
            </FormItem>
            <FormItem label="时间" field="date">
              <DatePicker type="daterange" width={320} placeholder={['选择开始日期', '选择结束日期']} />
            </FormItem>
            <FormItem label="订单" field="orderNumber">
              <Input
                id="customId"
                placeholder="请输入"
                prepend={this.inputPrepend()}
                append={this.inputAppend()}
                style={{ width: 320 }}
              />
            </FormItem>
            <FormItem label="类别" field="select">
              <Select
                data={this.singleList}
                placeholder="请选择种类"
                style={{ width: '320px' }}
                onChange={item => {
                  console.log('单选结果', item)
                }}
              />
            </FormItem>
            <FormItem label="数量" field="num">
              <Counter min={0} max={8} onChange={(e, val) => console.log('变化后的值：', val)} />
            </FormItem>
            <FormItem label="单选" field="radio">
              <Radio.Group data={['选项一', '选项二', '选项三', '选项四']} />
            </FormItem>
          </Form>
          <h2 className="form-with-table__title">表格</h2>
          <div className="form-with-table__handle">
            <Button type="primary">创建客户</Button>
            <Button type="line">编辑</Button>
          </div>
          <Table columns={this.columns} data={this.data} />
        </div>
        <div className="form-with-table--footer">
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>
            提交
          </Button>
          <Button type="line" onClick={this.cancelSubmit.bind(this)}>
            重置
          </Button>
        </div>
      </div>
    )
  }
}
