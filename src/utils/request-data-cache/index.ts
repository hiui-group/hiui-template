import {RequestConfig, ResponseBody} from "../request";
import {BasicDetail} from "./basic-detail";
import {DashboardDataAnalysis} from './dashboard-data-analysis'

export type RequestDataCacheType = Record<string, ResponseBody | ((config?: RequestConfig) =>ResponseBody)>

export const RequestDataCache:RequestDataCacheType = {
  ...BasicDetail,
  ...DashboardDataAnalysis
}
