import { KIT_PREFIX } from '../constant'
import { Table } from '@hi-ui/hiui'
import React from 'react'
import { TableListProps } from './index.type'
import './index.scss'

/**
 * 表格展示
 * @param loading 加载状态控制
 * @param columns 表头列配置项
 * @param list 表格数据源
 * @param pagination 分页配置
 * @param total 分页-数据总数
 * @param setPagination 分页触发事件
 * @returns
 */

export const TableList: React.FC<TableListProps> = ({
  loading,
  columns,
  list,
  total,
  sticky = true,
  striped = true,
  stickyFooter = true,
  pagination,
  pageOnChange,
  ...args
}) => {
  const prefixCls = `${KIT_PREFIX}-table-list`
  return (
    <div className={`${prefixCls}`}>
      <Table
        loading={loading}
        columns={columns}
        data={list}
        striped={striped}
        sticky={sticky}
        stickyFooter={stickyFooter}
        {...args}
        pagination={{
          showTotal: true,
          showJumper: true,
          total: total,
          current: pagination.pageNum,
          pageSize: pagination.pageSize,
          onChange: (currPage) => {
            pageOnChange({ pageNum: currPage })
          },
          pageSizeOptions: [10, 20, 50, 100],
          onPageSizeChange: (val, current) => {
            pageOnChange({ pageSize: val, pageNum: current })
          },
        }}
      />
    </div>
  )
}
