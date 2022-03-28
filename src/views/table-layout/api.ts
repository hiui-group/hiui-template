import {request} from '../../utils'

export const fetchDepartment = async () => {
  return await request('table-layout/department')
}

