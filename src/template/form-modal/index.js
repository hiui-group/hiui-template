import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import Form from '@hi-ui/hiui/es/form'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import DatePicker from '@hi-ui/hiui/es/date-picker'
import Counter from '@hi-ui/hiui/es/counter'
import Select from '@hi-ui/hiui/es/select'
import Radio from '@hi-ui/hiui/es/radio'
import Modal from '@hi-ui/hiui/es/modal'
import Grid from '@hi-ui/hiui/es/grid'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      forms: this.initForms(),
      smallShow: false,
      bigShow: false
    }
    this.singleList = [
      { name: '较长的一段描述文本', label: '这是一段较长的描述文本', id: '2' },
      { name: '手机', label: 'tanke', id: '3' },
      { name: '笔记本', label: 'chaojitanke', id: '4', disabled: true },
      { name: '生活周边', label: 'wurenji', id: '5' },
      { name: '生态链', label: 'huojian', id: '6' }
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
        radio: 2,
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
          show={this.state.bigShow}
          onConfirm={this.triggerBig.bind(this, false)}
          onCancel={this.triggerBig.bind(this, false)}
          width={800}
          footers={[
            <Button type='primary' key={1} onClick={this.handleSubmit.bind(this)}>
              提交
            </Button>,
            <Button type='default' key={2} onClick={this.reset.bind(this)}>
              重置
            </Button>
          ]}
        >
          <Form
            ref={this.form1}
            model={forms}
            rules={this.state.rules}
            labelWidth='90'
            labelPosition='right'
          >
            <Row>
              <Col span={14}>
                <FormItem label='label' prop='text'>
                  <Input
                    value={forms.text}
                    placeholder={'name'}
                    onChange={this.handleChange.bind(this, 'column1')}
                    style={{ width: '320px' }}
                  />
                </FormItem>
                <FormItem label='Date' prop='Date'>
                  <DatePicker
                    type='daterange'
                    value={forms.Date}
                    onChange={d => {
                      console.log(d)
                    }}
                  />
                </FormItem>
                <FormItem label='long text' prop='longText'>
                  <Input
                    value={forms.longText}
                    placeholder={'多行文本'}
                    onChange={this.handleChange.bind(this, 'column1')}
                    style={{ width: '320px', height: '100px' }}
                    type='textarea'
                  />
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem label='label' prop='select'>
                  <Select
                    list={this.singleList}
                    placeholder='请选择种类'
                    style={{ width: '200px' }}
                    value={forms.select}
                    onChange={item => {
                      console.log('单选结果', item)
                    }}
                  />
                </FormItem>
                <FormItem label='Numer' prop='num'>
                  <Counter
                    value={forms.num}
                    step='1'
                    min='0'
                    max='8'
                    onChange={val => console.log('变化后的值：', val)}
                  />
                </FormItem>
                <FormItem label='Raido' prop='radio'>
                  <Radio
                    list={['北京', '上海', '重庆', '北京', '上海', '重庆']}
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
          show={this.state.smallShow}
          onConfirm={this.triggerSmall.bind(this, false)}
          onCancel={this.triggerSmall.bind(this, false)}
          width={600}
          footers={[
            <Button type='primary' key={1} onClick={this.handleSubmit.bind(this)}>
              提交
            </Button>,
            <Button type='default' key={2} onClick={this.reset.bind(this)}>
              重置
            </Button>
          ]}
        >
          <Form
            ref={this.form1}
            model={forms}
            rules={this.state.rules}
            labelWidth='90'
            labelPosition='right'
          >
            <FormItem label='label' prop='text'>
              <Input
                value={forms.text}
                placeholder={'name'}
                onChange={this.handleChange.bind(this, 'column1')}
                style={{ width: '250px' }}
              />
            </FormItem>
            <FormItem label='Date' prop='Date'>
              <DatePicker
                type='daterange'
                value={forms.Date}
                onChange={d => {
                  console.log(d)
                }}
              />
            </FormItem>
            <FormItem label='Numer' prop='num'>
              <Counter
                value={forms.num}
                step='1'
                min='0'
                max='8'
                onChange={val => console.log('变化后的值：', val)}
              />
            </FormItem>
            <FormItem label='label' prop='select'>
              <Select
                list={this.singleList}
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
