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
import Upload from '@hi-ui/hiui/es/upload'
import Modal from '@hi-ui/hiui/es/modal'
import axios from 'axios'
import config from '~config'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forms: this.initForms(),
      smallShow: false,
      bigShow: false
    }
    this.singleList= [
      { name:'较长的一段描述文本', label: '这是一段较长的描述文本', id:'2' },
      { name:'手机', label: 'tanke', id:'3' },
      { name:'笔记本', label: 'chaojitanke', id:'4', disabled: true },
      { name:'生活周边', label: 'wurenji', id:'5' },
      { name:'生态链', label: 'huojian', id:'6' }
    ]
    
  }

  initForms() {
    return Object.assign({}, {
      text: '',
      Date: {start: new Date(), end: new Date()},
      num: 0,
      time: new Date(),
      select:'4',
      radio: 2,
      longText:''
    })
  }

  handleChange() {

  }

  handleSubmit() {

  }

  reset() {

  }

  triggerBig(value) {
    this.setState({bigShow: value})
  }

  triggerSmall(value) {
    this.setState({smallShow: value})
  }

  render() {
    const {forms} = this.state

    return (
      <div className="hi-tpl-form-modal__container">
        <p className="hi-tpl-form-modal__title">表单</p>

        <Button type="primary" onClick={this.triggerBig.bind(this, true)}>form modal 大</Button>
        <Button type="primary" onClick={this.triggerSmall.bind(this, true)}>form modal 小</Button>

        <Modal
          closeBtn={false}
          title="标题"
          show={this.state.bigShow}
          onConfirm={this.triggerBig.bind(this, false)}
          onCancel={this.triggerBig.bind(this, false)}
          width={800}
          footers={[
            <Button type={'primary'} key={1} onClick={this.handleSubmit.bind(this)}>提交</Button>,
            <Button type="default" key={2} appearance="line" onClick={this.reset.bind(this)}>重置</Button>
          ]}
        >
          <div className="hi-tpl-form-modal__big">
            <Form ref={this.form1} model={forms} rules={this.state.rules} labelWidth="90" labelPosition="top">
              <FormItem label="label" prop="text">
                <Input value={forms.text} placeholder={'name'} onChange={this.handleChange.bind(this, 'column1')} style={{width: '250px'}}/>
              </FormItem>

              <FormItem label="Numer" prop="num">
                <Counter
                  value={forms.num}
                  step="1"
                  min="0"
                  max="8"
                  onChange={val => console.log('变化后的值：', val)}
                />
              </FormItem>
              <FormItem label="long text" prop="longText">
                <Input value={forms.longText} placeholder={'多行文本'} onChange={this.handleChange.bind(this, 'column1')} style={{width: '250px'}}  type="textarea"/>
              </FormItem>
              <FormItem label="Date" prop="Date">
                <DatePicker 
                  type="daterange"
                  value={forms.Date}
                  onChange={d => {
                    console.log(d)
                  }}
                />
              </FormItem>
              <FormItem label="label" prop="select">
                <Select
                  list={this.singleList}
                  placeholder="请选择种类"
                  style={{width: '200px'}}
                  value={forms.select}
                  onChange={item => {
                    console.log('单选结果', item)
                  }}
                />
              </FormItem>
              <FormItem label="Raido" prop="radio">
                <Radio
                  list={[ '北京', '上海', '重庆', '北京', '上海', '重庆' ]}
                  checked={forms.radio}
                  onChange={this.handleChange.bind(this, 'region', '')}
                />
              </FormItem>
          
              <FormItem label="Time" prop="time">
                <TimePicker 
                  type="time"
                  value={forms.time}
                  onChange={d => {
                    console.log(d)
                  }}
                />
              </FormItem>

            </Form>

          </div>
          
        </Modal>

        <Modal
          closeBtn={false}
          title="标题"
          show={this.state.smallShow}
          onConfirm={this.triggerSmall.bind(this, false)}
          onCancel={this.triggerSmall.bind(this, false)}
          width={600}
          footers={[
            <Button type={'primary'} key={1} onClick={this.handleSubmit.bind(this)}>提交</Button>,
            <Button type="default" key={2} appearance="line" onClick={this.reset.bind(this)}>重置</Button>
          ]}
        >
          <Form ref={this.form1} model={forms} rules={this.state.rules} labelWidth="90" labelPosition="top">
            <FormItem label="label" prop="text">
              <Input value={forms.text} placeholder={'name'} onChange={this.handleChange.bind(this, 'column1')} style={{width: '250px'}}/>
            </FormItem>

            <FormItem label="Numer" prop="num">
              <Counter
                value={forms.num}
                step="1"
                min="0"
                max="8"
                onChange={val => console.log('变化后的值：', val)}
              />
            </FormItem>
            <FormItem label="long text" prop="longText">
              <Input value={forms.longText} placeholder={'多行文本'} onChange={this.handleChange.bind(this, 'column1')} style={{width: '250px'}}  type="textarea"/>
            </FormItem>
            <FormItem label="Date" prop="Date">
              <DatePicker 
                type="daterange"
                value={forms.Date}
                onChange={d => {
                  console.log(d)
                }}
              />
            </FormItem>
            <FormItem label="label" prop="select">
              <Select
                list={this.singleList}
                placeholder="请选择种类"
                style={{width: '200px'}}
                value={forms.select}
                onChange={item => {
                  console.log('单选结果', item)
                }}
              />
            </FormItem>
            <FormItem label="Raido" prop="radio">
              <Radio
                list={[ '北京', '上海', '重庆', '北京', '上海', '重庆' ]}
                checked={forms.radio}
                onChange={this.handleChange.bind(this, 'region', '')}
              />
            </FormItem>
          
            <FormItem label="Time" prop="time">
              <TimePicker 
                type="time"
                value={forms.time}
                onChange={d => {
                  console.log(d)
                }}
              />
            </FormItem>

          </Form>
          
        </Modal>
      </div>
    )
  }

}