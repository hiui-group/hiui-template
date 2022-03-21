import { request } from '../../utils'

export const fetchDashboardWorkbenchData = async () => {
  return await request('dashboard-workbench/data')
}
