/**
 * 对原生方法封装，解析 json 字符串为对象
 */
export const jsonParse = (str: string, defaultVal = {}) => {
  try {
    if (typeof str === 'string') {
      if (str.length === 0) {
        return defaultVal
      }
      return JSON.parse(str) || defaultVal
    }
  } catch (error) {
    console.debug(error)
    return defaultVal
  }
  return str || defaultVal
}

const STORAGE_KEY = 'xiaomi__hiui_template-pro__'

export const localStorage = {
  setItem(name: string, data: any) {
    window.localStorage.setItem(`${STORAGE_KEY}${name}`, data ? JSON.stringify(data) : data)
  },
  getItem(name: string) {
    const data = window.localStorage.getItem(`${STORAGE_KEY}${name}`)
    try {
      return data ? JSON.parse(data) : data
    } catch (err) {
      return null
    }
  },
}
