import { HiBaseHTMLProps } from '@hi-ui/core'

export const Spacer: React.FC<SpacerProps> = ({
  inline = true,
  justify: justifyContent,
  align = 'center',
  direction = 'row',
  gap = 12,
  as: As = 'div',
  style,
  ...rest
}) => {
  return (
    <As
      style={{
        display: inline ? 'inline-flex' : 'flex',
        gap,
        justifyContent,
        flexDirection: direction,
        alignItems: align,
        ...style,
      }}
      {...rest}
    />
  )
}

export interface SpacerProps extends HiBaseHTMLProps<'div'> {
  inline?: boolean
  align?: string
  justify?: string
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  gap?: number
  as?: React.ElementType
}
