import { TableColumnItem } from '@hi-ui/table'

/**
 * 封装表格组件配置接口
 */
export interface TableListProps {
  /**
   * 加载状态控制
   */
  loading: boolean
  /**
   * 表头列配置项
   */
  columns: TableColumnItem[]
  /**
   * 表格数据源
   */
  list: any[]
  /**
   * 分页配置
   */
  pagination: {
    pageNum: number
    pageSize: number
  }
  /**
   *  数据总条数
   */
  total: number
  /**
   * 分页触发事件
   */
  pageOnChange: any
  // 是否吸顶
  sticky?: boolean
  // 是否斑马线
  striped?: boolean
  // 是否吸底
  stickyFooter?: boolean
  // 可扩展属性
  [key: string]: any
}
