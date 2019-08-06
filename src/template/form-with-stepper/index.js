import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Counter,
  TimePicker,
  Select,
  Radio,
  Upload,
  Stepper,
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
        text: [
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
      { title: '较长的一段描述文本', id: '2' },
      { title: '手机', id: '3' },
      { title: '笔记本', id: '4', disabled: true },
      { title: '生活周边', id: '5' },
      { title: '生态链', id: '6' }
    ]
    this.list = [
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

  initForms() {
    return Object.assign(
      {},
      {
        text: '',
        Date: { start: new Date(), end: new Date() },
        num: 0,
        time: new Date(),
        select: '4',
        radio: '重庆',
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
      <div className="page--form-with-stepper">
        <Form ref={this.form} model={forms} rules={this.state.rules} labelWidth="120">
          <h2 className="hi-form__title">
            表单
            <div className="stepper-container">
              <Stepper list={this.list} current={0} />
            </div>
          </h2>

          <Row>
            <Col span={24}>
              <fieldset>
                <legend>基础信息</legend>

                <FormItem label="姓名" field="text">
                  <Input
                    value={forms.text}
                    placeholder={'请输入'}
                    onChange={this.handleChange.bind(this, 'column1')}
                    style={{ width: '250px' }}
                  />
                </FormItem>
                <FormItem label="时间" field="date">
                  <DatePicker
                    type="daterange"
                    value={forms.date}
                    onChange={d => {
                      console.log(d)
                    }}
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
              </fieldset>
              <fieldset>
                <legend>附加信息</legend>

                <FormItem label="时间" field="time">
                  <TimePicker
                    value={forms.time}
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
                    data={['北京', '上海', '重庆']}
                    value={forms.radio}
                    onChange={this.handleChange.bind(this, 'region', '')}
                  />
                </FormItem>

                <FormItem label="照片" field="radio">
                  <Upload
                    type="photo"
                    uploadAction="http://127.0.0.1:8000"
                    params={{ id: 'uid', channel: 'youpin' }}
                    name={'files[]'}
                  />
                </FormItem>

                <FormItem label="文本框" field="longText">
                  <Input
                    value={forms.longText}
                    placeholder={'多行文本'}
                    onChange={this.handleChange.bind(this, 'column1')}
                    style={{ width: '320px', height: '100px' }}
                    type="textarea"
                  />
                </FormItem>
              </fieldset>

              <FormItem>
                <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                  下一步
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
