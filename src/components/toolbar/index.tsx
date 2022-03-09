import React, { ReactNode } from 'react'
import { KIT_PREFIX } from '../constant'
import Grid from '@hi-ui/grid'
import Button from '@hi-ui/button'
import { LeftOutlined, ResetOutlined } from '@hi-ui/icons'
import './index.scss'

const { Row, Col } = Grid

export interface IProps {
  /** 是否显示back按钮,默认隐藏 */
  showGoBack?: boolean
  /** 是否显示刷新按钮,默认展示 */
  showRefresh?: boolean
  /** 点击back按钮回调,默认为浏览器回退功能 */
  goBack?: () => void
  /** 点击刷新按钮回调 */
  refresh?: () => void
  /** 页面标题,默认获取当前页面标题 */
  title?: string
  /** 自定义代码 */
  renderOpts?: () => ReactNode
}

/**
 * 页面头部工具栏，导航栏下一栏
 */
export const ToolBar: React.FC<IProps> = ({
  title,
  goBack,
  refresh,
  renderOpts,
  showGoBack = false,
  showRefresh = true
}: IProps) => {
  const prefixCls = `${KIT_PREFIX}-toolbar`

  const getDefaultTitle = () => {
    return document.title
  }

  const defaultGoBack = () => {
    window?.history?.go(-1)
  }

  return (
    <div className={`${prefixCls}`}>
      <Row justify='space-between'>
        <Col span={6}>
          {showGoBack && (
            <Button
              className='btn-goback'
              type='default'
              appearance='link'
              icon={<LeftOutlined />}
              onClick={() => {
                goBack ? goBack() : defaultGoBack()
              }}
            ></Button>
          )}
          <span className={`${prefixCls}__title`}>{title || getDefaultTitle()}</span>
        </Col>
        <Col span={12} justify='flex-end'>
          {showRefresh && (
            <Button
              className='btn-refresh'
              type='default'
              icon={<ResetOutlined />}
              onClick={() => {
                refresh && refresh()
              }}
            ></Button>
          )}
          {renderOpts?.()}
        </Col>
      </Row>
    </div>
  )
}
