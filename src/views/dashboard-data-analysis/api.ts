import { request } from '../../utils'

export const fetchThisMonth = async () => {
  return await request('dashboard-data-analysis/this-month')
}
