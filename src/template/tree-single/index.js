import React, { Component } from 'react'
import { Table, Tree, Grid } from '@hi-ui/hiui'
import '@hi-ui/hiui/es/table/style/index.css'
import axios from 'axios'
import './index.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.columnMixins = {}

    this.state = {
      pageSize: 0,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: [],
      activeId: '',
      currentTree: '',
      treeData: []
    }
  }

  componentWillMount () {
    this.fetchData()
  }

  fetchData (page = 1) {
    axios
      .get(`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/tree`, {
        params: {
          page,
          id: this.state.activeId
        }
      })
      .then(ret => {
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
            page: page,
            total: pageInfo.total,
            pageSize: pageInfo.pageSize,
            columns: this.setTableColumns(columns),
            treeData: data.treeData
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
  setId (item) {
    let itemName = []

    const mapToGet = (list, parent = {}) => {
      list.map(item => {
        if (item.children) {
          mapToGet(item.children, item)
        } else {
          itemName.push(item)
        }
      })
    }
    if (item.children) {
      mapToGet(item.children)
    }

    let activeId = ''

    if (itemName.length) {
      let itemId = []
      itemName.forEach(item => {
        itemId.push(item.id)
      })

      activeId = itemId.join(',')
    } else {
      activeId = item.id
    }

    this.setState(
      {
        activeId: activeId,
        page: 1
      },
      () => {
        this.fetchData()
      }
    )
  }

  renderMenuContent () {
    const { tableDatas, columns, pageSize, total, page } = this.state
    return (
      <Table
        columns={columns}
        data={tableDatas}
        pagination={{
          pageSize: pageSize,
          total: total,
          current: page,
          onChange: (page, pre, size) => {
            this.fetchData(page)
          }
        }}
      />
    )
  }

  renderTree () {
    return (
      <Tree
        defaultExpandAll
        data={this.state.treeData}
        defaultCheckedKeys={[2]}
        onNodeToggle={(data, isExpanded) => {
          console.log('toggle: data isExpanded', data, isExpanded)
        }}
        onChange={data => {
          console.log('Tree data:', data)
        }}
        openIcon='down'
        closeIcon='up'
        onNodeClick={item => {
          this.setId(item)
        }}
      />
    )
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col

    return (
      <div className='page--tree-single'>
        <Row gutter>
          <Col span={4}>{this.renderTree()}</Col>
          <Col span={19}>{this.renderMenuContent()}</Col>
        </Row>
      </div>
    )
  }
}
