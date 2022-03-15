import { request } from '../../utils'

export const fetchThisMonth = async () => {
  return await request('dashboard-data-analysis/this-month')
}

export const fetchViewTrend = async (range: string) => {
  return await request(`dashboard-data-analysis/view-trend/${range}`)
}
