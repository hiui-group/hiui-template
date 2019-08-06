import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, handleNotificate } from '@hi-ui/hiui'
import { DataFilter } from '@hi-ui/component-kit/es/data-filter'
import './index.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)

    this.columnMixins = {
      id: {
        sorter (pre, next) {
          return pre.id - next.id
        }
      },
      action: {
        render: () => (
          <React.Fragment>
            <Link to='/form-unfold-group'>
              <Button type='default' appearance='link' icon='edit' />
            </Link>
            <Button
              type='default'
              appearance='link'
              icon='delete'
              onClick={() => {
                handleNotificate({
                  type: 'success',
                  duration: 3000,
                  showClose: false,
                  autoClose: true,
                  title: '消息',
                  message: '数据已删除',
                  onClose: () => {
                    console.log('关闭回调')
                  }
                })
              }}
            />
            <Button type='default' appearance='link' icon='more' onClick={() => {}} />
          </React.Fragment>
        )
      }
    }

    this.state = {
      pageSize: 10,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: []
    }
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const { pageSize } = this.state
    const params = {
      pageSize
    }

    return (
      <div className='page--common-basic'>
        <Row>
          <Col span={24}>
            <DataFilter
              url={`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/list/order`}
              params={params}
              columnMixins={this.columnMixins}
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type='primary' icon='plus' />
                </Link>,
                <Button
                  type='line'
                  icon='download'
                  onClick={() => {
                    console.log('------------click download')
                  }}
                />,
                <Button
                  type='line'
                  icon='mark'
                  onClick={() => {
                    console.log('------------click share')
                  }}
                />,
                <Button
                  type='line'
                  icon='more'
                  onClick={() => {
                    console.log('------------click more')
                  }}
                />
              ]}
              tools={[
                'filter',
                {
                  type: 'row-height',
                  rowHeight: 'middle'
                },
                'column',
                'statistics'
              ]}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
