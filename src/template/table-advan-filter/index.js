import React, { Component, useState } from 'react'
import { Icon, Grid, Table, Card, Button, Form, Input, Select, DatePicker, TimePicker, Popper } from '@hi-ui/hiui'
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
    queryData: {},
    showModal: false
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

    this.setState({
      showModal: name
    })
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

  closeModal = () => {
    console.log(11)
    this.setState({
      showModal: false
    })
  }

  render() {
    const {
      columnMixins,
      queryChangeControlor,
      queryButtonClickControlor,
      onQueryConfirm,
      onQueryReset,
      closeModal
    } = this
    const { total, current, pageSize, tableData, selectedRowKey, queryData, showModal } = this.state

    return (
      <>
        <Row>
          <Col span={24}>
            <BasicTableQueryCard
              showModal={showModal}
              onClose={closeModal}
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

const _prefixCls = 'advanced-filter'

function BasicTableQueryCard({ queryData, onValuesChange, onButtonsClick, onConfirm, onReset, showModal, onClose }) {
  const { id, model, startEndDate, time } = queryData || {}
  const filterRef = React.useRef(null)

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
      <Row>
        <Button icon="filter" appearance="link" onClick={() => onButtonsClick('filter')}>
          <span ref={filterRef}>筛选</span>
        </Button>
        <div>
          <AdvancedFilterPopper attachEle={filterRef.current} visible={showModal !== 'filter'} onClose={onClose} />
        </div>
      </Row>
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

const builtInConditions = [
  {
    id: 'equal',
    title: '等于',
    validate: v => {}
  },
  {
    id: 'noEqual',
    title: '不等于',
    validate: v => {}
  },
  {
    id: 'greater',
    title: '大于',
    validate: v => {}
  },
  {
    id: 'greaterOrEqual',
    title: '大于等于',
    validate: v => {}
  },
  {
    id: 'less',
    title: '小于等于',
    validate: v => {}
  },
  {
    id: 'lessOrEqual',
    title: '小于等于',
    validate: v => {}
  },
  {
    id: 'includes',
    title: '包含',
    validate: v => {}
  },
  {
    id: 'noIncludes',
    title: '不包含',
    validate: v => {}
  }
]
const _data = [
  {
    id: 'id',
    title: '商品id',
    filterIds: ['equal', 'noEqual']
  },
  {
    id: 'name',
    title: '商品名称',
    filterIds: ['greater', 'noIncludes', 'includes']
  },
  {
    id: 'name',
    title: '商品名称',
    filterIds: []
  }
]

function AdvancedFilterPopper({
  prefixCls = _prefixCls,
  visible,
  onClose,
  data = _data,
  defaultFilters,
  filterData = builtInConditions,
  onChange,
  onAdd,
  onDelete,
  doFilter,
  ...rest
}) {
  if (typeof defaultFilters === 'undefined') {
    defaultFilters = filterData.map(item => item.id)
  }

  // field, filter, value, doFilter
  const [values, setValues] = useState([])
  const handleAddFilter = () => {
    const newFilter = {
      fieldKey: '',
      filterKey: '',
      filterValue: ''
    }
    setValues([...values, newFilter])
  }

  const handleDoFilter = () => {
    doFilter?.()
  }

  const handleClose = () => {
    onClose?.()
  }

  const handleValuesChange = (idx, val) => {
    const newValues = [...values]
    newValues.splice(idx, 1, val)
    setValues(newValues)
  }

  const handleValueDelete = idx => {
    const newValues = [...values]
    newValues.splice(idx, 1)
    setValues(newValues)
  }

  return (
    <div>
      <Popper show={visible} className={`${prefixCls}__popper`} zIndex={1049} {...rest}>
        <AdvancedFilterHeader onClose={handleClose} />
        <AdvancedFilterBody
          data={data}
          values={values}
          onValuesChange={handleValuesChange}
          onDelete={handleValueDelete}
        />
        <AdvancedFilterFooter addFilter={handleAddFilter} doFilter={handleDoFilter} />
      </Popper>
    </div>
  )
}

function AdvancedFilterHeader({ prefixCls = _prefixCls, onClose }) {
  return (
    <div className={`${prefixCls}__popper-header`}>
      <h4>
        筛选条件 <span>（逻辑为且）</span>
      </h4>
      <Button className={`${prefixCls}__popper-close`} icon="close" appearance="link" onClick={onClose} />
    </div>
  )
}

function AdvancedFilterFooter({ prefixCls = _prefixCls, addFilter, doFilter }) {
  return (
    <div className={`${prefixCls}__popper-footer`}>
      <Button icon="filter" type="default" onClick={addFilter}>
        增加条件
      </Button>
      <Button type="danger" onClick={doFilter}>
        筛选
      </Button>
    </div>
  )
}

function AdvancedFilterBody({ prefixCls = _prefixCls, data, values = [], onValuesChange, onDelete }) {
  return (
    <div className={`${prefixCls}__popper-body`}>
      <ul className={`${prefixCls}__conditions`}>
        {values.map((item, idx) => {
          return (
            <AdvancedFilterItem
              key={idx}
              data={data}
              value={item}
              onChange={val => onValuesChange?.(idx, val)}
              onDelete={() => onDelete?.(idx)}
            />
          )
        })}
      </ul>
    </div>
  )
}

function AdvancedFilterItem({
  prefixCls = _prefixCls,
  value,
  data = [],
  onChange,
  conditions = builtInConditions,
  onDelete,
  ...rest
}) {
  console.log(data, value)
  const { fieldKey, filterKey, filterValue } = value
  const handleChange = (key, val) => {
    console.log(key, val)
    onChange?.({ ...value, [key]: val })
  }

  return (
    <li className={`${prefixCls}__item`} {...rest}>
      <Button className={`${prefixCls}__item-delete`} icon="delete" appearance="link" onClick={onDelete} />
      <Select
        type="single"
        style={{ width: 100 }}
        bordered={false}
        data={data}
        value={fieldKey}
        onChange={val => handleChange('fieldKey', val[0])}
        clearable={false}
      />
      <Select
        type="single"
        style={{ width: 100 }}
        bordered={false}
        data={conditions}
        value={filterKey}
        onChange={val => handleChange('filterKey', val[0])}
        clearable={false}
      />
      <Input placeholder="请输入" value={filterValue} onChange={evt => handleChange('filterValue', evt.target.value)} />
    </li>
  )
}
