import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Counter,
  TimePicker,
  Select,
  Radio,
  Grid
} from '@hi-ui/hiui'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forms: this.initForms(),
      current: 0,
      rules: {
        name: [
          {
            required: true,
            message: <span style={{ color: '#ccc' }}>请输入姓名</span>,
            trigger: 'onBlur,onChange'
          }
        ],
        date: [
          {
            required: true,
            message: <span style={{ color: '#ccc' }}>请选择时间</span>,
            trigger: 'onBlur,onChange'
          }
        ]
      }
    }
    this.singleList = [
      { data: '较长的一段描述文本', id: '2' },
      { data: '手机', id: '3' },
      { data: '笔记本', id: '4', disabled: true },
      { data: '生活周边', id: '5' },
      { data: '生态链', id: '6' }
    ]
    this.list = [
      {
        title: 'tab1'
      },
      {
        title: 'tab2'
      },
      {
        title: 'tab3'
      }
    ]
  }

  initForms() {
    return Object.assign(
      {},
      {
        text: '',
        Date: { start: new Date(), end: new Date() },
        num: 0,
        time: new Date(),
        select: '4',
        radio: '上海',
        longText: ''
      }
    )
  }

  handleChange() {}

  handleSubmit() {}

  reset() {}

  render() {
    const Row = Grid.Row
    const Col = Grid.Col
    const { forms } = this.state

    return (
      <div className="page--form-double-column">
        <Form model={forms} rules={this.state.rules} labelWidth="80" labelPosition="top">
          <h2 className="hi-form__title">表单</h2>

          <Row>
            <Col span={12}>
              <FormItem label="姓名" field="name">
                <Input
                  value={forms.text}
                  placeholder={'请输入'}
                  onChange={this.handleChange.bind(this, 'column1')}
                  style={{ width: '320px' }}
                />
              </FormItem>

              <FormItem label="数量" field="num">
                <Counter
                  defaultValue={forms.num}
                  step={1}
                  min={0}
                  max={8}
                  onChange={(e, val) => console.log('变化后的值：', val)}
                />
              </FormItem>
              <FormItem label="备注" field="longText">
                <Input
                  value={forms.longText}
                  placeholder={'多行文本'}
                  onChange={this.handleChange.bind(this, 'column1')}
                  style={{ width: '320px', height: '160px', resize: 'none' }}
                  type="textarea"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="时间" field="Date">
                <DatePicker
                  type="daterange"
                  value={forms.Date}
                  onChange={d => {
                    console.log(d)
                  }}
                />
              </FormItem>
              <FormItem label="种类" field="select">
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
              <FormItem label="单选" field="radio">
                <Radio.Group
                  list={['北京', '上海', '重庆', '北京', '上海', '重庆']}
                  defaultValue={forms.radio}
                  onChange={this.handleChange.bind(this, 'region', '')}
                />
              </FormItem>

              <FormItem label="时间" field="time">
                <TimePicker
                  value={forms.time}
                  onChange={d => {
                    console.log(d)
                  }}
                />
              </FormItem>
            </Col>
          </Row>

          <FormItem>
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>
              提交
            </Button>
            <Button type="line" onClick={this.reset.bind(this)} style={{ marginLeft: '16px' }}>
              重置
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
