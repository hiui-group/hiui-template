import React from 'react'
import { Button, Input, Dropdown } from '@hi-ui/hiui'

import './index.scss'

export default class ListHeader extends React.Component {
  render() {
    return (
      <div className="page--list-header">
        <div>
          <span className="page--list-header__title">任务清单</span>
          <Dropdown
            data={[
              {
                title: '全部'
              },
              {
                title: '待审批'
              },
              {
                title: '已通过'
              }
            ]}
            title="全部"
            onClick={val => console.log(val)}
          />
        </div>
        <div>
          <Input
            style={{ width: '259px' }}
            append={
              <Button
                className="search-btn"
                icon="search"
                style={{
                  color: '#4284F5',
                  borderLeft: '1px solid #d8d8d8'
                }}
              />
            }
            placeholder="请输入搜索关键词"
          />
          <Button type="primary" icon="plus" style={{ marginLeft: '16px' }}>
            新增
          </Button>
        </div>
      </div>
    )
  }
}
