import { request } from '../../utils'

export const fetchSearchResultByKeyword = async (params: Record<string, any>) => {
  return await request('search/data')
}

export const fetchSearchRecommendedList = async () => {
  return await request('search/recommend-data')
}
