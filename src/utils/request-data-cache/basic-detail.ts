import { RequestDataCacheType } from './index'

const PageRoutePrefix = 'basic-detail'

export const BasicDetail: RequestDataCacheType = {
  [`${PageRoutePrefix}/data`]: {
    code: 200,
    data: {
      orderId: 'P20212334124',
      orderTitle: '黄河 国内出差2021-11-25至2021-11-27 南京、北京',
      travelInfo: [
        { label: '申请人', content: '黄河' },
        { label: '申请公司', content: '黄河有限公司' },
        { label: '申请部门', content: '黄河部' },
        { label: '出差时段', content: '2021-01-01 至 2021-01-03' },
        { label: '出差天数', content: '3天', span: 2 },
        { label: '起点城市', content: '黄河' },
        { label: '出差城市', content: '北京；上海；广州；深圳', span: 2 },
        {
          label: '申请事由',
          content:
            '这里是申请事由哈哈哈哈哈哈哈这里是申请事由哈哈哈哈哈哈哈这里是申请事由哈哈哈哈哈哈哈这里是申请事由哈哈哈哈哈哈哈这里是申请事由哈哈哈哈哈哈哈这里是申请事由哈哈哈哈哈哈哈这里是申请事由哈哈哈哈哈哈哈',
          span: 3,
        },
        {
          label: '附件',
          content: '小米门店市场活动方案.xlsl',
          url: 'https://github.com/XiaoMi/hiui/tree/next/4.0',
          span: 3,
        },
      ],
      tripDetail: [
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
      ],
      approvals: [
        {
          id: 1,
          title: '业务领导审批',
          children: [
            {
              user: {
                name: '张三',
                avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/01.jpeg',
              },
              status: '同意',
              statusNumber: 1,
              time: '10-24  18:30',
              content:
                '这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批意见这里是审批',
            },
            {
              user: {
                name: '李四',
                avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/02.jpeg',
              },
              status: '待审批',
              statusNumber: 0,
            },
            {
              user: {
                name: '王五',
                avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/03.jpeg',
              },
              status: '待审批',
              statusNumber: 0,
            },
          ],
        },
        {
          id: 2,
          title: '起草节点',
          children: [
            {
              user: {
                name: '老六',
                avatar: 'https://cdn.cnbj1.fds.api.mi-img.com/hiui-template/resources/06.jpeg',
              },
              status: '提交审批',
              statusNumber: 1,
              time: '10-24  18:30',
            },
          ],
        },
      ],
    },
  },
}
