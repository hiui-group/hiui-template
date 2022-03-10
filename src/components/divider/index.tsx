import { HiBaseHTMLProps } from '@hi-ui/core'

import './index.scss'

const prefix = 'hi-v4-divider'

export const Divider: React.FC<DividerProps> = ({ as: As = 'div', ...rest }) => {
  return <As className={prefix} {...rest} />
}

export interface DividerProps extends HiBaseHTMLProps<'div'> {
  as?: React.ElementType
}
