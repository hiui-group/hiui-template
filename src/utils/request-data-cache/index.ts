import {ResponseBody} from "../request";
import {BasicDetail} from "./basic-detail";
import {DashboardDataAnalysis} from './dashboard-data-analysis'

export const RequestDataCache: Record<string, ResponseBody> = {
  ...BasicDetail,
  ...DashboardDataAnalysis
}
