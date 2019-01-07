import React, { Component } from 'react'
import '@hi-ui/hiui/es/table/style/index.css'
import Form from '@hi-ui/hiui/es/form'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import DatePicker from '@hi-ui/hiui/es/date-picker'
import Counter from '@hi-ui/hiui/es/counter'
import TimePicker from '@hi-ui/hiui/es/date-picker/TimePicker'
import Select from '@hi-ui/hiui/es/select'
import Radio from '@hi-ui/hiui/es/radio'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Grid from '@hi-ui/hiui/es/grid'

const FormItem = Form.Item

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.state = {
      forms: this.initForms(),
      current: 0
    }
    this.singleList = [
      { name: '较长的一段描述文本', label: '这是一段较长的描述文本', id: '2' },
      { name: '手机', label: 'tanke', id: '3' },
      { name: '笔记本', label: 'chaojitanke', id: '4', disabled: true },
      { name: '生活周边', label: 'wurenji', id: '5' },
      { name: '生态链', label: 'huojian', id: '6' }
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

  initForms () {
    return Object.assign({}, {
      text: '',
      Date: { start: new Date(), end: new Date() },
      num: 0,
      time: new Date(),
      select: '4',
      radio: 1,
      longText: ''
    })
  }

  handleChange () {

  }

  handleSubmit () {

  }

  reset () {

  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { forms } = this.state

    return (
      <div className='page page--gutter'>

        <Form ref={this.form1} model={forms} rules={this.state.rules} labelWidth='90'>
          <h2 className='hi-form__title'>表单</h2>

          <Row>
            <Col span={24}>

              <NavMenu
                onClick={this.handleClick}
                data={this.list}
              >
                <div>

                  <fieldset>
                    <legend>基础信息</legend>

                    <FormItem label='label' prop='text'>
                      <Input value={forms.text} placeholder={'name'} onChange={this.handleChange.bind(this, 'column1')} style={{ width: '250px' }} />
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
                    <FormItem label='Time' prop='time'>
                      <TimePicker
                        type='time'
                        value={forms.time}
                        onChange={d => {
                          console.log(d)
                        }}
                      />
                    </FormItem>
                  </fieldset>

                  <fieldset>
                    <legend>基础信息</legend>

                    <FormItem label='label' prop='text'>
                      <Input value={forms.text} placeholder={'name'} onChange={this.handleChange.bind(this, 'column1')} style={{ width: '250px' }} />
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
                    <FormItem label='Raido' prop='radio'>
                      <Radio
                        list={['北京', '上海', '重庆']}
                        checked={forms.radio}
                        onChange={this.handleChange.bind(this, 'region', '')}
                      />
                    </FormItem>
                    <FormItem label='long text' prop='longText'>
                      <Input value={forms.longText} placeholder={'多行文本'} onChange={this.handleChange.bind(this, 'column1')} style={{ width: '320px', height: '100px' }} type='textarea' />
                    </FormItem>
                  </fieldset>
                </div>
                <div>1</div>
                <div>2</div>
              </NavMenu>

            </Col>
          </Row>

          <div className='hi-form-item--fixed'>
            <Button type='primary' onClick={this.handleSubmit.bind(this)}>提交</Button>
            <Button type='default' onClick={this.reset.bind(this)}>重置</Button>
          </div>
        </Form>
      </div>
    )
  }
}
