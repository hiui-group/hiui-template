import { RequestDataCacheType } from './index'

const PageRoutePrefix = 'basic-detail'

export const BasicDetail: RequestDataCacheType = {
  [`${PageRoutePrefix}/data`]: {
    code: 200,
    data: {
      orderId: 'P20212334124',
      orderTitle: '黄河 国内出差2021-11-25至20',
      travelInfo: [],
      tripDetail: [
        {
          columns: [
            {
              title: '费用类型',
              dataKey: 'costType',
            },
            {
              title: '入住日期',
              dataKey: 'date',
              width: 240,
            },
            {
              title: '天数',
              dataKey: 'days',
            },
            {
              title: '城市',
              dataKey: 'city',
            },
            {
              title: '每日标准',
              dataKey: 'dailyStandard',
            },
            {
              title: '币种',
              dataKey: 'currency',
            },
            {
              title: '操作',
              dataKey: 'operator',
              width: 160,
            },
          ],
          data: [
            {
              costType: '国内机票',
              date: '2021-01-01 至 2021-01-03',
              days: '3',
              city: '上海',
              dailyStandard: '400',
              currency: '人民币',
              operator: '审批通过后可预订',
              key: 1,
            },
          ],
        },
        {
          columns: [
            {
              title: '费用类型',
              dataKey: 'costType',
            },
            {
              title: '出行日期',
              dataKey: 'date',
              width: 240,
            },
            {
              title: '航程类型',
              dataKey: 'voyageType',
            },
            {
              title: '出发地',
              dataKey: 'departure',
            },
            {
              title: '到达地',
              dataKey: 'destination',
            },
            {
              title: '舱等',
              dataKey: 'class',
            },
            {
              title: '操作',
              dataKey: 'operator',
              width: 160,
            },
          ],
          data: [
            {
              costType: '国内机票',
              date: '2021-01-01 至 2021-01-03',
              voyageType: '往返',
              departure: '武汉',
              destination: '北京',
              class: '经济舱',
              operator: '审批通过后可预订',
              key: 1,
            },
          ],
        },
        {
          columns: [
            {
              title: '费用类型',
              dataKey: 'costType',
            },
            {
              title: '入住日期',
              dataKey: 'date',
              width: 240,
            },
            {
              title: '天数',
              dataKey: 'days',
            },
            {
              title: '城市',
              dataKey: 'city',
            },
            {
              title: '每日标准',
              dataKey: 'dailyStandard',
            },
            {
              title: '币种',
              dataKey: 'currency',
            },
            {
              title: '操作',
              dataKey: 'operator',
              width: 160,
            },
          ],
          data: [
            {
              costType: '国内机票',
              date: '2021-01-01 至 2021-01-03',
              days: '3',
              city: '上海',
              dailyStandard: '400',
              currency: '人民币',
              operator: '审批通过后可预订',
              key: 1,
            },
          ],
        },
        {
          columns: [
            {
              title: '费用类型',
              dataKey: 'costType',
            },
            {
              title: '出行日期',
              dataKey: 'date',
              width: 240,
            },
            {
              title: '航程类型',
              dataKey: 'voyageType',
            },
            {
              title: '出发地',
              dataKey: 'departure',
            },
            {
              title: '到达地',
              dataKey: 'destination',
            },
            {
              title: '舱等',
              dataKey: 'class',
            },
            {
              title: '操作',
              dataKey: 'operator',
              width: 160,
            },
          ],
          data: [
            {
              costType: '国内机票',
              date: '2021-01-01 至 2021-01-03',
              voyageType: '往返',
              departure: '武汉',
              destination: '北京',
              class: '经济舱',
              operator: '审批通过后可预订',
              key: 1,
            },
          ],
        },
      ],
    },
  },
}
