const delay = (timeout: number) => new Promise((resolve) => window.setTimeout(resolve, timeout))

/**
 * mock 请求
 * @param data mock 接口数据
 * @param timeout mock 网络延迟
 * @returns {Promise<RequestBody>}
 */
export const request = async (data: RequestBody, timeout = 3000) => {
  await delay(timeout)
  return data
}

interface RequestBody {
  code: number
  message: string
  data?: Record<string, any> | any[]
}
