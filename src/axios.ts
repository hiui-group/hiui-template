import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const callBackInter = new Map()

const axiosInstance = axios.create({
  url: ''
})

axiosInstance.interceptors.request.use(
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
    callBackInter.has('errorCallback') && callBackInter.get('errorCallback')(error)
    return error
  }
)

axiosInstance.interceptors.response.use(
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


export interface HiRequestCallbackHooks {
  beforeResponse?: (config: AxiosRequestConfig) => any
  errorResponse?: <T = any>(response: AxiosResponse<T>) => void
  beforeRequest?: (config: AxiosRequestConfig) => any
  errorRequest?: (error: any) => any
  errorCallback? : (error: any) => void
}

export type HiRequestConfig = HiRequestCallbackHooks & AxiosRequestConfig

const axiosIns = (options: HiRequestConfig) => {
  const { beforeResponse, errorResponse, beforeRequest, errorRequest, errorCallback } = options
  beforeRequest && callBackInter.set('beforeRequest', beforeRequest)
  errorResponse && callBackInter.set('errorResponse', errorResponse)
  beforeResponse && callBackInter.set('beforeResponse', beforeResponse)
  errorRequest && callBackInter.set('errorRequest', errorRequest)
  errorCallback && callBackInter.set('errorCallback', errorCallback)

  return axiosInstance({ ...options })
}

export { axios }
export default axiosIns
