import React, { Component } from 'react'
import { Icon, Grid, Table, Card, Button, Modal, Notification, Checkbox, Loading } from '@hi-ui/hiui'
import './index.scss'
// import axios from 'axios'

const isIndeterminate = (list, expect) => list.length > 0 && list.length < expect.length
const delay = (timeout = 1000) => new Promise(resolve => setTimeout(() => resolve(), timeout))

const { Row, Col } = Grid

const prefix = 'page--tile-multiple'

const queryData = {
  selectedRowKey: 'id',
  total: 20,
  current: 1,
  pageSize: 5,
  tableData: [
    {
      id: 3249,
      name: '小米9',
      sku: '8+64',
      phone: '11225568',
      channel: '小米商城',
      dealer: '线下KA',
      shareCount: '12,139,987',
      activeCount: '0'
    },
    {
      id: 3299,
      name: '小米9 SE',
      sku: '6+64',
      phone: '11225568',
      channel: '清河店',
      dealer: '线下KA',
      shareCount: '19.000',
      activeCount: '10,000'
    },
    {
      id: 4299,
      name: '小米8',
      sku: '6+64',
      phone: '11225568',
      channel: '双安店',
      dealer: '线下KA',
      shareCount: '25.000',
      activeCount: '10,000'
    },
    {
      id: 4219,
      name: 'Redmi Note7',
      sku: '4+64',
      phone: '11225568',
      channel: '华润五彩城店',
      dealer: '线下KA',
      shareCount: '9.000',
      activeCount: '100'
    }
  ]
}

export default class Template extends Component {
  columnMixins = {
    columns: [
      {
        title: 'SKU',
        dataKey: 'sku',
        align: 'right'
      },
      {
        title: '商品ID',
        dataKey: 'id',
        align: 'right'
      },
      {
        title: '商品名',
        dataKey: 'name'
      },
      {
        title: '电话',
        dataKey: 'phone',
        align: 'right'
      },
      {
        title: '渠道',
        dataKey: 'channel'
      },
      {
        title: '经销商',
        dataKey: 'dealer'
      },
      {
        title: '分货量',
        dataKey: 'shareCount',
        align: 'right',
        sorter(pre, next) {
          return pre - next
        }
      },
      {
        title: '激活量',
        dataKey: 'activeCount',
        align: 'right',
        sorter(pre, next) {
          return pre - next
        }
      },
      {
        title: '操作',
        dataKey: 'id',
        render: (value, item) => {
          return (
            <>
              <Icon name="edit" style={{ marginRight: 16 }} onClick={() => this.tableUpdateControlor('edit', value)} />
              <Icon
                name="delete"
                style={{ marginRight: 16 }}
                onClick={() => this.tableUpdateControlor('delete', item)}
              />
              <Icon name="more" onClick={() => this.tableUpdateControlor('more', value)} />
            </>
          )
        }
      }
    ],
    sorter(pre, next) {
      return pre.column1 - next.column1
    }
  }

  state = {
    total: 0,
    current: 1,
    pageSize: 10,
    tableData: [],
    delModal: false,
    selectedRowKey: '',
    orderStatus: {
      list: ['待支付', '已支付', '配货中', '配送中', '已收货', '已取消', '已关闭'],
      checkedList: []
    },
    orderPlatform: {
      list: [
        '小米商城',
        '小米之家',
        '天猫旗舰店',
        '京东旗舰店',
        '有品',
        '京东商城',
        '天猫淘宝'
        // TODO: 存在展示问题
        // '创新渠道',
        // '拼多多',
        // '线下KA',
        // '小米旗舰店'
      ],
      checkedList: []
    },
    orderDelivery: {
      list: ['顺丰', 'EMS', '如风达', '百世汇通', '自取'],
      checkedList: []
    },
    orderPayment: {
      list: ['微信支付', '支付宝', '银联', '信用卡', '现金'],
      checkedList: []
    },
    queryForm: {
      orderStatus: [],
      orderPlatform: [],
      orderDelivery: [],
      orderPayment: []
    }
  }

  fetchQueryBasic = async () => {
    await delay()
    const { tableData, ...rest } = queryData
    const _tableData = tableData.map(item => ({ ...item, key: item.id }))
    this.setState({ ...rest, tableData: _tableData })
  }

  async componentDidMount() {
    Loading.open(null, { key: 'lk' })
    try {
      await this.fetchQueryBasic()
      Loading.close('lk')
    } finally {
      Loading.close('lk')
    }
  }

  tableUpdateControlor = (name, value) => {
    console.log('-----tableUpdateControlor------', name, value)

    switch (name) {
      case 'edit':
        // do some things here
        break
      case 'delete':
        this.showDelModal(value)
        break
      default:
        // do some things here
        break
    }
  }

  showDelModal = value => {
    this.setState({
      delModal: value
    })
  }

  queryButtonClickControllor = (name, value) => {
    console.log(name, value)
  }

  queryChangeControllor = (name, value) => {
    console.log('-----queryChangeControllor------', name, value)
    const fieldData = this.state[name]

    if (!fieldData) return

    this.setState(
      {
        [name]: {
          ...fieldData,
          checkedList: value
        },
        queryForm: {
          ...this.state.queryForm,
          [name]: value
        }
      },
      () => {
        // request filtered table data here
      }
    )
  }

  queryCheckAllChangeController = name => {
    console.log('-----queryCheckAllChangeController------', name)
    const fieldData = this.state[name]
    if (!fieldData) return

    const { checkedList, list } = fieldData
    const isAllChecked = checkedList.length === list.length
    const newCheckedList = isAllChecked ? [] : [...fieldData.list]
    this.setState(
      {
        [name]: {
          ...fieldData,
          checkedList: newCheckedList
        },
        queryForm: {
          ...this.state.queryForm,
          [name]: newCheckedList
        }
      },
      () => {
        // request filtered table data here
      }
    )
  }

  closeModal = () => {
    this.setState({
      delModal: false
    })
  }

  delEvent = () => {
    Notification.open({
      type: 'success',
      title: '订单号为' + this.state.delModal.id + '已删除'
    })
    this.closeModal()
  }

  onQueryConfirm = () => {
    console.log('onQueryConfirm')
  }

  onQueryReset = () => {
    console.log('onQueryReset')
  }

  render() {
    const {
      columnMixins,
      queryChangeControllor,
      queryButtonClickControllor,
      queryCheckAllChangeController,
      onQueryConfirm,
      onQueryReset
    } = this
    const { total, current, pageSize, tableData, selectedRowKey, queryForm, ...queryData } = this.state

    return (
      <>
        <Row>
          <Col span={24}>
            <BasicTableQueryCard
              queryData={queryData}
              onCheckAllChange={queryCheckAllChangeController}
              onValuesChange={queryChangeControllor}
              onButtonsClick={queryButtonClickControllor}
              onConfirm={onQueryConfirm}
              onReset={onQueryReset}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row className="row">
              <Card bordered={false} hoverable>
                <Table
                  columns={columnMixins.columns}
                  data={tableData}
                  rowSelection={{
                    selectedRowKeys: selectedRowKey,
                    onChange: selectedRowKey => {
                      this.setState({ selectedRowKey })
                    }
                  }}
                  pagination={{
                    total,
                    current,
                    pageSize,
                    onChange: current => {
                      this.setState({ current: current })
                    }
                  }}
                />
              </Card>
            </Row>
          </Col>
        </Row>
        <Modal
          title="确认"
          size="small"
          visible={!!this.state.delModal}
          onCancel={this.closeModal}
          footer={[
            <Button type="default" key={'cancel'} onClick={this.closeModal}>
              取消
            </Button>,
            <Button type="danger" key={'sure'} onClick={this.delEvent}>
              确认
            </Button>
          ]}
        >
          <span>确认要删除订单号为{this.state.delModal && this.state.delModal.id}的订单么？</span>
        </Modal>
      </>
    )
  }
}

function BasicTableQueryCard({ queryData, onCheckAllChange, onValuesChange, onButtonsClick, onConfirm, onReset }) {
  const { orderStatus, orderPlatform, orderDelivery, orderPayment } = queryData || {}

  return (
    <Card
      className={`${prefix}__query-card`}
      title="商品管理"
      bordered={false}
      showHeaderDivider
      hoverable
      extra={
        <span>
          {/* 功能按钮需用户自己去定制，调用后端接口和后续前端操作 */}
          <Button icon="search" type="line" style={{ fontSize: 16 }} onClick={() => onButtonsClick('search')} />
          <Button icon="plus" type="primary" style={{ fontSize: 16 }} onClick={() => onButtonsClick('plus')} />
          <Button icon="download" type="line" style={{ fontSize: 16 }} onClick={() => onButtonsClick('download')} />
          <Button icon="import" type="line" style={{ fontSize: 16 }} onClick={() => onButtonsClick('import')} />
          <Button icon="more" type="line" style={{ fontSize: 16 }} onClick={() => onButtonsClick('more')} />
        </span>
      }
    >
      <Row style={{ alignItems: 'flex-start' }}>
        <span className={`${prefix}__filter-label`}>订单状态</span>
        <div className={`${prefix}__filter-checkgroup`}>
          <Checkbox
            indeterminate={isIndeterminate(orderStatus.checkedList, orderStatus.list)}
            checked={orderStatus.list.length === orderStatus.checkedList.length}
            onChange={() => onCheckAllChange('orderStatus')}
          >
            全部
          </Checkbox>
          <Checkbox.Group
            className={`${prefix}__filter-checkbox`}
            data={orderStatus.list}
            value={orderStatus.checkedList}
            onChange={data => onValuesChange('orderStatus', data)}
          />
        </div>
      </Row>
      <Row style={{ alignItems: 'flex-start', marginTop: '0' }}>
        <span className={`${prefix}__filter-label`}>渠道</span>
        <div className={`${prefix}__filter-checkgroup`}>
          <Checkbox
            indeterminate={isIndeterminate(orderPlatform.checkedList, orderPlatform.list)}
            checked={orderPlatform.list.length === orderPlatform.checkedList.length}
            onChange={() => onCheckAllChange('orderPlatform')}
          >
            全部
          </Checkbox>
          <Checkbox.Group
            className={`${prefix}__filter-checkbox`}
            data={orderPlatform.list}
            value={orderPlatform.checkedList}
            onChange={data => onValuesChange('orderPlatform', data)}
          />
        </div>
      </Row>
      <Row style={{ alignItems: 'flex-start', marginTop: '0' }}>
        <span className={`${prefix}__filter-label`}>快递</span>
        <div className={`${prefix}__filter-checkgroup`}>
          <Checkbox
            indeterminate={isIndeterminate(orderDelivery.checkedList, orderDelivery.list)}
            checked={orderDelivery.list.length === orderDelivery.checkedList.length}
            onChange={() => onCheckAllChange('orderDelivery')}
          >
            全部
          </Checkbox>
          <Checkbox.Group
            className={`${prefix}__filter-checkbox`}
            data={orderDelivery.list}
            value={orderDelivery.checkedList}
            onChange={data => onValuesChange('orderDelivery', data)}
          />
        </div>
      </Row>
      <Row style={{ alignItems: 'center', marginTop: '0' }}>
        <span className={`${prefix}__filter-label`}>支付方式</span>
        <div className={`${prefix}__filter-checkgroup`}>
          <Checkbox
            indeterminate={isIndeterminate(orderPayment.checkedList, orderPayment.list)}
            checked={orderPayment.list.length === orderPayment.checkedList.length}
            onChange={() => onCheckAllChange('orderPayment')}
          >
            全部
          </Checkbox>
          <Checkbox.Group
            className={`${prefix}__filter-checkbox`}
            data={orderPayment.list}
            value={orderPayment.checkedList}
            onChange={data => onValuesChange('orderPayment', data)}
          />
        </div>
      </Row>
      <Row className={`${prefix}__filter-submit`}>
        <Col span={6} style={{ paddingLeft: '92px' }}>
          <Button type="primary" onClick={onConfirm}>
            查询
          </Button>
          <Button type="line" onClick={onReset}>
            重置
          </Button>
        </Col>
      </Row>
    </Card>
  )
}
