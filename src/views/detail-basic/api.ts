import { request } from '../../utils'

export const fetchBasicDetailData = async () => {
  return await request('basic-detail/data')
}
