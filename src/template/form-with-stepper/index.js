import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Form, Input, Select, Button, Upload, Message, Stepper } from '@hi-ui/hiui'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor(props) {
    super(props)
    this.form = React.createRef()
    this.state = {
      currentSteper: 0,
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
      { title: '信息部', id: '2' },
      { title: '手机部', id: '3' },
      { title: '中国区', id: '4', disabled: true },
      { title: '国籍部', id: '5' },
      { title: '生态链', id: '6' }
    ]
    this.stepperData = [
      {
        title: '账号信息'
      },
      {
        title: '邮箱激活'
      },
      {
        title: '信息登记'
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

  next() {
    this.form.current.validate((valid, error) => {
      console.log(valid, error)
      if (!error) {
        console.log(valid)
        const {
          stepperData,
          state: { currentSteper }
        } = this
        this.setState({
          currentSteper: (currentSteper + 1) % stepperData.length
        })
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
    const { forms, rules, currentSteper } = this.state
    return (
      <div className="page-form-with-stepper">
        <div className="page-form-with-stepper-content">
          <h2 className="page-form-with-stepper-title">分步表单</h2>
          <div className="page-form-stepper">
            <Stepper data={this.stepperData} current={currentSteper} />
          </div>
          <Form ref={this.form} rules={rules} labelWidth="70" initialValues={forms} labelPlacement="right">
            <FormItem label="姓名" field="name">
              <Input placeholder={'请输入'} style={{ width: '320px' }} />
            </FormItem>
            <FormItem label="昵称" field="nickname">
              <Input placeholder={'请输入'} style={{ width: '320px' }} />
            </FormItem>
            <FormItem label="部门" field="select">
              <Select
                data={this.singleList}
                placeholder="请选择种类"
                style={{ width: '320px' }}
                onChange={item => {
                  console.log('单选结果', item)
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
          </Form>
        </div>

        <div className="page--form-double-column--footer">
          <Button type="primary" onClick={this.cancelSubmit.bind(this)}>
            取消
          </Button>
          <Button type="line" onClick={this.next.bind(this)}>
            下一步
          </Button>
        </div>
      </div>
    )
  }
}
