import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Icon from '@hi-ui/hiui/es/icon'
import Grid from '@hi-ui/hiui/es/grid'
import { DataFilter } from '../../component/data-filter'
import config from '../../config'
import '../content.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)

    this.businessOptions = [
      { name: '全部', id: '全部' },
      { name: '小米商城', id: '小米商城' },
      { name: '小米之家', id: '小米之家' },
      { name: '天猫旗舰店', id: '天猫旗舰店' },
      { name: '京东旗舰店', id: '京东旗舰店' }
    ]
    this.transportOptions = [
      { name: '全部', id: '全部' },
      { name: '顺丰', id: '顺丰' },
      { name: 'EMS', id: 'EMS' },
      { name: '自取', id: '自取' }
    ]
    this.menus = [
      { title: '全部' },
      { title: '异常' },
      { title: '调拨管理' },
      { title: '超期监控' }
    ]
    this.columnMixins = {
      column1: {
        sorter (pre, next) {
          return pre.column1 - next.column1
        }
      },
      column2: {
        options: this.transportOptions
      },
      action: {
        render: () => (
          <React.Fragment>
            <Icon name='edit' />
            <Icon name='close' />
            <Icon name='more' />
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
    const {
      pageSize
    } = this.state
    const params = {
      pageSize
    }

    return (
      <div className='page page--gutter'>
        <Row>
          <Col span={24}>

            <DataFilter
              url={`${config('host')}/table/get-datas`}
              params={params}
              columnMixins={this.columnMixins}
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Icon name='plus' />
                </Link>,
                <div className='hi-tpl__download' onClick={() => {
                  console.log('------------click download')
                }}>
                  <Icon name='download' />
                </div>,
                <div className='hi-tpl__share' onClick={() => {
                  console.log('------------click share')
                }}>
                  <Icon name='mark' />
                </div>,
                <div className='hi-tpl__more' onClick={() => {
                  console.log('------------click more')
                }}>
                  <Icon name='more' />
                </div>
              ]}
              tools={[
                'filter',
                {
                  type: 'row-height',
                  rowHeight: 'small'
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
