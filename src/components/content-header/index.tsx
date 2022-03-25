import React from 'react'
import { Breadcrumb, BreadcrumbDataItem } from '@hi-ui/hiui'
import { useNavigate } from 'react-router'
import { Spacer } from '../spacer'

import './index.scss'

const prefix = 'hi-pro-content-header'

export const ContentHeader = ({ breadcrumbs, title, toolbar, children }: ContentHeaderProps) => {
  const navigate = useNavigate()

  const handleBreadcrumbClick = React.useCallback(
    (_, item: NavigableBreadcrumbItem) => {
      if (item.path) {
        navigate(item.path)
      }
    },
    [navigate]
  )

  return (
    <div className={prefix}>
      <Breadcrumb data={breadcrumbs} separator="/" onClick={handleBreadcrumbClick} />
      <Spacer style={{ marginTop: 6 }} justify="space-between" inline={false}>
        {title ? <h2 className={`${prefix}__title`}>{title}</h2> : null}
        {toolbar ? <div className={`${prefix}__toolbar`}>{toolbar}</div> : null}
      </Spacer>
      {children}
    </div>
  )
}

export interface ContentHeaderProps {
  breadcrumbs?: NavigableBreadcrumbItem[]
  title?: React.ReactNode
  toolbar?: React.ReactNode
  children?: React.ReactNode
}

interface NavigableBreadcrumbItem extends BreadcrumbDataItem {
  path?: string
}
