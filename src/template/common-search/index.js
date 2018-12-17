import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Table from '@hi-ui/hiui/es/table'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import Grid from '@hi-ui/hiui/es/grid'
import Icon from '@hi-ui/hiui/es/icon'
import axios from 'axios'
import config from '../../config'
import './index.scss'
import '../content.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)

    this.columnMixins = {
      column1: {
        sorter (pre, next) {
          return pre.column1 - next.column1
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
      pageSize: 0,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: []
    }
  }

  componentWillMount () {
    this.fetchDatas()
  }

  fetchDatas () {
    const {
      page,
      s
    } = this.state

    axios.get(`${config('host')}/table/get-datas`, {
      params: {
        page,
        s
      }
    }).then(ret => {
      const datas = []

      if (ret && ret.data.code === 200) {
        const data = ret.data.data
        const columns = data.columns
        const pageInfo = data.pageInfo

        data.data.map(data => {
          datas.push(data)
        })
        this.setState({
          tableDatas: datas,
          page: pageInfo.page,
          total: pageInfo.total,
          pageSize: pageInfo.pageSize,
          columns: this.setTableColumns(columns)
        })
      }
    })
  }

  setTableColumns (columns) {
    const _columns = []

    columns.map(column => {
      const key = column.key

      _columns.push({
        ...column,
        ...this.columnMixins[key]
      })
    })

    return _columns
  }


  search () {
    const {
      s
    } = this.state

    if (!s) {
      return
    }

    this.setState({
      page: 1
    }, () => {
      this.fetchDatas()
    })
  }


  render () {
    const {
      columns,
      tableDatas,
      pageSize,
      total,
      page,
      value
    } = this.state
    const Row = Grid.Row
    const Col = Grid.Col

    return (
      <div className='page page--gutter page-basic-1'>
        <Row>
          <Col span={24}>
            <div className="page-basic-1__form">
              <div className="page-basic-1__form-input">
                <Input
                  value={value}
                  placeholder="搜索关键词"
                  style={{width: '150px'}}
                  onChange={e => {
                    this.setState({s: e.target.value})
                  }}
                />
                <Button type="line" onClick={() => this.search()}>
                  <Icon name='search' />
                </Button>
              </div>
              <div className="page-basic-1__form-actions">
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type="primary">
                    <Icon name='plus' />
                  </Button>
                </Link>
                <Button type="line">
                  <Icon name="download"/>
                </Button>
                <Button type="line">
                  <Icon name="mark"/>
                </Button>
                <Button type="line">
                  <Icon name="more"/>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              data={tableDatas}
              name='sorter'
              pagination={{
                pageSize: pageSize,
                total: total,
                page: page,
                onChange: (page, pre, size) => {
                  this.setState({ page: page }, () => this.fetchDatas())
                }
              }}
            />
          </Col>
        </Row>

      </div>
    )
  }
}
