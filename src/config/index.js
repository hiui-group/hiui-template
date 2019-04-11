import axios from 'axios'
import {
  handleNotificate
} from '@hi-ui/hiui/es'

export const request = axios.create({
  baseURL: 'http://localhost:4000'
})

const errorCodeMap = {
  101: 'some errror 101',
  102: 'some error 102',
  103: 'some error 103'
}

request.interceptors.response.use(function (res) {
  let {
    code,
    message
  } = res.data

  if (code !== 200) {
    handleNotificate({ type: 'warning', duration: 5000, autoClose: true, title: errorCodeMap[code], message: null })
  }

  return res
}, function (error) {
  handleNotificate({ type: 'warning', duration: 5000, autoClose: true, title: '网络错误', message: null })
  return Promise.reject(error)
})

export const isDevelopment = process.env.NODE_ENV === 'development'

export const pageSize = 10
