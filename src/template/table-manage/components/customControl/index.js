import React, { useEffect, useRef, useState } from 'react'
import { Icon, Popper } from '@hi-ui/hiui'
import './index.scss'

const kitPrefix = 'hiui-componentkit'
/**
 * @param {Object} CustomControlPorps
 */
const CustomControl = ({ data: propsData = [], value, optionWidth = 150, title = '统计', iconName, onChange }) => {
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
        {iconName && <Icon name={iconName} />}
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
              const { title, id, iconName } = item
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
                    {iconName && <Icon name={iconName} />}
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
