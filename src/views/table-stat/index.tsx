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
  Tooltip,
} from '@hi-ui/hiui'
import * as Icons from '@hi-ui/icons'
import { TableList } from '../../components/table-list'
import { SearchPanel } from '../../components/search-panel'
import { Divider } from '../../components/divider'
import { useListFetch } from '../../hooks/use-list-fetch'
import { checkSelectFetch } from '../../utils/check-select-fetch'
import { getList, updateStatus, getTypeOptions, fetchTableStatOverviewData } from './api'

import { ContentHeader } from '../../components/content-header'
import { InfoCircleOutlined, ResetOutlined } from '@hi-ui/icons'
import { Stat } from '../../components/stat'
import { Spacer } from '../../components/spacer'

const FormItem = Form.Item

export const TableStat = () => {
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
    { title: '品类', dataKey: 'type', width: 200 },
    { title: '规格', dataKey: 'size', width: 200 },
    { title: '价格', dataKey: 'price', width: 200 },
    { title: '地址', dataKey: 'address', width: 200 },
    { title: '库存', dataKey: 'stock', width: 200 },
    {
      title: '状态',
      dataKey: 'status',
      width: 200,
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

  const [overviewData, setOverviewData] = React.useState<Record<string, any> | null>(null)
  const [overviewLoading, setOverviewLoading] = React.useState(false)

  const loadingIdRef = React.useRef<any>(null)

  React.useEffect(() => {
    setOverviewLoading(true)
    fetchTableStatOverviewData()
      .then((result) => {
        setOverviewData(result.data!)
      })
      .finally(() => {
        setOverviewLoading(false)
      })
  }, [])

  React.useEffect(() => {
    if (loading || overviewLoading) {
      if (!loadingIdRef.current) {
        loadingIdRef.current = Loading.open(undefined)
      }
    } else {
      Loading.close(loadingIdRef.current)
    }
  }, [loading, overviewLoading])

  return (
    <div>
      <ContentHeader
        breadcrumbs={[
          {
            title: '首页',
            path: 'about',
          },
          {
            title: '统计表单',
          },
        ]}
        title="统计表单"
        toolbar={
          <div>
            <Button
              className="btn-refresh"
              type="default"
              icon={<ResetOutlined />}
              onClick={execute}
            ></Button>
          </div>
        }
      />
      <div style={{ padding: '20px 20px 83px' }}>
        <Spacer gap={16} inline={false}>
          {overviewData
            ? overviewData.list.map((item: any, index: number) => {
                // @ts-ignore
                const Icon = Icons[item.icon]
                return (
                  <Stat
                    style={{ width: '25%' }}
                    key={index}
                    {...item}
                    icon={<Icon />}
                    title={
                      <Spacer gap={4}>
                        <span>{item.title}</span>
                        <Tooltip title={item.title} placement="bottom">
                          <InfoCircleOutlined />
                        </Tooltip>
                      </Spacer>
                    }
                  />
                )
              })
            : null}
        </Spacer>
        <Card bordered={false} style={{ width: '100%', marginTop: 16 }}>
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
              <FormItem field="name" style={{ paddingRight: 16 }}>
                <Input placeholder="名称" clearable />
              </FormItem>
              <FormItem field="type" style={{ paddingRight: 16 }}>
                <CheckSelect
                  placeholder="品类"
                  searchable
                  clearable
                  dataSource={(keyword) => checkSelectFetch(getTypeOptions, keyword)}
                />
              </FormItem>
              <FormItem field="size" style={{ paddingRight: 16 }}>
                <Input placeholder="部门" clearable />
              </FormItem>
              <FormItem field="status" style={{ paddingRight: 16 }}>
                <Input placeholder="用户名" clearable />
              </FormItem>
              <FormItem field="createTime" style={{ paddingRight: 16 }}>
                <DatePicker placeholder="创建时间" type="daterange" format="YYYY-MM-DD" />
              </FormItem>
            </Form>
          </SearchPanel>
          <Divider />
          <TableList
            fixedToColumn={{ right: 'operator' }}
            columns={columns}
            list={list}
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
