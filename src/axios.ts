import axios from 'axios'
import type { HiRequestConfig } from './type'

const callBackInter = new Map()

const _axiosInstance = axios.create({
  url: ''
})

_axiosInstance.interceptors.request.use(
  (config) => {
    if (callBackInter.has('beforeRequest')) {
      return callBackInter.get('beforeRequest')(config)
    }
    return config
  },
  (error) => {
    if (callBackInter.has('errorRequest')) {
      return callBackInter.get('errorRequest')(error)
    }
    // TODO: 为什么不提前，必执行
    callBackInter.has('errorCallback') && callBackInter.get('errorCallback')(error)
    return error
  }
)

_axiosInstance.interceptors.response.use(
  (response) => {
    if (callBackInter.has('beforeResponse')) {
      return callBackInter.get('beforeResponse')(response)
    }
    return response
  },
  (error) => {
    if (callBackInter.has('errorResponse')) {
      return callBackInter.get('errorResponse')(error)
    }
    callBackInter.has('errorCallback') && callBackInter.get('errorCallback')(error)
    return error
  }
)

const axiosInstance = (options: HiRequestConfig) => {
  const { beforeResponse, errorResponse, beforeRequest, errorRequest, errorCallback } = options

  beforeRequest && callBackInter.set('beforeRequest', beforeRequest)
  errorResponse && callBackInter.set('errorResponse', errorResponse)
  beforeResponse && callBackInter.set('beforeResponse', beforeResponse)
  errorRequest && callBackInter.set('errorRequest', errorRequest)
  errorCallback && callBackInter.set('errorCallback', errorCallback)

  return _axiosInstance({ ...options })
}

export { axios }
export default axiosInstance
