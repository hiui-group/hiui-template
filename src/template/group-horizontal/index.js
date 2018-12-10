import React, { Component } from 'react'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Table from '@hi-ui/hiui/es/table'
import Form from '@hi-ui/hiui/es/form'
import Input from '@hi-ui/hiui/es/input'
import Seclet from '@hi-ui/hiui/es/select'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import axios from 'axios'
import config from '~config'
import './index.scss'

export default class Template extends Component {
  constructor(props) {
    super(props)

    this.menus = [
      {title: '全部'},
      {title: '异常'},
      {title: '调拨管理'},
      {title: '超期监控'}
    ]
    this.columnMixins = {
      column1: {
        sorter(pre, next) {
          return pre.column1 - next.column1
        }
      },
      action: {
        render: () => (
          <React.Fragment>
            <Icon name="edit" />
            <Icon name="close" />
            <Icon name="more" />
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

  componentWillMount() {
    this.fetchDatas()
  }

  fetchDatas() {
    const {
      page,
      forms
    } = this.state

    axios.get(`${config('host')}/table/get-datas`, {
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

  initForms() {
    return Object.assign({}, {
      column1: '',
      column2: '全部',
      column3: '全部'
    })
  }

  setTableColumns(columns) {
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

  updateForm(data, callback=undefined) {
    const forms = Object.assign({}, this.state.forms, data)

    this.setState({
      forms
    }, () => {
      callback && callback()
    })
  }

  checkSubmit() {
    const {forms} = this.state

    return !!forms.column1
  }

  submit(can) {
    if (!can) {
      return
    }
    this.setState({
      page: 1
    }, () => {
      this.fetchDatas()
    })
  }

  reset() {
    this.updateForm(this.initForms(), () => this.fetchDatas())
  }

  renderMenuContent() {
    const {
      activeMenu,
      tableDatas,
      columns,
      pageSize,
      total,
      page,
      forms
    } = this.state
    const canSubmit = this.checkSubmit()

    if (activeMenu === 0) {
      return (
        <React.Fragment>
          <Table 
            columns={columns} 
            data={tableDatas} 
            name="sorter"
            pagination={{
              pageSize: pageSize,
              total:total,
              page: page,
              onChange:(page, pre, size) => {
                this.setState({page: page}, () => this.fetchDatas())
              }
            }}
          />
        </React.Fragment>
      )
    } else {
      return activeMenu
    }
  }

  render() {
    const {
      activeMenu
    } = this.state

    return (
      <div className="hi-tpl__container hi-tpl__container--group-horizontal">
        <NavMenu
          selectedKey={activeMenu}
          data={this.menus}
          onClick={(e, menu) => this.setState({activeMenu: parseInt(menu)})}
        />
        <div className="menu-content">
          {this.renderMenuContent()}
        </div>
      </div>
    )
  }
}