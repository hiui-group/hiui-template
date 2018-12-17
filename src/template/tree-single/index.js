import React, { Component } from 'react'
import Table from '@hi-ui/hiui/es/table'
import Tree from '@hi-ui/hiui/es/tree'
import Grid from '@hi-ui/hiui/es/grid'
import '@hi-ui/hiui/es/table/style/index.css'
import Icon from '@hi-ui/hiui/es/icon'
import axios from 'axios'
import config from '../../config'
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
      columns: [],
      activeMenu: 0,
      currentTree: '',

      treeData: [
        { id: 1,
          title: '小米',
          children: [
            { id: 2,
              title: '技术',
              children: [
                { id: 3, title: '后端', onClick: () => { this.onTreeClick(3) } },
                { id: 4, title: '运维', onClick: () => { this.onTreeClick(4) } },
                { id: 5, title: '前端', onClick: () => { this.onTreeClick(5) } }
              ]
            },
            { id: 6, title: '产品', onClick: () => { this.onTreeClick(6) } }
          ]
        }]
    }
  }

  componentWillMount () {
    this.fetchDatas()
  }

  onTreeClick (id) {
    const treeData = [...this.state.treeData]
    let hasGet = false

    const mapToGet = (data, id) => {
      data.map(item => {
        if (item.id === id) {
          hasGet = true
          item.style = { color: '#4284f5' }
        } else if (item.style) {
          item.style = null
        }
        if (item.children && !hasGet) {
          mapToGet(item.children, id)
        }
      })
    }

    mapToGet(treeData, id)

    this.setState({
      treeData
    })

    this.setState({ currentTree: id })
    this.fetchDatas()
  }

  fetchDatas () {
    const {
      page
    } = this.state

    axios.get(`${config('host')}/table/get-datas`, {
      params: {
        page
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

  renderMenuContent () {
    const {
      activeMenu,
      tableDatas,
      columns,
      pageSize,
      total,
      page
    } = this.state

    if (activeMenu === 0) {
      return (
        <div className='hi-table__container'>
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
        </div>
      )
    } else {
      return activeMenu
    }
  }

  renderTree () {
    return (
      <div className='hi-tree__container'>
        <Tree
          defaultExpandAll
          data={this.state.treeData}
          defaultCheckedKeys={[2]}
          onNodeToggle={(data, isExpanded) => { console.log('toggle: data isExpanded', data, isExpanded) }}
          onChange={data => { console.log('Tree data:', data) }}
          openIcon='down'
          closeIcon='up'
        />
      </div>
    )
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col

    return (
      <div className='page page--gutter page--gutter--vertical'>
        <Row>
          <Col span={3}>

            {this.renderTree()}

          </Col>
          <Col span={21}>

            {this.renderMenuContent()}

          </Col>
        </Row>
      </div>
    )
  }
}
