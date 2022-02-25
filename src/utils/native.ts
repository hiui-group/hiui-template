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
