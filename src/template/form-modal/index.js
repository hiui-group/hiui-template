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
import config from '../../config'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor(props) {
    super(props)
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
          time: new Date(),
          select:{ name:'较长的一段描述文本', label: '这是一段较长的描述文本', id:'2' },
          radio:'北京',
          longText:''
        })
      case 'forms2':
        return Object.assign({}, {
          text: '',
          Date: false,
          num: 0,
          time: new Date(),
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

  triggerBig(value) {
    this.setState({bigShow: value})
  }

  triggerSmall(value) {
    this.setState({smallShow: value})
  }

  render() {
    const {forms1, forms2} = this.state

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
            <Button type={'primary'} key={1} onClick={this.handleSubmit.bind(this, 'forms1')}>提交</Button>,
            <Button type="default" key={2} onClick={this.reset.bind(this, 'forms1')}>重置</Button>
          ]}
        >
          <div className="hi-tpl-form-modal__big">
            <Form ref={this.forms1} model={forms1} rules={this.rules} labelWidth="90" labelPosition="top">
              <FormItem label="label" prop="text">
                <Input value={forms1.text} placeholder={'请输入'} onChange={(e, value) => {
                  this.handleChange({text: value}, 'forms1')
                }} style={{width: '250px'}}/>
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
              <FormItem label="long text" prop="longText">
                <Input value={forms1.longText} placeholder={'多行文本'} style={{width: '250px'}}  type="textarea" onChange={(e, value) => {
                  this.handleChange({longText: value}, 'forms1')
                }}/>
              </FormItem>
              <FormItem label="Date" prop="Date">
                <DatePicker 
                  type="daterange"
                  value={forms1.Date}
                  onChange={value => {
                    this.handleChange({Date: value}, 'forms1')
                  }}
                />
              </FormItem>
              <FormItem label="label" prop="select">
                <Select
                  list={this.singleList}
                  placeholder="请选择种类"
                  style={{width: '200px'}}
                  value={forms1.select && forms1.select.id}
                  onChange={item => {
                    this.handleChange({select: item[0] || false}, 'forms1')
                  }}
                />
              </FormItem>
              <FormItem label="Raido" prop="radio">
                <Radio
                  list={this.radioList}
                  checked={this.radioList.indexOf(forms1.radio)}
                  onChange={data => {
                    this.handleChange({radio: data}, 'forms1')
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
            <Button type={'primary'} key={1} onClick={this.handleSubmit.bind(this, 'forms2')}>提交</Button>,
            <Button type="default" key={2} onClick={this.reset.bind(this, 'forms2')}>重置</Button>
          ]}
        >
          <Form ref={this.forms2} model={forms2} rules={this.rules} labelWidth="90" labelPosition="top">
            <FormItem label="label" prop="text">
              <Input value={forms2.text} placeholder={'请输入'} onChange={(e, value) => {
                this.handleChange({text: value}, 'forms2')
              }} style={{width: '250px'}}/>
            </FormItem>

            <FormItem label="Numer" prop="num">
              <Counter
                value={forms2.num}
                step="1"
                min="0"
                max="8"
                onChange={(e, value) => {
                  this.handleChange({num: value}, 'forms2')
                }}
              />
            </FormItem>
            <FormItem label="long text" prop="longText">
              <Input value={forms2.longText} placeholder={'多行文本'} style={{width: '250px'}}  type="textarea" onChange={(e, value) => {
                this.handleChange({longText: value}, 'forms2')
              }}/>
            </FormItem>
            <FormItem label="Date" prop="Date">
              <DatePicker 
                type="daterange"
                value={forms2.Date}
                onChange={value => {
                  this.handleChange({Date: value}, 'forms2')
                }}
              />
            </FormItem>
            <FormItem label="label" prop="select">
              <Select
                list={this.singleList}
                placeholder="请选择种类"
                style={{width: '200px'}}
                value={forms2.select && forms2.select.id}
                onChange={item => {
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
          
            <FormItem label="Time" prop="time">
              <TimePicker 
                type="time"
                value={forms2.time}
                onChange={value => {
                  this.handleChange({time: value}, 'forms2')
                }}
              />
            </FormItem>

          </Form>
          
        </Modal>
      </div>
    )
  }

}