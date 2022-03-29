import { request } from '../../utils'

export const getList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: [
            {
              id: 1,
              name: '小米9',
              type: '手机',
              size: '6G+64G 全息幻彩蓝',
              price: '3299.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: true,
              createTime: '2021-10-03 12:00:00',
            },
            {
              id: 2,
              name: '小米9',
              type: '手机',
              size: '6G+128G 全息幻彩蓝',
              price: '3799.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: false,
              createTime: '2021-10-03 12:00:00',
            },
            {
              id: 3,
              name: '小米9',
              type: '手机',
              size: '6G+64G 全息红',
              price: '3299.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: true,
              createTime: '2021-10-03 12:00:00',
            },
            {
              id: 4,
              name: '小米9',
              type: '手机',
              size: '6G+128G 全息红',
              price: '3299.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: true,
              createTime: '2021-10-03 12:00:00',
            },
            {
              id: 5,
              name: '小米10',
              type: '手机',
              size: '6G+64G 全息幻彩蓝',
              price: '3299.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: false,
              createTime: '2021-10-03 12:00:00',
            },
            {
              id: 6,
              name: '小米10',
              type: '手机',
              size: '6G+128G 全息幻彩蓝',
              price: '3799.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: true,
              createTime: '2021-10-03 12:00:00',
            },
            {
              id: 7,
              name: '小米10',
              type: '手机',
              size: '6G+64G 全息红',
              price: '3299.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: false,
              createTime: '2021-10-03 12:00:00',
            },
            {
              id: 8,
              name: '小米10',
              type: '手机',
              size: '6G+128G 全息红',
              price: '3299.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: true,
              createTime: '2021-10-03 12:00:00',
            },
            {
              id: 9,
              name: '小米11',
              type: '手机',
              size: '6G+64G 全息幻彩蓝',
              price: '3299.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: true,
              createTime: '2021-10-03 12:00:00',
            },
            {
              id: 10,
              name: '小米11',
              type: '手机',
              size: '6G+128G 全息幻彩蓝',
              price: '3799.00',
              address: '华润五彩城店',
              stock: '29,000',
              status: true,
              createTime: '2021-10-03 12:00:00',
            },
          ],
          total: 32,
        },
      })
    }, 500)
  })
}

export const updateStatus = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { success: true },
      })
    }, 500)
  })
}

export const getTypeOptions = (keyword: any) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          list: [
            { title: '手机', id: '2' },
            { title: '小米2', id: '2-1' },
            { title: '小米3', id: '2-2' },
            { title: '小米4', id: '2-3' },
            { title: '小米5', id: '2-4' },
            { title: '电脑', id: '3' },
            { title: '笔记本', id: '4' },
            { title: '生活周边', id: '5' },
            { title: '其它', id: '6' },
          ],
        },
      })
    }, 500)
  })
}

export const fetchTableStatOverviewData = async () => {
  return await request('table-stat-overview/data')
}
