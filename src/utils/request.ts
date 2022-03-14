import {RequestDataCache} from "./request-data-cache";

const delay = (timeout: number) => new Promise((resolve) => window.setTimeout(resolve, timeout))

/**
 * mock 请求
 * @param url mock 接口地址（暂时从 request-data-cache.ts 中获取）
 * @param timeout mock 网络延迟
 * @returns {Promise<ResponseBody>}
 */
export const request = async <T = any>(url: keyof typeof RequestDataCache, timeout = 3000):Promise<ResponseBody<T>> => {
  await delay(timeout)

  return RequestDataCache[url]
}

export interface ResponseBody<T = any> {
  code: number
  message?: string
  data?: T
}
