import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import { Form, Input, Button, DatePicker, Counter, Select, Radio, Modal, Grid } from '@hi-ui/hiui'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      forms: this.initForms(),
      smallShow: false,
      bigShow: false,
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
  }

  initForms () {
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

  handleChange () {}

  handleSubmit () {}

  reset () {}

  triggerBig (value) {
    this.setState({ bigShow: value })
  }

  triggerSmall (value) {
    this.setState({ smallShow: value })
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { forms } = this.state

    return (
      <div className='page--form-modal'>
        <h2 className='hi-form__title'>表单</h2>

        <Button type='primary' onClick={this.triggerBig.bind(this, true)}>
          点击预览大号表单
        </Button>
        <Button type='primary' onClick={this.triggerSmall.bind(this, true)}>
          点击预览小号表单
        </Button>

        <Modal
          title='标题'
          visible={this.state.bigShow}
          onConfirm={this.triggerBig.bind(this, false)}
          onCancel={this.triggerBig.bind(this, false)}
          width={800}
          footer={[
            <Button type='primary' key={1} onClick={this.handleSubmit.bind(this)}>
              提交
            </Button>,
            <Button type='line' key={2} onClick={this.reset.bind(this)}>
              重置
            </Button>
          ]}
        >
          <Form
            ref={this.form1}
            model={forms}
            rules={this.state.rules}
            labelWidth='90'
            labelPlacement='top'
          >
            <Row>
              <Col span={12}>
                <FormItem label='名字' field='text'>
                  <Input
                    value={forms.text}
                    placeholder={'name'}
                    onChange={this.handleChange.bind(this, 'column1')}
                    style={{ width: '320px' }}
                  />
                </FormItem>
                <FormItem label='时间' field='date'>
                  <DatePicker
                    type='daterange'
                    value={forms.Date}
                    onChange={d => {
                      console.log(d)
                    }}
                  />
                </FormItem>
                <FormItem label='备注' field='longText'>
                  <Input
                    value={forms.longText}
                    placeholder={'多行文本'}
                    onChange={this.handleChange.bind(this, 'column1')}
                    style={{ width: '320px', height: '100px', resize: 'none' }}
                    type='textarea'
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label='种类' field='select'>
                  <Select
                    data={this.singleList}
                    placeholder='请选择种类'
                    style={{ width: '200px' }}
                    value={forms.select}
                    onChange={item => {
                      console.log('单选结果', item)
                    }}
                  />
                </FormItem>
                <FormItem label='数量' field='num'>
                  <Counter
                    value={forms.num}
                    step={1}
                    min={0}
                    max={8}
                    onChange={val => console.log('变化后的值：', val)}
                  />
                </FormItem>
                <FormItem label='单选' field='radio'>
                  <Radio.Group
                    data={['北京', '上海', '重庆', '北京', '上海', '重庆']}
                    checked={forms.radio}
                    onChange={this.handleChange.bind(this, 'region', '')}
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>

        <Modal
          title='标题'
          visible={this.state.smallShow}
          onConfirm={this.triggerSmall.bind(this, false)}
          onCancel={this.triggerSmall.bind(this, false)}
          width={600}
          footer={[
            <Button type='primary' key={1} onClick={this.handleSubmit.bind(this)}>
              提交
            </Button>,
            <Button type='line' key={2} onClick={this.reset.bind(this)}>
              重置
            </Button>
          ]}
        >
          <Form
            ref={this.form1}
            model={forms}
            rules={this.state.rules}
            labelWidth='120'
            labelPlacement='right'
          >
            <FormItem label='名字' field='text'>
              <Input
                value={forms.text}
                placeholder={'name'}
                onChange={this.handleChange.bind(this, 'column1')}
                style={{ width: '250px' }}
              />
            </FormItem>
            <FormItem label='时间' field='Date'>
              <DatePicker
                type='daterange'
                value={forms.Date}
                onChange={d => {
                  console.log(d)
                }}
              />
            </FormItem>
            <FormItem label='数量' field='num'>
              <Counter
                defaultValue={forms.num}
                step={1}
                min={0}
                max={8}
                onChange={(e, val) => console.log('变化后的值：', val)}
              />
            </FormItem>
            <FormItem label='种类' field='select'>
              <Select
                data={this.singleList}
                placeholder='请选择种类'
                style={{ width: '200px' }}
                value={forms.select}
                onChange={item => {
                  console.log('单选结果', item)
                }}
              />
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
