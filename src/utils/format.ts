import dayjs from 'dayjs'

/**
 * 统一调用后端时间戳规范
 */
export const formatTimeApi = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ')
}

/**
 * 统一调用后端数组规范
 */
export const formatArrayApi = (arr: unknown) => {
  return Array.isArray(arr) ? arr.join(',') : ''
}
