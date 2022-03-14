import React, { ReactChild } from "react"

import './index.scss'

const prefix = 'hi-pro-content-footer'

export const ContentFooter:React.FC<ContentFooterProps> = ({
  children,
  ...args
}: ContentFooterProps) => {
  return (
    <div className={prefix} {...args}>
      {children}
    </div>
  )
}

interface ContentFooterProps {
    children:ReactChild
}