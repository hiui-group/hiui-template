import React, { Component } from 'react'
import Table from '@hi-ui/hiui/es/table'
import Button from '@hi-ui/hiui/es/button'
import Tree from '@hi-ui/hiui/es/tree'
import Grid from '@hi-ui/hiui/es/grid'
import '@hi-ui/hiui/es/table/style/index.css'
import axios from 'axios'
import './index.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)
    this.columnMixins = {
    }

    this.state = {
      pageSize: 0,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: [],
      currentChose: [],
      reset: true,
      treeData: []
    }
  }

  componentWillMount () {
    this.fetchDatas()
  }

  fetchDatas (page) {
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

  markSure () {
    this.fetchDatas()
  }

  onChange (checkedKeys) {
    this.setState({
      currentChose: checkedKeys,
      activeId: checkedKeys.join(',')
    })
  }

  reset () {
    this.setState(
      {
        reset: false,
        currentChose: [],
        activeId: ''
      },
      () => {
        this.fetchDatas()
        this.setState({
          reset: true
        })
      }
    )
  }

  renderMenuContent () {
    const { tableDatas, columns, pageSize, total, page } = this.state

    return (
      <div className='hi-table__container'>
        <Table
          columns={columns}
          data={tableDatas}
          pagination={{
            pageSize: pageSize,
            total: total,
            defaultCurrent: page,
            onChange: (page, pre, size) => {
              this.fetchDatas(page)
            }
          }}
        />
      </div>
    )
  }

  renderTree () {
    return (
      <div className='hi-tree__container'>
        {this.state.reset && this.state.treeData.length && (
          <Tree
            defaultExpandAll
            checkable
            data={this.state.treeData}
            onChange={(checkedKeys) => {
              this.onChange(checkedKeys)
            }}
            checkedKeys={this.state.currentChose}
            openIcon='down'
            closeIcon='up'
          />
        )}
        <br />
        <div className='hi-tree__confirm'>
          <Button type='primary' onClick={this.markSure.bind(this)}>
            确认
          </Button>
          <Button type='default' onClick={this.reset.bind(this)}>
            重置
          </Button>
        </div>
      </div>
    )
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col

    return (
      <div className='page--tree-multiple'>
        <Row gutter>
          <Col span={4}>{this.renderTree()}</Col>
          <Col span={20}>{this.renderMenuContent()}</Col>
        </Row>
      </div>
    )
  }
}
