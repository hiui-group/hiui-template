import { request } from '../../utils'

export const fetchFlowStepsData = async () => {
  return await request('flow-steps/data')
}
