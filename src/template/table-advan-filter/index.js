import React, { Component } from 'react'
import cx from 'classnames'
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
        dataKey: 'sku',
        filterIds: ['greater', 'noIncludes', 'includes']
      },
      {
        title: '商品ID',
        dataKey: 'id'
      },
      {
        title: '商品名',
        dataKey: 'name',
        filterIds: ['equal', 'noEqual']
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
    const {
      columnMixins,
      queryChangeControlor,
      queryButtonClickControlor,
      onQueryConfirm,
      onQueryReset,
    } = this
    const { total, current, pageSize, tableData, selectedRowKey, queryData } = this.state

    return (
      <>
        <Row>
          <Col span={24}>
            <BasicTableQueryCard
              queryData={queryData}
              columns={columnMixins.columns}
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

function BasicTableQueryCard({ queryData, columns, onValuesChange, onButtonsClick, onConfirm, onReset }) {
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
          <Button icon="search" type="line" onClick={() => onButtonsClick('search')} />
          <Button icon="plus" type="primary" onClick={() => onButtonsClick('plus')} />
          <Button icon="download" type="line" onClick={() => onButtonsClick('download')} />
          <Button icon="import" type="line" onClick={() => onButtonsClick('import')} />
          <Button icon="more" type="line" onClick={() => onButtonsClick('more')} />
        </span>
      }
    >
      <Row>
        <AdvancedFilterKit columns={columns}>筛选</AdvancedFilterKit>
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

/** ****************************** advanced filter component for table ****************************** */

const _prefixCls = 'advanced-filter'

function AdvancedFilterKit({prefixCls = _prefixCls, className, columns, filterColumns, defaultFilterIds, icon = "filter", children, ...rest }) {
  const filterRef = React.useRef(null)
  const [visible, setVisible] = React.useState(false)

  return (
    <div ref={filterRef} {...rest}>
      <Button className={`${prefixCls}__trigger`} type={visible ? 'primary' : 'default'} icon={icon} appearance="link" onClick={() => setVisible(true)}>
        {children}
      </Button>
      <AdvancedFilterPopper columns={columns} filterColumns={filterColumns} defaultFilterIds attachEle={filterRef.current} visible={visible} onClose={() => setVisible(false)} />
    </div>
  )
}

const builtInConditions = [
  {
    id: 'equal',
    title: '等于',
  },
  {
    id: 'noEqual',
    title: '不等于',
  },
  {
    id: 'greater',
    title: '大于',
  },
  {
    id: 'greaterOrEqual',
    title: '大于等于',
  },
  {
    id: 'less',
    title: '小于等于',
  },
  {
    id: 'lessOrEqual',
    title: '小于等于',
  },
  {
    id: 'includes',
    title: '包含',
  },
  {
    id: 'noIncludes',
    title: '不包含',
  }
]

function AdvancedFilterPopper({
  prefixCls = _prefixCls,
  className,
  visible,
  onClose,
  columns = [],
  defaultFilterIds,
  filterColumns = builtInConditions,
  value,
  defaultValue,
  onAdd,
  onEdit,
  onDelete,
  doFilter,
  ...rest
}) {
  if (typeof defaultFilterIds === 'undefined') {
    defaultFilterIds = filterColumns.map(item => item.id)
  }

  // field, filter, value, doFilter
  const [internalValue, setInternalValue] = React.useState([])
  const uncontrolled = value === undefined
  const values = uncontrolled ? internalValue : value
  const tryEdit = React.useCallback(
    (item, index) => {
      if (uncontrolled) {
        const newValue = [...values]
        newValue.splice(index, 1, item)
        setInternalValue(newValue)
      }
      onEdit?.(item, index)
    },
    [uncontrolled, onEdit, values]
  )
  const tryAdd = React.useCallback(
    () => {
      if (uncontrolled) {
        const newValue = [...values, {
          fieldKey: '',
          filterKey: '',
          filterValue: ''
        }]
        setInternalValue(newValue)
      }
      onAdd?.()
    },
    [uncontrolled, onAdd, values]
  )
  const tryDelete = React.useCallback(
    (index) => {
      if (uncontrolled) {
        const newValue = [...values]
        newValue.splice(index, 1)
        setInternalValue(newValue)
      }
      onDelete?.(index)
    },
    [uncontrolled, onDelete, values]
  )
  const tryClose = () => {
    onClose?.()
  }
  const tryDoFilter = () => {
    doFilter?.()
  }

  return (
    <div>
      <Popper show={visible} className={cx(`${prefixCls}__popper`, className)} zIndex={1049} {...rest}>
        <AdvancedFilterHeader onClose={tryClose} />
        <AdvancedFilterBody
          columns={columns}
          values={values}
          onEdit={tryEdit}
          onDelete={tryDelete}
        />
        <AdvancedFilterFooter addFilter={tryAdd} doFilter={tryDoFilter} />
      </Popper>
    </div>
  )
}

function AdvancedFilterHeader({ prefixCls = _prefixCls, className, onClose }) {
  return (
    <div className={cx(`${prefixCls}__popper-header`, className)}>
      <h4>
        筛选条件 <span>（逻辑为且）</span>
      </h4>
      <Button className={`${prefixCls}__popper-close`} icon="close" appearance="link" onClick={onClose} />
    </div>
  )
}

function AdvancedFilterFooter({ prefixCls = _prefixCls, className, addFilter, doFilter }) {
  return (
    <div className={cx(`${prefixCls}__popper-footer`, className)}>
      <Button icon="plus" type="default" onClick={addFilter}>
        增加条件
      </Button>
      <Button type="line" onClick={doFilter}>
        筛选
      </Button>
    </div>
  )
}

function AdvancedFilterBody({ prefixCls = _prefixCls, className, columns, values = [], onEdit, onDelete }) {
  return (
    <div className={cx(`${prefixCls}__popper-body`, className)}>
      <ul className={`${prefixCls}__conditions`}>
        {values.map((item, idx) => {
          return (
            <AdvancedFilterItem
              key={idx}
              data={columns}
              value={item}
              onChange={val => onEdit(val, idx)}
              onDelete={() => onDelete(idx)}
            />
          )
        })}
      </ul>
    </div>
  )
}

function AdvancedFilterItem({
  prefixCls = _prefixCls,
  className,
  value,
  columns = [],
  onChange,
  conditions = builtInConditions,
  onDelete,
  ...rest
}) {
  const { fieldKey, filterKey, filterValue } = value
  const handleChange = (key, val) => {
    const newValue = { ...value, [key]: val }
    onChange?.(newValue)
  }

  return (
    <li className={cx(`${prefixCls}__item`, className)} {...rest}>
      <Button className={`${prefixCls}__item-delete`} icon="delete" appearance="link" onClick={onDelete} />
      <Select
        className={`${prefixCls}__item-fieldkey`}
        type="single"
        style={{ width: 100 }}
        bordered={false}
        data={columns}
        value={fieldKey}
        onChange={val => handleChange('fieldKey', val[0])}
        clearable={false}
      />
      <Select
        className={`${prefixCls}__item-filterkey`}
        type="single"
        style={{ width: 100 }}
        bordered={false}
        data={conditions}
        value={filterKey}
        onChange={val => handleChange('filterKey', val[0])}
        clearable={false}
      />
      <Input className={`${prefixCls}__item-filtervalue`} value={filterValue} onChange={event => handleChange('filterValue', event.target.value)} />
    </li>
  )
}
