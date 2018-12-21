import React, { Component } from 'react'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Grid from '@hi-ui/hiui/es/grid'
import Table from '@hi-ui/hiui/es/table'
import Icon from '@hi-ui/hiui/es/icon'
import axios from 'axios'
import '../content.scss'

export default class Template extends Component {
  constructor (props) {
    super(props)

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
      forms: this.initForms()
    }
  }

  componentWillMount () {
    this.fetchDatas()
  }

  fetchDatas () {
    const {
      page,
      forms
    } = this.state

    axios.get(`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas`, {
      params: {
        page,
        ...forms
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

  initForms () {
    return Object.assign({}, {
      column1: '',
      column2: '全部',
      column3: '全部'
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

  updateForm (data, callback = undefined) {
    const forms = Object.assign({}, this.state.forms, data)

    this.setState({
      forms
    }, () => {
      callback && callback()
    })
  }

  reset () {
    this.updateForm(this.initForms(), () => this.fetchDatas())
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
        <React.Fragment>
          <Table
            columns={columns}
            data={tableDatas}
            name='sorter'
            pagination={{
              pageSize: pageSize,
              total: total,
              page: page,
              onChange: page => {
                this.setState({ page: page }, () => this.fetchDatas())
              }
            }}
          />
        </React.Fragment>
      )
    } else if (activeMenu === 1) {
      return (
        <React.Fragment>
          <Table
            columns={columns}
            data={tableDatas.slice(0).reverse()}
            name='sorter'
            pagination={{
              pageSize: pageSize,
              total: total,
              page: page,
              onChange: page => {
                this.setState({ page: page }, () => this.fetchDatas())
              }
            }}
          />
        </React.Fragment>
      )
    } else if (activeMenu === 2) {
      return (
        <React.Fragment>
          <Table
            columns={columns}
            data={tableDatas}
            name='sorter'
            pagination={{
              pageSize: pageSize,
              total: total,
              page: page,
              onChange: page => {
                this.setState({ page: page }, () => this.fetchDatas())
              }
            }}
          />
        </React.Fragment>
      )
    } else if (activeMenu === 3) {
      return (
        <React.Fragment>
          <Table
            columns={columns}
            data={tableDatas.slice(0).reverse()}
            name='sorter'
            pagination={{
              pageSize: pageSize,
              total: total,
              page: page,
              onChange: page => {
                this.setState({ page: page }, () => this.fetchDatas())
              }
            }}
          />
        </React.Fragment>
      )
    }
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col
    const {
      activeMenu
    } = this.state

    return (
      <div className='page page--gutter'>
        <Row gutter>
          <Col span={3}>

            <NavMenu
              selectedKey={activeMenu}
              data={this.menus}
              onClick={(e, menu) => this.setState({ activeMenu: parseInt(menu) })}
              vertical
            />

          </Col>
          <Col span={21}>

            {this.renderMenuContent()}

          </Col>
        </Row>
      </div>
    )
  }
}
