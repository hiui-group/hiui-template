import React, { Component } from 'react'
import { Icon, Grid, Table, Card, Button, Radio } from '@hi-ui/hiui'
import './index.scss'
// import axios from 'axios'

const delay = (timeout = 1000) => new Promise(resolve => setTimeout(() => resolve(), timeout))

const { Row, Col } = Grid
const RadioGroup = Radio.Group

const prefix = 'page--query-basic'

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
        dataKey: 'sku'
      },
      {
        title: '商品ID',
        dataKey: 'id'
      },
      {
        title: '商品名',
        dataKey: 'name'
      },
      {
        title: '电话',
        dataKey: 'phone'
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
        sorter(pre, next) {
          return pre - next
        }
      },
      {
        title: '激活量',
        dataKey: 'activeCount',
        sorter(pre, next) {
          return pre - next
        }
      },
      {
        title: '操作',
        dataKey: 'id',
        render: (value, item) => {
          return (
            <React.Fragment>
              <Icon name="edit" onClick={() => this.tableUpdateControlor('edit', value)} />
              <Icon name="delete" onClick={() => this.tableUpdateControlor('delete', value)} />
              <Icon name="more" onClick={() => this.tableUpdateControlor('more', value)} />
            </React.Fragment>
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
    selectedRowKey: '',
    queryData: {
      field1: {
        list: ['全部', '待支付', '已支付', '配货中', '配送中', '已收货', '已取消', '已关闭'],
        checkValue: '全部'
      },
      field2: {
        list: ['全部', '小米商城', '小米之家', '天猫旗舰店', '京东旗舰店'],
        checkValue: '全部'
      },
      field3: {
        list: ['全部', '顺丰', 'EMS', '如风达', '百世汇通', '自取'],
        checkValue: '全部'
      },
      field4: {
        list: ['全部', '微信支付', '支付宝', '银联', '信用卡', '现金'],
        checkValue: '全部'
      }
    }
  }

  fetchQueryBasic = async () => {
    await delay()
    const { tableData, ...rest } = queryData
    const _tableData = tableData.map(item => ({ ...item, key: item.id }))
    this.setState({ ...rest, tableData: _tableData })
  }

  async componentDidMount() {
    await this.fetchQueryBasic()
  }

  tableUpdateControlor = (name, value) => {
    console.log(name, value)
  }

  queryButtonClickControlor = (name, value) => {
    console.log(name, value)
  }

  queryChangeControlor = (name, value) => {
    console.log(name, value)
  }

  onQueryConfirm = () => {
    console.log('onQueryConfirm')
  }

  onQueryReset = () => {
    console.log('onQueryReset')
  }

  render() {
    const { columnMixins, queryChangeControlor, queryButtonClickControlor, onQueryConfirm, onQueryReset } = this
    const { total, current, pageSize, tableData, selectedRowKey, queryData } = this.state

    return (
      <>
        <Row>
          <Col span={24}>
            <BasicTableQueryCard
              queryData={queryData}
              onValuesChange={queryChangeControlor}
              onButtonsClick={queryButtonClickControlor}
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
      </>
    )
  }
}

function BasicTableQueryCard({ queryData, onValuesChange, onButtonsClick, onConfirm, onReset }) {
  const { field1, field2, field3, field4 } = queryData || {}

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
          <Button icon="search" type="line" onClick={() => onButtonsClick('search')} />
          <Button icon="plus" type="primary" onClick={() => onButtonsClick('plus')} />
          <Button icon="download" type="line" onClick={() => onButtonsClick('download')} />
          <Button icon="import" type="line" onClick={() => onButtonsClick('import')} />
          <Button icon="more" type="line" onClick={() => onButtonsClick('more')} />
        </span>
      }
    >
      <Row gutter>
        <div className="block-filter__label block-filter__label--radio">订单状态</div>
        <RadioGroup
          data={field1.list}
          value={field1.checkValue}
          onChange={data => {
            field1.checkValue = data
            this.setState(
              {
                field1
              },
              () => {
                this.updateForm({ order_status: data })
              }
            )
          }}
        />
      </Row>
      <Row gutter>
        <div className="block-filter__label block-filter__label--radio">业务来源</div>
        <RadioGroup
          data={field2.list}
          value={field2.checkValue}
          onChange={data => {
            field2.checkValue = data
            this.setState(
              {
                field2
              },
              () => {
                this.updateForm({ order_platform: data })
              }
            )
          }}
        />
      </Row>
      <Row gutter>
        <div className="block-filter__label block-filter__label--radio">运输方式</div>
        <RadioGroup
          data={field3.list}
          value={field3.checkValue}
          onChange={data => {
            field3.checkValue = data
            this.setState(
              {
                field3
              },
              () => {
                this.updateForm({ order_delivery: data })
              }
            )
          }}
        />
      </Row>
      <Row gutter>
        <div className="block-filter__label block-filter__label--radio">支付方式</div>
        <RadioGroup
          data={field4.list}
          value={field4.checkValue}
          onChange={data => {
            field4.checkValue = data
            this.setState(
              {
                field3
              },
              () => {
                this.updateForm({ order_payment: data })
              }
            )
          }}
        />
      </Row>
    </Card>
  )
}

// export default class Template extends Component {
//   constructor(props) {
//     super(props)

//     this.columnMixins = {
//       column1: {
//         sorter(pre, next) {
//           return pre.column1 - next.column1
//         }
//       },
//       action: {
//         render: (key, row) => (
//           <React.Fragment>
//             <Link to="/form/form-basic" className="hi-tpl__add">
//               <Icon name="edit" />
//             </Link>
//             <span onClick={this.showDelModal.bind(this, row)} className="action-del">
//               <Icon name="close" />
//             </span>
//             <span className="action-more">
//               <Dropdown data={[{ title: '打印小票' }]} title="更多" onClick={val => console.log(val)} />
//             </span>
//           </React.Fragment>
//         )
//       }
//     }

//     this.state = {
//       field1: {
//         list: ['全部', '待支付', '已支付', '配货中', '配送中', '已收货', '已取消', '已关闭'],
//         checkValue: '全部'
//       },
//       field2: {
//         list: ['全部', '小米商城', '小米之家', '天猫旗舰店', '京东旗舰店'],
//         checkValue: '全部'
//       },
//       field3: {
//         list: ['全部', '顺丰', 'EMS', '如风达', '百世汇通', '自取'],
//         checkValue: '全部'
//       },
//       field4: {
//         list: ['全部', '微信支付', '支付宝', '银联', '信用卡', '现金'],
//         checkValue: '全部'
//       },
//       pageSize: 10,
//       forms: this.initForms(),
//       delModal: false
//     }
//   }

//   showDelModal(row) {
//     this.setState({
//       delModal: row
//     })
//   }

//   cancelEvent() {
//     this.setState({
//       delModal: false
//     })
//   }

//   delEvent() {
//     Notification.open({
//       type: 'success',
//       title: '订单号为' + this.state.delModal.order_id + '已删除'
//     })
//     this.setState({
//       delModal: false
//     })
//   }

//   updateForm(data) {
//     const forms = Object.assign({}, this.state.forms, data)

//     this.setState(
//       {
//         forms
//       },
//       () => {
//         this.dataFilter.submit(forms)
//       }
//     )
//   }

//   initForms() {
//     return Object.assign(
//       {},
//       {
//         order_status: '全部',
//         order_delivery: '全部',
//         order_platform: '全部',
//         order_payment: '全部'
//       }
//     )
//   }

//   render() {
//     const Row = Grid.Row
//     const Col = Grid.Col

//     const { field1, field2, field3, field4, pageSize, forms } = this.state
//     const params = {
//       pageSize
//     }

//     return (
//       <div className="page--tile-single page">
//         <Row>
//           <Col span={24}>
//             <DataFilter
//               ref={node => (this.dataFilter = node)}
//               url={`http://yapi.demo.qunar.com/mock/26534/hiui/tile-table`}
//               params={params}
//               columnMixins={this.columnMixins}
//               actions={[
//                 'search',
//                 <Link to="/form-unfold-group" className="hi-tpl__add">
//                   <Button type="primary" icon="plus" />
//                 </Link>,
//                 <Button
//                   type="line"
//                   icon="download"
//                   onClick={() => {
//                     console.log('------------click download')
//                   }}
//                 />,
//                 <Button
//                   type="line"
//                   icon="mark"
//                   onClick={() => {
//                     console.log('------------click share')
//                   }}
//                 />,
//                 <Button
//                   type="line"
//                   icon="more"
//                   onClick={() => {
//                     console.log('------------click more')
//                   }}
//                 />
//               ]}
//               activeTools={['query']}
//               tools={[
//                 {
//                   type: 'query',
//                   title: '查询',
//                   forms,
//                   submit: false
//                 }
//               ]}
//             >
//               <Row gutter>
//                 <div className="block-filter__label block-filter__label--radio">订单状态</div>
//                 <RadioGroup
//                   data={field1.list}
//                   value={field1.checkValue}
//                   onChange={data => {
//                     field1.checkValue = data
//                     this.setState(
//                       {
//                         field1
//                       },
//                       () => {
//                         this.updateForm({ order_status: data })
//                       }
//                     )
//                   }}
//                 />
//               </Row>
//               <Row gutter>
//                 <div className="block-filter__label block-filter__label--radio">业务来源</div>
//                 <Radio.Group
//                   data={field2.list}
//                   value={field2.checkValue}
//                   onChange={data => {
//                     field2.checkValue = data
//                     this.setState(
//                       {
//                         field2
//                       },
//                       () => {
//                         this.updateForm({ order_platform: data })
//                       }
//                     )
//                   }}
//                 />
//               </Row>
//               <Row gutter>
//                 <div className="block-filter__label block-filter__label--radio">运输方式</div>
//                 <Radio.Group
//                   data={field3.list}
//                   value={field3.checkValue}
//                   onChange={data => {
//                     field3.checkValue = data
//                     this.setState(
//                       {
//                         field3
//                       },
//                       () => {
//                         this.updateForm({ order_delivery: data })
//                       }
//                     )
//                   }}
//                 />
//               </Row>
//               <Row gutter>
//                 <div className="block-filter__label block-filter__label--radio">支付方式</div>
//                 <Radio.Group
//                   data={field4.list}
//                   value={field4.checkValue}
//                   onChange={data => {
//                     field4.checkValue = data
//                     this.setState(
//                       {
//                         field3
//                       },
//                       () => {
//                         this.updateForm({ order_payment: data })
//                       }
//                     )
//                   }}
//                 />
//               </Row>
//             </DataFilter>
//           </Col>
//         </Row>
//         <Modal
//           title="确认"
//           size="small"
//           visible={!!this.state.delModal}
//           onCancel={this.cancelEvent.bind(this)}
//           footer={[
//             <Button type="default" key={'cancel'} onClick={this.cancelEvent.bind(this)}>
//               取消
//             </Button>,
//             <Button type="danger" key={'sure'} onClick={this.delEvent.bind(this)}>
//               确认
//             </Button>
//           ]}
//         >
//           <span>确认要删除订单号为{this.state.delModal && this.state.delModal.order_id}的订单么？</span>
//         </Modal>
//       </div>
//     )
//   }
// }
