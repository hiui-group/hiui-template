import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Input, Button, Grid, Icon } from '@hi-ui/hiui'
import axios from 'axios'
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

  componentDidMount () {
    this.fetchData(1)
  }

  fetchData (page) {
    const { s } = this.state

    axios
      .get(`http://yapi.demo.qunar.com/mock/26534/hiui/base-table`, {
        params: {
          page,
          s
        }
      })
      .then(ret => {
        const datas = []

        if (ret && ret.data.code === 200) {
          const data = ret.data.data
          const columns = data.columns
          const pageInfo = data.pageInfo

          data.data.forEach(data => {
            datas.push(data)
          })
          this.setState({
            tableDatas: datas,
            page: page,
            total: pageInfo.total,
            pageSize: pageInfo.pageSize,
            columns: this.setTableColumns(columns)
          })
        }
      })
  }

  setTableColumns (columns) {
    const _columns = []

    columns.forEach(column => {
      const key = column.key

      _columns.push({
        ...column,
        ...this.columnMixins[key]
      })
    })

    return _columns
  }

  search () {
    const { s } = this.state

    if (!s) {
      return
    }

    this.setState(
      {
        page: 1
      },
      () => {
        this.fetchData()
      }
    )
  }

  render () {
    const { columns, tableDatas, pageSize, total, page, value } = this.state
    const Row = Grid.Row
    const Col = Grid.Col
    return (
      <div className='page--common-search'>
        <Row>
          <Col span={18}>
            <Input
              value={value}
              placeholder='搜索关键词'
              style={{ width: '200px' }}
              append={<Button type='line' icon='search' onClick={() => this.search()} />}
              onChange={e => {
                this.setState({ s: e.target.value })
              }}
            />
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Link to='/form-unfold-group' style={{ marginRight: '8px' }}>
              <Button type='primary' icon='plus' />
            </Link>
            <Button type='line' icon='download' />
            <Button type='line' icon='mark' />
            <Button type='line' icon='more' />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              data={tableDatas}
              pagination={{
                pageSize: pageSize,
                total: total,
                current: page,
                onChange: page => {
                  this.fetchData(page)
                }
              }}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
