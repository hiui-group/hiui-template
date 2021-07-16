import React, { Component } from 'react'
import {
  Table,
  Button,
  Grid,
  Input,
  Loading,
  Modal,
  Form,
  DatePicker,
  Counter,
  Message,
  Dropdown,
  Icon
} from '@hi-ui/hiui'
import axios from 'axios'
import './index.scss'
import TableHandler from './components/tableHandler'
import FilterOptions from './components/filterOptions'
const FormItem = Form.Item
export default class Template extends Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '商品名',
        dataKey: 'name'
      },
      {
        title: 'sku',
        dataKey: 'sku'
      },
      {
        title: '库存量（个）',
        dataKey: 'stock',
        align: 'right'
      },
      {
        title: '单价（元）',
        dataKey: 'price',
        align: 'right'
      },
      {
        title: '上市时间',
        dataKey: 'updateTime'
      },
      {
        title: '操作',
        dataKey: 'stock',
        render: (text, row, index) => {
          const scope = this
          return <TableHandler text={text} row={row} index={index} scope={scope} />
        }
      }
    ]

    this.modalForm = React.createRef()
    this.state = {
      pageSize: 10, // 每页条数
      total: 0, // 总条数，分页使用
      currentPage: 1, // 当前页数
      tableDatas: [], // 表格数据
      modalTitle: '新增',
      keyWord: '',
      visibleLoading: false,
      modalVisiable: false,
      moreSettingModel: false,
      colorList: [],
      availableOptions: [], // 显示筛选项
      rules: {
        projectName: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'onBlur,onChange'
          }
        ]
      }
    }
  }

  componentDidMount() {
    this.getTableData({ page: 1 })
  }

  // 获取商品信息
  getTableData = (params = { id: '' }) => {
    this.setState({
      visibleLoading: true
    })
    axios
      .get(`https://mife-gallery.test.mi.com/hiui/products`, {
        params
      })
      .then(res => {
        const datas = []
        if (res && res.data.code === 200) {
          const data = res.data.data
          const len = data.length % 10
          for (let index = 0; index < len; index++) {
            datas.push({ ...data[index], key: index })
          }

          this.setState({
            tableDatas: datas,
            total: data.length,
            currentPage: params.currentPage || 1,
            visibleLoading: false
          })
        }
      })
  }

  // 添加商品
  putTanleRow = data => {
    this.setState({
      visibleLoading: true
    })
    // 请自行替换自己的url和请求函数
    axios
      .post(`https://mife-gallery.test.mi.com/hiui/upload`, {
        data
      })
      .then(res => {
        if (res && res.data.code === 0) {
          this.setState({
            modalVisiable: false
          })
          this.getTableData({ page: 1 })
        } else {
          Message.open({ type: 'error', title: '数据校验异常', duration: 2000 })
        }
      })
  }

  // 添加一条新的商品
  addNewProduct = () => {
    this.setState({
      modalVisiable: true,
      modalTitle: '新增'
    })
  }

  // 删除数据
  delTableRow = id => {
    this.setState({
      visibleLoading: true
    })
    // 请自行替换自己的url和请求函数
    axios
      .post(`https://mife-gallery.test.mi.com/hiui/upload`, {
        data: { id }
      })
      .then(res => {
        if (res && res.data.code === 0) {
          this.setState({
            modalVisiable: false
          })
          this.getTableData({ page: 1 })
        } else {
          Message.open({ type: 'error', title: '删除失败', duration: 2000 })
        }
      })
  }

  // modal确定
  confirmEvent = () => {
    this.modalForm.current.validate((values, error) => {
      console.log(values, error)
      if (!error) {
        this.putTanleRow(values)
      }
    })
  }

  // modal 取消
  cancelEvent = () => {
    this.modalForm.current.resetValidates()
    this.setState({ modalVisiable: false })
  }

  render() {
    const { tableDatas, pageSize, total, currentPage, visibleLoading, rules, modalVisiable, modalTitle } = this.state
    const Row = Grid.Row
    const Col = Grid.Col
    return (
      <div className="table-advan-group-more-options">
        <Row className="table-advan-group-more-options_header-handle">
          <Col span={16}>
            <h2 className="table-advan-group-more-options_head-title">商品管理</h2>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button type="primary" icon="plus" onClick={this.addNewProduct} />
            <Button
              type="line"
              icon="download"
              onClick={() => {
                Message.open({ type: 'success', title: '导出成功', duration: 2000 })
              }}
            />
            <Button
              type="line"
              icon="document"
              onClick={() => {
                this.props.history.push('/detail-basic')
              }}
            />
            <Dropdown
              className="table-advan-group-more-options-morehandle"
              data={[
                {
                  title: '操作1'
                },
                {
                  title: '操作2'
                }
              ]}
              type="button"
              placement="bottom-end"
              title={<Icon name="ellipsis" />}
            />
          </Col>
        </Row>
        <FilterOptions getTableData={this.getTableData} />
        <Row>
          <Col span={24}>
            <div className="table-advan-group-more-options_pane-content">
              <div>
                <Loading visible={visibleLoading}>
                  <Table
                    columns={this.columns}
                    data={tableDatas}
                    pagination={{
                      pageSize: pageSize,
                      total: total,
                      current: currentPage,
                      onChange: (currentPage, pre, size) => {
                        console.log(currentPage, pre, size)
                        this.getTableData({ page: currentPage })
                      }
                    }}
                  />
                </Loading>
              </div>
            </div>
          </Col>
        </Row>
        <Modal title={modalTitle} visible={modalVisiable} onConfirm={this.confirmEvent} onCancel={this.cancelEvent}>
          <Form
            ref={this.modalForm}
            className="page--form-basic-form"
            rules={rules}
            labelWidth="90"
            labelPlacement="right"
          >
            <FormItem label="商品名称" field="projectName">
              <Input placeholder={'请输入'} style={{ width: '320px' }} />
            </FormItem>
            <FormItem label="sku" field="sku">
              <Input placeholder={'请输入'} style={{ width: '320px' }} />
            </FormItem>
            <FormItem label="数量" field="num">
              <Counter min={0} max={8} onChange={(e, val) => console.log('变化后的值：', val)} />
            </FormItem>
            <FormItem label="上市时间" field="date">
              <DatePicker width={320} placeholder={['选择开始日期', '选择结束日期']} />
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
