import { HiBaseHTMLProps } from '@hi-ui/core'
import { cx } from '@hi-ui/utils'
import { Spacer } from '../spacer'

import './index.scss'

const prefix = 'hi-pro-stat'

export const Stat: React.FC<StatProps> = ({
  className,
  style,
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
  ...rest
}) => {
  return (
    <div
      className={cx(prefix, className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      <Spacer gap={16}>
        <div
          className={`${prefix}__icon`}
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          {icon}
        </div>
        <Spacer direction="column" align="flex-start" gap={1}>
          <span className={`${prefix}__value`}>{value}</span>
          <span className={`${prefix}__title`}>{title}</span>
        </Spacer>
      </Spacer>
    </div>
  )
}

export interface StatProps extends HiBaseHTMLProps<'div'> {
  title?: React.ReactNode
  value?: React.ReactNode
  icon?: React.ReactNode
  iconBgColor?: string
  iconColor?: string
}
