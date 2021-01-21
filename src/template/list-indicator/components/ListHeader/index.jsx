import React from 'react'
import { Button, Input } from '@hi-ui/hiui'

import colors from '../../../../commons/colors'

import './index.scss'

export default class ListHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  render () {
    const { style, onChange = () => {} } = this.props
    const { value } = this.state
    return (
      <div className='page--list-header'  style={style}>
          指标管理
          <div>
            <Input
              style={{ width: '259px' }}
              value={value}
              onChange={(e) => this.setState({ value: e.target.value })}
              append={
                <Button
                  className='search-btn'
                  icon='search'
                  style={{
                    color: colors.primary,
                    borderLeft: '1px solid ' + colors.border
                  }}
                  onClick={() => {
                    onChange(value)
                  }}
                />
              }
              placeholder='请输入搜索关键词'
            />
          </div>
        </div>
    )
  }
}
