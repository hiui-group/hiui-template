import React, { Component } from 'react'
import { Tree, Grid, Card, Table, Button, Loading, Modal } from '@hi-ui/hiui'
import '@hi-ui/hiui/es/table/style/index.css'
import './index.scss'

const Row = Grid.Row
// const Col = Grid.Col
const delay = (timeout = 1000) => new Promise(resolve => setTimeout(() => resolve(), timeout))
const prefix = 'page--tree-single-query'
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
    },
    {
      id: 4233,
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
  state = {
    pageSize: 10,
    currentChose: '',
    delModal: false,
    reset: true,
    treeData: [
      {
        sku: 66808,
        title: '手机',
        id: 1,
        children: [
          {
            sku: 53631,
            id: 2,
            title: '小米手机',
            children: [
              {
                sku: 52577,
                id: 3,
                title: '小米5S',
                children: [
                  {
                    sku: 66463,
                    id: 94,
                    title: '小米手机5s 高配全网通版'
                  },
                  {
                    sku: 66463,
                    id: 95,
                    title: '小米手机5s 高配全网通版'
                  },
                  {
                    sku: 66463,
                    id: 96,
                    title: '小米手机5s 高配全网通版'
                  },
                  {
                    sku: 66463,
                    id: 97,
                    title: '小米手机5s 高配全网通版'
                  }
                ]
              },
              {
                sku: 85250,
                id: 5,
                title: '小米6',
                children: [
                  {
                    sku: 47709,
                    id: 6,
                    title: '小米6 全网通版'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        sku: 18562,
        id: 7,
        title: '电视',
        children: [
          {
            sku: 73687,
            id: 8,
            title: '小米电视3s'
          },
          {
            sku: 21284,
            id: 9,
            title: '小米电视4'
          }
        ]
      },
      {
        sku: 89858,
        id: 10,
        title: '生态链及其他',
        children: [
          {
            sku: 43975,
            id: 11,
            title: '路由器',
            children: [
              {
                sku: 31163,
                id: 12,
                title: '小米路由器',
                children: [
                  {
                    sku: 77421,
                    id: 13,
                    title: '小米路由器 青春版 黑色'
                  }
                ]
              }
            ]
          },
          {
            sku: 31338,
            id: 14,
            title: '1其他',
            children: [
              {
                sku: 68829,
                id: 15,
                title: '小米圆领纯色T恤 '
              }
            ]
          }
        ]
      }
    ]
  }

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
        width: '160px',
        render: (value, item) => {
          return (
            <>
              <Button appearance="link" icon="edit" onClick={() => this.tableUpdateControlor('edit', value)} />
              <Button appearance="link" icon="delete" onClick={() => this.tableUpdateControlor('delete', item)} />
              <Button appearance="link" icon="more" onClick={() => this.tableUpdateControlor('more', value)} />
            </>
          )
        }
      }
    ],
    sorter(pre, next) {
      return pre.column1 - next.column1
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

  reset = () => {
    this.setState(
      {
        reset: false,
        currentChose: []
      },
      () => {
        this.setState({
          reset: true
        })
      }
    )
  }

  onChange = checkedKey => {
    this.setState({
      currentChose: checkedKey
    })
  }

  showDelModal = value => {
    this.setState({
      delModal: value
    })
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

  queryButtonClickControllor = name => {
    console.log(name)
  }

  render() {
    const { onChange, columnMixins, queryButtonClickControllor } = this
    const { total, current, reset, delModal, treeData, pageSize, tableData, currentChose, selectedRowKey } = this.state

    return (
      <div className={prefix}>
        <Row>
          <TableTreeQueryCard
            visible={reset && treeData.length > 0}
            checkedKey={currentChose}
            treeData={treeData}
            onValueChange={onChange}
          />
          <Card
            title="商品管理"
            className={`${prefix}__table-card`}
            bordered={false}
            extra={
              <span>
                {/* 功能按钮需用户自己去定制，调用后端接口和后续前端操作 */}
                <Button
                  icon="search"
                  type="line"
                  style={{ fontSize: 16 }}
                  onClick={() => queryButtonClickControllor('search')}
                />
                <Button
                  icon="plus"
                  type="primary"
                  style={{ fontSize: 16 }}
                  onClick={() => queryButtonClickControllor('plus')}
                />
                <Button
                  icon="download"
                  type="line"
                  style={{ fontSize: 16 }}
                  onClick={() => queryButtonClickControllor('download')}
                />
                <Button
                  icon="import"
                  type="line"
                  style={{ fontSize: 16 }}
                  onClick={() => queryButtonClickControllor('import')}
                />
                <Button
                  icon="more"
                  type="line"
                  style={{ fontSize: 16 }}
                  onClick={() => queryButtonClickControllor('more')}
                />
              </span>
            }
          >
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
        <Modal
          title="确认"
          size="small"
          visible={!!delModal}
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
          <span>确认要删除订单号为{delModal && delModal.id}的订单么？</span>
        </Modal>
      </div>
    )
  }
}

function TableTreeQueryCard({
  visible,
  treeData,
  checkedKey,
  onCheckAllChange,
  onValueChange,
  onButtonsClick,
  onConfirm,
  onReset
}) {
  return (
    <Card title="组织架构" className={`${prefix}__query-card`} bordered={false} hoverable>
      <Row style={{ alignItems: 'flex-start' }}>
        {visible ? (
          <Tree
            data={treeData}
            checkedId={checkedKey}
            onSelect={selectedNode => {
              console.log('Tree data:', selectedNode)
              onValueChange(selectedNode.id)
            }}
          />
        ) : null}
      </Row>
    </Card>
  )
}
