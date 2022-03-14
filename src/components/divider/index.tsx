import React from 'react'
import { KIT_PREFIX } from '../constant'

import './index.scss'

export interface DividerProps {
  /** 上边距 */
  marginTop?: number
  /** 下边距 */
  marginBottom?: number
  /** 左边距 */
  marginLeft?: number
  /** 右边距 */
  marginRight?: number
  /** 分界线高度 */
  height?: number
  /** 分界线颜色 */
  color?: string
}

/**
 * 分界线
 */
export const Divider: React.FC<DividerProps> = ({
  marginTop = 0,
  marginBottom = 20,
  height = 1,
  color = '#f2f4f7',
  marginLeft = 0,
  marginRight = 0
}) => {
  const prefixCls = `${KIT_PREFIX}-divider`

  return (
    <div
      className={`${prefixCls}`}
      style={{
        marginTop: marginTop,
        marginBottom,
        height,
        backgroundColor: color,
        marginLeft,
        marginRight
      }}
    ></div>
  )
}
