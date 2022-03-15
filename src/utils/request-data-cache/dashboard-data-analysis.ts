import {ResponseBody} from "../request";

const PageRoutePrefix = 'dashboard-data-analysis'

const generateViewTrendData = (titles: string[]) => {
  const result = []

  for (let counter = 0; counter < titles.length; counter++) {
    const user = Math.ceil(Math.random() * 1000)
    const view = user + Math.ceil(Math.random() * 1000)

    result.push({
      title: titles[counter],
      view,
      user
    })
  }

  return result
}
export const DashboardDataAnalysis: Record<string, ResponseBody> = {
  [`${PageRoutePrefix}/this-month`]: {
    code: 200,
    data: {
      view: {
        num: 3135,
        diffPercentage: 3.29
      },
      user: {
        num: 2931,
        diffPercentage: 0.77
      },
      entry: {
        num: 283,
        diffPercentage: -18.38
      },
      problem: {
        num: 783,
        diffPercentage: 0.04
      },
      lesson: {
        num: 7,
        diffPercentage: 0.23
      },
      document: {
        num: 27,
        diffPercentage: -18.38
      }
    }
  },
  [`${PageRoutePrefix}/view-trend/day`]: {
    code: 200,
    data: generateViewTrendData(['00:00', '06:00', '12:00', '18:00', '24:00'])
  },
  [`${PageRoutePrefix}/view-trend/week`]: {
    code: 200,
    data: generateViewTrendData(['03/09', '03/10','03/11','03/12','03/13','03/14','03/15'])
  },
  [`${PageRoutePrefix}/view-trend/month`]: {
    code: 200,
    data: generateViewTrendData(['03/01', '03/08', '03/15', '03/22', '03/29'])
  }
}
