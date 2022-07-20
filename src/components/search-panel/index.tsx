import React, { useEffect, useRef, useState } from 'react'
import { DownOutlined, UpOutlined } from '@hi-ui/icons'
import { Button } from '@hi-ui/hiui'
import { KIT_PREFIX } from '../constant'
import './index.scss'

interface SearchPanelProps {
  search: {
    searchClick: () => void
    resetClick: () => void
  }
  // 是否隐藏展开/收起按钮
  hideExpanded?: boolean
}
// 搜索容器最小高度
const searchFormMinHeight = 52

export const SearchPanel: React.FC<SearchPanelProps> = ({
  search,
  hideExpanded = false,
  children,
}) => {
  const prefixCls = `${KIT_PREFIX}-search-panel`
  const formComponentRef = useRef<any>()

  // 展开/收起状态 expanded=true为展开,false为收起
  const [expanded, setExpanded] = useState(false)
  // 搜索容器高度
  const [formWrapHeight, setFormWrapHeight] = useState('52px')

  useEffect(() => {
    setFormWrapHeight(
      `${hideExpanded ? formComponentRef.current.firstChild.clientHeight : searchFormMinHeight}px`
    )
  }, [hideExpanded])

  return (
    <div className={`${prefixCls}`}>
      {search && (
        <React.Fragment>
          <div className={`${prefixCls}__form-wrap`} style={{ height: formWrapHeight }}>
            <div className={`${prefixCls}__form-component`} ref={formComponentRef}>
              {children}
            </div>
          </div>

          <div className={`${prefixCls}__opts-wrap`}>
            {!hideExpanded &&
              (expanded ? (
                <Button
                  type="default"
                  appearance="link"
                  onClick={() => {
                    setExpanded(false)
                    setFormWrapHeight(`${searchFormMinHeight}px`)
                  }}
                >
                  收起
                  <UpOutlined />
                </Button>
              ) : (
                <Button
                  type="default"
                  appearance="link"
                  onClick={() => {
                    setExpanded(true)
                    setFormWrapHeight(`${formComponentRef.current.firstChild.clientHeight}px`)
                  }}
                >
                  展开
                  <DownOutlined />
                </Button>
              ))}

            <Button type="default" onClick={search.resetClick}>
              重置
            </Button>
            <Button type="secondary" onClick={search.searchClick}>
              查询
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}
