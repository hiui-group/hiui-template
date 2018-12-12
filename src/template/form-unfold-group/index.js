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
import Collapse from '@hi-ui/hiui/es/collapse'

import axios from 'axios'
import config from '../../config'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor(props) {
    super(props)
    this.forms1 = React.createRef()
    this.forms2 = React.createRef()
    this.state = {
      forms1: this.initForms('forms1'),
      forms2: this.initForms('forms2'),
      current: 0
    }
    this.singleList= [
      { name:'较长的一段描述文本', label: '这是一段较长的描述文本', id:'2' },
      { name:'手机', label: 'tanke', id:'3' },
      { name:'笔记本', label: 'chaojitanke', id:'4', disabled: true },
      { name:'生活周边', label: 'wurenji', id:'5' },
      { name:'生态链', label: 'huojian', id:'6' }
    ]
    this.radioList = [ '北京', '上海', '重庆' ]
    this.list = [ {title: 'tab1'}, {title: 'tab2'}, {title: 'tab3'} ]
    this.rules = {
      text: [
        {
          required: true,
          message: '请输入',
          trigger: 'blur,change'
        }
      ],
      Date: [
        {
          validator: (rule, value, cb) => {
            if (value) {
              cb()
            } else {
              cb('请输入')
            }
          },
          trigger: 'change'
        }
      ]
    }
  }

  initForms(type) {
    switch (type) {
      case 'forms1':
        return Object.assign({}, {
          text: '',
          Date: false,
          num: 0,
          time: new Date()
        })
      case 'forms2':
        return Object.assign({}, {
          select:{ name:'较长的一段描述文本', label: '这是一段较长的描述文本', id:'2' },
          radio:'北京',
          longText:''
        })
    }
  }

  handleChange(value, type) {
    const forms = Object.assign({}, this.state[type], value)

    let change = this.state

    change[type] = forms

    this.setState(change)
  }

  handleSubmit(type) {
    this[type].current.validate(valid => {
      if (valid) {
        // 提交表单
        console.log(this.state[type])
        alert('提交成功')
      }
    })
  }

  reset(type) {
    this.handleChange(this.initForms(type), type)
  }

  renderForm() {
    const {forms1, forms2} = this.state
    
    return (
      <Collapse 
        onChange={() => { 
          console.log('切换了！') 
        }} 
        activeKey={[ '0', '1' ]}
        arrow="left"
      >
        <Collapse.Panel
          header="表单1"
        >
          <Form ref={this.forms1} model={forms1} rules={this.rules} labelWidth="80">
            <FormItem label="label" prop="text">
              <Input value={forms1.text} placeholder={'请输入'} onChange={(e, value) => {
                this.handleChange({text: value}, 'forms1')
              }} style={{width: '250px'}}/>
            </FormItem>
            <FormItem label="Date" prop="Date" required>
              <DatePicker 
                type="daterange"
                value={forms1.Date}
                onChange={value => {
                  this.handleChange({Date: value}, 'forms1')
                }}
              />
            </FormItem>
            <FormItem label="Numer" prop="num">
              <Counter
                value={forms1.num}
                step="1"
                min="0"
                max="8"
                onChange={(e, value) => {
                  this.handleChange({num: value}, 'forms1')
                }}
              />
            </FormItem>
            <FormItem label="Time" prop="time">
              <TimePicker 
                type="time"
                value={forms1.time}
                onChange={value => {
                  this.handleChange({time: value}, 'forms1')
                }}
              />
            </FormItem>
            <FormItem>
              <Button type={'primary'} onClick={this.handleSubmit.bind(this, 'forms1')}>提交</Button>
              <Button type="default" onClick={this.reset.bind(this, 'forms1')}>重置</Button>
            </FormItem>
          </Form>

        </Collapse.Panel>
        <Collapse.Panel
          header="表单2"
        >
          <Form ref={this.forms2} model={forms2} rules={this.rules} labelWidth="80" >
            <FormItem label="label" prop="select">
              <Select
                list={this.singleList}
                placeholder="请选择种类"
                style={{width: '200px'}}
                value={forms2.select && forms2.select.id}
                onChange={item => {
                  console.log(item[0])
                  this.handleChange({select: item[0] || false}, 'forms2')
                }}
              />
            </FormItem>
            <FormItem label="Raido" prop="radio">
              <Radio
                list={this.radioList}
                checked={this.radioList.indexOf(forms2.radio)}
                onChange={data => {
                  this.handleChange({radio: data}, 'forms2')
                }}
              />
            </FormItem>
            <FormItem label="long text" prop="longText">
              <Input value={forms2.longText} placeholder={'多行文本'} style={{width: '250px'}}  type="textarea" onChange={(e, value) => {
                this.handleChange({longText: value}, 'forms2')
              }}/>
            </FormItem>
            <FormItem>
              <Button type={'primary'} onClick={this.handleSubmit.bind(this, 'forms2')}>提交</Button>
              <Button type="default" onClick={this.reset.bind(this, 'forms2')}>重置</Button>
            </FormItem>
          </Form>
        </Collapse.Panel>
      </Collapse>
    )
  }

  render() {
    const { current } = this.state

    return (
      <div className="hi-tpl-unfold__container">
        <p className="hi-tpl-form__title">表单</p>

        <NavMenu data={this.list} mode="horizontal" selectedKey={current}>
          <div>{this.renderForm()}</div>
        </NavMenu>
      </div>
    )
  }

}