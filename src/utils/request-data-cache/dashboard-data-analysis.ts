import {ResponseBody} from "../request";
import {RequestDataCacheType} from "./index";

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

const generateProductProblemAnalysisData = (titles: string[]) => {
  const result = []

  for (let counter = 0; counter < titles.length; counter++) {
    const problem = Math.ceil(Math.random() * 500)
    result.push({
      title: titles[counter],
      problem: problem,
      replay: Math.ceil(problem * Math.random())
    })
  }

  return result
}


export const DashboardDataAnalysis: RequestDataCacheType = {
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
    data: generateViewTrendData(['03/09', '03/10', '03/11', '03/12', '03/13', '03/14', '03/15'])
  },
  [`${PageRoutePrefix}/view-trend/month`]: {
    code: 200,
    data: generateViewTrendData(['03/01', '03/08', '03/15', '03/22', '03/29'])
  },
  [`${PageRoutePrefix}/user-distribution`]: {
    code: 200,
    data: [{
      title: '工程师',
      num: 2233
    }, {
      title: '客服',
      num: 223
    }, {
      title: '区域经理',
      num: 1111
    }, {
      title: '产品经理',
      num: 446
    }, {
      title: '销售',
      num: 797
    }]
  },
  [`${PageRoutePrefix}/content-distribution`]: {
    code: 200,
    data: [{
      title: '词条',
      num: 1100
    }, {
      title: '通知',
      num: 1850
    }, {
      title: '问答',
      num: 300
    }, {
      title: '文档',
      num: 1200
    }]
  },
  [`${PageRoutePrefix}/product-problem-analysis`]: {
    code: 200,
    data: generateProductProblemAnalysisData(['手机', '家用电器', '厨房家电', '智慧家庭', '机器人'])
  },
  [`${PageRoutePrefix}/country-view-hot-map`]: (config) => {
    const { data: provinces} = config!

    const data = (provinces as any[]).map(item => ({
      title: item,
      num: (Math.random() + 0.3) * 1000
    }))

    return {
      code: 200,
      data
    }
  }
}
