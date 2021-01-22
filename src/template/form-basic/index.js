import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Form, Input, Button, DatePicker, Counter, TimePicker, Select, Radio, Upload, Grid } from '@hi-ui/hiui'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forms: {
        name: '',
        date: null,
        num: 0,
        time: new Date(),
        select: '4',
        radio: '重庆',
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

  initForms() {
    return Object.assign(
      {},
      {
        name: '',
        date: null,
        num: 0,
        time: new Date(),
        select: '4',
        radio: '重庆',
        longText: ''
      }
    )
  }

  handleSubmit() {}

  reset() {}

  render() {
    const Row = Grid.Row
    const Col = Grid.Col
    const { forms, rules } = this.state
    return (
      <div className="page--form-basic">
        <Form model={forms} rules={rules} labelWidth="70" labelPlacement="right">
          <h2 className="hi-form__title">表单</h2>
          <Row>
            <Col span={24}>
              <FormItem label="姓名" field="name">
                <Input placeholder={'请输入'} style={{ width: '320px' }} />
              </FormItem>
              <FormItem label="时间" field="date">
                <DatePicker type="daterange" width={320} placeholder={['']} />
              </FormItem>
              <FormItem label="数量" field="num">
                <Counter step={1} min={0} max={8} onChange={(e, val) => console.log('变化后的值：', val)} />
              </FormItem>
              <FormItem label="时间" field="time">
                <TimePicker
                  value={forms.time}
                  onChange={d => {
                    console.log(d)
                  }}
                />
              </FormItem>
              <FormItem label="类别" field="select">
                <Select
                  data={this.singleList}
                  placeholder="请选择种类"
                  style={{ width: '200px' }}
                  value={forms.select}
                  onChange={item => {
                    console.log('单选结果', item)
                  }}
                />
              </FormItem>
              <FormItem label="地点" field="radio">
                <Radio.Group data={['北京', '上海', '重庆']} defaultValue={forms.radio} />
              </FormItem>

              <FormItem label="照片" field="radio">
                <Upload
                  type="photo"
                  uploadAction="http://127.0.0.1:8000"
                  param={{ id: 'uid', channel: 'youpin' }}
                  name={'files[]'}
                />
              </FormItem>

              <FormItem label="备注" field="longText">
                <Input
                  value={forms.longText}
                  placeholder={'多行文本'}
                  style={{ width: '320px', height: '160px', resize: 'none' }}
                  type="textarea"
                />
              </FormItem>

              <FormItem>
                <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                  提交
                </Button>
                <Button type="line" onClick={this.reset.bind(this)} style={{ marginLeft: '16px' }}>
                  重置
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
