import React, { Component } from 'react'
import { Table, Button, Tree, Grid } from '@hi-ui/hiui'
import '@hi-ui/hiui/es/table/style/index.css'
import axios from 'axios'
import './index.scss'

export default class Template extends Component {
  constructor(props) {
    super(props)
    this.columnMixins = {}

    this.state = {
      pageSize: 10,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: [],
      currentChose: [],
      reset: true,
      treeData: []
    }
  }

  UNSAFE_componentWillMount() {
    this.fetchData()
  }

  fetchData(page) {
    axios
      .get(`http://yapi.demo.qunar.com/mock/26534/hiui/tree-table`, {
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

          data.data.forEach(data => {
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

  setTableColumns(columns) {
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

  markSure() {
    this.fetchData()
  }

  onChange(checkedKeys) {
    this.setState({
      currentChose: checkedKeys,
      activeId: checkedKeys.join(',')
    })
  }

  reset() {
    this.setState(
      {
        reset: false,
        currentChose: [],
        activeId: ''
      },
      () => {
        this.fetchData()
        this.setState({
          reset: true
        })
      }
    )
  }

  renderMenuContent() {
    const { tableDatas, columns, pageSize, total, page } = this.state

    return (
      <div className="hi-table__container">
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
      </div>
    )
  }

  renderTree() {
    return (
      <div className="hi-tree__container">
        {this.state.reset && this.state.treeData.length && (
          <Tree
            defaultExpandAll
            checkable
            data={this.state.treeData}
            onChange={checkedKeys => {
              this.onChange(checkedKeys)
            }}
            checkedIds={this.state.currentChose}
          />
        )}
        <br />
        <div className="hi-tree__confirm">
          <Button type="primary" onClick={this.markSure.bind(this)}>
            确认
          </Button>
          <Button type="default" onClick={this.reset.bind(this)}>
            重置
          </Button>
        </div>
      </div>
    )
  }

  render() {
    const Row = Grid.Row
    const Col = Grid.Col

    return (
      <div className="page--tree-multiple">
        <Row gutter>
          <Col span={4}>{this.renderTree()}</Col>
          <Col span={20}>{this.renderMenuContent()}</Col>
        </Row>
      </div>
    )
  }
}
