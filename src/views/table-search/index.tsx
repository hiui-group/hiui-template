import React, { useRef, useState } from 'react'
import {
  Button,
  Card,
  Switch,
  DatePicker,
  Form,
  Input,
  CheckSelect,
  Message,
  Loading,
  Modal,
} from '@hi-ui/hiui'
import { TableList } from '../../components/table-list'
import { Toolbar } from '../../components/toolbar'
import { SearchPanel } from '../../components/search-panel'
import { Divider } from '../../components/divider'
import { useListFetch } from '../../hooks/use-list-fetch'
import { checkSelectFetch } from '../../utils/check-select-fetch'
import { getList, updateStatus, getTypeOptions } from './api'

import './index.scss'
import { ContentHeader } from '../../components/content-header'

const FormItem = Form.Item

export const TableSearch = () => {
  // 搜索面板-默认搜索数据
  const defaultFilters = {
    name: '',
    type: [],
    size: '',
    status: '',
    createTime: {
      start: null,
      end: null,
    },
  }
  // 搜索面板表单ref
  const searchFormRef = useRef<any>()

  // 过滤组件-过滤字段属性
  const [filters, setFilters] = useState({ ...defaultFilters })

  // 分页属性配置
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNum: 1,
  })

  // 获取通用列表数据并返回各种状态
  const { loading, list, total, execute } = useListFetch(getList, { ...filters, ...pagination })

  // 表头配置
  const columns = [
    { title: '商品名', dataKey: 'name', width: 150 },
    { title: '品类', dataKey: 'type', width: 100 },
    { title: '规格', dataKey: 'size', width: 200 },
    { title: '价格', dataKey: 'price', width: 150 },
    { title: '地址', dataKey: 'address', width: 150 },
    { title: '库存', dataKey: 'stock', width: 100 },
    {
      title: '状态',
      dataKey: 'status',
      width: 100,
      render(text: any, record: any) {
        return (
          <Switch
            checked={record.status}
            onChange={(checked) => {
              Modal.confirm({
                title: '提示',
                content: '请确认是否起/停用布局状态？',
                onConfirm: () => {
                  const ref: any = Loading.open(document.body, {
                    content: '正在变更...',
                  })
                  updateStatus({
                    id: record.id,
                    status: checked,
                  }).then(() => {
                    Loading.close(ref)
                    execute()
                  })
                },
              })
            }}
          />
        )
      },
    },
    { title: '创建时间', dataKey: 'createTime', width: 200 },
    {
      title: '操作',
      dataKey: 'operator',
      width: 80,
      render() {
        return (
          <>
            <Button
              appearance="link"
              type="primary"
              onClick={() => {
                Message.open({
                  title: '删除中...',
                })
              }}
            >
              删除
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <div className="table-search-container">
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'about',
          },
          {
            title: '查询表单',
          },
        ]}
        title="查询表单"
        toolbar={
          <div>
            <Button
              type="default"
              onClick={() => {
                Message.open({ title: '点击看板' })
              }}
            >
              查看看板
            </Button>
            <Button
              type="primary"
              onClick={() => {
                Message.open({
                  title: '点击新建',
                })
              }}
            >
              新建
            </Button>
          </div>
        }
      />
      <div className="container">
        <Card bordered={false} style={{ width: '100%' }}>
          <SearchPanel
            search={{
              searchClick: () => {
                searchFormRef.current
                  .validate()
                  .then((values: any) => {
                    setFilters({ ...filters, ...values })
                    setPagination({ ...pagination, pageNum: 1 })
                  })
                  .catch(console.error)
              },
              resetClick: () => {
                searchFormRef.current.setFieldsValue({ ...defaultFilters })
                setTimeout(() => {
                  searchFormRef.current.validate().then((values: any) => {
                    setFilters({ ...defaultFilters })
                    setPagination({ ...pagination, pageNum: 1 })
                  })
                })
              },
            }}
          >
            <Form
              showColon={false}
              placement="horizontal"
              labelPlacement="right"
              style={{ columnGap: 0 }}
              innerRef={searchFormRef}
              initialValues={defaultFilters}
            >
              <FormItem label="商品名称" field="name">
                <Input placeholder="请输入名称" clearable />
              </FormItem>
              <FormItem label="品类" field="type">
                <CheckSelect
                  placeholder="请选择"
                  searchable
                  clearable
                  dataSource={(keyword) => checkSelectFetch(getTypeOptions, keyword)}
                />
              </FormItem>
              <FormItem label="规格" field="size">
                <Input placeholder="请输入部门" clearable />
              </FormItem>
              <FormItem label="商品状态" field="status">
                <Input placeholder="请输入用户名" clearable />
              </FormItem>
              <FormItem label="创建时间" field="createTime">
                <DatePicker type="daterange" format="YYYY-MM-DD" />
              </FormItem>
            </Form>
          </SearchPanel>
          <Divider />
          <TableList
            setting
            loading={loading}
            columns={columns}
            list={list}
            fixedToColumn={{ right: 'operator' }}
            pagination={{ ...pagination }}
            total={total}
            pageOnChange={(changes: any) => {
              searchFormRef.current.validate().then(() => {
                setPagination((prev) => {
                  return { ...prev, ...changes }
                })
              })
            }}
          />
        </Card>
      </div>
    </div>
  )
}
