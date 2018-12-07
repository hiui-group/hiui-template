import React, {Component} from 'react'
import { Layout } from '@hi-ui/hiui/es'
import Checkbox from '@hi-ui/hiui/es/checkbox'
import Radio from '@hi-ui/hiui/es/radio'
import Table from '@hi-ui/hiui/es/table'
import Icon from '@hi-ui/hiui/es/icon'
import Button from '@hi-ui/hiui/es/button'
import './index.scss'
import config from '~config'
import axios from 'axios'

export default class Template extends Component {

  constructor(props) {
    super(props)

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
      field1: {
        list: [
          {
            text: 'item11',
            value: 'item11',
            checked: false
          },
          {
            text: 'item12',
            value: 'item12',
            checked: true
          },
          {
            text: 'item13',
            value: 'item13'
          },
          {
            text: 'item14',
            value: 'item14'
          },
          {
            text: 'item15',
            value: 'item15'
          }
        ]

      },
      field2: {
        list: [
          {
            text: '小米商城',
            value: '小米商城'
          },
          {
            text: '小米之家',
            value: '小米之家'
          },
          {
            text: '天猫旗舰店',
            value: '天猫旗舰店'
          },
          {
            text: '京东旗舰店',
            value: '京东旗舰店'
          },
          {
            text: 'item25',
            value: 'item25'
          },
          {
            text: 'item26',
            value: 'item26'
          }
        ]
      },
      field3: {
        list: [
          {
            text: '顺丰',
            value: '顺丰'
          },
          {
            text: 'EMS',
            value: 'EMS'
          },
          {
            text: '自取',
            value: '自取'
          },
          {
            text: 'item34',
            value: 'item34'
          },
          {
            text: 'item35',
            value: 'item35'
          },
          {
            text: 'item36',
            value: 'item36'
          }
        ]
      },
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
      column1: '全部',
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

  updateForm(data, callback) {
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

  setForm(data) {
    this.updateForm(data, () => this.fetchDatas())
  }

  handleSubmitClick() {
    const forms = {
      column1: this.state.field1.list.filter(item => item.checked).map(item => item.value),
      column2: this.state.field2.list.filter(item => item.checked).map(item => item.value),
      column3: this.state.field3.list.filter(item => item.checked).map(item => item.value)
    }
    this.setForm(forms)
  }

  handleResetClick() {
    const {field1, field2, field3} = this.state

    field1.list.forEach(item => item.checked = false)
    field2.list.forEach(item => item.checked = false)
    field3.list.forEach(item => item.checked = false)

    this.setState({
      field1,
      field2,
      field3
    }, () => {
      this.reset()
    })
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
    const Row = Layout.Row
    const Col = Layout.Col

    const {
      field1,
      field2,
      field3
    } = this.state

    return (
      <div>
        <div>
          <Row>
            <Col>
              <span className="field-name">FieldName1</span>
            </Col>
            <Col>
              <Checkbox all='one' onChange={(list) => {
                const fieldList = this.state.field1.list
                fieldList.forEach(item => {
                  if(list.indexOf(item.value) > -1) {
                    item.checked = true
                  } else {
                    item.checked = false
                  }
                })

              }}>全选</Checkbox>
              <Checkbox list={this.state.field1.list} name='one'/>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="field-name">FieldName2</span>
            </Col>
            <Col>
              <Checkbox all='two' onChange={(list) => {

                const fieldList = this.state.field2.list
                fieldList.forEach(item => {
                  if(list.indexOf(item.value) > -1) {
                    item.checked = true
                  } else {
                    item.checked = false
                  }
                })

              }}>全选</Checkbox>
              <Checkbox list={this.state.field2.list} name='two'/>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="field-name">FieldName3</span>
            </Col>
            <Col>
              <Checkbox all='three' onChange={(list) => {

                const fieldList = this.state.field3.list
                fieldList.forEach(item => {
                  if(list.indexOf(item.value) > -1) {
                    item.checked = true
                  } else {
                    item.checked = false
                  }
                })

              }}>全选</Checkbox>
              <Checkbox list={this.state.field3.list} name='three'/>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="primary" appearance="line" onClick={this.handleSubmitClick.bind(this)}>确定</Button>
              <Button type="default" appearance="line" onClick={this.handleResetClick.bind(this)}>重置</Button>
            </Col>
          </Row>
        </div>
        <div style={{marginTop: '20px'}}>
          {this.renderMenuContent()}
        </div>
      </div>
    )
  }
}