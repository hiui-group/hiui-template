import axios from 'axios'
import {
  handleNotificate
} from '@hi-ui/hiui/es'

export const request = axios.create({
  baseURL: 'http://localhost:4000'
})

request.interceptors.response.use(function (res) {
  let {
    status,
    message
  } = res.data

  // if (status !== 200) {
  //   handleNotificate({ type: 'warning', duration: 5000, autoClose: true, title: '错误', message })
  // }

  return res
}, function (error) {
  handleNotificate({ type: 'warning', duration: 5000, autoClose: true, title: '网络错误', message: null })
  return Promise.reject(error)
})

export const isDevelopment = process.env.NODE_ENV === 'development'

export const pageSize = 10
