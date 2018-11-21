import React, { Component } from 'react'
import NavMenu from '@hi-ui/hiui/es/nav-menu'
import Table from '@hi-ui/hiui/es/table'
import Form from '@hi-ui/hiui/es/form'
import Input from '@hi-ui/hiui/es/input'
import Seclet from '@hi-ui/hiui/es/select'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'
import axios from 'axios'
import './style/tpl-1.scss'

class Template extends Component {
  constructor(props) {
    super(props)

    this.columns = this.getTableColumns()
    this.businessOptions = [
      {name:'全部', id:'全部'},
      {name:'小米商城', id:'小米商城'},
      {name:'小米之家', id:'小米之家'},
      {name:'天猫旗舰店', id:'天猫旗舰店'},
      {name:'京东旗舰店', id:'京东旗舰店'}
    ]
    this.transportOptions = [
      {name:'全部', id:'全部'},
      {name:'顺丰', id:'顺丰'},
      {name:'EMS', id:'EMS'},
      {name:'自取', id:'自取'}
    ]
    this.menus = [
      {title: '全部'},
      {title: '异常'},
      {title: '调拨管理'},
      {title: '超期监控'}
    ]

    this.state = {
      pageSize: 0,
      total: 0,
      page: 1,
      tableDatas: [],
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

    axios.get('http://localhost:7002/table/get-datas', {
      params: {
        page,
        ...forms
      }
    }).then(ret => {
      const datas = []

      if (ret && ret.status === 200) {
        const data = ret.data.data
        const pageInfo = data.pageInfo

        data.data.map(data => {
          datas.push(data)
        })
        this.setState({
          tableDatas: datas,
          page: pageInfo.page,
          total: pageInfo.total,
          pageSize: pageInfo.pageSize
        })
      }
    })
  }

  initForms() {
    return Object.assign({}, {
      column1: '',
      column2: '0',
      column3: '0'
    })
  }

  getTableColumns() {
    return [
      {
        title: 'id',
        dataIndex: 'id', 
        key: '1'
      },
      {
        title: '业务来源',
        dataIndex: 'column1', 
        key: '2',
        sorter(pre, next) {
          return pre.column1 - next.column1
        }
      },
      { title: '运输方式', dataIndex: 'column2', key: '3'},
      { title: 'column 3', dataIndex: 'column3', key: '4'},
      { title: 'column 4', dataIndex: 'column4', key: '5'},
      { title: 'column 5', dataIndex: 'column5', key: '6'},
      {
        title: '操作',
        width: 100,
        render: () => (
          <React.Fragment>
            <Icon name="edit" />
            <Icon name="close" />
            <Icon name="more" />
          </React.Fragment>
        )
      }
    ]
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
      pageSize,
      total,
      page,
      forms
    } = this.state
    const canSubmit = this.checkSubmit()

    if (activeMenu === 0) {
      return (
        <React.Fragment>
          <Form inline={true}>
            <Form.Item label="运单号" labelWidth="80">
              <Input
                placeholder="请输入"
                value={forms.column1}
                onChange={(e, value) => {
                  this.updateForm({column1: value})
                }}
              />
            </Form.Item>
            <Form.Item label="业务来源" labelWidth="80">
              <Seclet
                list={this.businessOptions}
                placeholder="请选择业务来源"
                style={{width: '220px'}}
                value={forms.column2}
                onChange={value => this.updateForm({column2: value[0]&&value[0].id||'0'})}
              />
            </Form.Item>
            <Form.Item label="运输方式" labelWidth="80">
              <Seclet
                list={this.transportOptions}
                placeholder="请选择运输方式"
                style={{width: '220px'}}
                value={forms.column3}
                onChange={value => this.updateForm({column3: value[0]&&value[0].id||'0'})}
              />
            </Form.Item>
            <Form.Item labelWidth="50">
              <Button 
                type={canSubmit ? 'primary' : 'default'}
                disabled={!canSubmit}
                onClick={e => this.submit(canSubmit)}
              >
                确定
              </Button>
              <Button onClick={this.reset.bind(this)} type="default" appearance="line">重置</Button>
            </Form.Item>
          </Form>
          <Table 
            columns={this.columns} 
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
      <div className="hi-tpl__container">
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

module.exports = Template

