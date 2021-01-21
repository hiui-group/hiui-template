import React from 'react'
import { Button, Input } from '@hi-ui/hiui'

import colors from '../../../../commons/colors'

import './index.scss'

export default class ListHeader extends React.Component {
  render () {
    return (
      <div className='page--list-header'>
          任务清单
          <div>
            <Input
              style={{ width: '259px' }}
              append={
                <Button
                  className='search-btn'
                  icon='search'
                  style={{
                    color: colors.primary,
                    borderLeft: '1px solid ' + colors.border
                  }}
                />
              }
              placeholder='请输入搜索关键词'
            />
            <Button type='primary' icon='plus' style={{ marginLeft: '16px' }}>
              新增
            </Button>
          </div>
        </div>
    )
  }
}
