import React, { Component } from 'react'
import { Icon, Grid, Table, Card, Button, Form, Input, Select, DatePicker, TimePicker } from '@hi-ui/hiui'
import './index.scss'
// import axios from 'axios'

const delay = (timeout = 1000) => new Promise(resolve => setTimeout(() => resolve(), timeout))

const { Row, Col } = Grid
const FormItem = Form.Item
const FormSubmit = Form.Submit
const FormReset = Form.Reset

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
        align: 'right',
        dataKey: 'shareCount',
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
            <React.Fragment>
              <Icon name="edit" style={{ marginRight: 16 }} onClick={() => this.tableUpdateControlor('edit', value)} />
              <Icon
                name="delete"
                style={{ marginRight: 16 }}
                onClick={() => this.tableUpdateControlor('delete', value)}
              />
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
    queryData: {}
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
  const { id, model, startEndDate, time } = queryData || {}
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
      <Form labelPlacement="top" showColon={false}>
        <Row gutter>
          <Col span={6}>
            <FormItem label={'商品ID：'}>
              <Input
                value={id}
                placeholder={'请输入'}
                onChange={(...args) => onValuesChange('id', args)}
                maxLength={50}
                clearable
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={'机型：'}>
              <Select
                type="multiple"
                placeholder={'请输入机型'}
                data={model}
                onChange={(...args) => onValuesChange('model', args)}
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={'日期：'}>
              <DatePicker
                type="daterange"
                format="YYYY-MM-DD"
                value={startEndDate}
                onChange={(...args) => onValuesChange('startEndDate', args)}
                width="100%"
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label={'时间：'}>
              <TimePicker value={time} format="HH:mm:ss" onChange={(...args) => onValuesChange('time', args)} />
            </FormItem>
          </Col>
        </Row>
        <Row style={{ marginTop: 0 }}>
          <Col span={6}>
            <FormSubmit type="primary" onClick={onConfirm}>
              查询
            </FormSubmit>
            <FormReset type="line" onClick={onReset}>
              重置
            </FormReset>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
