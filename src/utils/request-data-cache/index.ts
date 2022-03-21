import { ResponseBody } from '../request'
import { BasicDetail } from './basic-detail'
import { DashboardWorkbench } from './dashboard-workbench'

export const RequestDataCache: Record<string, ResponseBody> = Object.assign(
  {},
  BasicDetail,
  DashboardWorkbench
)
