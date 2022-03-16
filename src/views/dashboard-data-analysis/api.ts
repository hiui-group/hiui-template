import {request} from '../../utils'

export const fetchThisMonth = async () => {
  return await request('dashboard-data-analysis/this-month')
}

export const fetchViewTrend = async (range: string) => {
  return await request(`dashboard-data-analysis/view-trend/${range}`)
}

export const fetchUserDistribution = async () => {
  return await request(`dashboard-data-analysis/user-distribution`)
}

export const fetchContentDistribution = async () => {
  return await request(`dashboard-data-analysis/content-distribution`)
}

export const fetchProductProblemAnalysis = async () => {
  return await request(`dashboard-data-analysis/product-problem-analysis`)
}

export const fetchCountryViewHotMap = async (provinces: string[]) => {
  return await request(`dashboard-data-analysis/country-view-hot-map`, {
    data: provinces
  })
}
