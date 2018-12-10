import React, {Component} from 'react'
import { Layout } from '@hi-ui/hiui/es'
import Button from '@hi-ui/hiui/es/button'
import Radio from '@hi-ui/hiui/es/radio'
import Table from '@hi-ui/hiui/es/table'
import Icon from '@hi-ui/hiui/es/icon'
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
        list: ['全部', 'item11', 'item12', 'item13', 'item14', 'item15', 'item16'],
        checkIndex: 0
      },
      field2: {
        list: ['全部', '小米商城', '小米之家', '天猫旗舰店', '京东旗舰店', 'item25', 'item26'],
        checkIndex: 0
      },
      field3: {
        list: ['全部', '顺丰', 'EMS', '自取', 'item34', 'item35', 'item36'],
        checkIndex: 0
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
      <div className="hi-tpl__container hi-tpl__container--tile-single">
        <div>
          <Row>
            <Col>
              <span className="field-name">FieldName1</span>
            </Col>
            <Col>
              <Radio
                list={field1.list}
                checked={field1.checkIndex}
                onChange={(data) => {
                  field1.checkIndex = field1.list.indexOf(data)
                  this.setState({
                    field1
                  }, () => {
                    this.setForm({'column1': data})
                  })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="field-name">FieldName2</span>
            </Col>
            <Col>
              <Radio
                list={field2.list}
                checked={field2.checkIndex}
                onChange={(data) => {
                  field2.checkIndex = field2.list.indexOf(data)
                  this.setState({
                    field2
                  }, () => {
                    this.setForm({'column2': data})
                  })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="field-name">FieldName3</span>
            </Col>
            <Col>
              <Radio
                list={field3.list}
                checked={field3.checkIndex}
                onChange={(data) => {
                  field3.checkIndex = field3.list.indexOf(data)
                  this.setState({
                    field3
                  }, () => {
                    this.setForm({'column3': data})
                  })
                }}
              />
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
