import React, { useEffect, useRef, useState } from 'react'
import { Icon, Popper } from '@hi-ui/hiui'
import './index.scss'

const kitPrefix = 'hiui-componentkit'

/**
 * @typedef {Object} DataItem 下拉数据
 * @property {String} title 下拉选项标题
 * @property {String | Number} id 下拉选项唯一 id
 */

/**
 * @typedef {Object} Custom ControlPorps ColumnsControl 组件接受参数
 * @property {Array<DataItem>} data 点击确定后，排序的回调方法 (columns) => void
 * @property {String} value 被选中项的值
 * @property {Number} optionWidth 自定义下拉选项宽度
 * @property {String} title 名称
 * @property {String} icon 图标名称
 * @property {Function} onChange 改变选项时触发函数
 *
 * @param {Object} CustomControlPorps props
 */
const CustomControl = ({ data: propsData = [], value, optionWidth = 150, title = '统计', icon, onChange }) => {
  const PopperAttachEle = useRef()
  const [showPopper, setShowPopper] = useState(false)
  const [data, setData] = useState(propsData)
  const [currentId, setCurrentId] = useState(value)
  useEffect(() => {
    setData(propsData)
  }, [propsData])
  useEffect(() => {
    setCurrentId(value)
  }, [value])
  return (
    <div className={`${kitPrefix}-custom`} key={`${kitPrefix}-custom`}>
      <div
        className={`${kitPrefix}-custom__attachele`}
        ref={PopperAttachEle}
        onClick={() => {
          setShowPopper(!showPopper)
        }}
      >
        {icon && <Icon name={icon} />}
        <span className={`${kitPrefix}-custom__attachele-text`}>{title}</span>
      </div>
      <Popper
        className={`${kitPrefix}-custom__popper`}
        // 弹出层的显示隐藏
        show={showPopper}
        width={optionWidth}
        topGap={5}
        // 依附的元素
        attachEle={PopperAttachEle.current}
        // 点击弹出层以及依附元素以外的区域时会触发该回调
        onClickOutside={() => {
          setShowPopper(false)
        }}
      >
        <div className={`${kitPrefix}-custom__popper-content`}>
          <ul className={`custom__items`}>
            {data.map(item => {
              const { title, id, icon } = item
              return (
                <li
                  className={`custom__item`}
                  key={id}
                  onClick={() => {
                    setCurrentId(id)
                    onChange && onChange(id)
                  }}
                >
                  <div className={`custom__item-left`}>
                    {icon && <Icon name={icon} />}
                    <span className="custom__item-title">{title}</span>
                  </div>
                  {id === currentId && <Icon name="check" style={{ color: '#4284f5' }} />}
                </li>
              )
            })}
          </ul>
        </div>
      </Popper>
    </div>
  )
}
export default CustomControl
