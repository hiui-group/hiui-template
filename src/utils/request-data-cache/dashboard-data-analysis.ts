import {ResponseBody} from "../request";

const PageRoutePrefix = 'dashboard-data-analysis'

export const DashboardDataAnalysis: Record<string, ResponseBody> = {
  [`${PageRoutePrefix}/this-month`]: {
    code: 200,
    data: {
      view: {
        num: 3135,
        diffPercentage: 3.29
      },
      user:{
        num: 2931,
        diffPercentage: 0.77
      },
      entry:{
        num: 283,
        diffPercentage: -18.38
      },
      problem:{
        num: 783,
        diffPercentage: 0.04
      },
      lesson: {
        num: 7,
        diffPercentage: 0.23
      },
      document:{
        num: 27,
        diffPercentage: -18.38
      }
    }
  }
}
