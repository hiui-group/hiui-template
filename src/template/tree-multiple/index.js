import React, { Component } from 'react'
import Table from '@hi-ui/hiui/es/table'
import Button from '@hi-ui/hiui/es/button'
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
      currentChose: [],
      reset: true,
      treeData: [
        { id: 1,
          title: '小米',
          children: [
            { id: 2,
              title: '技术',
              children: [
                { id: 3, title: '后端' },
                { id: 4, title: '运维' },
                { id: 5, title: '前端' }
              ]
            },
            { id: 6, title: '产品' }
          ]
        }]
    }
  }

  componentWillMount () {
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

  markSure () {
    console.log(this.state.currentChose)
    this.fetchDatas()
  }

  reset () {
    this.setState({
      reset: false,
      currentChose: []
    }, () => {
      this.setState({
        reset: true
      })
    })
  }

  onChange (value) {
    const { currentChose } = this.state

    let tempArr = currentChose
    const mapToPush = data => {
      if (tempArr.indexOf(data.id) >= 0) {
        tempArr = tempArr.splice(tempArr.indexOf(data.id), 1)
      } else {
        tempArr.push(data.id)
      }
      if (data.children) {
        data.children.map(item => {
          mapToPush(item)
        })
      }
    }

    const treeData = [ ...this.state.treeData ]

    const mapToGet = (data, currentChose) => {
      data.map(item => {
        if (item.children) {
          let allIn = true

          item.children.map(child => {
            if (currentChose.indexOf(child.id) < 0) {
              allIn = false
            }
          })

          if (allIn && currentChose.indexOf(item.id) < 0) {
            currentChose.push(item.id)
          }
          mapToGet(item.children, currentChose)
        }
      })
    }

    mapToPush(value)
    mapToGet(treeData, currentChose)
    this.setState({ currentChose: tempArr })
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
        {this.state.reset && <Tree
          defaultExpandAll
          checkable
          data={this.state.treeData}
          onChange={this.onChange.bind(this)}
          openIcon='down'
          closeIcon='up'
        />}
        <br />
        <div className='hi-tree__confirm'>
          <Button type='primary' onClick={this.markSure.bind(this)}>确认</Button>
          <Button type='default' appearance='line' onClick={this.reset.bind(this)}>重置</Button>
        </div>
      </div>
    )
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col

    return (
      <div className='page page--gutter--vertical'>
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
