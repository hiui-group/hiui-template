import React, { Component } from 'react'
import { Table, NavMenu, Form, Input, Select, Button, Grid, Icon } from '@hi-ui/hiui'
import axios from 'axios'

export default class Template extends Component {
  constructor (props) {
    super(props)

    this.businessOptions = [
      { name: '全部', id: '全部' },
      { name: '小米商城', id: '小米商城' },
      { name: '小米之家', id: '小米之家' },
      { name: '天猫旗舰店', id: '天猫旗舰店' },
      { name: '京东旗舰店', id: '京东旗舰店' }
    ]
    this.transportOptions = [
      { name: '全部', id: '全部' },
      { name: '顺丰', id: '顺丰' },
      { name: 'EMS', id: 'EMS' },
      { name: '自取', id: '自取' }
    ]
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
      pageSize: 10,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: [],
      activeMenu: 0,
      forms: this.initForms()
    }
  }

  componentWillMount () {
    this.fetchData()
  }

  fetchData () {
    const { page, forms } = this.state

    axios
      .get(`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas`, {
        params: {
          page,
          ...forms
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
            page: pageInfo.page,
            total: pageInfo.total,
            pageSize: pageInfo.pageSize,
            columns: this.setTableColumns(columns)
          })
        }
      })
  }

  initForms () {
    return Object.assign(
      {},
      {
        column1: '',
        column2: '全部',
        column3: '全部'
      }
    )
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

  updateForm (data, callback = undefined) {
    const forms = Object.assign({}, this.state.forms, data)

    this.setState(
      {
        forms
      },
      () => {
        callback && callback()
      }
    )
  }

  checkSubmit () {
    const { forms } = this.state

    return !!forms.column1
  }

  submit (can) {
    if (!can) {
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

  reset () {
    this.updateForm(this.initForms(), () => this.fetchData())
  }

  renderMenuContent () {
    const { activeMenu, tableDatas, columns, pageSize, total, page, forms } = this.state
    const canSubmit = this.checkSubmit()

    if (activeMenu === 0) {
      return (
        <React.Fragment>
          <Form inline>
            <Form.Item label='运单号'>
              <Input
                placeholder='请输入'
                value={forms.column1}
                onChange={(e, value) => {
                  this.updateForm({ column1: value })
                }}
              />
            </Form.Item>
            <Form.Item label='业务来源'>
              <Select
                data={this.businessOptions}
                placeholder='请选择业务来源'
                style={{ width: '220px' }}
                value={forms.column2}
                onChange={value =>
                  this.updateForm({ column2: (value[0] && value[0].id) || '全部' })
                }
              />
            </Form.Item>
            <Form.Item label='运输方式'>
              <Select
                data={this.transportOptions}
                placeholder='请选择运输方式'
                style={{ width: '220px' }}
                value={forms.column3}
                onChange={value =>
                  this.updateForm({ column3: (value[0] && value[0].id) || '全部' })
                }
              />
            </Form.Item>
            <hr />
            <Form.Item>
              <Button
                type={canSubmit ? 'primary' : 'default'}
                disabled={!canSubmit}
                onClick={e => this.submit(canSubmit)}
              >
                确定
              </Button>
              <Button onClick={this.reset.bind(this)} type='default'>
                重置
              </Button>
            </Form.Item>
          </Form>
          <Table
            columns={columns}
            data={tableDatas}
            pagination={{
              pageSize: pageSize,
              total: total,
              current: page,
              onChange: (page, pre, size) => {
                this.setState({ page: page }, () => this.fetchData())
              }
            }}
          />
        </React.Fragment>
      )
    } else {
      return activeMenu
    }
  }

  render () {
    const { activeMenu } = this.state
    const Row = Grid.Row
    const Col = Grid.Col

    return (
      <div className='page page--gutter' style={{ background: '#fff' }}>
        <Row>
          <Col span={24}>
            <NavMenu
              selectedKey={activeMenu}
              data={this.menus}
              onClick={(e, menu) => this.setState({ activeMenu: parseInt(menu) })}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>{this.renderMenuContent()}</Col>
        </Row>
      </div>
    )
  }
}
