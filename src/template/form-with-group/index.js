import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Form, Input, Select, Button, DatePicker, Counter, TimePicker, Radio, Upload, Message } from '@hi-ui/hiui'
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
      <div className="page--form-gruop">
        <Form ref={this.form} rules={rules} labelWidth="70" initialValues={this.state.forms} labelPlacement="left">
          <h2 className="page--form-gruop-form__title">基本信息</h2>
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
          <h2 className="page--form-gruop-form__title">详细信息</h2>
          <FormItem label="单选" field="radio">
            <Radio.Group data={['选项一', '选项二', '选项三', '选项四']} />
          </FormItem>
          <FormItem label="时间" field="time">
            <TimePicker
              value={forms.time}
              onChange={time => {
                console.log('时间选择', time)
              }}
            />
          </FormItem>

          <FormItem label="照片" field="photo">
            <Upload
              type="photo"
              uploadAction="http://127.0.0.1:8000"
              param={{ id: 'uid', channel: 'youpin' }}
              name={'files[]'}
            />
          </FormItem>

          <FormItem label="备注" field="longText">
            <Input
              placeholder={'多行文本'}
              style={{ width: '320px', height: '160px', resize: 'none' }}
              type="textarea"
            />
          </FormItem>

          <FormItem>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>
              提交
            </Button>
            <Button type="line" onClick={this.cancelSubmit.bind(this)}>
              重置
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
