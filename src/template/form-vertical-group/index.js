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

import NavMenu from '@hi-ui/hiui/es/nav-menu'
import './index.scss'

const FormItem = Form.Item

export default class Template extends Component {
  constructor(props) {
    super(props)
    this.form = React.createRef()
    this.state = {
      forms: this.initForms(),
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

  initForms() {
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

  handleChange(value) {
    const forms = Object.assign({}, this.state.forms, value)

    this.setState({
      forms
    })
  }

  handleSubmit() {
    this.form.current.validate(valid => {
      if (valid) {
        // 提交表单
        console.log(this.state.form)
        alert('提交成功')
      }
    })
  }

  reset() {
    this.handleChange(this.initForms())
  }

  renderForm() {
    const {forms} = this.state

    return (
      <Form ref={this.form} model={forms} rules={this.rules} labelWidth="80">
        <FormItem label="label" prop="text">
          <Input value={forms.text} placeholder={'请输入'} onChange={(e, value) => {
            this.handleChange({text: value})
          }} style={{width: '250px'}}/>
        </FormItem>
        <FormItem label="Date" prop="Date" required>
          <DatePicker 
            type="daterange"
            value={forms.Date}
            onChange={value => {
              this.handleChange({Date: value})
            }}
          />
        </FormItem>
        <FormItem label="Numer" prop="num">
          <Counter
            value={forms.num}
            step="1"
            min="0"
            max="8"
            onChange={(e, value) => {
              this.handleChange({num: value})
            }}
          />
        </FormItem>
        <FormItem label="Time" prop="time">
          <TimePicker 
            type="time"
            value={forms.time}
            onChange={value => {
              this.handleChange({time: value})
            }}
          />
        </FormItem>
        <FormItem label="label" prop="select">
          <Select
            list={this.singleList}
            placeholder="请选择种类"
            style={{width: '200px'}}
            value={forms.select && forms.select.id}
            onChange={item => {
              console.log(item[0])
              this.handleChange({select: item[0] || false})
            }}
          />
        </FormItem>
        <FormItem label="Raido" prop="radio">
          <Radio
            list={this.radioList}
            checked={this.radioList.indexOf(forms.radio)}
            onChange={data => {
              this.handleChange({radio: data})
            }}
          />
        </FormItem>

        <FormItem label="Picture" prop="radio">
          <Upload
            uploadType="photo"
            uploadAction= ""
            headers={{'Content-type':'application/x-www-form-urlencoded', name: 'mi'}}
            onUploadSuccess = {res => { 
              console.log(res, 'success callback')
            }}
            onDeleteSuccess = {res => {
              console.log(res, 'normal delete callback') 
            }}
            param={{id:'uid', channel:'youpin'}}
            name={'files[]'}
          />
        </FormItem>

        <FormItem label="long text" prop="longText">
          <Input value={forms.longText} placeholder={'多行文本'} style={{width: '250px'}}  type="textarea" onChange={(e, value) => {
            this.handleChange({longText: value})
          }}/>
        </FormItem>

      </Form>
    )
  }

  render() {
    const {current} = this.state

    return (
      <div className="hi-tpl-form__vertical hi-tpl-form__container">
        <div className="hi-tpl-form__title">
          表单
          <div className="hi-tpl-form__btnContainer">
            <Button type={'primary'} onClick={this.handleSubmit.bind(this)}>提交</Button>
            <Button type="default" onClick={this.reset.bind(this)}>重置</Button>
          </div>
        </div>

        <NavMenu data={this.list} mode="horizontal" selectedKey={current}>
          <div>{this.renderForm()}</div>
        </NavMenu>
        
      </div>
    )
  }

}
