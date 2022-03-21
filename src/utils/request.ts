import { RequestDataCache } from './request-data-cache'

const delay = (timeout: number) => new Promise((resolve) => window.setTimeout(resolve, timeout))

/**
 * mock 请求
 * @param url mock 接口地址（暂时从 request-data-cache.ts 中获取）
 * @param config mock 配置项
 * @returns {Promise<ResponseBody>}
 */
export const request = async <T = any>(
  url: keyof typeof RequestDataCache,
  config?: RequestConfig
): Promise<ResponseBody<T>> => {
  const { timeout = 2400 } = config || {}

  await delay(timeout)

  const mockData = RequestDataCache[url]
  return typeof mockData === 'function' ? mockData(config) : mockData
}

export interface RequestConfig {
  /**
   * 在本地模拟时有效，timeout 之后才会返回值
   * @default 3000
   */
  timeout?: number
  /**
   * 需要传递的数据
   */
  data?: any
}

export interface ResponseBody<T = any> {
  code: number
  message?: string
  data?: T
}
