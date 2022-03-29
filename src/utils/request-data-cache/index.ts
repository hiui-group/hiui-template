import { RequestConfig, ResponseBody } from '../request'
import { BasicDetail } from './basic-detail'
import { DashboardWorkbench } from './dashboard-workbench'
import { DashboardDataAnalysis } from './dashboard-data-analysis'
import { FlowStep } from './flow-steps'
import { TableStat } from './table-stat'

export type RequestDataCacheType = Record<
  string,
  ResponseBody | ((config?: RequestConfig) => ResponseBody)
>

export const RequestDataCache: RequestDataCacheType = Object.assign(
  {},
  BasicDetail,
  DashboardWorkbench,
  DashboardDataAnalysis,
  FlowStep,
  TableStat
)
