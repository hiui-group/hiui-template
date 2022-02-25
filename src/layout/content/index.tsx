import React from 'react'
import { cx } from '@hi-ui/classname'

import './index.scss'

const prefix = 'mtr-content'

export const Content = ({ top = 105, children }: ContentProps) => {
  return (
    <div className={cx(prefix, 'w-full px-5 pb-8')} style={{ minHeight: `calc(100vh - ${top}px)` }}>
      {children}
    </div>
  )
}

export interface ContentProps {
  top?: number;
  children?: React.ReactNode
}
