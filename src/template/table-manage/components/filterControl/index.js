import React, { useRef, useState } from 'react'
import { Icon, Popper, Form, Input, Button } from '@hi-ui/hiui'
import './index.scss'
const FormItem = Form.Item
const FormList = Form.List
const kitPrefix = 'hiui-componentkit'
const FilterControl = () => {
  const PopperAttachEle = useRef()
  const [showPopper, setShowPopper] = useState(false)
  return (
    <div className={`${kitPrefix}-filter-ctrl`}>
      <div
        className={`${kitPrefix}-filter-ctrl-attachele`}
        ref={PopperAttachEle}
        onClick={() => {
          setShowPopper(!showPopper)
        }}
      >
        <Icon name="filter" />
        <span className={`${kitPrefix}-filter-ctrl-attachele-text`}>筛选</span>
      </div>
      <Popper
        className={`${kitPrefix}-filter-ctrl-popper`}
        // 弹出层的显示隐藏
        show={showPopper}
        width={'456px'}
        topGap={5}
        // 依附的元素
        attachEle={PopperAttachEle.current}
        // 点击弹出层以及依附元素以外的区域时会触发该回调
        onClickOutside={() => {
          setShowPopper(false)
        }}
      >
        <div className={`${kitPrefix}-filter-ctrl-popper-content`}>
          <div className="header">
            <p className="titlt">
              <span className="titlt-text"> 筛选条件</span>
              <span className="titlt_sub-text"> （逻辑为且）</span>
            </p>
            <span
              className="close"
              onClick={() => {
                setShowPopper(false)
              }}
            >
              <Icon name="close" />
            </span>
          </div>
          <div className="body">
            <Form labelWidth="0">
              <span
                className="delete"
                onClick={() => {
                  setShowPopper(false)
                }}
              >
                <Icon name="delete" />
              </span>
              <FormList>
                {(fields, { add, remove }) => {
                  return (
                    <div className="list">
                      {fields.map((field, index) => (
                        <div style={{ display: 'flex' }} key={index}>
                          <FormItem {...field} name="first">
                            <Input placeholder="请输入" style={{ width: '200px' }} />
                          </FormItem>
                          <FormItem {...field} labelWidth="0" name="last">
                            <Input placeholder="请输入" style={{ width: '200px' }} />
                          </FormItem>
                          <Icon
                            name="close"
                            style={{
                              color: '#999',
                              fontSize: '16px',
                              cursor: 'pointer',
                              height: '18px',
                              marginTop: '4px'
                            }}
                            onClick={() => {
                              remove(field)
                            }}
                          />
                        </div>
                      ))}
                      <div
                        style={{
                          marginLeft: '80px',
                          width: '200px',
                          textAlign: 'center',
                          border: '1px dashed #ccc',
                          borderRadius: '2px',
                          marginBottom: '24px'
                        }}
                      >
                        <Button
                          type="line"
                          appearance="link"
                          icon="plus"
                          onClick={() => {
                            add()
                          }}
                        >
                          添加选项
                        </Button>
                      </div>
                    </div>
                  )
                }}
              </FormList>
            </Form>
          </div>
          <div className="footer"></div>
        </div>
      </Popper>
    </div>
  )
}
export default FilterControl
