import { request } from '../../utils'

export const fetchDepartment = async () => {
  return await request('table-layout/department')
}

export const fetchTableContent = async (config: {
  departmentCode: string
  pageSize: number
  current: number
  keyword: string
  jobCode: string
  levelCode: string
}) => {
  return await request('table-layout/table', {
    data: { ...config },
  })
}
