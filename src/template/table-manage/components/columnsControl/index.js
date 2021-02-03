import React, { useRef, useState } from 'react'
import { Icon, Popper, Switch } from '@hi-ui/hiui'
import './index.scss'
const kitPrefix = 'hiui-componentkit'
const ColumnsControl = () => {
  const PopperAttachEle = useRef()
  const [showPopper, setShowPopper] = useState(false)
  return (
    <div className={`${kitPrefix}-columnes`}>
      <div
        className={`${kitPrefix}-columnes__attachele`}
        ref={PopperAttachEle}
        onClick={() => {
          setShowPopper(!showPopper)
        }}
      >
        <Icon name="columns" />
        <span className={`${kitPrefix}-columnes__attachele-text`}>列显示</span>
      </div>
      <Popper
        className={`${kitPrefix}-columnes__popper`}
        // 弹出层的显示隐藏
        show={showPopper}
        width={'276px'}
        topGap={5}
        // 依附的元素
        attachEle={PopperAttachEle.current}
        // 点击弹出层以及依附元素以外的区域时会触发该回调
        onClickOutside={() => {
          setShowPopper(false)
        }}
      >
        <div className={`${kitPrefix}-columnes__popper-content`}>
          <ul className="columnes__items">
            <li className="columnes__item">
              <div className="columnes__item-left">
                <Switch />
                <span className="columnes__item-text">column name0</span>
              </div>
              <span className="columnes__item-right">
                <Icon name="drag" />
              </span>
            </li>
            <li className="columnes__item">
              <div className="columnes__item-left">
                <Switch />
                <span className="columnes__item-text">column name0</span>
              </div>
              <span className="columnes__item-right">
                <Icon name="drag" />
              </span>
            </li>
            <li className="columnes__item">
              <div className="columnes__item-left">
                <Switch />
                <span className="columnes__item-text">column name0</span>
              </div>
              <span className="columnes__item-right">
                <Icon name="drag" />
              </span>
            </li>
          </ul>
          <div className="columnes__footer">
            <span className="columnes__footer--reset">重置</span>
            <span className="columnes__footer--confirm">确定</span>
          </div>
        </div>
      </Popper>
    </div>
  )
}
export default ColumnsControl
