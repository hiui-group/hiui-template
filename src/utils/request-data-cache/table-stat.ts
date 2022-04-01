import { RequestDataCacheType } from './index'

const PageRoutePrefix = 'table-stat'

export const TableStat: RequestDataCacheType = {
  [`${PageRoutePrefix}/data`]: {
    code: 200,
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
  },
  [`${PageRoutePrefix}-overview/data`]: {
    code: 200,
    data: {
      list: [
        {
          icon: 'BookmarkFilled',
          iconColor: 'rgb(43, 148, 250)',
          iconBgColor: '#E2F3FE',
          value: '3,135.00',
          title: '指标名称',
        },
        {
          icon: 'FolderFilled',
          iconColor: 'rgb(255, 166, 43)',
          iconBgColor: '#FEFAE0',
          value: '3,135.00',
          title: '指标名称',
        },
        {
          icon: 'TagFilled',
          iconColor: 'rgb(0, 208, 113)',
          iconBgColor: '#E5FEEB',
          value: '3,135.00',
          title: '指标名称',
        },
        {
          icon: 'FlagFilled',
          iconColor: 'rgb(255, 79, 83)',
          iconBgColor: '#FEE9E5',
          value: '3,135.00',
          title: '指标名称',
        },
      ],
    },
  },
}