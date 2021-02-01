import React, { Component, useState } from "react"
import { Input, Icon, Form, Select, DatePicker, TimePicker, Button } from "@hi-ui/hiui"
import classNames from "classnames"
import "./index.scss"
const kitPrefix = "hiui-componentkit"
const FormItem = Form.Item
const OptionsForButtonkit = () => {
  const [showformItem, setShowFormItem] = useState(false)
  const handleSubmit = () => {
    console.log("ss")
  }
  const cancelSubmit = () => {
    console.log("sscancelSubmit")
  }
  return (
    <div className={`${kitPrefix}-options`}>
      <div
        className={`${kitPrefix}-options-attachelement`}
        onClick={() => {
          setShowFormItem(!showformItem)
        }}>
        <Icon name='document-search' />
        <span className={`${kitPrefix}-options-attachelement-text`}>查询</span>
        <Icon name={"down"} className={classNames({ "icon-down-rotate180": showformItem })} />
      </div>
      {/* otherOptions sort */}
      <div className={classNames(`${kitPrefix}-options-content`, { hidden: !showformItem })}>
        <Form labelWidth='70' labelPlacement='top' placement='horizontal'>
          <FormItem label='商品ID' field='phone'>
            <Input placeholder={"请输入"} />
          </FormItem>
          <FormItem label='商品名称'>
            <Select
              data={[
                { title: "电视", id: "3" },
                { title: "手机", id: "2" },
                { title: "笔记本", id: "4" },
                { title: "生活周边", id: "5" },
                { title: "办公", id: "6" }
              ]}
              placeholder='请选择机型'
              emptyContent='无匹配数据'
              onChange={item => {
                console.log("多选结果", item)
              }}
            />
          </FormItem>
          <FormItem label='日期'>
            <DatePicker
              type='daterange'
              onChange={(date, dateStr) => {
                console.log("onChange", date, dateStr)
              }}
            />
          </FormItem>
          <FormItem label='日期'>
            <TimePicker defaultValue={new Date()} onChange={(date, dateString) => console.log(date, dateString)} />
          </FormItem>
        </Form>
        <div className={`${kitPrefix}-options-btns`}>
          <Button type='primary' onClick={handleSubmit}>
            提交
          </Button>
          <Button type='line' onClick={cancelSubmit}>
            重置
          </Button>
        </div>
      </div>
    </div>
  )
}
export default class FilterHandler extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return (
      <div className='table-manage-handler-filter'>
        <OptionsForButtonkit />
      </div>
    )
  }
}
